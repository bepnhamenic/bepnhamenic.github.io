import {ItemRepository} from "./ItemRepository.js";
import {BillContent} from "./BillContent.js";
import {QRCode} from "../qrcode/qrcode.js";

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
        if (window.location.pathname.endsWith('bill.html')) {
            if ($('#bill-phone-number')[0].innerText !== '') {
                new QRCode('bill-qr-code', {
                    text: 'tel ' + $('#bill-phone-number')[0].innerText,
                    width: 100,
                    height: 100,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.L,
                });
            }

            if (window.location.hostname !== 'localhost') {
                window.print();
            }
        }
    });
});
