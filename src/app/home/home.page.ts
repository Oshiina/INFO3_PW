import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Movie {
  title: string;
  id: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  movies: Movie[] = [];

  constructor(private readonly router: Router) {
  }

  getMovie(search: string): void {
    this.movies = search.length > 2 ? [{title: 'search', id: '1'}] : [];
  }
}
