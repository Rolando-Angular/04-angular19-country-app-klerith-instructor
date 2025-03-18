import { Component, computed, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../../shared/components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { of } from 'rxjs';
import { CountryRequest } from '../../interfaces/country-request.interface';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  imports: [
    SearchInputComponent,
    CountryListComponent
  ],
})
export default class ByCountryPageComponent {

  public query = signal<string>('');
  public countries = computed<Country[] | undefined>(() => this.countryResource.value());

  public countryResource = rxResource<Country[], CountryRequest>({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
      return this.countryService.searchByCountry(request.query);
    },
  });

  private countryService = inject(CountryService);

  // public countryResource = resource<Country[], CountryRequest>({
  //   request: () => ({ query: this.query() }),
  //   loader: async ({ request }) => {
  //     if (!request.query) {
  //       return [];
  //     }
  //     return await firstValueFrom(this.countryService.searchByCountry(request.query));
  //   },
  // });


}
