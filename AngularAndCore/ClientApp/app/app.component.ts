import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Customer } from './customer';

@Component({
	selector: 'app',
	templateUrl: './app.component.html',
	providers: [DataService]
})
export class AppComponent implements OnInit {

	customer: Customer = new Customer();   // изменяемый товар
	customers: Customer[];                // массив товаров
	tableMode: boolean = true;          // табличный режим

	constructor(private dataService: DataService) { }

	ngOnInit() {
		this.loadCustomers();    // загрузка данных при старте компонента  
	}
	// получаем данные через сервис
	loadCustomers() {
		this.dataService.getCustomers()
			.subscribe((data: Customer[]) => this.customers = data);
	}
	// сохранение данных
	save() {
		if (this.customer.id == null) {
			this.dataService.createCustomer(this.customer)
				.subscribe((data: Customer) => this.customers.push(data));
		} else {
			this.dataService.updateCustomer(this.customer)
				.subscribe(data => this.loadCustomers());
		}
		this.cancel();
	}
	editCustomer(c: Customer) {
		this.customer = c;
	}
	cancel() {
		this.customer = new Customer();
		this.tableMode = true;
	}
	delete(c: Customer) {
		this.dataService.deleteCustomer(c.id)
			.subscribe(data => this.loadCustomers());
	}
	add() {
		this.cancel();
		this.tableMode = false;
	}
}