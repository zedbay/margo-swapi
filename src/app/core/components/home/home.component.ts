import { Component, OnInit } from '@angular/core';
import { FilmService } from 'src/app/core/services/film.service';
import { Film } from 'src/app/core/models/film';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public films: Film[];
  public currentFilmTitle = '-';

  constructor(
    private filmeService: FilmService
  ) { }

  ngOnInit(): void {
    this.fetchFilms();
  }

  public changeCurrentFilmTitle(title: string): void {
    this.currentFilmTitle = title;
  }

  private fetchFilms(): void {
    this.filmeService.getFilms().subscribe(
      (films: Film[]) => {
        this.films = films;
      }
    );
  }

}
