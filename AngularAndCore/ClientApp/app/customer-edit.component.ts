import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from './data.service';
import { Customer } from './customer';

@Component({
	templateUrl: './customer-edit.component.html'
})
export class CustomerEditComponent implements OnInit {

	id: number;
	customer: Customer;    // изменяемый объект
	loaded: boolean = false;

	constructor(private dataService: DataService, private router: Router, activeRoute: ActivatedRoute) {
		this.id = Number.parseInt(activeRoute.snapshot.params["id"]);
	}

	ngOnInit() {
		if (this.id)
			this.dataService.getCustomer(this.id)
				.subscribe((data: Customer) => {
					this.customer = data;
					if (this.customer != null) this.loaded = true;
				});
	}

	save() {
		this.dataService.updateCustomer(this.customer).subscribe(data => this.router.navigateByUrl("/"));
	}
}