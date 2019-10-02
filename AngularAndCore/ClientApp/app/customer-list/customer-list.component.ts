import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Customer } from '../customer';
import { PageComp } from '../page';

@Component({
	templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit {
	
	allcomp: PageComp;
	customersList: Customer[];
	totalpage: number;
	page: number = 1;
	

	constructor(private dataService: DataService) {}

	ngOnInit() {
		this.load();
		
		
	}
	load() {
		this.dataService.getCustomers(this.page).subscribe((data: Customer[]) => this.customersList = data);
		this.dataService.getCustomersCount().subscribe((data: number) => this.totalpage = data);
	}

	

	delete(id: number) {
		this.dataService.deleteCustomer(id).subscribe(data => this.load());
	}
	next(num: number) {
		if (num < this.totalpage) {
			this.dataService.getCustomers(num).subscribe((data: Customer[]) => this.customersList = data);
			this.page = num;	
		}
			
	}
	prev(numprev: number) {
		if (numprev > 0) {
			this.dataService.getCustomers(numprev).subscribe((data: Customer[]) => this.customersList = data);
			this.page = numprev;
		}
		
	}
}