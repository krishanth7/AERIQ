import { describe, it, expect } from 'vitest';
import { app, firebaseConfig } from '@/lib/firebase/config';

describe('Firebase Configuration', () => {
  it('initializes Firebase app instance', () => {
    expect(app).toBeDefined();
    expect(app.name).toBe('[DEFAULT]');
    expect(firebaseConfig).toHaveProperty('projectId');
    expect(firebaseConfig).toHaveProperty('authDomain');
  });
});
