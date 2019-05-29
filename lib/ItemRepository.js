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
        items.sort(Item.compare);
        return items;
    }
    static getDuplicatedCodes(items) {
        const rawCodes = items.map(i => i.code);
        return rawCodes.filter((item, index) => {
            return rawCodes.indexOf(item) < index;
        });
    }
}
//# sourceMappingURL=ItemRepository.js.map