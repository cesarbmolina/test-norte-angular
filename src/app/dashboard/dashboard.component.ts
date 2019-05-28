import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";

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

  currencies: string;

  constructor(private rest: RestService, private dialog: MatDialog) { }

  ngOnInit() {
    this.showUser();
    this.showOffice();
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
    this.currencies = value.currencies[0].code
  }

  showProducts(): void {
    this.rest.getProducts()
    .subscribe(data => {
      this.products = data;
    });
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(AddDetailsDialogComponent, dialogConfig)
    .componentInstance.onAdd.subscribe((response) => {
      console.log(response);
    });
  }


}
