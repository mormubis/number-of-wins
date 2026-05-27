# AGENTS.md

Agent guidance for the `@echecs/number-of-wins` repository — a TypeScript
library implementing win-counting tiebreaks following FIDE Tiebreak Regulations
(sections 7.1–7.4 and 7.6–7.8).

**See also:** [`REFERENCES.md`](REFERENCES.md) | [`SPEC.md`](SPEC.md)

See the root `AGENTS.md` for workspace-wide conventions.

**Backlog:** tracked in
[GitHub Issues](https://github.com/echecsjs/number-of-wins/issues).

---

## Project Overview

Pure calculation library, no runtime dependencies. Exports six functions:

| Function               | FIDE section | Description                                         |
| ---------------------- | ------------ | --------------------------------------------------- |
| `numberOfWins`         | 7.1          | Total number of wins (including forfeits)           |
| `gamesWon`             | 7.2          | Wins excluding forfeit wins                         |
| `gamesPlayedWithBlack` | 7.3          | Number of games played with the black pieces        |
| `gamesWonWithBlack`    | 7.4          | Wins with the black pieces                          |
| `roundsElectedToPlay`  | 7.6          | Number of rounds the player chose to participate in |
| `standardPoints`       | 7.8          | Points from standard (classical) time-control games |

All functions conform to the signature:

```ts
(playerId: string, games: Game[][], players?: Player[]) => number;
```

`Game[][]` is a round-indexed structure: `games[0]` contains round-1 games,
`games[1]` contains round-2 games, and so on. The `Game` type no longer has a
`round` field — round is determined by array position.

The `Game` type carries an optional `kind?: GameKind` field. When present it
identifies the nature of an unplayed round (e.g. `'half-bye'`, `'full-bye'`,
`'forfeit-win'`, `'forfeit-loss'`, `'zero-bye'`, `'pairing-bye'`). Functions in
this package use `kind` to distinguish between bye types when determining
whether a round counts toward `roundsElectedToPlay` (7.6) and whether a win is
over-the-board (`gamesWon`, 7.2) vs. any type (`numberOfWins`, 7.1).

FIDE reference: https://handbook.fide.com/chapter/TieBreakRegulations032026
(sections 7.1–7.4 and 7.6–7.8 — Win-counting tiebreaks)

All source lives in `src/index.ts`; tests in `src/__tests__/index.spec.ts`.

---

## Commands

### Build

```bash
pnpm run build          # bundle TypeScript → dist/ via tsdown
```

### Test

```bash
pnpm run test                          # run all tests once
pnpm run test:watch                    # watch mode
pnpm run test:coverage                 # with coverage report

# Run a single test file
pnpm run test src/__tests__/index.spec.ts

# Run a single test by name (substring match)
pnpm run test -- --reporter=verbose -t "numberOfWins"
```

### Lint & Format

```bash
pnpm run lint           # ESLint + tsc type-check (auto-fixes style issues)
pnpm run lint:ci        # strict — zero warnings allowed, no auto-fix
pnpm run lint:style     # ESLint only (auto-fixes)
pnpm run lint:types     # tsc --noEmit type-check only
pnpm run format         # Prettier (writes changes)
pnpm run format:ci      # Prettier check only (no writes)
```

### Full pre-PR check

```bash
pnpm lint && pnpm test && pnpm build
```

---

## Architecture Notes

- All six functions count games or results matching a specific criterion for
  `playerId`; they never aggregate opponents' statistics.
- A `Game` with `black: ''` (empty string) represents a **bye**. Handling varies
  by function:
  - `numberOfWins` includes bye wins (FIDE counts them as wins).
  - `gamesWon` excludes bye wins (only real game wins count).
  - `gamesPlayedWithBlack` and `gamesWonWithBlack` exclude byes (no colour
    assigned for a bye).
  - `roundsElectedToPlay` counts rounds where the player was paired (bye rounds
    may or may not count depending on whether the bye was requested — see `Game`
    type for the relevant flag).
  - `standardPoints` counts only games with the standard time control as
    indicated by a field on the `Game` type.
- The `players` parameter is optional; most functions in this package do not use
  it — they only require `playerId` and `games`.
- **No runtime dependencies** — keep it that way.
- **ESM-only** — the package ships only ESM. Do not add a CJS build.

---

## Tiebreak Signature

All tiebreak functions consumed by `@echecs/tournament` must conform to:

```typescript
type Tiebreak = (
  player: string,
  rounds: CompletedRound[],
  players: Player[],
) => number;
```

---

## Validation

Input validation is provided by TypeScript's strict type system at compile time.
There is no runtime validation library. Do not add runtime type-checking guards
unless there is an explicit trust boundary (user-supplied strings, external
data).

---

## Error Handling

All functions are pure calculations and do not throw. An unplayed tournament
(zero games) returns `0` rather than throwing.
