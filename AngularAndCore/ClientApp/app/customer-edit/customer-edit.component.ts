import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Customer } from '../customer';
import { Product } from '../product';
import { CustomerProduct } from '../customerproduct';

@Component({
	templateUrl: './customer-edit.component.html'
})
export class CustomerEditComponent implements OnInit {

	id: number;
	customer: Customer;    // изменяемый объект
	products: CustomerProduct[];
	//product: Product;
	//cp: CustomerProduct;
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
		this.dataService.getProducts().subscribe((data: CustomerProduct[]) => this.products = data);
		
		
	}
	

	save() {
		
		this.customer.customerProducts=this.products;
		this.dataService.updateCustomer(this.customer).subscribe(data => this.router.navigateByUrl("/"));
		
		
	}
}