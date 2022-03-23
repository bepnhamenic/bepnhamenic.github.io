var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    static loadFromFile(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = yield fetch(fileName);
            const fileContent = yield r.text();
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
        });
    }
    static getDuplicatedCodes(items) {
        const rawCodes = items.map(i => i.code);
        return rawCodes.filter((item, index) => {
            return rawCodes.indexOf(item) < index;
        });
    }
}
//# sourceMappingURL=ItemRepository.js.map