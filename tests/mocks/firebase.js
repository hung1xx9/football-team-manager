import { vi } from 'vitest';

export const mockFirestore = {
    collection: vi.fn(() => mockFirestore),
    doc: vi.fn(() => mockFirestore),
    set: vi.fn(() => Promise.resolve()),
    get: vi.fn(() => Promise.resolve({ exists: false, data: () => ({}) })),
    onSnapshot: vi.fn((cb) => {
        cb({ exists: false, data: () => ({}) });
        return vi.fn();
    }),
    update: vi.fn(() => Promise.resolve()),
    delete: vi.fn(() => Promise.resolve()),
    runTransaction: vi.fn((fn) => fn(mockTransaction, mockFirestore, mockFirebase)),
    batch: vi.fn(() => mockBatch)
};

const mockTransaction = {
    get: vi.fn(() => Promise.resolve({ exists: false, data: () => ({}) })),
    set: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
};

const mockBatch = {
    set: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    commit: vi.fn(() => Promise.resolve())
};

export const mockAuth = {
    onAuthStateChanged: vi.fn((cb) => {
        cb(null);
        return vi.fn();
    }),
    signInAnonymously: vi.fn(() => Promise.resolve({ user: { uid: 'anonymous' } })),
    signOut: vi.fn(() => Promise.resolve())
};

export const mockFirebase = {
    apps: [],
    initializeApp: vi.fn(),
    firestore: vi.fn(() => mockFirestore),
    auth: vi.fn(() => mockAuth),
    storage: vi.fn(() => ({})),
    messaging: vi.fn(() => ({
        getToken: vi.fn(() => Promise.resolve('mock-token')),
        isSupported: vi.fn(() => true)
    }))
};

mockFirebase.firestore.FieldValue = {
    serverTimestamp: vi.fn(() => 'server-timestamp')
};

// Default export if needed
export default mockFirebase;
