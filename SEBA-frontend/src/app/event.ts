export class Event{
	name: string;
	description: string;
	class: string;
	teacher: string;
	infotext: string;
	status: Array<string>;
	cost: Array<string>;
	packing: Array<string>;
	schedule: string;
	comments: Array<string>;
}

/* the cost information consists of an array containing:
cost[0]: the actual cost as a number and currency, e.g. 100$
cost[1]: the text describing how to pay or where to transfer the money to
 */
