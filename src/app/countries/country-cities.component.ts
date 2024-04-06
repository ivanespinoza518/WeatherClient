import { Component } from '@angular/core';
import { City } from './city';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-country-cities',
  standalone: true,
  imports: [
    MatTableModule
  ],
  templateUrl: './country-cities.component.html',
  styleUrl: './country-cities.component.scss'
})
export class CountryCitiesComponent {
  public cities: City[] = [];
  public id: number;
  public displayedColumns: string[] = [
    "cityId",
    "name",
    "latitude",
    "longitude",
    "population"
  ];

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.id = -1;
  }

  ngOnInit() {
    this.getCities();
  }

  getCities() {
    let idParam = this.activatedRoute.snapshot.paramMap.get("id");
    this.id = idParam ? +idParam : -1;
    this.http.get<City[]>(`${environment.baseUrl}Countries/CountryCities/${this.id}`).subscribe(
      {
        next: result => this.cities = result,
        error: error => console.error(error)
      }
    );
  }
}
