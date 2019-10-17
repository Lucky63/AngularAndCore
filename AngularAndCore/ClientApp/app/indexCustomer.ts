import { Customer } from "./customer";

export class IndexCustomer {
	constructor(
		public customers: Customer[]=[],
		public totalPage: number[]=[], ) { }
}