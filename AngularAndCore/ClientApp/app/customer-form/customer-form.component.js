var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { Customer } from '../customer';
import { DataService } from '../data.service';
var CustomerFormComponent = /** @class */ (function () {
    function CustomerFormComponent(dataService) {
        this.dataService = dataService;
    }
    CustomerFormComponent.prototype.ngOnInit = function () {
        this.load();
    };
    CustomerFormComponent.prototype.load = function () {
        var _this = this;
        this.dataService.getProducts().subscribe(function (data) { return _this.products = data; });
    };
    __decorate([
        Input(),
        __metadata("design:type", Customer)
    ], CustomerFormComponent.prototype, "customer", void 0);
    CustomerFormComponent = __decorate([
        Component({
            selector: "customer-form",
            templateUrl: './customer-form.component.html'
        }),
        __metadata("design:paramtypes", [DataService])
    ], CustomerFormComponent);
    return CustomerFormComponent;
}());
export { CustomerFormComponent };
//# sourceMappingURL=customer-form.component.js.map