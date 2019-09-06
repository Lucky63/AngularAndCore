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
import { Customer } from './customer';
var CustomerListComponent = /** @class */ (function () {
    function CustomerListComponent(dataService) {
        this.dataService = dataService;
        this.customer = new Customer(); // изменяемый товар
        this.tableMode = true; // табличный режим
    }
    CustomerListComponent.prototype.ngOnInit = function () {
        this.loadCustomers(); // загрузка данных при старте компонента  
    };
    // получаем данные через сервис
    CustomerListComponent.prototype.loadCustomers = function () {
        var _this = this;
        this.dataService.getCustomers()
            .subscribe(function (data) { return _this.customers = data; });
    };
    // сохранение данных
    CustomerListComponent.prototype.save = function () {
        var _this = this;
        if (this.customer.id == null) {
            this.dataService.createCustomer(this.customer)
                .subscribe(function (data) { return _this.customers.push(data); });
        }
        else {
            this.dataService.updateCustomer(this.customer)
                .subscribe(function (data) { return _this.loadCustomers(); });
        }
        this.cancel();
    };
    CustomerListComponent.prototype.editCustomer = function (c) {
        this.customer = c;
    };
    CustomerListComponent.prototype.cancel = function () {
        this.customer = new Customer();
        this.tableMode = true;
    };
    CustomerListComponent.prototype.delete = function (c) {
        var _this = this;
        this.dataService.deleteCustomer(c.id)
            .subscribe(function (data) { return _this.loadCustomers(); });
    };
    CustomerListComponent.prototype.add = function () {
        this.cancel();
        this.tableMode = false;
    };
    CustomerListComponent = __decorate([
        Component({
            templateUrl: './customer-list.component.html',
            providers: [DataService]
        }),
        __metadata("design:paramtypes", [DataService])
    ], CustomerListComponent);
    return CustomerListComponent;
}());
export { CustomerListComponent };
//# sourceMappingURL=customer-list.component.js.map