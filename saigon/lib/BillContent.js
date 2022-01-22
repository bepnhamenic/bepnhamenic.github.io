import { OrderedItem } from "./OrderedItem.js";
import { Cart } from "./Cart.js";
export class BillContent {
    constructor(itemRepository) {
        this.orderedItems = [];
        const orderedItems = Cart.getOrderedItems();
        for (const code of Object.keys(orderedItems)) {
            const item = itemRepository.getItemFromCode(code);
            const quantity = orderedItems[code];
            const orderedItem = new OrderedItem(item, quantity);
            this.orderedItems.push(orderedItem);
        }
    }
    getTotalPriceAmount() {
        let total = 0;
        if (this.orderedItems.length > 0) {
            total += Number(this.orderedItems.map(i => i.getPriceAmount()).reduce((a, b) => {
                return a + b;
            }));
        }
        return total;
    }
    renderOrderedItems(parentNode) {
        while (parentNode.firstChild) {
            parentNode.firstChild.remove();
        }
        for (const orderedItem of this.orderedItems) {
            const tr = document.createElement("tr");
            tr.className = "border";
            let td = document.createElement("td");
            td.innerText = orderedItem.getLineOnBill();
            tr.appendChild(td);
            td = document.createElement("td");
            td.className = "text-align-right";
            td.innerText = orderedItem.getPriceAmountOnBill();
            tr.appendChild(td);
            parentNode.appendChild(tr);
        }
    }
    renderTotalAmount(node) {
        node.innerText = this.getTotalPriceAmount().toString() + "\u00A0Kč";
    }
}
//# sourceMappingURL=BillContent.js.map