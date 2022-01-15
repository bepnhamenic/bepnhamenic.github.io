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
import { Cart } from "./Cart.js";
import { renderBill } from "./bill.js";
import { AutoOpenPrintDialogSettingRepository } from "./AutoOpenPrintDialogSettingRepository.js";
function renderMenu(items) {
    for (const item of items) {
        $("#menuBody")[0].appendChild(item.getTableRow());
    }
}
function announceDuplicatedCodes(items) {
    const duplicatedCodes = ItemRepository.getDuplicatedCodes(items);
    if (duplicatedCodes) {
        for (const code of duplicatedCodes) {
            M.toast({ html: `Trùng mã hàng ${code}` });
        }
    }
}
function setAutoOpenPrintDialogCheckbox() {
    $("#autoOpenPrintDialogCheckbox")[0]["checked"] = AutoOpenPrintDialogSettingRepository.getValue();
}
function setFocusOnSearchInput() {
    $("#search-input").trigger("focus");
}
function clearSearchInput() {
    $("#search-input").val("").trigger("keyup");
}
function ready() {
    return __awaiter(this, void 0, void 0, function* () {
        $(".modal").modal();
        const items = yield ItemRepository.loadFromFile("menu/menu.csv");
        renderMenu(items);
        announceDuplicatedCodes(items);
        setAutoOpenPrintDialogCheckbox();
        setFocusOnSearchInput();
        $("#new-cart").on("click", function () {
            Cart.emptyCart();
            location.reload();
        });
        $(".addQuantity").on("click", function () {
            const itemCode = $(this).data("code");
            const inputField = $(`input[data-code=${itemCode}]`);
            const currentVal = parseInt(inputField.val().toString());
            isNaN(currentVal) ? inputField.val(1) : inputField.val(currentVal + 1);
            inputField.trigger("change");
        });
        $(".subtractQuantity").on("click", function () {
            const itemCode = $(this).data("code");
            const inputField = $(`input[data-code=${itemCode}]`);
            const currentVal = parseInt(inputField.val().toString());
            isNaN(currentVal) || currentVal <= 0 ? inputField.val(0) : inputField.val(currentVal - 1);
            inputField.trigger("change");
        });
        $("input[data-type=\"item\"]").on("change", function () {
            const itemCode = $(this).data("code");
            const amount = parseInt($(this).val().toString());
            Cart.updateCart(itemCode, amount);
            renderBill();
        });
        $("#search-input").on("keyup", function (e) {
            let firstFilteredTr;
            const input = $(this).val().toString().toUpperCase();
            const tr = $(".item-tr");
            for (let i = 0; i < tr.length; i++) {
                const code = $(tr[i]).data("code").toString();
                if (code.toUpperCase().indexOf(input) > -1) {
                    tr[i].style.display = "";
                    if (firstFilteredTr === undefined) {
                        firstFilteredTr = tr[i];
                    }
                }
                else {
                    tr[i].style.display = "none";
                }
            }
            if (e.key === "Enter") {
                $(firstFilteredTr).find(".addQuantity").trigger("click");
                clearSearchInput();
            }
            if (e.key === "Escape") {
                $(this).val("");
                $(this).trigger("keyup");
            }
        });
        $("#autoOpenPrintDialogCheckbox").on("change", function () {
            AutoOpenPrintDialogSettingRepository.setValue($(this)[0]["checked"]);
        });
    });
}
jQuery(ready());
//# sourceMappingURL=index.js.map