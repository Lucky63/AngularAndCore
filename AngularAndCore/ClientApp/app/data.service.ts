import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from './customer';
import { Product } from './product';


@Injectable()
export class DataService {

	private url = "/api/customers";
	private url1 = "/api/products";

	constructor(private http: HttpClient) {
	}
	getCustomer(id: number) {
		return this.http.get(this.url + '/' + id);
	}

	getCustomers(page: number, size = 2, order:string) {
		return this.http.get(`api/customers/GetCustomers/${page}/${size}/${order}`);
	}
	getCustomersCount() {
		return this.http.get(this.url);
	}
	createCustomer(customer: Customer) {
		return this.http.post(this.url, customer);
	}
	updateCustomer(customer: Customer) {

		return this.http.put(this.url + '/' + customer.id, customer, { responseType: 'text' });
		//	pipe(
		//	map((res: string) => {
		//		try {
		//			return JSON.parse(res);
		//		} catch {
		//			return null;
		//		}
		//}));
	}
	
	deleteCustomer(id: number) {
		return this.http.delete(this.url + '/' + id);
	}

	//Работа с продуктами
	getProduct(id:number) {
		return this.http.get(this.url1 + '/' + id);
	}

	getProducts() {
		return this.http.get(this.url1);
	}

	getProductsPagin(page: number, size = 2) {
		return this.http.get(`/api/products/GetProductsPagin/${page}/${size}`);
	}
	getProductsCount() {
		return this.http.get(`/api/products/GetProductsCount/`);
	}

	createProduct(product: Product) {
		return this.http.post(this.url1, product);
	}
	updateProduct(product: Product) {

		return this.http.put(this.url1 + '/' + product.id, product);
	}
	deleteProduct(id: number) {
		return this.http.delete(this.url1 + '/' + id);
	}
}