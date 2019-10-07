import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from './customer';
import { Product } from './product';


@Injectable()
export class DataService {

	private url = "/api/customers";
	private urlProduct = "/api/products";

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
	}
	
	deleteCustomer(id: number) {
		return this.http.delete(this.url + '/' + id);
	}

	//Работа с продуктами
	getProduct(id:number) {
		return this.http.get(this.urlProduct + '/' + id);
	}

	getProducts() {
		return this.http.get(this.urlProduct);
	}

	GetProductsMain(page: number, size = 2, order: string) {
		return this.http.get(`/api/products/GetProductsMain/${page}/${size}/${order}`);
	}
	getProductsCount() {
		return this.http.get(`/api/products/GetProductsCount/`);
	}

	createProduct(product: Product) {
		return this.http.post(this.urlProduct, product);
	}
	updateProduct(product: Product) {

		return this.http.put(this.urlProduct + '/' + product.id, product);
	}
	deleteProduct(id: number) {
		return this.http.delete(this.urlProduct + '/' + id);
	}
}