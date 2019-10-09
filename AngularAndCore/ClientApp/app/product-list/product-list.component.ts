import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Product } from '../product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
	
	products: Product[];
	TotalPage: number[] = [];//Общее количество страниц
	page: number = 1;
	size: number = 5;
	order: string = '';
	reverse: boolean = false;

	constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {}

	ngOnInit() {
		this.load();
	}

	load() {
		this.dataService.GetProductsMain(this.page, this.size, this.order).subscribe((data: Product[]) => this.products = data);
		this.dataService.getProductsTotalPage().subscribe((data: number[]) => this.TotalPage = data);
	}
	
	delete(id: number) {
		this.dataService.deleteProduct(id).subscribe(data => this.load());
	}

	//Следующая страница
	nextBut(num: number) {
		if (num < (this.TotalPage.length) + 1) {
			this.dataService.GetProductsMain(num, this.size, this.order).subscribe((data: Product[]) => this.products = data);
			this.page = num;
		}
	}

	//Предидущая страница
	prevButAndAll(numprev: number) {
		if (numprev > 0) {
			this.dataService.GetProductsMain(numprev, this.size, this.order).subscribe((data: Product[]) => this.products = data);
			this.page = numprev;
		}
	}

	endpage(set: number) {		
		this.dataService.GetProductsMain(set, this.size, this.order).subscribe((data: Product[]) => this.products = data);
		this.page = set;
	}

	//Сортировка
	setOrderName(value: boolean) {
		if (value === false) {
			this.reverse = true;
			this.dataService.GetProductsMain(this.page, this.size, 'NameDesc').subscribe((data: Product[]) => this.products = data);
			this.order = 'NameDesc';
		}
		if (value === true) {
			this.reverse = false;
			this.dataService.GetProductsMain(this.page, this.size, 'Name').subscribe((data: Product[]) => this.products = data);
			this.order = 'Name';
		}

	}

	setOrderDescription(value: boolean) {
		if (value === false) {
			this.reverse = true;
			this.dataService.GetProductsMain(this.page, this.size, 'DescriptionDesc').subscribe((data: Product[]) => this.products = data);
			this.order = 'DescriptionDesc';
		}
		if (value === true) {
			this.reverse = false;
			this.dataService.GetProductsMain(this.page, this.size, 'Description').subscribe((data: Product[]) => this.products = data);
			this.order = 'Description';
		}

	}

	setOrderPrice(value: boolean) {
		if (value === false) {
			this.reverse = true;
			this.dataService.GetProductsMain(this.page, this.size, 'PriceDesc').subscribe((data: Product[]) => this.products = data);
			this.order = 'PriceDesc';
		}
		if (value === true) {
			this.reverse = false;
			this.dataService.GetProductsMain(this.page, this.size, 'Price').subscribe((data: Product[]) => this.products = data);
			this.order = 'Price';
		}

	}
}