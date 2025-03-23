import { Component, computed, inject, linkedSignal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import type { RegionSearch } from '../../interfaces/region.interface';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import type { CountryRequest } from '../../interfaces/country-request.interface';
import type { Country } from '../../interfaces/country.interface';
import { of } from 'rxjs';
import type { Region } from '../../interfaces/region.type';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string): Region {
  const queryParamLower = queryParam.toLowerCase();
  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antartic: 'Antarctic',
  };

  return validRegions[queryParamLower] ?? 'Americas';
}

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  imports: [
    CountryListComponent,
  ],
})
export default class ByRegionPageComponent {

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
      const query: Region = validateQueryParam(request.query);
      if (!query) {
        return of([]);
      }

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          query,
        }
      }
      );

      return this.countryService.searchByRegion(query);
    },
  });
  public countries = computed<Country[]>(() => this.countryResource.value() ?? []);

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  public queryParam: string = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  public selectedRegionSearch = linkedSignal<Region>(() => validateQueryParam(this.queryParam));

  private countryService = inject(CountryService);

}
