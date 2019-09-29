import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Customer } from '../customer';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
	templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit {
	// Для пагинации
	config: any;
	//////////////////////////

	customers: Customer[];//Список клиентов

	//Для сортировки
	order: string = 'name';
	reverse: boolean = false;
	sortedCollection: any[];
	///////////////////////////////////////////////

	constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router, private orderPipe: OrderPipe) {
		//Для сортировки
		this.config = {
			currentPage: 1,
			itemsPerPage: 5,
			totalItems: 0			
		};		
		this.sortedCollection = orderPipe.transform(this.customers, 'name');
		console.log(this.sortedCollection);
		//////////////

		// Для пагинации
		this.route.queryParams.subscribe(
			params => this.config.currentPage = params['page'] ? params['page'] : 1);
		//////////////////////
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
	//Метод сортировки
	setOrder(value: string) {
		if (this.order === value) {
			this.reverse = !this.reverse;
		}

		this.order = value;
	}
	delete(id: number) {
		this.dataService.deleteCustomer(id).subscribe(data => this.load());
	}
}