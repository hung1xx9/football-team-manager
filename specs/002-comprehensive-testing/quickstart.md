# Quickstart: Running Tests

## Prerequisites

- Node.js 18+
- npm

## Setup

```bash
# Install test dependencies
npm install -D vitest @vue/test-utils happy-dom @vitest/coverage-v8
```

## Run Tests

```bash
# Run all tests
npx vitest run

# Run tests in watch mode
npx vitest

# Run with coverage report
npx vitest run --coverage

# Run specific test file
npx vitest run tests/unit/useAuth.test.js
```

## Project Test Structure

```
tests/
├── setup.js          # Global setup (Firebase mocks)
├── mocks/firebase.js # Shared Firebase mock utilities
├── unit/             # Composable unit tests
└── components/       # Vue component tests
```
