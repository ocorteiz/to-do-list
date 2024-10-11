import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from "../../components/input-add-item/input-add-item.component";
import { IListItens } from '../../interfaces/IListItens.interface';
import { JsonPipe } from '@angular/common';
import { InputListItenComponent } from '../../components/input-list-iten/input-list-iten.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputAddItemComponent, InputListItenComponent, JsonPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public addButton = signal(true)

  #parseItens() {
    return JSON.parse(localStorage.getItem("@my-list") || "[]")
  }

  #setListItens = signal<IListItens[]>(this.#parseItens())
  public getListItens = this.#setListItens.asReadonly()

  public getInputAndIten(value: IListItens) {
    localStorage.setItem("@my-list", JSON.stringify([...this.#setListItens(), value]))

    return this.#setListItens.set(this.#parseItens())
  }

  public deleteAllItens() {
    Swal.fire({
      title: "Você tem certeza?",
      text: "Você não podera reverter isso",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#2fbf71",
      confirmButtonText: "Sim, delete todos os itens"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("@my-list");
        return this.#setListItens.set(this.#parseItens())
      }
    });
  }

  public listItensStage(value: "pending" | "completed") {
    return this.getListItens().filter((res: IListItens) => {

      if (value === "pending") {
        return !res.checked;
      }

      if (value === "completed") {
        return res.checked;
      }

      return res;
    })
  }

  public updateItenChecked(newIten: { id: string, checked: boolean }) {
    this.#setListItens.update((oldValue: IListItens[]) => {
      oldValue.filter((res) => {

        if (res.id === newIten.id) {
          res.checked = newIten.checked
          return res
        }

        return res
      })

      return oldValue;
    });

    return localStorage.setItem("@my-list", JSON.stringify(this.#setListItens()))
  }

  public updateItenValue(newIten: { id: string, value: string }) {
    this.#setListItens.update((oldValue: IListItens[]) => {
      oldValue.filter((res) => {

        if (res.id === newIten.id) {
          res.value = newIten.value
          return res
        }

        return res
      })

      return oldValue;
    });

    return localStorage.setItem("@my-list", JSON.stringify(this.#setListItens()))
  }

  public itemDelete(id: string) {
    Swal.fire({
      title: "Você tem certeza?",
      text: "Você não podera reverter isso",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#2fbf71",
      confirmButtonText: "Sim, delete este item"
    }).then((result) => {
      if (result.isConfirmed) {
        this.#setListItens.update((oldValue: IListItens[]) => {
          return oldValue.filter((res) => res.id !== id)
        });

        return localStorage.setItem("@my-list", JSON.stringify(this.#setListItens()))
      }
    });
  }


}
