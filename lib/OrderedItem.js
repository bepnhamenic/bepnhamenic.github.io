export class OrderedItem {
    constructor(item, quantity) {
        this.item = item;
        this.quantity = quantity;
    }
    getPriceAmount() {
        return this.item.pricePerUnit * this.quantity;
    }
    getLineOnBill() {
        return `${this.item.name} (${this.quantity}${this.item.unitName} x ${this.item.pricePerUnit}k)`;
    }
    getPriceAmountOnBill() {
        return `${this.getPriceAmount()}k`;
    }
}
//# sourceMappingURL=OrderedItem.js.map