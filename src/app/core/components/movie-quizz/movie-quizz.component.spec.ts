import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieQuizzComponent } from './movie-quizz.component';

describe('MovieQuizzComponent', () => {
  let component: MovieQuizzComponent;
  let fixture: ComponentFixture<MovieQuizzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieQuizzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
