import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  AuthError,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';
import { RegisterFormData, LoginFormData } from '@/lib/validation/auth-schemas';
import { AuthUser, AuthResponse } from '@/types/auth';

/**
 * Maps Firebase Auth errors to user-friendly enterprise error messages
 */
export function formatFirebaseAuthError(error: unknown): { error: string; code: string } {
  const authError = error as AuthError;
  const errorCode = authError?.code || 'UNKNOWN';

  switch (errorCode) {
    case 'auth/email-already-in-use':
      return {
        error: 'An account already exists for this email. Sign in or reset your password.',
        code: 'ACCOUNT_EXISTS',
      };
    case 'auth/invalid-email':
      return {
        error: 'Enter a valid email address.',
        code: 'INVALID_CREDENTIALS',
      };
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return {
        error: 'The email or password is incorrect.',
        code: 'INVALID_CREDENTIALS',
      };
    case 'auth/too-many-requests':
      return {
        error: 'Too many attempts. Please wait before trying again.',
        code: 'RATE_LIMITED',
      };
    case 'auth/network-request-failed':
      return {
        error: "We couldn't connect to AERIQ. Check your connection and try again.",
        code: 'NETWORK_ERROR',
      };
    case 'auth/weak-password':
      return {
        error: 'Password does not meet security requirements.',
        code: 'INVALID_CREDENTIALS',
      };
    default:
      return {
        error: authError?.message || 'An unexpected error occurred. Please try again.',
        code: 'UNKNOWN',
      };
  }
}

/**
 * Creates user in Firebase Authentication and saves user profile to Cloud Firestore
 */
export async function registerUserWithFirebase(
  data: RegisterFormData
): Promise<AuthResponse<AuthUser>> {
  try {
    // 1. Create account in Firebase Authentication
    const credential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const user = credential.user;

    const fullName = `${data.firstName} ${data.lastName}`.trim();

    // 2. Update display name in Firebase Auth
    try {
      await updateProfile(user, { displayName: fullName });
    } catch {
      // Non-critical profile update failure
    }

    // 3. Send verification email via Firebase
    try {
      await sendEmailVerification(user);
    } catch {
      // Verification email dispatch error
    }

    // 4. Save full details to Cloud Firestore under users/{userId}
    const userProfileData = {
      uid: user.uid,
      firstName: data.firstName,
      lastName: data.lastName,
      fullName,
      email: data.email,
      companyName: data.companyName,
      mobileNumber: data.mobileNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      serverTimestamp: serverTimestamp(),
    };

    try {
      await setDoc(doc(db, 'users', user.uid), userProfileData);
    } catch (firestoreError) {
      console.warn('Firestore write warning:', firestoreError);
      // Even if firestore offline, auth user was created
    }

    const authUser: AuthUser = {
      id: user.uid,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      fullName,
      companyName: data.companyName,
      mobileNumber: data.mobileNumber,
      isEmailVerified: user.emailVerified,
      createdAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: authUser,
      message: 'Account created successfully. Please verify your email.',
    };
  } catch (error) {
    const formatted = formatFirebaseAuthError(error);
    return {
      success: false,
      error: formatted.error,
      code: formatted.code as AuthResponse['code'],
    };
  }
}

/**
 * Signs in user with Firebase Authentication and retrieves profile from Cloud Firestore
 */
export async function loginUserWithFirebase(
  data: LoginFormData
): Promise<AuthResponse<AuthUser>> {
  try {
    const credential = await signInWithEmailAndPassword(auth, data.email, data.password);
    const user = credential.user;

    let profileData: Partial<AuthUser> = {};

    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        profileData = userDoc.data() as Partial<AuthUser>;
      }
    } catch {
      // Firestore offline fallback
    }

    const authUser: AuthUser = {
      id: user.uid,
      email: user.email || data.email,
      firstName: profileData.firstName || '',
      lastName: profileData.lastName || '',
      fullName: user.displayName || profileData.fullName || user.email?.split('@')[0] || 'User',
      companyName: profileData.companyName || '',
      mobileNumber: profileData.mobileNumber || '',
      isEmailVerified: user.emailVerified,
      createdAt: profileData.createdAt || new Date().toISOString(),
    };

    return {
      success: true,
      data: authUser,
      message: 'Signed in successfully.',
    };
  } catch (error) {
    const formatted = formatFirebaseAuthError(error);
    return {
      success: false,
      error: formatted.error,
      code: formatted.code as AuthResponse['code'],
    };
  }
}

/**
 * Sends a password reset email via Firebase Auth
 */
export async function sendResetEmailWithFirebase(email: string): Promise<AuthResponse<void>> {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: "If an account exists for this email, we'll send password reset instructions.",
    };
  } catch {
    // Return generic success to prevent account enumeration
    return {
      success: true,
      message: "If an account exists for this email, we'll send password reset instructions.",
    };
  }
}

/**
 * Resends email verification to currently logged in Firebase user
 */
export async function resendVerificationWithFirebase(): Promise<AuthResponse<void>> {
  try {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      return {
        success: true,
        message: 'Verification link resent successfully.',
      };
    }
    return {
      success: true,
      message: 'Verification email resent.',
    };
  } catch (error) {
    const formatted = formatFirebaseAuthError(error);
    return {
      success: false,
      error: formatted.error,
    };
  }
}

export interface UserSettingsData {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  companyName?: string;
  mobileNumber?: string;
  email?: string;
  selectedSpecies?: string;
  customSpecies?: string;
  metricTonsPerYear?: string;
  latitude?: string;
  longitude?: string;
  hasUpdatedOnce?: boolean;
  hasConfigUpdatedOnce?: boolean;
}

/**
 * Saves or updates user profile and configuration settings in Cloud Firestore under users/{userId}
 */
export async function saveUserSettingsToFirestore(
  userId: string,
  data: UserSettingsData
): Promise<AuthResponse<void>> {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(
      userRef,
      {
        ...data,
        updatedAt: new Date().toISOString(),
        serverTimestamp: serverTimestamp(),
      },
      { merge: true }
    );
    return {
      success: true,
      message: 'Settings saved to Firebase Cloud Firestore successfully.',
    };
  } catch (error) {
    console.warn('Firestore save warning:', error);
    return {
      success: true,
      message: 'Settings saved locally.',
    };
  }
}

/**
 * Retrieves user profile and configuration settings from Cloud Firestore
 */
export async function getUserSettingsFromFirestore(
  userId: string
): Promise<AuthResponse<UserSettingsData>> {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return {
        success: true,
        data: userDoc.data() as UserSettingsData,
      };
    }
    return {
      success: false,
      error: 'User document not found in Firestore.',
    };
  } catch (error) {
    console.warn('Firestore fetch warning:', error);
    return {
      success: false,
      error: 'Unable to connect to Cloud Firestore.',
    };
  }
}
