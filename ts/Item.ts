export class Item {
    code: string;
    name: string;
    unitName: string;
    pricePerUnit: number;

    public constructor(
        str: string,
    ) {
        const arr = str.split(',');
        this.code = arr[0];
        this.name = arr[1];
        this.unitName = arr[2];
        this.pricePerUnit = Number(arr[3]);
    };

    public getTableRow(): Node {
        const tr = document.createElement('tr');
        tr.className = 'item-tr';
        tr.dataset.code = this.code;
        tr.dataset.name = this.name;
        tr.dataset.price = this.pricePerUnit.toString();

        let td = document.createElement('td');
        td.innerText = `${this.code}`;
        tr.appendChild(td);

        td = document.createElement('td');
        td.className = "addQuantity";
        td.dataset.code = this.code;
        td.innerText = this.unitName === '' ? this.name : `${this.name} (${this.unitName})`;
        tr.appendChild(td);

        td = document.createElement('td');
        td.className = "subtractQuantity text-align-right";
        td.dataset.code = this.code;
        td.innerText = `${this.pricePerUnit.toString()}`;
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = `
<div class="no-margin inline">
    <input data-type="item" data-code="${this.code}" placeholder="0" min="0" type="number" autocomplete="off">
</div>
`;
        tr.appendChild(td);

        return tr;
    }

    public static compare(a: Item, b: Item) {
        if (a.name === 'Ship'){
            return -1;
        }
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }
}
