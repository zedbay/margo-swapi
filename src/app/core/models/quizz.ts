import { People } from './people';
import { Film } from './film';

export interface Quizz {
  peoplesToFind: People[];
  targetFilm: Film;
  success: boolean;
}
