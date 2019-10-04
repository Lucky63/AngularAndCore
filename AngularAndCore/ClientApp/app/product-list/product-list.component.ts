import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Product } from '../product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
	
	products: Product[];
	count: number;//Общее количество строк
	page: number = 1;
	size: number = 2;

	constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
		
	}

	ngOnInit() {
		this.load();
	}
	load() {
		this.dataService.getProductsPagin(this.page, this.size).subscribe((data: Product[]) => this.products = data);
		this.dataService.getProductsCount().subscribe((data: number) => this.count = data);
	}
	
	delete(id: number) {
		this.dataService.deleteProduct(id).subscribe(data => this.load());
	}

	//Следующая страница
	next(num: number) {
		if (num < (this.count / this.size) + 1) {
			this.dataService.getProductsPagin(num, this.size).subscribe((data: Product[]) => this.products = data);
			this.page = num;
		}
	}

	//Предидущая страница
	prev(numprev: number) {
		if (numprev > 0) {
			this.dataService.getCustomers(numprev, this.size).subscribe((data: Product[]) => this.products = data);
			this.page = numprev;
		}
	}

	endpage(set: number) {
		var rounded = parseFloat((set + (this.count / this.size)).toFixed());//Округляю число
		this.dataService.getCustomers(rounded, this.size).subscribe((data: Product[]) => this.products = data);
		this.page = rounded;
	}
}