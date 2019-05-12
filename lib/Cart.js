export class Cart {
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
        localStorage.clear();
    }
    static setNameAddress(val) {
        localStorage.setItem(Cart.NAME_ADDRESS, val);
    }
    static getNameAddress() {
        return localStorage.getItem(Cart.NAME_ADDRESS) || '';
    }
    static setPhoneNumber(val) {
        localStorage.setItem(Cart.PHONE_NUMBER, val);
    }
    static getPhoneNumber() {
        return localStorage.getItem(Cart.PHONE_NUMBER) || '';
    }
    static setExtraItems(extraItems) {
        localStorage.setItem(this.EXTRA_ITEMS, JSON.stringify(extraItems));
    }
    static getExtraItems() {
        if (localStorage.getItem(Cart.EXTRA_ITEMS)) {
            return JSON.parse(localStorage.getItem(Cart.EXTRA_ITEMS));
        }
        else {
            return {};
        }
    }
}
// public constructor(
//     public orderedItems: OrderedItem[],
// ) {
// };
Cart.ORDERED_ITEMS = 'orderedItems';
Cart.NAME_ADDRESS = 'nameAddress';
Cart.PHONE_NUMBER = 'phoneNumber';
Cart.EXTRA_ITEMS = 'extraItems';
//# sourceMappingURL=Cart.js.map