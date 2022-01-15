export class Item {
    code: string;

    name: string;

    unitName: string;

    pricePerUnit: number;


    public constructor(
        str: string,
    ) {
        const arr = str.split(";");
        this.code = arr[0];
        this.name = arr[1];
        this.unitName = arr[2];
        this.pricePerUnit = Number(arr[3]);
    };


    public getTableRow(): Node {
        const tr = document.createElement("tr");
        tr.className = "item-tr";
        tr.dataset.code = this.code;
        tr.dataset.name = this.name;
        tr.dataset.price = this.pricePerUnit.toString();

        let td = document.createElement("td");
        td.innerText = `${this.code}`;
        tr.appendChild(td);

        td = document.createElement("td");
        td.className = "addQuantity";
        td.dataset.code = this.code;
        td.innerText = this.unitName === "" ? this.name : `${this.name} (${this.unitName})`;
        tr.appendChild(td);

        td = document.createElement("td");
        td.className = "subtractQuantity text-align-right";
        td.dataset.code = this.code;
        td.innerText = `${this.pricePerUnit.toString()}`;
        tr.appendChild(td);

        td = document.createElement("td");
        td.innerHTML = `
<div class="no-margin inline">
    <input data-type="item" data-code="${this.code}" placeholder="0" min="0" type="number" autocomplete="off">
</div>
`;
        tr.appendChild(td);

        return tr;
    }


    public static compare(a: Item, b: Item) {
        if (!isNaN(Number(a.code)) && !isNaN(Number(b.code))) {
            return Number(a.code) - Number(b.code);
        } else if (a.code.charAt(0) === b.code.charAt(0)) {
            return Number(a.code.substring(1)) - Number(b.code.substring(1));
        } else {
            return a.code.charAt(0).localeCompare(b.code.charAt(0));
        }
    }
}