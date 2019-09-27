import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Product } from '../product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
	config: any;// Для пагинации
	products: Product[];

	constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
		this.config = {
			currentPage: 1,
			itemsPerPage: 5,
			totalItems: 0
		};
		route.queryParams.subscribe(
			params => this.config.currentPage = params['page'] ? params['page'] : 1);
	}

	ngOnInit() {
		this.load();
	}
	load() {
		this.dataService.getProducts().subscribe((data: Product[]) => this.products = data);
	}
	//Метод пагинации
	pageChange(newPage: number) {
		this.router.navigate([''], { queryParams: { page: newPage } });
	}
	delete(id: number) {
		this.dataService.deleteProduct(id).subscribe(data => this.load());
	}
}