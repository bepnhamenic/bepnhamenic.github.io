export class OrderedItem {
    constructor(item, quantity) {
        this.item = item;
        this.quantity = quantity;
    }
    getPriceAmount() {
        return this.item.pricePerUnit * this.quantity;
    }
    getLineOnBill() {
        return `${this.item.code}. ${this.item.name} (${this.quantity}${this.item.unitName} x ${this.item.pricePerUnit}\u00A0${OrderedItem.CURRENCY})`;
    }
    getPriceAmountOnBill() {
        return `${this.getPriceAmount()}\u00A0${OrderedItem.CURRENCY}`;
    }
}
OrderedItem.CURRENCY = "Kč";
//# sourceMappingURL=OrderedItem.js.map