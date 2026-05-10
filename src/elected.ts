import type { CompletedRound, Player } from '@echecs/tournament';

function roundsElectedToPlay(
  player: string,
  rounds: CompletedRound[],
  _players: Player[],
): number {
  let count = 0;
  for (const round of rounds) {
    for (const g of round.games) {
      if (g.white === player || g.black === player) {
        count += 1;
        break;
      }
    }
  }
  return count;
}

export { roundsElectedToPlay, roundsElectedToPlay as tiebreak };

export type {
  Bye,
  CompletedRound,
  Game,
  Pairing,
  Player,
} from '@echecs/tournament';
