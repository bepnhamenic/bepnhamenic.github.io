import { Item } from "./Item";


export class OrderedItem {

    private static CURRENCY = "Kč";


    public constructor(private item: Item, private quantity: number) {
    }


    public getPriceAmount(): number {
        return this.item.pricePerUnit * this.quantity;
    }


    public getLineOnBill(): string {
        return `${this.item.code}. ${this.item.name} (${this.quantity}${this.item.unitName} x ${this.item.pricePerUnit}${OrderedItem.CURRENCY})`;
    }


    public getPriceAmountOnBill(): string {
        return `${this.getPriceAmount()}${OrderedItem.CURRENCY}`;
    }
}
