import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { CountryMapper } from '../../mappers/country.mapper';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  imports: [
    CountryListComponent,
    SearchInputComponent,
  ],
})
export class ByCapitalPageComponent {

  private countryService = inject(CountryService);
  public isLoading = signal(false);
  public hasError = signal<string | null>(null);
  public countries = signal<Country[]>([]);

  public onSearch(query: string): void {
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.hasError.set(null);
    this.countryService.searchByCapital(query)
      .subscribe((countries) => {
        this.isLoading.set(false);
        this.countries.set(countries);
      });
  }

}
