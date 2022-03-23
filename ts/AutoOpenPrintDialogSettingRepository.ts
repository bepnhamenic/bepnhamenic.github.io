export class AutoOpenPrintDialogSettingRepository {

    private static LOCAL_STORAGE_KEY = "autoOpenPrintDialog";

    private static DEFAULT_SETTING = true;


    public static getValue(): boolean {
        return JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY)) ?? this.DEFAULT_SETTING;
    }


    public static setValue(value: boolean): void {
        localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(value));
    }
}
