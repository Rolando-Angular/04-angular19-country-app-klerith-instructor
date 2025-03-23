import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import type { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-information',
  templateUrl: './country-information.component.html',
  imports: [
    DecimalPipe,
  ]
})
export class CountryInformationComponent {

  public country = input.required<Country>();

}
