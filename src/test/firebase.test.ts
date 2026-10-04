import { describe, it, expect } from 'vitest';
import { app, firebaseConfig } from '@/lib/firebase/config';

describe('Firebase Configuration', () => {
  it('initializes Firebase with the correct projectId', () => {
    expect(app).toBeDefined();
    expect(app.name).toBe('[DEFAULT]');
    expect(firebaseConfig.projectId).toBe('aeriq-aero');
    expect(firebaseConfig.authDomain).toBe('aeriq-aero.firebaseapp.com');
  });
});
