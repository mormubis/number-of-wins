import { gamesForPlayer } from './utilities.js';

import type { Tiebreak } from '@echecs/tournament';

const gamesPlayedWithBlack: Tiebreak = (player, rounds, _players) => {
  let count = 0;
  for (const g of gamesForPlayer(player, rounds)) {
    if (g.black === player) {
      count += 1;
    }
  }
  return count;
};

export { gamesPlayedWithBlack, gamesPlayedWithBlack as tiebreak };

export type {
  Bye,
  CompletedRound,
  Game,
  Pairing,
  Player,
} from '@echecs/tournament';
