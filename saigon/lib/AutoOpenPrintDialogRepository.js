export class AutoOpenPrintDialogRepository {
    static getAutoOpenPrintDialog() {
        return JSON.parse(localStorage.getItem(Cart.ORDERED_ITEMS)) || {};
    }
    static setAutoOpenPrintDialog(value) {
        localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(value));
    }
}
AutoOpenPrintDialogRepository.LOCAL_STORAGE_KEY = "autoOpenPrintDialog";
//# sourceMappingURL=AutoOpenPrintDialogRepository.js.map