import {Item} from "./Item.js";


export class ItemRepository {
    private readonly items: { string: Item }[];

    public constructor(items: Item[]) {
        this.items = [];
        items.map(i => {
            this.items[i.code] = i;
        });
    };

    public getItemFromCode(code: string): Item {
        return this.items[code];
    };

    public static async loadFromFile(fileName: string): Promise<Item[]> {
        const r = await fetch(fileName);
        const fileContent = await r.text();
        const lines = fileContent.split('\n');
        lines.shift();

        const items: Item[] = [];
        for (const line of lines) {
            if (line.length > 0) {
                items.push(new Item(line));
            }
        }

        return items;
    }

    public static getDuplicatedCodes(items: Item[]): Array<string> {
        const rawCodes = items.map(i => i.code);

        return rawCodes.filter((item, index) => {
            return rawCodes.indexOf(item) < index;
        });
    }
}
