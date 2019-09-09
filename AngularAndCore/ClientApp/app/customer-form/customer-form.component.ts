import { Component, Input } from '@angular/core';
import { Customer } from '../customer';
import { Product } from '../product';
import { DataService } from '../data.service';


@Component({
	selector: "customer-form",
	templateUrl: './customer-form.component.html'
})
export class CustomerFormComponent {
	@Input() customer: Customer;
	products: Product[];
	constructor(private dataService: DataService) { }

	ngOnInit() {
		this.load();
	}
	load() {
		this.dataService.getProducts().subscribe((data: Product[]) => this.products = data);
	}
	
}