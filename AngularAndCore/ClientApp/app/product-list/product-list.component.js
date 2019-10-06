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
import { ActivatedRoute, Router } from '@angular/router';
var ProductListComponent = /** @class */ (function () {
    function ProductListComponent(dataService, route, router) {
        this.dataService = dataService;
        this.route = route;
        this.router = router;
        this.page = 1;
        this.size = 2;
    }
    ProductListComponent.prototype.ngOnInit = function () {
        this.load();
    };
    ProductListComponent.prototype.load = function () {
        var _this = this;
        this.dataService.getProductsPagin(this.page, this.size).subscribe(function (data) { return _this.products = data; });
        this.dataService.getProductsCount().subscribe(function (data) { return _this.count = data; });
    };
    ProductListComponent.prototype.delete = function (id) {
        var _this = this;
        this.dataService.deleteProduct(id).subscribe(function (data) { return _this.load(); });
    };
    //Следующая страница
    ProductListComponent.prototype.next = function (num) {
        var _this = this;
        if (num < (this.count / this.size) + 1) {
            this.dataService.getProductsPagin(num, this.size).subscribe(function (data) { return _this.products = data; });
            this.page = num;
        }
    };
    //Предидущая страница
    ProductListComponent.prototype.prev = function (numprev) {
        var _this = this;
        if (numprev > 0) {
            this.dataService.getProductsPagin(numprev, this.size).subscribe(function (data) { return _this.products = data; });
            this.page = numprev;
        }
    };
    ProductListComponent.prototype.endpage = function (set) {
        var _this = this;
        var rounded = parseFloat((set + (this.count / this.size)).toFixed()); //Округляю число
        this.dataService.getProductsPagin(rounded, this.size).subscribe(function (data) { return _this.products = data; });
        this.page = rounded;
    };
    ProductListComponent = __decorate([
        Component({
            templateUrl: './product-list.component.html'
        }),
        __metadata("design:paramtypes", [DataService, ActivatedRoute, Router])
    ], ProductListComponent);
    return ProductListComponent;
}());
export { ProductListComponent };
//# sourceMappingURL=product-list.component.js.map