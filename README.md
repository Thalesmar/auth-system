# Auth System

Simple authentication project with a static frontend and an Express backend.

## Live frontend

GitHub Pages serves the static UI from this repository:

- Landing page: `https://thalesmar.github.io/auth-system/`
- Sign up page: `https://thalesmar.github.io/auth-system/frontend/pages/signup.html`
- Login page: `https://thalesmar.github.io/auth-system/frontend/pages/login.html`

## Project structure

- `frontend/`: static HTML, CSS, and browser JavaScript
- `backend/`: Express API for sign up and login
- `assets/`: shared images and icons

## Run locally

1. Install backend dependencies:

```bash
cd backend
npm install
```

2. Start the backend:

```bash
npm run dev
```

3. Open the frontend in a browser:

- `frontend/pages/signup.html`
- `frontend/pages/login.html`

By default, the frontend sends requests to `http://localhost:8080`.

## Notes

- GitHub Pages can only host the static frontend.
- The backend must run locally or be deployed separately for form submission to work online.
