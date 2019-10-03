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
var CustomerListComponent = /** @class */ (function () {
    function CustomerListComponent(dataService) {
        this.dataService = dataService;
        this.page = 1; //Первая страница
        this.size = 5; //Количество строк на странице
    }
    CustomerListComponent.prototype.ngOnInit = function () {
        this.load();
    };
    CustomerListComponent.prototype.load = function () {
        var _this = this;
        this.dataService.getCustomers(this.page, this.size).subscribe(function (data) { return _this.customersList = data; });
        this.dataService.getCustomersCount().subscribe(function (data) { return _this.count = data; });
        this.totalPage = (this.count / this.size) + 1;
    };
    CustomerListComponent.prototype.delete = function (id) {
        var _this = this;
        this.dataService.deleteCustomer(id).subscribe(function (data) { return _this.load(); });
    };
    //Следующая страница
    CustomerListComponent.prototype.next = function (num) {
        var _this = this;
        if (num < (this.count / this.size) + 1) {
            this.dataService.getCustomers(num, this.size).subscribe(function (data) { return _this.customersList = data; });
            this.page = num;
        }
    };
    //Предидущая страница
    CustomerListComponent.prototype.prev = function (numprev) {
        var _this = this;
        if (numprev > 0) {
            this.dataService.getCustomers(numprev, this.size).subscribe(function (data) { return _this.customersList = data; });
            this.page = numprev;
        }
    };
    CustomerListComponent.prototype.endpage = function (set) {
        var _this = this;
        var rounded = parseFloat((set + (this.count / this.size)).toFixed()); //Округляю число
        this.dataService.getCustomers(rounded, this.size).subscribe(function (data) { return _this.customersList = data; });
        this.page = rounded;
    };
    CustomerListComponent = __decorate([
        Component({
            templateUrl: './customer-list.component.html'
        }),
        __metadata("design:paramtypes", [DataService])
    ], CustomerListComponent);
    return CustomerListComponent;
}());
export { CustomerListComponent };
//# sourceMappingURL=customer-list.component.js.map