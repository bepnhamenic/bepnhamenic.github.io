var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ItemRepository } from "./ItemRepository.js";
import { BillContent } from "./BillContent.js";
import { AutoOpenPrintDialogSettingRepository } from "./AutoOpenPrintDialogSettingRepository.js";
let itemRepository = null;
export function renderBill() {
    return __awaiter(this, void 0, void 0, function* () {
        if (itemRepository === null) {
            const items = yield ItemRepository.loadFromFile("menu/menu.csv");
            itemRepository = new ItemRepository(items);
        }
        const billContent = new BillContent(itemRepository);
        billContent.renderOrderedItems($("#bill-ordered-items")[0]);
        billContent.renderTotalAmount($("#bill-total-amount")[0]);
        const currentDateTimePlaceHolder = $("#currentDateTime")[0];
        if (currentDateTimePlaceHolder) {
            const dt = new Date();
            currentDateTimePlaceHolder.innerHTML = dt.toLocaleString("cs-CZ");
        }
    });
}
window.onafterprint = () => {
    window.history.back();
};
jQuery(() => {
    renderBill().then(() => {
        if (window.location.pathname.endsWith("bill.html") && AutoOpenPrintDialogSettingRepository.getValue() === true) {
            window.print();
        }
    });
});
//# sourceMappingURL=bill.js.map