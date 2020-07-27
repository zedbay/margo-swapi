import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from 'src/app/core/services/film.service';
import { Film } from 'src/app/core/models/film';
import { PeopleService } from 'src/app/core/services/people.service';
import { People } from 'src/app/core/models/people';

@Component({
  selector: 'app-movie-quizz',
  templateUrl: './movie-quizz.component.html',
  styleUrls: ['./movie-quizz.component.scss']
})
export class MovieQuizzComponent implements OnInit {

  public film: Film;
  public peoplesInFilm: People[];
  @ViewChild('userInput', { static: false }) userInput: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
    private peopleSerive: PeopleService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.fetchFilm(params.id);
    });
  }

  public showResult(): void {
    this.peoplesInFilm.forEach((people: People) => people.isFound = true);
  }

  private fetchFilm(id: number): void {
    this.filmService.getFilm(id).subscribe(
      (film: Film) => {
        this.film = film;
        this.fetchPeoplesInFilm(this.film.characters);
      }
    );
  }

  private fetchPeoplesInFilm(peopleUrls: string[]): void {
    const peopleIds = peopleUrls.map((url: string) => parseInt(url.replace(/\D+/g, ''), 10));
    this.peopleSerive.listPeople(peopleIds).subscribe((peoples: People[]) => {
      peoples = peoples.map((people: People) => {
        people.isFound = false;
        return people;
      });
      this.peoplesInFilm = peoples;
    });
  }

  private gameIsOver(): boolean {
    return this.peoplesInFilm.every((people: People) => people.isFound);
  }

  public userInputChange(value: string): void {
    const peopleToSearch: People = this.peoplesInFilm.find((people: People) => {
      return value.toLowerCase() === people.name.toLowerCase();
    });
    if (peopleToSearch) {
      peopleToSearch.isFound = true;
      this.userInput.nativeElement.value = '';
      if (this.gameIsOver()) {
        alert('Congratulation :)');
      }
    }
  }
}
