import {ItemRepository} from "./ItemRepository.js";
import {BillContent} from "./BillContent.js";
import { AutoOpenPrintDialogSettingRepository } from "./AutoOpenPrintDialogSettingRepository.js";

let itemRepository: ItemRepository = null;

export async function renderBill() {
    if (itemRepository === null) {
        const items = await ItemRepository.loadFromFile('menu/menu.csv');
        itemRepository = new ItemRepository(items);
    }

    const billContent = new BillContent(itemRepository);
    billContent.renderOrderedItems($('#bill-ordered-items')[0]);
    billContent.renderTotalAmount($('#bill-total-amount')[0]);
    billContent.renderNameAddress($('#bill-name-address')[0]);
    billContent.renderPhoneNumber($('#bill-phone-number')[0]);
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
