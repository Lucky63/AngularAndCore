var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { DataService } from '../data.service';
var ProductListComponent = /** @class */ (function () {
    function ProductListComponent(dataService) {
        this.dataService = dataService;
        this.totalPage = []; //Общее количество страниц
        this.page = 1;
        this.size = 5;
        this.order = '';
        this.reverse = false;
    }
    ProductListComponent.prototype.ngOnInit = function () {
        this.load();
    };
    ProductListComponent.prototype.load = function () {
        var _this = this;
        this.dataService.GetProductsMain(this.page, this.size, this.order).subscribe(function (data) { _this.products = data.products; _this.totalPage = data.totalPage; });
        //this.dataService.getProductsTotalPage().subscribe((data: number[]) => this.totalPage = data);
    };
    ProductListComponent.prototype.delete = function (id) {
        var _this = this;
        this.dataService.deleteProduct(id).subscribe(function (data) { return _this.load(); });
    };
    //Следующая страница
    ProductListComponent.prototype.nextBut = function (num) {
        var _this = this;
        if (num < (this.totalPage.length) + 1) {
            this.dataService.GetProductsMain(num, this.size, this.order).subscribe(function (data) { return _this.products = data.products; });
            this.page = num;
        }
    };
    //Предидущая страница
    ProductListComponent.prototype.prevButAndAll = function (numprev) {
        var _this = this;
        if (numprev > 0) {
            this.dataService.GetProductsMain(numprev, this.size, this.order).subscribe(function (data) { return _this.products = data.products; });
            this.page = numprev;
        }
    };
    ProductListComponent.prototype.endpage = function (set) {
        var _this = this;
        this.dataService.GetProductsMain(set, this.size, this.order).subscribe(function (data) { return _this.products = data.products; });
        this.page = set;
    };
    //Сортировка
    ProductListComponent.prototype.setOrderName = function (value) {
        var _this = this;
        if (value === false) {
            this.reverse = true;
            this.dataService.GetProductsMain(this.page, this.size, 'NameDesc').subscribe(function (data) { return _this.products = data.products; });
            this.order = 'NameDesc';
        }
        if (value === true) {
            this.reverse = false;
            this.dataService.GetProductsMain(this.page, this.size, 'Name').subscribe(function (data) { return _this.products = data.products; });
            this.order = 'Name';
        }
    };
    ProductListComponent.prototype.setOrderDescription = function (value) {
        var _this = this;
        if (value === false) {
            this.reverse = true;
            this.dataService.GetProductsMain(this.page, this.size, 'DescriptionDesc').subscribe(function (data) { return _this.products = data.products; });
            this.order = 'DescriptionDesc';
        }
        if (value === true) {
            this.reverse = false;
            this.dataService.GetProductsMain(this.page, this.size, 'Description').subscribe(function (data) { return _this.products = data.products; });
            this.order = 'Description';
        }
    };
    ProductListComponent.prototype.setOrderPrice = function (value) {
        var _this = this;
        if (value === false) {
            this.reverse = true;
            this.dataService.GetProductsMain(this.page, this.size, 'PriceDesc').subscribe(function (data) { return _this.products = data.products; });
            this.order = 'PriceDesc';
        }
        if (value === true) {
            this.reverse = false;
            this.dataService.GetProductsMain(this.page, this.size, 'Price').subscribe(function (data) { return _this.products = data.products; });
            this.order = 'Price';
        }
    };
    ProductListComponent = __decorate([
        Component({
            templateUrl: './product-list.component.html'
        }),
        __metadata("design:paramtypes", [DataService])
    ], ProductListComponent);
    return ProductListComponent;
}());
export { ProductListComponent };
//# sourceMappingURL=product-list.component.js.map