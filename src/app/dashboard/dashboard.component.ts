import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { NgForm } from '@angular/forms';

import { RestService } from '../rest.service';
import { Users } from '../models/users.interface';
import { Offices } from '../models/office.interface';
import { AddDetailsDialogComponent } from '../add-details-dialog/add-details-dialog.component';
import { Products } from '../models/products.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: Users[] = [];

  offices: Offices[] = [];

  products: Products[] = [];

  productData: any;

  currencies: string;

  totalItems: number = 0;

  dataService;

  user: Users;

  office: Offices;

  constructor(private rest: RestService, private dialog: MatDialog) { }

  ngOnInit() {
    this.showUser();
    this.showOffice();
    this.checkStorage('dataStorage');
  }

  showUser(): void {
    this.rest.getConfig().subscribe(data => {
      this.users = data;
    });
  }

  addUser() {
    let person = prompt("Please enter your name", "");
    if (person != null) {
      this.users.push({ name: person });
    }
  }

  showOffice(): void {
    this.rest.getCountry().subscribe(data => {
      this.offices = data;
    });
  }

  onOfficeChance(value: any) {    
    this.findOffice(value);
  }

  findOffice(nameOffice) {
    const arrayOffice = this.offices;
  
    const getArrayOffice = arrayOffice.find(data => data.name === nameOffice) as any;
  
    this.currencies = getArrayOffice.currencies[0].code;
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(AddDetailsDialogComponent, dialogConfig)
      .componentInstance.onAdd.subscribe((response) => {
        this.productData = response;
        this.addProduct();
      });
  }

  addProduct(): void {
    this.products.push({
      Title: this.productData[0].name,
      quantity: this.productData[0].quantity,
      price: this.productData[0].price,
      subtotal: this.productData[0].quantity * this.productData[0].price
    });

    this.totalItems = 0
    this.products.forEach(element => {
      this.totalItems = this.totalItems + element.subtotal;
    });

  }

  clearItems(i) {
    this.products.splice(i, 1);
    this.totalItems = 0
    this.products.forEach(element => {
      this.totalItems = this.totalItems + element.subtotal;
    });
  }

  save(form: NgForm): any {
    let saveData = [{
      client: form.controls['usuario'].value,
      office: form.controls['office'].value,
      currencies: this.currencies,
      dataDetail: this.products,
      total: this.totalItems
    }];

    localStorage.setItem('dataStorage', JSON.stringify(saveData));
  }

  checkStorage(value): void {
    if (localStorage.getItem('dataStorage')) {
      let sale = JSON.parse(localStorage.getItem('dataStorage'))[0];
      this.user = sale.client;
      this.office = sale.office;
      this.currencies = sale.currencies;
      this.totalItems = sale.total;

      sale.dataDetail.forEach(element => {
        this.products.push({
          Title: element.Title,
          quantity: element.quantity,
          price: element.price,
          subtotal: element.quantity * element.price
        });
      });



    }

  }


}
