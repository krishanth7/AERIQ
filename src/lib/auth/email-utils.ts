/**
 * Masks an email address to protect privacy.
 * Example: 'alex.morgan@example.com' -> 'a•••••••@example.com'
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) {
    return '••••@••••.•••';
  }

  const [localPart, domain] = email.split('@');
  if (localPart.length <= 1) {
    return `•@${domain}`;
  }

  const firstChar = localPart[0];
  const bulletCount = Math.min(6, Math.max(1, localPart.length - 1));
  const maskedLocal = `${firstChar}${'•'.repeat(bulletCount)}`;
  return `${maskedLocal}@${domain}`;
}
