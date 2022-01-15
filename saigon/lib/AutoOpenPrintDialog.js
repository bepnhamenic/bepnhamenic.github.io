export class AutoOpenPrintDialog {
    static updateCart(code, amount) {
        if (Cart.getOrderedItems() === null && amount > 0) {
            Cart.setOrderedItems({ [code]: amount });
        }
        else {
            const orderedItems = Cart.getOrderedItems();
            amount > 0 ? orderedItems[code] = amount : delete orderedItems[code];
            Cart.setOrderedItems(orderedItems);
        }
    }
    static getOrderedItems() {
        return JSON.parse(localStorage.getItem(Cart.ORDERED_ITEMS)) || {};
    }
    static setOrderedItems(value) {
        localStorage.setItem(Cart.ORDERED_ITEMS, JSON.stringify(value));
    }
    static emptyCart() {
        localStorage.removeItem(Cart.ORDERED_ITEMS);
    }
}
AutoOpenPrintDialog.LOCAL_STORAGE_KEY = "autoOpenPrintDialog";
//# sourceMappingURL=AutoOpenPrintDialog.js.map