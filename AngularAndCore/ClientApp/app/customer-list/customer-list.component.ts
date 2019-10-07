import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Customer } from '../customer';


@Component({
	templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit {
	
	//allcomp: PageComp;
	customersList: Customer[];
	count: number;//Общее количество строк
	page: number = 1;//Первая страница
	size: number = 5;//Количество строк на странице
	order: string = '';
	reverse: boolean = false;
	

	constructor(private dataService: DataService) {}

	ngOnInit() {
		this.load();
		
		
	}
	load() {
		this.dataService.getCustomers(this.page, this.size, this.order).subscribe((data: Customer[]) => this.customersList = data);
		this.dataService.getCustomersCount().subscribe((data: number) => this.count = data);
		
	}

	

	delete(id: number) {
		this.dataService.deleteCustomer(id).subscribe(data => this.load());
	}
	//Следующая страница
	next(num: number) {
		if (num < (this.count / this.size) + 1) {
			this.dataService.getCustomers(num, this.size, this.order).subscribe((data: Customer[]) => this.customersList = data);
			this.page = num;	
		}			
	}
	//Предидущая страница
	prev(numprev: number) {
		if (numprev > 0) {
			this.dataService.getCustomers(numprev, this.size, this.order).subscribe((data: Customer[]) => this.customersList = data);
			this.page = numprev;
		}		
	}

	endpage(set: number) {		
		var rounded = parseFloat((set + (this.count / this.size)).toFixed());//Округляю число
		this.dataService.getCustomers(rounded, this.size, this.order).subscribe((data: Customer[]) => this.customersList = data);
		this.page = rounded;
	}
	//Сортировка
	setOrderName(value: boolean) {
		if (value === false) {
			this.reverse = true;
			this.dataService.getCustomers(this.page, this.size, 'NameDesc').subscribe((data: Customer[]) => this.customersList = data);
			this.order = 'NameDesc';
		}
		if (value === true) {
			this.reverse = false;
			this.dataService.getCustomers(this.page, this.size, 'Name').subscribe((data: Customer[]) => this.customersList = data);
			this.order = 'Name';
		}
		
	}
	setOrderPhone(value: boolean) {
		if (value === false) {
			this.reverse = true;
			this.dataService.getCustomers(this.page, this.size, 'PhoneNumberDesc').subscribe((data: Customer[]) => this.customersList = data);
			this.order = 'PhoneNumberDesc';
		}
		if (value === true) {
			this.reverse = false;
			this.dataService.getCustomers(this.page, this.size, 'PhoneNumber').subscribe((data: Customer[]) => this.customersList = data);
			this.order = 'PhoneNumber';
		}

	}
	setOrderAddress(value: boolean) {
		if (value === false) {
			this.reverse = true;
			this.dataService.getCustomers(this.page, this.size, 'AddressDesc').subscribe((data: Customer[]) => this.customersList = data);
			this.order = 'AddressDesc';
		}
		if (value === true) {
			this.reverse = false;
			this.dataService.getCustomers(this.page, this.size, 'Address').subscribe((data: Customer[]) => this.customersList = data);
			this.order = 'Address';
		}

	}

}