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
  product: Products[] = [];

  constructor(
    private dialogRef: MatDialogRef<any>,
    private rest: RestService ) {

  }

  ngOnInit() {
    this.showProducts();
  }

  showProducts(): void {
    this.rest.getProducts()
    .subscribe(data => {
      this.products = data;
    });
  }

  add(): void {
    this.addProduct('hola');
    this.onAdd.emit(this.product);
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
  

  addProduct(value): void {
    this.product.push({
      Title: value,
      quantity: '',
      price: '',
      subtotal: ''
    });
  }

}
