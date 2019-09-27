import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Customer } from '../customer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit {
	config: any;// Для пагинации
	customers: Customer[];
	constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
		this.config = {
			currentPage: 1,
			itemsPerPage: 5,
			totalItems: 0
		};
		this.route.queryParams.subscribe(
			params => this.config.currentPage = params['page'] ? params['page'] : 1);
	}

	ngOnInit() {
		this.load();
	}
	load() {
		this.dataService.getCustomers().subscribe((data: Customer[]) => this.customers = data);
	}
	//Метод пагинации
	pageChange(newPage: number) {
		this.router.navigate([''], { queryParams: { page: newPage } });
	}
	delete(id: number) {
		this.dataService.deleteCustomer(id).subscribe(data => this.load());
	}
}