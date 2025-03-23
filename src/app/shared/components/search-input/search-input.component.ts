import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'shared-search-input',
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

  public placeholder = input<string>("Busqueda");
  public debounceTime = input<number>(300);
  public initialValue = input<string>('');
  public searchValue = output<string>();
  public inputValue = linkedSignal<string>(() => this.initialValue());

  public debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();
    console.log('entro effect: ' + value);

    const timeout = setTimeout(() => {
      this.searchValue.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });

}
