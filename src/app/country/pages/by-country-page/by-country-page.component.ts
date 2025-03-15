import { Component } from '@angular/core';
import { SearchInputComponent } from "../../../shared/components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  imports: [
    SearchInputComponent,
    CountryListComponent
  ],
})
export default class ByCountryPageComponent {

  public onSearch(value: string): void {
    console.log({ value });
  }

}
