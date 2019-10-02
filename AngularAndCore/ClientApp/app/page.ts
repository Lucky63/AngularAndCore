import { Customer } from "./customer";

export class PageComp {
	constructor(
		public customers: Customer[],
		public totalPage:number
	) { }
}