import { Routes } from '@angular/router';
import { HelloComponent } from './hello/hello.component';
import { CountriesComponent } from './countries/countries.component';
import { CitiesComponent } from './cities/cities.component';
import { CountryCitiesComponent } from './countries/country-cities.component';
import { LoginComponent } from './auth/login.component';

export const routes: Routes = [
    { path : '', component : HelloComponent, pathMatch : 'full' },
    { path : 'login', component: LoginComponent },
    { path : 'countries', component: CountriesComponent },
    { path : 'cities', component: CitiesComponent },
    { path : 'countryCities/:id', component: CountryCitiesComponent }
];
