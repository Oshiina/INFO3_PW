import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';


import { apiKey } from '../../tmdb';

export interface Movie {
backdrop_path: string;
id: number;
overview: string;
poster_path: string;
release_date: string;
title: string;
}

interface TMDBReponse {
  results: Movie[];
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  movies: Promise<Movie[]>;

  constructor(
    private readonly router: Router,
    public alertController: AlertController,
    private readonly http: HttpClient
    ) {
      this.getMovie('');
  }

  getMovie(search: string): void {
    this.movies = search.length > 2 ? this.searchMovies(search) : Promise.resolve([]);
  }

  showDetails(movie: Movie): void {
    this.router.navigate(['/details'], { state: {movie} });
  }

  async buttonAlerte() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });
    return await alert.present();
  }

  private async askTMDB(api: string, params: object): Promise<Movie[]> {
    const { results } = await this.http.get<TMDBReponse>(
      `https://api.themoviedb.org/3/${api}/movie`,
      { params: { api_key: apiKey, ...params } }
    ).toPromise();
    return results;
    }

  private searchMovies(search: string): Promise<Movie[]> {
    return this.askTMDB('search', { query: search });
  }

}
