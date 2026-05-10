import { describe, expect, it } from 'vitest';

import { tiebreak as gamesPlayedWithBlack } from '../black.js';
import { tiebreak as roundsElectedToPlay } from '../elected.js';
import { tiebreak as gamesWon } from '../games-won.js';
import { tiebreak as numberOfWins } from '../index.js';
import { tiebreak as standardPoints } from '../standard.js';
import { tiebreak as gamesWonWithBlack } from '../won-with-black.js';

import type { CompletedRound, Player } from '@echecs/tournament';

const PLAYERS: Player[] = [
  { id: 'A', points: 2.5, rank: 1 },
  { id: 'B', points: 1, rank: 3 },
  { id: 'C', points: 0, rank: 4 },
  { id: 'D', points: 2.5, rank: 2 },
];

const ROUNDS: CompletedRound[] = [
  {
    byes: [],
    games: [
      { black: 'B', result: 'white', white: 'A' },
      { black: 'D', result: 'black', white: 'C' },
    ],
  },
  {
    byes: [],
    games: [
      { black: 'D', result: 'draw', white: 'A' },
      { black: 'B', result: 'black', white: 'C' },
    ],
  },
  {
    byes: [],
    games: [
      { black: 'C', result: 'white', white: 'A' },
      { black: 'B', result: 'white', white: 'D' },
    ],
  },
];

describe('numberOfWins', () => {
  it('counts rounds where player scored 1 point', () => {
    expect(numberOfWins('A', ROUNDS, PLAYERS)).toBe(2);
  });
});

describe('gamesWon', () => {
  it('counts OTB games won (excluding forfeits)', () => {
    expect(gamesWon('A', ROUNDS, PLAYERS)).toBe(2);
  });
});

describe('gamesPlayedWithBlack', () => {
  it('counts OTB games where player was black', () => {
    expect(gamesPlayedWithBlack('A', ROUNDS, PLAYERS)).toBe(0);
    expect(gamesPlayedWithBlack('D', ROUNDS, PLAYERS)).toBe(2);
  });
});

describe('gamesWonWithBlack', () => {
  it('counts OTB games won as black', () => {
    expect(gamesWonWithBlack('D', ROUNDS, PLAYERS)).toBe(1);
    expect(gamesWonWithBlack('A', ROUNDS, PLAYERS)).toBe(0);
  });
});

describe('roundsElectedToPlay', () => {
  it('returns total OTB games (no byes in fixture)', () => {
    expect(roundsElectedToPlay('A', ROUNDS, PLAYERS)).toBe(3);
  });
});

describe('standardPoints', () => {
  it('awards 1 for scoring more, 0.5 for equal, 0 for less', () => {
    expect(standardPoints('A', ROUNDS, PLAYERS)).toBe(2.5);
  });
});
