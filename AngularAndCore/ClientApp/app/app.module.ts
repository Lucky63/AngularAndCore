import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { ProductListComponent } from './product-list.component';
import { ProductFormComponent } from './product-form.component';
import { ProductCreateComponent } from './product-create.component';
import { ProductEditComponent } from './product-edit.component';
import { NotFoundComponent } from './not-found.component';

import { CustomerListComponent } from './customer-list.component';
import { Routes, RouterModule } from '@angular/router';

import { DataService } from './data.service';
const appRoutes: Routes = [
	{ path: '', component: CustomerListComponent },
	{ path: 'product', component: ProductListComponent },
	{ path: 'create', component: ProductCreateComponent },
	{ path: 'product/edit/:id', component: ProductEditComponent },
	{ path: '**', component: NotFoundComponent }
	
];
@NgModule({
	imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
	declarations: [AppComponent, ProductListComponent, CustomerListComponent, ProductCreateComponent, ProductEditComponent,
		ProductFormComponent, NotFoundComponent],
	providers: [DataService],
	bootstrap: [AppComponent]
})
export class AppModule { }