import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

import { Products } from '../models/products.interface';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-add-details-dialog',
  templateUrl: './add-details-dialog.component.html',
  styleUrls: ['./add-details-dialog.component.scss']
})
export class AddDetailsDialogComponent implements OnInit {
  form: FormGroup;
  description: string;

  products: Products[] = [];

  constructor(
    private dialogRef: MatDialogRef<any>,
    private fb: FormBuilder,
    private rest: RestService ) {

    this.description = '';


    this.form = fb.group({
    });

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

  add() {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

}
