import { gamesForPlayer, scoreFor } from './utilities.js';

import type { Tiebreak } from '@echecs/tournament';

const standardPoints: Tiebreak = (player, rounds, _players) => {
  let total = 0;
  for (const g of gamesForPlayer(player, rounds)) {
    const playerScore = scoreFor(player, g);
    const opponentScore = 1 - playerScore;
    if (playerScore > opponentScore) {
      total += 1;
    } else if (playerScore === opponentScore) {
      total += 0.5;
    }
  }
  return total;
};

export { standardPoints, standardPoints as tiebreak };

export type {
  Bye,
  CompletedRound,
  Game,
  Pairing,
  Player,
} from '@echecs/tournament';
