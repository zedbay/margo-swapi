import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { People } from 'src/app/core/models/people';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private endpoint = 'people';

  constructor(
    private networkService: NetworkService
  ) { }

  public getPeople(id: number): Observable<People> {
    return this.networkService
      .get(`${this.endpoint}/${id}`)
      .pipe(map((people: People) => {
        people.id = parseInt(people.url.replace(/\D+/g, ''), 10);
        return people;
      }));
  }

  public listPeople(ids: number[]): Observable<People[]> {
    return new Observable((observer) => {
      const requests = ids.map((id: number) => this.getPeople(id));
      forkJoin(requests).subscribe((peoples: People[]) => {
        observer.next(peoples);
        observer.complete();
      });
    });
  }
}
