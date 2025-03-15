import { Component, input, output } from '@angular/core';

@Component({
  selector: 'shared-search-input',
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

  public placeholder = input("Busqueda");
  public searchValue = output<string>();

}
