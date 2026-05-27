import type { Tiebreak } from '@echecs/tournament';

const roundsElectedToPlay: Tiebreak = (player, rounds, _players) => {
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
};

export { roundsElectedToPlay, roundsElectedToPlay as tiebreak };

export type {
  Bye,
  CompletedRound,
  Game,
  Pairing,
  Player,
} from '@echecs/tournament';
