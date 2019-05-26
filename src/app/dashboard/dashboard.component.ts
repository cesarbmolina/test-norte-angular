import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  listUser: any;
  users: string;

  listoffice: any;
  offices: any;

  constructor(private rest: RestService) { }

  ngOnInit() {
    this.showUser();
    this.showOffice();
  }

  showUser(): void {
    this.listUser = this.rest.getConfig();
    this.listUser.subscribe(data => {
      this.users = data;
    });
  }


  showOffice(): void {
    this.listoffice = this.rest.getCountry();
    this.listoffice.subscribe(data => {
      this.offices = data;
    });
  }


  

}
