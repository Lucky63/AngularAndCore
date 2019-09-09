import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { NotFoundComponent } from './not-found.component';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { Routes, RouterModule } from '@angular/router';

import { DataService } from './data.service';
const appRoutes: Routes = [
	{ path: '', component: CustomerListComponent },
	{ path: 'createCustomer', component: CustomerCreateComponent },
	{ path: 'edit/:id', component: CustomerEditComponent },
	{ path: 'product', component: ProductListComponent },
	{ path: 'create', component: ProductCreateComponent },
	{ path: 'product/edit/:id', component: ProductEditComponent },
	{ path: '**', component: NotFoundComponent }
	
];
@NgModule({
	imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
	declarations: [AppComponent, ProductListComponent, CustomerListComponent, CustomerFormComponent,
		CustomerCreateComponent, CustomerEditComponent, ProductCreateComponent, ProductEditComponent,
		ProductFormComponent, NotFoundComponent],
	providers: [DataService],
	bootstrap: [AppComponent]
})
export class AppModule { }