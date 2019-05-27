import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { RestService } from '../rest.service';
import { Users } from '../models/users.interface';
import { Offices } from '../models/office.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: Users[] = [];

  offices: Offices[] = [];

  currencies: string;

  constructor(private rest: RestService) { }

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
    console.log(value.currencies[0].code);
    this.currencies = value.currencies[0].code
  }


}
