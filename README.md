# Number of Wins

[![npm](https://img.shields.io/npm/v/@echecs/number-of-wins)](https://www.npmjs.com/package/@echecs/number-of-wins)
[![Coverage](https://codecov.io/gh/echecsjs/number-of-wins/branch/main/graph/badge.svg)](https://codecov.io/gh/echecsjs/number-of-wins)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Spec](https://img.shields.io/badge/Spec-FIDE-green.svg)](SPEC.md)

**Number of Wins** is a TypeScript library implementing win-counting tiebreaks
for chess tournaments, following the
[FIDE Tiebreak Regulations](https://handbook.fide.com/chapter/TieBreakRegulations032026)
(sections 7.1–7.4 and 7.6–7.8). Zero runtime dependencies.

## Installation

```bash
npm install @echecs/number-of-wins
```

## Quick Start

```typescript
import { numberOfWins } from '@echecs/number-of-wins';
import type { Game, GameKind } from '@echecs/number-of-wins';

// games[n] = round n+1; Game has no `round` field
const games: Game[][] = [
  [{ black: 'B', result: 1, white: 'A' }], // round 1
  [{ black: 'C', result: 0.5, white: 'A' }], // round 2
  [{ black: 'A', result: 0, white: 'D' }], // round 3
  // kind distinguishes bye types for roundsElectedToPlay
  [{ black: 'A', kind: 'half-bye', result: 0.5, white: 'A' }], // round 4
];

const wins = numberOfWins('A', games);
// Returns 1 (one win including forfeit wins, byes are not wins here)
```

## API

All functions accept `(player: string, games: Game[][])` and return `number`.
Round is determined by array position: `games[0]` = round 1, `games[1]` = round
2, etc. The `Game` type has no `round` field. The optional `kind?: GameKind`
field on `Game` classifies unplayed rounds; values: `'forfeit-loss'`,
`'forfeit-win'`, `'full-bye'`, `'half-bye'`, `'pairing-bye'`, `'zero-bye'`. Bye
games use the same player for both `white` and `black`.

### `numberOfWins(player, games)`

**FIDE section 7.1** — Total number of wins. Counts all games where `player`
scored 1 point, including forfeit wins (bye rounds that award a full point).

```typescript
import { numberOfWins, tiebreak } from '@echecs/number-of-wins';
// tiebreak is an alias for numberOfWins
```

### `gamesWon(player, games)`

**FIDE section 7.2** — Wins in played games only. Like `numberOfWins` but
excludes bye rounds — only counts wins from over-the-board games.

```typescript
import { gamesWon, tiebreak } from '@echecs/number-of-wins/games-won';
```

### `gamesPlayedWithBlack(player, games)`

**FIDE section 7.3** — Number of games played with the black pieces. Byes have
no colour assignment and are excluded.

```typescript
import { gamesPlayedWithBlack, tiebreak } from '@echecs/number-of-wins/black';
```

### `gamesWonWithBlack(player, games)`

**FIDE section 7.4** — Number of wins with the black pieces. Byes are excluded.

```typescript
import {
  gamesWonWithBlack,
  tiebreak,
} from '@echecs/number-of-wins/won-with-black';
```

### `roundsElectedToPlay(player, games)`

**FIDE section 7.6** — Number of rounds the player chose to participate in.
Returns the total number of games minus bye rounds.

```typescript
import { roundsElectedToPlay, tiebreak } from '@echecs/number-of-wins/elected';
```

### `standardPoints(player, games)`

**FIDE section 7.8** — Points from standard (classical) time-control games.
Counts only over-the-board results — wins score 1, draws score 0.5, losses
score 0. Byes are excluded.

```typescript
import { standardPoints, tiebreak } from '@echecs/number-of-wins/standard';
```

## Subpath Exports

Each function is available as a standalone subpath export. Every subpath also
exports a `tiebreak` alias for the primary function, plus the shared types.

| Subpath                                 | Function               | Alias      |
| --------------------------------------- | ---------------------- | ---------- |
| `@echecs/number-of-wins`                | `numberOfWins`         | `tiebreak` |
| `@echecs/number-of-wins/black`          | `gamesPlayedWithBlack` | `tiebreak` |
| `@echecs/number-of-wins/elected`        | `roundsElectedToPlay`  | `tiebreak` |
| `@echecs/number-of-wins/games-won`      | `gamesWon`             | `tiebreak` |
| `@echecs/number-of-wins/standard`       | `standardPoints`       | `tiebreak` |
| `@echecs/number-of-wins/won-with-black` | `gamesWonWithBlack`    | `tiebreak` |

## Types

All subpath exports re-export the shared types:

```typescript
import type { Game, GameKind, Player, Result } from '@echecs/number-of-wins';
```

| Type       | Description                                                                                  |
| ---------- | -------------------------------------------------------------------------------------------- |
| `Game`     | `{ white: string; black: string; result: Result; kind?: GameKind }`                          |
| `GameKind` | `'forfeit-loss' \| 'forfeit-win' \| 'full-bye' \| 'half-bye' \| 'pairing-bye' \| 'zero-bye'` |
| `Player`   | `{ id: string }`                                                                             |
| `Result`   | `0 \| 0.5 \| 1`                                                                              |

## Contributing

Contributions are welcome. Please open an issue at
[github.com/echecsjs/number-of-wins/issues](https://github.com/echecsjs/number-of-wins/issues).
