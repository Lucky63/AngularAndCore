import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Customer } from '../customer';
import { CustomerViewModel } from '../customerViewModel';

@Component({
	templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit {

	customers: CustomerViewModel[];
	constructor(private dataService: DataService) { }

	ngOnInit() {
		this.load();
	}
	load() {
		this.dataService.getCustomers().subscribe((data: CustomerViewModel[]) => this.customers = data);
	}
	delete(id: number) {
		this.dataService.deleteCustomer(id).subscribe(data => this.load());
	}
}