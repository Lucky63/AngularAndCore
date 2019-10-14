import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Customer } from '../customer';
import { IndexViewModel } from '../indexViewModel';


@Component({
	templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit {
	
	allcomp: IndexViewModel;
	customersList: Customer[];
	totalPage: number[]=[];//Общее количество страниц
	page: number = 1;//Первая страница
	size: number = 5;//Количество строк на странице
	order: string = '';
	reverse: boolean = false;
	

	constructor(private dataService: DataService) {}

	ngOnInit() {
		this.load();		
	}

	load() {
		this.dataService.getCustomers(this.page, this.size, this.order).subscribe((data: IndexViewModel) => { this.customersList = data.customers; this.totalPage = data.totalPage});				
	}	

	delete(id: number) {
		this.dataService.deleteCustomer(id).subscribe(data => this.load());
	}
	//Следующая страница
	nextBut(num: number) {
		if (num < (this.totalPage.length) + 1) {
			this.dataService.getCustomers(num, this.size, this.order).subscribe((data: IndexViewModel) => this.customersList = data.customers);
			this.page = num;	
		}			
	}
	//Предидущая страница
	prevButAndAll(numprev: number) {
		if (numprev > 0) {
			this.dataService.getCustomers(numprev, this.size, this.order).subscribe((data: IndexViewModel) => this.customersList = data.customers);
			this.page = numprev;
		}		
	}

	endpage(set: number) {		
		
		this.dataService.getCustomers(set, this.size, this.order).subscribe((data: IndexViewModel) => this.customersList = data.customers);
		this.page = set;
	}
	//Сортировка
	setOrderName(value: boolean) {
		if (value === false) {
			this.reverse = true;
			this.dataService.getCustomers(this.page, this.size, 'NameDesc').subscribe((data: IndexViewModel) => this.customersList = data.customers);
			this.order = 'NameDesc';
		}
		if (value === true) {
			this.reverse = false;
			this.dataService.getCustomers(this.page, this.size, 'Name').subscribe((data: IndexViewModel) => this.customersList = data.customers);
			this.order = 'Name';
		}
		
	}

	setOrderPhone(value: boolean) {
		if (value === false) {
			this.reverse = true;
			this.dataService.getCustomers(this.page, this.size, 'PhoneNumberDesc').subscribe((data: IndexViewModel) => this.customersList = data.customers);
			this.order = 'PhoneNumberDesc';
		}
		if (value === true) {
			this.reverse = false;
			this.dataService.getCustomers(this.page, this.size, 'PhoneNumber').subscribe((data: IndexViewModel) => this.customersList = data.customers);
			this.order = 'PhoneNumber';
		}

	}
	setOrderAddress(value: boolean) {
		if (value === false) {
			this.reverse = true;
			this.dataService.getCustomers(this.page, this.size, 'AddressDesc').subscribe((data: IndexViewModel) => this.customersList = data.customers);
			this.order = 'AddressDesc';
		}
		if (value === true) {
			this.reverse = false;
			this.dataService.getCustomers(this.page, this.size, 'Address').subscribe((data: IndexViewModel) => this.customersList = data.customers);
			this.order = 'Address';
		}

	}

}