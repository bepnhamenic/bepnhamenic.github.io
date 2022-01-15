export class OrderedItem {
    constructor(item, quantity) {
        this.item = item;
        this.quantity = quantity;
    }
    getPriceAmount() {
        return this.item.pricePerUnit * this.quantity;
    }
    getLineOnBill() {
        return `${this.item.code}. ${this.item.name} (${this.quantity}${this.item.unitName} x ${this.item.pricePerUnit}${OrderedItem.CURRENCY})`;
    }
    getPriceAmountOnBill() {
        return `${this.getPriceAmount()}${OrderedItem.CURRENCY}`;
    }
}
OrderedItem.CURRENCY = "Kč";
//# sourceMappingURL=OrderedItem.js.map