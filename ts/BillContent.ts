import { OrderedItem } from "./OrderedItem.js";
import { Cart } from "./Cart.js";
import { ItemRepository } from "./ItemRepository";


export class BillContent {
    orderedItems: OrderedItem[];

    public constructor(itemRepository: ItemRepository) {
        this.orderedItems = [];

        const orderedItems = Cart.getOrderedItems();
        for (const code of Object.keys(orderedItems)) {
            const item = itemRepository.getItemFromCode(code);
            const quantity = orderedItems[code];
            const orderedItem = new OrderedItem(item, quantity);
            this.orderedItems.push(orderedItem);
        }
    }

    private getTotalPriceAmount(): number { //TODO rewrite reduce
        let total: number = 0;

        if (this.orderedItems.length > 0) {
            total += Number(this.orderedItems.map(i => i.getPriceAmount()).reduce((a, b) => {
                return a + b;
            }));
        }

        const extraItems = Cart.getExtraItems();
        if (Object.keys(extraItems).length > 0) {
            total += Number(Object.values(extraItems).map(i => Number(i)).reduce((a, b) => {
                return a + b;
            }));
        }

        return total;
    }

    private formatPhoneNumber(rawPhoneNumber: string): string {
        if (rawPhoneNumber.length !== 10) {
            return rawPhoneNumber;
        }

        var match = rawPhoneNumber.match(/^(\d{4})(\d{3})(\d{3})$/);
        if (match) {
            return match[1] + ' ' + match[2] + ' ' + match[3];
        }

        return rawPhoneNumber;
    }


    public renderOrderedItems(parentNode: HTMLElement): void {
        while (parentNode.firstChild) {
            parentNode.firstChild.remove();
        }

        for (const orderedItem of this.orderedItems) {
            const tr = document.createElement('tr');
            tr.className = 'border';

            let td = document.createElement('td');
            td.innerText = orderedItem.getLineOnBill();
            tr.appendChild(td);

            td = document.createElement('td');
            td.className = 'text-align-right';
            td.innerText = orderedItem.getPriceAmountOnBill();
            tr.appendChild(td);

            parentNode.appendChild(tr);
        }

        const extraItems = Cart.getExtraItems();
        for (const extraItemName of Object.keys(extraItems)) {
            const tr = document.createElement('tr');
            tr.className = 'border';

            let td = document.createElement('td');
            td.innerText = extraItemName;
            tr.appendChild(td);

            td = document.createElement('td');
            td.className = 'text-align-right';
            td.innerText = extraItems[extraItemName] + 'k';
            tr.appendChild(td);

            parentNode.appendChild(tr);
        }
    }

    public renderTotalAmount(node: HTMLElement): void {
        node.innerText = this.getTotalPriceAmount().toString() + 'k';
    }

    public renderNameAddress(node: HTMLElement) {
        node.innerText = Cart.getNameAddress();
    }

    public renderPhoneNumber(node: HTMLElement) {
        node.innerText = this.formatPhoneNumber(Cart.getPhoneNumber());
    }
}