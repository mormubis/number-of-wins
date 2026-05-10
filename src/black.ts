import { gamesForPlayer } from './utilities.js';

import type { CompletedRound, Player } from '@echecs/tournament';

function gamesPlayedWithBlack(
  player: string,
  rounds: CompletedRound[],
  _players: Player[],
): number {
  let count = 0;
  for (const g of gamesForPlayer(player, rounds)) {
    if (g.black === player) {
      count += 1;
    }
  }
  return count;
}

export { gamesPlayedWithBlack, gamesPlayedWithBlack as tiebreak };

export type {
  Bye,
  CompletedRound,
  Game,
  Pairing,
  Player,
} from '@echecs/tournament';
