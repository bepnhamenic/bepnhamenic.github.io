import { Item } from "./Item.js";
export class ItemRepository {
    constructor(items) {
        this.items = [];
        items.map(i => {
            this.items[i.code] = i;
        });
    }
    ;
    getItemFromCode(code) {
        return this.items[code];
    }
    ;
    static async loadFromFile(fileName) {
        const r = await fetch(fileName);
        const fileContent = await r.text();
        const lines = fileContent.split('\n');
        lines.shift();
        const items = [];
        for (const line of lines) {
            if (line.length > 0) {
                items.push(new Item(line));
            }
        }
        return items;
    }
}
//# sourceMappingURL=ItemRepository.js.map