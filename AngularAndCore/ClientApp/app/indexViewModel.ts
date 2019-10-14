import { Customer } from "./customer";

export class IndexViewModel {
	constructor(
		public customers: Customer[]=[],
		public totalPage: number[]=[], ) { }
}