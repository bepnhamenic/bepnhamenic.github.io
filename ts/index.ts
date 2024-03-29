import { ItemRepository } from "./ItemRepository.js";
import { Item } from "./Item";
import { Cart } from "./Cart.js";
import { renderBill } from "./bill.js";
import { AutoOpenPrintDialogSettingRepository } from "./AutoOpenPrintDialogSettingRepository.js";

function normalizeString(str: string): string {
    return str.split('').map(function (letter) {
        let i = this.accents.indexOf(letter);
        return (i !== -1) ? this.out[i] : letter
    }.bind({
        accents: 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñç',
        out: 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouunc'
    })
    ).join('');
}

function setAutoOpenPrintDialogCheckbox(): void {
    $("#autoOpenPrintDialogCheckbox")[0]["checked"] = AutoOpenPrintDialogSettingRepository.getValue();
}

function renderMenu(items: Item[]) {
    for (const item of items) {
        $('#menuBody')[0].appendChild(item.getTableRow());
    }
}

function announceDuplicatedCodes(items: Item[]): void {
    const duplicatedCodes = ItemRepository.getDuplicatedCodes(items);
    if (duplicatedCodes) {
        for (const code of duplicatedCodes) {
            M.toast({ html: `Trùng mã hàng ${code}` });
        }
    }
}

async function ready() {
    $('.modal').modal();
    const items = await ItemRepository.loadFromFile('menu/menu.csv');

    renderMenu(items);
    announceDuplicatedCodes(items);
    setAutoOpenPrintDialogCheckbox();

    $('#new-cart').on('click', function () {
        Cart.emptyCart();
        location.reload();
    });

    $('.addQuantity').on('click', function () {
        const itemCode = $(this).data('code');
        const inputField = $(`input[data-code=${itemCode}]`);
        const currentVal = parseInt(inputField.val().toString());

        isNaN(currentVal) ? inputField.val(1) : inputField.val(currentVal + 1);

        inputField.trigger('change');
    });

    $('.subtractQuantity').on('click', function () {
        const itemCode = $(this).data('code');
        const inputField = $(`input[data-code=${itemCode}]`);
        const currentVal = parseInt(inputField.val().toString());

        isNaN(currentVal) || currentVal <= 0 ? inputField.val(0) : inputField.val(currentVal - 1);

        inputField.trigger('change');
    });


    $('input[data-type="item"]').on('change', function () {
        const itemCode = $(this).data('code');
        const amount = parseInt($(this).val().toString());
        Cart.updateCart(itemCode, amount);

        renderBill();
    });

    $('#bill-name-address').on('keyup', function () {
        Cart.setNameAddress($(this).val().toString());
    });

    $('#bill-phone-number').on('keyup', function () {
        Cart.setPhoneNumber($(this).val().toString());
    });

    $('#extra-items').on('keyup', function () {
        const extraItems = {};

        const lines = $(this).val().toString().split('\n');
        for (const line of lines) {
            const [name, price] = line.split(';');
            extraItems[name] = price;
        }

        Cart.setExtraItems(extraItems);
        renderBill();
    });

    $('#search-input').on('keyup', function (e) {
        let firstFilteredTr: HTMLElement;
        const input = $(this).val().toString().toUpperCase();
        const tr = $('.item-tr');

        for (let i = 0; i < tr.length; i++) {
            const code = $(tr[i]).data('code');
            const nameWithAccent = $(tr[i]).data('name');
            const nameWithoutAccent = normalizeString(nameWithAccent);
            const price = $(tr[i]).data('price').toString();
            if (
                code.toUpperCase().indexOf(input) > -1 ||
                nameWithAccent.toUpperCase().indexOf(input) > -1 ||
                nameWithoutAccent.toUpperCase().indexOf(input) > -1 ||
                price.indexOf(input) > -1
            ) {
                tr[i].style.display = '';

                if (firstFilteredTr === undefined) {
                    firstFilteredTr = tr[i];
                }
            } else {
                tr[i].style.display = 'none';
            }
        }

        if (e.key === 'Enter') {
            $(firstFilteredTr).find('.addQuantity').trigger('click');
        }

        if (e.key === 'Escape') {
            $(this).val('');
            $(this).trigger('keyup');
        }
    });

    $("#autoOpenPrintDialogCheckbox").on("change", function () {
        AutoOpenPrintDialogSettingRepository.setValue($(this)[0]["checked"]);
    });
}

jQuery(ready());
