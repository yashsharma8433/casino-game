Mini Betting App Client — Next.js + Tailwind + React Query

Getting Started

1. Install deps
```
npm install
```
2. Run dev server
```
npm run dev
```
3. Open `http://localhost:3000` then navigate to `/matches`.

Features
- Responsive Matches page (`/matches`): list/grid with odds selection
- Betting slip: mobile drawer + desktop sidebar, localStorage persistence
- Balance fetch and bet placement against mock API routes
- React Query caching and polling for matches

API Routes
- `GET /api/matches` — mock matches with random odds jitter
- `GET /api/balance` — in-memory balance
- `POST /api/bets` — validates funds and odds drift

Tech
- Next.js App Router, TypeScript, Tailwind CSS v4
- Axios, @tanstack/react-query v5
