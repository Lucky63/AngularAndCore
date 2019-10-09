var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var DataService = /** @class */ (function () {
    function DataService(http) {
        this.http = http;
        this.url = "/api/customers";
        this.urlProduct = "/api/products";
    }
    DataService.prototype.getCustomer = function (id) {
        return this.http.get(this.url + '/' + id);
    };
    DataService.prototype.getCustomers = function (page, size, order) {
        if (size === void 0) { size = 2; }
        return this.http.get("api/customers/GetCustomers/" + page + "/" + size + "/" + order);
    };
    DataService.prototype.getCustomersTotalPage = function () {
        return this.http.get(this.url);
    };
    DataService.prototype.createCustomer = function (customer) {
        return this.http.post(this.url, customer);
    };
    DataService.prototype.updateCustomer = function (customer) {
        return this.http.put(this.url + '/' + customer.id, customer, { responseType: 'text' });
    };
    DataService.prototype.deleteCustomer = function (id) {
        return this.http.delete(this.url + '/' + id);
    };
    //Работа с продуктами
    DataService.prototype.getProduct = function (id) {
        return this.http.get(this.urlProduct + '/' + id);
    };
    DataService.prototype.getProducts = function () {
        return this.http.get(this.urlProduct);
    };
    DataService.prototype.GetProductsMain = function (page, size, order) {
        if (size === void 0) { size = 2; }
        return this.http.get("/api/products/GetProductsMain/" + page + "/" + size + "/" + order);
    };
    DataService.prototype.getProductsTotalPage = function () {
        return this.http.get("/api/products/GetProductsTotalPage/");
    };
    DataService.prototype.createProduct = function (product) {
        return this.http.post(this.urlProduct, product);
    };
    DataService.prototype.updateProduct = function (product) {
        return this.http.put(this.urlProduct + '/' + product.id, product);
    };
    DataService.prototype.deleteProduct = function (id) {
        return this.http.delete(this.urlProduct + '/' + id);
    };
    DataService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], DataService);
    return DataService;
}());
export { DataService };
//# sourceMappingURL=data.service.js.map