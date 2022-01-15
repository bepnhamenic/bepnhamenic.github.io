export class Cart {

    private static ORDERED_ITEMS = "orderedItems";


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
        localStorage.removeItem(Cart.ORDERED_ITEMS)
    }
}
