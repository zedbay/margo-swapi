import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { Observable } from 'rxjs';
import { Film } from 'src/app/core/models/film';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private endpoint = 'films';

  constructor(
    private networkService: NetworkService
  ) { }

  public getFilms(): Observable<Film[]> {
    return this.networkService
      .get(this.endpoint)
      .pipe(map((data: any) => {
        return data.results.map((film: Film) => {
          film.id = parseInt(film.url.replace(/\D+/g, ''), 10);
          return film;
        });
      }));
  }

  public getFilm(id: number): Observable<Film> {
    return this.networkService
      .get(`${this.endpoint}/${id}`)
      .pipe(map((film: Film) => {
        film.id = parseInt(film.url.replace(/\D+/g, ''), 10);
        return film;
      }));
  }
}
