import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from './customer';

@Injectable()
export class DataService {

	private url = "/api/customers";

	constructor(private http: HttpClient) {
	}

	getCustomers() {
		return this.http.get(this.url);
	}

	createCustomer(customer: Customer) {
		return this.http.post(this.url, customer);
	}
	updateCustomer(customer: Customer) {

		return this.http.put(this.url + '/' + customer.id, customer);
	}
	deleteCustomer(id: number) {
		return this.http.delete(this.url + '/' + id);
	}
}