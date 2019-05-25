export class Cart {
    private static ORDERED_ITEMS = 'orderedItems';
    private static NAME_ADDRESS = 'nameAddress';
    private static PHONE_NUMBER = 'phoneNumber';
    private static EXTRA_ITEMS = 'extraItems';

    public static updateCart(code: string, amount: number) {
        if (Cart.getOrderedItems() === null && amount > 0) {
            Cart.setOrderedItems({[code]: amount});
        } else {
            const orderedItems = Cart.getOrderedItems();
            amount > 0 ? orderedItems[code] = amount : delete orderedItems[code];
            Cart.setOrderedItems(orderedItems);
        }
    }

    public static getOrderedItems(): object {
        return JSON.parse(localStorage.getItem(Cart.ORDERED_ITEMS)) || {};
    }

    private static setOrderedItems(value: object): void {
        localStorage.setItem(Cart.ORDERED_ITEMS, JSON.stringify(value));
    }

    public static emptyCart(): void {
        localStorage.clear();
    }

    public static setNameAddress(val: string): void {
        localStorage.setItem(Cart.NAME_ADDRESS, val);
    }

    public static getNameAddress(): string {
        return localStorage.getItem(Cart.NAME_ADDRESS) || '';
    }

    public static setPhoneNumber(val: string): void {
        localStorage.setItem(Cart.PHONE_NUMBER, val);
    }

    public static getPhoneNumber(): string {
        return localStorage.getItem(Cart.PHONE_NUMBER) || '';
    }

    public static setExtraItems(extraItems: {}): void {
        localStorage.setItem(this.EXTRA_ITEMS, JSON.stringify(extraItems));
    }

    public static getExtraItems(): { string: number } | {} {
        if (localStorage.getItem(Cart.EXTRA_ITEMS)) {
            return JSON.parse(localStorage.getItem(Cart.EXTRA_ITEMS));
        } else {
            return {};
        }
    }
}