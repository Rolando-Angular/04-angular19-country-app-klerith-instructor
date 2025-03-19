import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

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
