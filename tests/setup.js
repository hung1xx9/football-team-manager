import { vi } from 'vitest';
import { mockFirebase } from './mocks/firebase';

// Mock Firebase modules
vi.mock('firebase/compat/app', () => ({
    default: mockFirebase
}));

vi.mock('firebase/compat/auth', () => ({}));
vi.mock('firebase/compat/firestore', () => ({}));
vi.mock('firebase/compat/storage', () => ({}));
vi.mock('firebase/compat/messaging', () => ({}));

// Mock Vue Router
vi.mock('vue-router', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn()
    }),
    useRoute: () => ({
        params: {},
        query: {}
    }),
    defineComponent: (comp) => comp
}));

// Mock Notification and Globals
global.Notification = {
    requestPermission: vi.fn(() => Promise.resolve('granted'))
};

// Global polyfills or mocks for browser APIs missing in happy-dom
// happy-dom already includes localStorage, so we don't need to mock it manually.
