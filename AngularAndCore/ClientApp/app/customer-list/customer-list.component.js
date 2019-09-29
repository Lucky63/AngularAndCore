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
import { OrderPipe } from 'ngx-order-pipe';
var CustomerListComponent = /** @class */ (function () {
    ///////////////////////////////////////////////
    function CustomerListComponent(dataService, route, router, orderPipe) {
        var _this = this;
        this.dataService = dataService;
        this.route = route;
        this.router = router;
        this.orderPipe = orderPipe;
        //Для сортировки
        this.order = 'name';
        this.reverse = false;
        //Для сортировки
        this.config = {
            currentPage: 1,
            itemsPerPage: 5,
            totalItems: 0
        };
        this.sortedCollection = orderPipe.transform(this.customers, 'name');
        console.log(this.sortedCollection);
        //////////////
        // Для пагинации
        this.route.queryParams.subscribe(function (params) { return _this.config.currentPage = params['page'] ? params['page'] : 1; });
        //////////////////////
    }
    CustomerListComponent.prototype.ngOnInit = function () {
        this.load();
    };
    CustomerListComponent.prototype.load = function () {
        var _this = this;
        this.dataService.getCustomers().subscribe(function (data) { return _this.customers = data; });
    };
    //Метод пагинации
    CustomerListComponent.prototype.pageChange = function (newPage) {
        this.router.navigate([''], { queryParams: { page: newPage } });
    };
    //Метод сортировки
    CustomerListComponent.prototype.setOrder = function (value) {
        if (this.order === value) {
            this.reverse = !this.reverse;
        }
        this.order = value;
    };
    CustomerListComponent.prototype.delete = function (id) {
        var _this = this;
        this.dataService.deleteCustomer(id).subscribe(function (data) { return _this.load(); });
    };
    CustomerListComponent = __decorate([
        Component({
            templateUrl: './customer-list.component.html'
        }),
        __metadata("design:paramtypes", [DataService, ActivatedRoute, Router, OrderPipe])
    ], CustomerListComponent);
    return CustomerListComponent;
}());
export { CustomerListComponent };
//# sourceMappingURL=customer-list.component.js.map