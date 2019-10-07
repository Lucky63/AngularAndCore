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
	size: number = 5;
	order: string = '';
	reverse: boolean = false;

	constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
		
	}

	ngOnInit() {
		this.load();
	}
	load() {
		this.dataService.GetProductsMain(this.page, this.size, this.order).subscribe((data: Product[]) => this.products = data);
		this.dataService.getProductsCount().subscribe((data: number) => this.count = data);
	}
	
	delete(id: number) {
		this.dataService.deleteProduct(id).subscribe(data => this.load());
	}

	//Следующая страница
	next(num: number) {
		if (num < (this.count / this.size) + 1) {
			this.dataService.GetProductsMain(num, this.size, this.order).subscribe((data: Product[]) => this.products = data);
			this.page = num;
		}
	}

	//Предидущая страница
	prev(numprev: number) {
		if (numprev > 0) {
			this.dataService.GetProductsMain(numprev, this.size, this.order).subscribe((data: Product[]) => this.products = data);
			this.page = numprev;
		}
	}

	endpage(set: number) {
		var rounded = parseFloat((set + (this.count / this.size)).toFixed());//Округляю число
		this.dataService.GetProductsMain(rounded, this.size, this.order).subscribe((data: Product[]) => this.products = data);
		this.page = rounded;
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

	setOrderPhone(value: boolean) {
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
	setOrderAddress(value: boolean) {
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