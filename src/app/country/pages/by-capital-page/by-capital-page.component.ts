import { Component, computed, inject, resource, ResourceStatus, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  imports: [
    CountryListComponent,
    SearchInputComponent,
  ],
})
export class ByCapitalPageComponent {

  public query = signal('');
  public countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
      if (!request.query) {
        return [];
      }

      return await firstValueFrom(
        this.countryService.searchByCapital(request.query)
      );
    }
  });
  public countries = computed<Country[] | undefined>(() => this.countryResource.value());
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
