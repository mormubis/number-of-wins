import { gamesForPlayer, scoreFor } from './utilities.js';

import type { CompletedRound, Player } from '@echecs/tournament';

function numberOfWins(
  player: string,
  rounds: CompletedRound[],
  _players: Player[],
): number {
  let count = 0;
  for (const g of gamesForPlayer(player, rounds)) {
    if (scoreFor(player, g) === 1) {
      count += 1;
    }
  }
  return count;
}

export { numberOfWins, numberOfWins as tiebreak };

export type {
  Bye,
  CompletedRound,
  Game,
  Pairing,
  Player,
} from '@echecs/tournament';
