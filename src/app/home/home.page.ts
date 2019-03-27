import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

export interface Movie {
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

  constructor(
    private readonly router: Router,
    public alertController: AlertController
    ) {
  }

  getMovie(search: string): void {
    this.movies = search.length > 2 ? [{title: search, id: '1'}] : [];
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

}
