import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Inject, Input, Output, ViewChild } from '@angular/core';
import { IListItens } from '../../interfaces/IListItens.interface';
import { JsonPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [JsonPipe, NgClass],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {

  #cdr = inject(ChangeDetectorRef)

  @ViewChild('inputText') public inputText!: ElementRef

  @Input({required: true}) public inputListItens:IListItens[] = []

  @Output() public outputAddListItem = new EventEmitter<IListItens>()
  public focusAndAddIten(value: string) {

    if (value) {
      this.#cdr.detectChanges()
      this.inputText.nativeElement.value = ''
      const ID = `${new Date().getTime()}`

      this.outputAddListItem.emit({
        id: ID,
        checked: false,
        value
      })
    }

    return this.inputText.nativeElement.focus()

  }

}
