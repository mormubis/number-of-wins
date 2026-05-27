import { gamesForPlayer, scoreFor } from './utilities.js';

import type { Tiebreak } from '@echecs/tournament';

const gamesWon: Tiebreak = (player, rounds, _players) => {
  let count = 0;
  for (const g of gamesForPlayer(player, rounds)) {
    if (scoreFor(player, g) === 1 && g.forfeit === undefined) {
      count += 1;
    }
  }
  return count;
};

export { gamesWon, gamesWon as tiebreak };

export type {
  Bye,
  CompletedRound,
  Game,
  Pairing,
  Player,
} from '@echecs/tournament';
