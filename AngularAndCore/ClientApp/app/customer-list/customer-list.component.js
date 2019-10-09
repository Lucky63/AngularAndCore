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
        this.TotalPage = []; //Общее количество страниц
        this.page = 1; //Первая страница
        this.size = 5; //Количество строк на странице
        this.order = '';
        this.reverse = false;
    }
    CustomerListComponent.prototype.ngOnInit = function () {
        this.load();
    };
    CustomerListComponent.prototype.load = function () {
        var _this = this;
        this.dataService.getCustomers(this.page, this.size, this.order).subscribe(function (data) { return _this.customersList = data; });
        this.dataService.getCustomersTotalPage().subscribe(function (data) { return _this.TotalPage = data; });
    };
    CustomerListComponent.prototype.delete = function (id) {
        var _this = this;
        this.dataService.deleteCustomer(id).subscribe(function (data) { return _this.load(); });
    };
    //Следующая страница
    CustomerListComponent.prototype.nextBut = function (num) {
        var _this = this;
        if (num < (this.TotalPage.length) + 1) {
            this.dataService.getCustomers(num, this.size, this.order).subscribe(function (data) { return _this.customersList = data; });
            this.page = num;
        }
    };
    //Предидущая страница
    CustomerListComponent.prototype.prevButAndAll = function (numprev) {
        var _this = this;
        if (numprev > 0) {
            this.dataService.getCustomers(numprev, this.size, this.order).subscribe(function (data) { return _this.customersList = data; });
            this.page = numprev;
        }
    };
    CustomerListComponent.prototype.endpage = function (set) {
        var _this = this;
        this.dataService.getCustomers(set, this.size, this.order).subscribe(function (data) { return _this.customersList = data; });
        this.page = set;
    };
    //Сортировка
    CustomerListComponent.prototype.setOrderName = function (value) {
        var _this = this;
        if (value === false) {
            this.reverse = true;
            this.dataService.getCustomers(this.page, this.size, 'NameDesc').subscribe(function (data) { return _this.customersList = data; });
            this.order = 'NameDesc';
        }
        if (value === true) {
            this.reverse = false;
            this.dataService.getCustomers(this.page, this.size, 'Name').subscribe(function (data) { return _this.customersList = data; });
            this.order = 'Name';
        }
    };
    CustomerListComponent.prototype.setOrderPhone = function (value) {
        var _this = this;
        if (value === false) {
            this.reverse = true;
            this.dataService.getCustomers(this.page, this.size, 'PhoneNumberDesc').subscribe(function (data) { return _this.customersList = data; });
            this.order = 'PhoneNumberDesc';
        }
        if (value === true) {
            this.reverse = false;
            this.dataService.getCustomers(this.page, this.size, 'PhoneNumber').subscribe(function (data) { return _this.customersList = data; });
            this.order = 'PhoneNumber';
        }
    };
    CustomerListComponent.prototype.setOrderAddress = function (value) {
        var _this = this;
        if (value === false) {
            this.reverse = true;
            this.dataService.getCustomers(this.page, this.size, 'AddressDesc').subscribe(function (data) { return _this.customersList = data; });
            this.order = 'AddressDesc';
        }
        if (value === true) {
            this.reverse = false;
            this.dataService.getCustomers(this.page, this.size, 'Address').subscribe(function (data) { return _this.customersList = data; });
            this.order = 'Address';
        }
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