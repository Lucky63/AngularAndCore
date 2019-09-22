import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Customer } from '../customer';
import { Product } from '../product';
import { CustomerProduct } from '../customerproduct';
import { CustomerViewModel } from '../customerViewModel';
import { ProductViewModel } from '../productViewModel';

@Component({
	templateUrl: './customer-edit.component.html'
})
export class CustomerEditComponent implements OnInit {

	id: number;
	customer: CustomerViewModel;    // изменяемый объект
	allproducts: Product[];
	
	num: number[];
	
	loaded: boolean = false;

	constructor(private dataService: DataService, private router: Router, activeRoute: ActivatedRoute) {
		this.id = Number.parseInt(activeRoute.snapshot.params["id"]);
	}

	ngOnInit() {
		if (this.id)
			this.dataService.getCustomer(this.id).subscribe((data: CustomerViewModel) => {
				this.customer = data, this.customer.products=data.products;
					if (this.customer != null) this.loaded = true;
			});
		this.dataService.getProducts().subscribe((data: Product[]) => this.allproducts = data);

		for (let i of this.customer.products) {
			this.num.push(i.productid);
		}
		
	}
	

	save(productid: number, productDel: number) {
		if (productDel != null) {
			var pos = this.num.indexOf(productDel);
			this.customer.products.slice(pos, 1);
		}
		if (productid != null)
			this.customer.products.push(new ProductViewModel(productid));
		this.dataService.updateCustomer(this.customer).subscribe(data => this.router.navigateByUrl("/"));
		
		
	}
}