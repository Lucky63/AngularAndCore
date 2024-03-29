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
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Product } from '../product';
var CustomerEditComponent = /** @class */ (function () {
    function CustomerEditComponent(dataService, router, activeRoute) {
        this.dataService = dataService;
        this.router = router;
        this.loaded = false;
        this.id = Number.parseInt(activeRoute.snapshot.params["id"]);
    }
    CustomerEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.id)
            this.dataService.getCustomer(this.id).subscribe(function (data) {
                _this.customer = data;
                if (_this.customer != null)
                    _this.loaded = true;
            });
        this.dataService.getProducts().subscribe(function (data) { return _this.allproducts = data; });
    };
    CustomerEditComponent.prototype.save = function (productid, productDel) {
        var _this = this;
        if (productDel != null) {
            var index = [];
            for (var _i = 0, _a = this.customer.products; _i < _a.length; _i++) {
                var i = _a[_i];
                index.push(i.id);
            }
            this.customer.products.splice(index.indexOf(parseInt(String(productDel), 10)), 1);
        }
        if (productid != null && productid != productDel)
            this.customer.products.push(new Product(productid));
        this.dataService.updateCustomer(this.customer).subscribe(function (data) { return _this.router.navigateByUrl("/"); });
    };
    CustomerEditComponent = __decorate([
        Component({
            templateUrl: './customer-edit.component.html'
        }),
        __metadata("design:paramtypes", [DataService, Router, ActivatedRoute])
    ], CustomerEditComponent);
    return CustomerEditComponent;
}());
export { CustomerEditComponent };
//# sourceMappingURL=customer-edit.component.js.map