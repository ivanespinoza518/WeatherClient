import { Component } from '@angular/core';
import { Country } from './country';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss'
})
export class CountriesComponent {
  public countries: Country[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCountries();
  }

  getCountries() {
    this.http.get<Country[]>(environment.baseUrl + 'Countries').subscribe(
      {
        next: result => this.countries = result,
        error: error => console.error(error)
      }
    );
  }
}
