import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'shared-search-input',
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

  public placeholder = input<string>("Busqueda");
  public debounceTime = input<number>(300);
  public searchValue = output<string>();
  public inputValue = signal<string>('');

  public debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.searchValue.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });

}
