# User Administration SPA with Auth & Bulk Actions
Business-oriented SPA for user registration, authentication, and an admin user table with sorting, multi-select, and a fixed action toolbar.

React + TypeScript + Bootstrap + Vite project with configured ESLint, Prettier, and Husky.

---
## Table of Contents
- [Live demo & repos](#live-demo--repos)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Features](#features)
- [Tech Stack](#tech-stack)
  - [Frontend](#frontend-1)
  - [Backend](#backend-1)
- [Project Structure](#project-structure)
- [Behavior Highlights](#behavior-highlights)
- [Commands](#commands)
- [Code Rules](#code-rules)
  - [ESLint](#eslint)
  - [Prettier](#prettier)
  - [Husky](#husky)
---
## Live demo & repos

###### Frontend:
- [Frontend (repo)](https://github.com/tatsianakuryla/itransition-task5-client)
- [Frontend (deploy)](https://site--itransition-task5-client--kfjltdjcwqvn.code.run)

###### Backend:
- [Backend (repo)](https://github.com/tatsianakuryla/itransition-task5-server)
- [Backend (deploy)](https://backend--itransition-task5-server--kfjltdjcwqvn.code.run)

---
## Features

- **Auth flow:** Registration and login; non-authenticated users can only see login/registration.
- **Admin users table**
  - **Columns:** selection checkbox, name, e-mail, last login/activity, status (unverified/active/blocked).
  - **Sorting:** e.g., by last login.
  - **Selection:** multi-select via checkboxes, including **Select all** in the header.
  - **Actions (fixed toolbar, no row buttons):** **Block**, **Unblock**, **Delete**, **Delete unverified**. Toolbar stays visible and enables/disables accordingly.
- **Access checks:** Before each request (except registration/login), the server verifies the user exists and isn’t blocked; otherwise redirects to login.
- **E-mail verification:** Registration is immediate; confirmation e-mail is sent asynchronously; clicking the link changes **unverified → active** (blocked remains blocked).
- **Deletion:** Users are deleted physically (not “soft-marked”).
- **UI constraints:** Bootstrap styling, no wallpapers/animations/alerts; looks “boring but professional” across browsers and screen sizes.
- **Database uniqueness:** E-mail uniqueness is guaranteed by a database **unique index** (handled at the storage level, not by app-level checks).

---
## Tech Stack

#### Frontend
- **React + TypeScript** — SPA, typed components and app logic.
- **React Router** — public/private routes with guards.
- **Bootstrap** — layouts, forms, table, and the fixed action toolbar.
- **Fetch/Axios** — HTTP client(s) for REST API calls.
- **Vite** — fast dev server and production build.

#### Backend
- **Node.js + Express** — REST API endpoints (auth, users, admin actions).
- **PostgreSQL** — persistent storage; **unique index** on `users.email` to guarantee e-mail uniqueness at the DB level.
- **Auth & access control middleware** — server-side checks on every protected request (user exists, not blocked), otherwise 401/redirect flow.
- **E-mail verification flow** — async confirmation e-mail and verification endpoint to transition **unverified → active**.
- **Deployment** — hosted at the provided URLs (see “Frontend/Backend” links above).

---
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

---
### Behavior Highlights

- **Server-side status check.** Every protected request re-validates the user; blocked users lose access and are redirected to login. _(Task 5)_
- **Async verification.** Registration succeeds immediately; the verification e-mail is sent asynchronously; clicking the link activates the account. _(Task 5)_
- **Hard delete.** Users are physically removed from storage (not soft-deleted). _(Task 5)_
- **UI rules.** No browser alerts; consistent alignment; Bootstrap for a clean, professional look. _(Task 5)_

---
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

---
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
