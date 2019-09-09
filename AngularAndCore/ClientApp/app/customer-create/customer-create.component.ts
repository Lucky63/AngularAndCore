import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Customer } from '../customer';

@Component({
	templateUrl: './customer-create.component.html'
})
export class CustomerCreateComponent {

	customer: Customer = new Customer();    // добавляемый объект
	constructor(private dataService: DataService, private router: Router) { }
	save() {
		this.dataService.createCustomer(this.customer).subscribe(data => this.router.navigateByUrl("/"));
	}
}