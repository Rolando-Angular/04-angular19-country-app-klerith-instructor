import { Component } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  imports: [
    CountryListComponent,
    SearchInputComponent,
  ],
})
export class ByCapitalPageComponent {

  public onSearch(value: string): void {
    console.log({ value });
  }

}
