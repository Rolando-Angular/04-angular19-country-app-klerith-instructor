import { Component, computed, inject, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { RegionSearch } from '../../interfaces/region.interface';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryRequest } from '../../interfaces/country-request.interface';
import { Country } from '../../interfaces/country.interface';
import { of } from 'rxjs';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  imports: [
    CountryListComponent,
  ],
})
export default class ByRegionPageComponent {

  public selectedRegionSearch = signal<Region>('');
  public regionsSearch: RegionSearch[] = [
    { category: 'Africa', style: 'btn-primary', isActive: false },
    { category: 'Americas', style: 'btn-secondary', isActive: false },
    { category: 'Asia', style: 'btn-accent', isActive: false },
    { category: 'Europe', style: 'btn-info', isActive: false },
    { category: 'Oceania', style: 'btn-success', isActive: false },
    { category: 'Antarctic', style: 'btn-warning', isActive: false },
  ];
  public countryResource = rxResource<Country[], CountryRequest>({
    request: () => ({ query: this.selectedRegionSearch() }),
    loader: ({ request }) => {
      const query = request.query as Region;
      if (!query) {
        return of([]);
      }
      return this.countryService.searchByRegion(query);
    },
  });
  public countries = computed<Country[]>(() => this.countryResource.value() ?? []);

  private countryService = inject(CountryService);

}
