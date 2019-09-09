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
	
	
}