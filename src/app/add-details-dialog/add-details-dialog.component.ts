import { Component, Inject, OnInit, ViewEncapsulation, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { NgForm } from '@angular/forms';

import { Products } from '../models/products.interface';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-add-details-dialog',
  templateUrl: './add-details-dialog.component.html',
  styleUrls: ['./add-details-dialog.component.scss']
})
export class AddDetailsDialogComponent implements OnInit {
  description: string;
  onAdd = new EventEmitter();

  products: Products[] = [];

  arrayProd: object[];

  msg: any;

  constructor(
    private dialogRef: MatDialogRef<any>,
    private rest: RestService) {

  }

  ngOnInit() {
    this.showProducts();
    console.log(this.arrayProd);
  }

  showProducts(): void {
    this.rest.getProducts()
      .subscribe(data => {
        this.products = data;
      });
  }

  add(): void {
    if (this.arrayProd === undefined ) {
      this.msg = 'Please insert data';
      return this.msg;
    } else {
      console.log(this.arrayProd);
      this.onAdd.emit(this.arrayProd);
      this.dialogRef.close();
    }
  }

  close() {
    this.dialogRef.close();
  }

  register(form: NgForm): any {
    this.arrayProd = [
      {
        name: form.controls['product'].value,
        quantity: form.controls['quantity'].value,
        price: form.controls['price'].value
      }
    ]
  }



}
