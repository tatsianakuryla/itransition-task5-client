# Frontend - Task 5

React + TypeScript + Vite project with configured ESLint, Prettier, and Husky.

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/          # Application pages
├── services/       # API services
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── types/          # TypeScript types and interfaces
├── context/        # React Context
├── assets/         # Static files (images, icons)
├── App.tsx         # Main component
├── main.tsx        # Entry point
└── index.css       # Global styles
```

## Commands

```bash
# Development
npm run dev

# Build
npm run build

# Code linting
npm run lint
npm run lint:fix

# Code formatting
npm run format
npm run format:check
```

## Code Rules

### ESLint

- ❌ Abbreviations in names are forbidden (use `button` instead of `btn`)
- ❌ Type `any` is forbidden
- ❌ Type assertions (`as`) are forbidden
- ✅ Automatic import sorting

### Prettier

- Line width: 120 characters
- Double quotes
- Semicolons: yes
- Trailing comma: es5

### Husky

- Pre-commit hook runs `lint-staged`
- Automatic code fixes before commit
