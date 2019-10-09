import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Customer } from '../customer';
import { Product } from '../product';

@Component({
	templateUrl: './customer-edit.component.html'
})
export class CustomerEditComponent implements OnInit {

	id: number;
	customer: Customer;    // изменяемый объект
	allproducts: Product[];	
	loaded: boolean = false;

	constructor(private dataService: DataService, private router: Router, activeRoute: ActivatedRoute) {
		this.id = Number.parseInt(activeRoute.snapshot.params["id"]);
	}

	ngOnInit() {
		if (this.id)
			this.dataService.getCustomer(this.id).subscribe((data: Customer) => {
				this.customer = data;
					if (this.customer != null) this.loaded = true;
			});
		this.dataService.getProducts().subscribe((data: Product[]) => this.allproducts = data);		
	}	

	save(productid: number, productDel: number) {
		if (productDel != null) {
			this.customer.products.push(new Product(productDel));
		}
		if (productid != null && productid != productDel)
			this.customer.products.push(new Product(productid));
		this.dataService.updateCustomer(this.customer).subscribe(data => this.router.navigateByUrl("/"));		
	}
}