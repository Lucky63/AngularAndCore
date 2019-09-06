import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list.component';
import { CustomerListComponent } from './customer-list.component';
import { Routes, RouterModule } from '@angular/router';

import { DataService } from './data.service';
const appRoutes: Routes = [
	{ path: '', component: CustomerListComponent },
	{ path: 'product', component: ProductListComponent },
	
];
@NgModule({
	imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
	declarations: [AppComponent, ProductListComponent, CustomerListComponent],
	providers: [DataService],
	bootstrap: [AppComponent]
})
export class AppModule { }