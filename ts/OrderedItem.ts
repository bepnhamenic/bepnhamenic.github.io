import {Item} from "./Item";

export class OrderedItem {
    public constructor(private item: Item, private quantity: number) {
    }

    public getPriceAmount(): number {
        return this.item.pricePerUnit * this.quantity;
    }

    public getLineOnBill(): string {
        if (this.item.name.toLowerCase() === 'ship') {
            return this.item.name;
        }
        return `${this.item.name} (${this.quantity}${this.item.unitName} x ${this.item.pricePerUnit}k)`;
    }

    public getPriceAmountOnBill(): string {
        return `${this.getPriceAmount()}k`;
    }
}