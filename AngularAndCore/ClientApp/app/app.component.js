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
var AppComponent = /** @class */ (function () {
    function AppComponent(dataService) {
        this.dataService = dataService;
        this.customer = new Customer(); // изменяемый товар
        this.tableMode = true; // табличный режим
    }
    AppComponent.prototype.ngOnInit = function () {
        this.loadCustomers(); // загрузка данных при старте компонента  
    };
    // получаем данные через сервис
    AppComponent.prototype.loadCustomers = function () {
        var _this = this;
        this.dataService.getCustomers()
            .subscribe(function (data) { return _this.customers = data; });
    };
    // сохранение данных
    AppComponent.prototype.save = function () {
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
    AppComponent.prototype.editCustomer = function (c) {
        this.customer = c;
    };
    AppComponent.prototype.cancel = function () {
        this.customer = new Customer();
        this.tableMode = true;
    };
    AppComponent.prototype.delete = function (c) {
        var _this = this;
        this.dataService.deleteCustomer(c.id)
            .subscribe(function (data) { return _this.loadCustomers(); });
    };
    AppComponent.prototype.add = function () {
        this.cancel();
        this.tableMode = false;
    };
    AppComponent = __decorate([
        Component({
            selector: 'app',
            templateUrl: './app.component.html',
            providers: [DataService]
        }),
        __metadata("design:paramtypes", [DataService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map