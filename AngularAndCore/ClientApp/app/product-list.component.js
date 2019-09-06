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
import { DataService } from './data.service';
import { Product } from './product';
var ProductListComponent = /** @class */ (function () {
    function ProductListComponent(dataService) {
        this.dataService = dataService;
        this.product = new Product(); // изменяемый товар
        this.tableMode = true; // табличный режим
    }
    ProductListComponent.prototype.ngOnInit = function () {
        this.loadProducts(); // загрузка данных при старте компонента  
    };
    // получаем данные через сервис
    ProductListComponent.prototype.loadProducts = function () {
        var _this = this;
        this.dataService.getProducts()
            .subscribe(function (data) { return _this.products = data; });
    };
    // сохранение данных
    ProductListComponent.prototype.save = function () {
        var _this = this;
        if (this.product.id == null) {
            this.dataService.createProduct(this.product)
                .subscribe(function (data) { return _this.products.push(data); });
        }
        else {
            this.dataService.updateProduct(this.product)
                .subscribe(function (data) { return _this.loadProducts(); });
        }
        this.cancel();
    };
    ProductListComponent.prototype.editProduct = function (p) {
        this.product = p;
    };
    ProductListComponent.prototype.cancel = function () {
        this.product = new Product();
        this.tableMode = true;
    };
    ProductListComponent.prototype.delete = function (p) {
        var _this = this;
        this.dataService.deleteProduct(p.id)
            .subscribe(function (data) { return _this.loadProducts(); });
    };
    ProductListComponent.prototype.add = function () {
        this.cancel();
        this.tableMode = false;
    };
    ProductListComponent = __decorate([
        Component({
            selector: 'prod',
            templateUrl: './product-list.component.html',
            providers: [DataService]
        }),
        __metadata("design:paramtypes", [DataService])
    ], ProductListComponent);
    return ProductListComponent;
}());
export { ProductListComponent };
//# sourceMappingURL=product-list.component.js.map