import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { MovieQuizzComponent } from './components/movie-quizz/movie-quizz.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HomeComponent, MovieQuizzComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CoreModule { }
