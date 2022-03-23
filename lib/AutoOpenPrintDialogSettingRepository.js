export class AutoOpenPrintDialogSettingRepository {
    static getValue() {
        var _a;
        return (_a = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY))) !== null && _a !== void 0 ? _a : this.DEFAULT_SETTING;
    }
    static setValue(value) {
        localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(value));
    }
}
AutoOpenPrintDialogSettingRepository.LOCAL_STORAGE_KEY = "autoOpenPrintDialog";
AutoOpenPrintDialogSettingRepository.DEFAULT_SETTING = true;
//# sourceMappingURL=AutoOpenPrintDialogSettingRepository.js.map