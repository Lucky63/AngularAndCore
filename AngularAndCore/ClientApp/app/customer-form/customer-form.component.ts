import { Component, Input } from '@angular/core';
import { Customer } from '../customer';


@Component({
	selector: "customer-form",
	templateUrl: './customer-form.component.html'
})
export class CustomerFormComponent {
	@Input() customer: Customer;
	
}