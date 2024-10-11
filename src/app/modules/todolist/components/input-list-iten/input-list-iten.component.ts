import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { IListItens } from '../../interfaces/IListItens.interface';

@Component({
  selector: 'app-input-list-iten',
  standalone: true,
  imports: [],
  templateUrl: './input-list-iten.component.html',
  styleUrl: './input-list-iten.component.scss'
})
export class InputListItenComponent {
  @Input({ required: true }) public inputListItens: IListItens[] = [];

  @Output() public outputUpdateItemCheckbox = new EventEmitter<{
    id: string;
    checked: boolean;
  }>();
  public updateItemCheckbox(id: string, checked: boolean) {
    return this.outputUpdateItemCheckbox.emit({ id, checked });
  }

  @Output() public outputUpdateItemValue = new EventEmitter<{
    id: string;
    value: string;
  }>();
  public updateItemValue(id: string, value: string) {
    return this.outputUpdateItemValue.emit({ id, value });
  }


  @Output() public outputItenDelete = new EventEmitter<string>();
  public itenDelete(id: string) {
    return this.outputItenDelete.emit(id);
  }
}
