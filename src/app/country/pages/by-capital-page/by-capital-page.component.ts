import { Component, computed, inject, linkedSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { Country } from '../../interfaces/country.interface';
import { CountryRequest } from '../../interfaces/country-request.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  imports: [
    CountryListComponent,
    SearchInputComponent,
  ],
})
export class ByCapitalPageComponent {

  public countries = computed<Country[]>(() => this.countryResource.value() ?? []);

  public countryResource = rxResource<Country[], CountryRequest>({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      console.log(`entro a resource: ${request.query}`);
      const query: string = request.query;
      if (!query) {
        return of([]);
      }

      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query,
        }
      })

      return this.countryService.searchByCapital(query);
    },
  });

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  public queryParam: string = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  public query = linkedSignal<string>(() => this.queryParam);

  private countryService = inject(CountryService);

  // public isLoading = signal(false);
  // public hasError = signal<string | null>(null);
  // public countries = signal<Country[]>([]);

  // public onSearch(query: string): void {
  //   if (this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.hasError.set(null);

  //   this.countryService.searchByCapital(query)
  //     .subscribe({
  //       next: (countries) => {
  //         this.isLoading.set(false);
  //         this.countries.set(countries);
  //       },
  //       error: (err) => {
  //         this.isLoading.set(false);
  //         this.hasError.set(err);
  //         this.countries.set([]);
  //       }
  //     });
  // }

}
