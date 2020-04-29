import { Table } from "apache-arrow";

function renderHeader(ds: Table, thead: HTMLTableSectionElement, columns: string[]) {
   const tr = document.createElement('tr');
   thead.appendChild(tr);

   // Row number
   const th = document.createElement('th');
   tr.appendChild(th);

   for (const col of columns) {
    const th = document.createElement('th');
    th.innerText = col;
    tr.appendChild(th);
   }
}

function renderBody(ds: Table, tbody: HTMLTableSectionElement, columns: string[]) {
    for (let i = 0; i < ds.length; i++) {
        const tr = document.createElement('tr');
        tbody.appendChild(tr);

        // Row number
        const td = document.createElement('td');
        td.innerText = i.toString();
        tr.appendChild(td);
        
        const row = ds.get(i);
        for (let j = 0; j < columns.length; j++) {
            renderCell(row.getValue(j), tr);
        }
    }
}

function renderCell(data: any, tr: HTMLTableRowElement) {
    const td = document.createElement('td');
    td.innerText = JSON.stringify(data)
    tr.appendChild(td);
}

function renderTable(ds: Table) {
    const thead = document.querySelector('thead')!;
    const tbody = document.querySelector('tbody')!;
    thead.innerHTML = '';
    tbody.innerHTML = '';
    const columnNames = ds.schema.fields.map(f => f.name);
    renderHeader(ds, thead, columnNames);
    renderBody(ds, tbody, columnNames);
}

function cleanTable() {
    console.log('cleanTable');
    const thead = document.querySelector('thead')!;
    const tbody = document.querySelector('tbody')!;
    thead.innerHTML = '';
    tbody.innerHTML = '';
}

async function showArrow(url?: string) {
    if (url == null) { return; }
    const table = await Table.from(fetch((url)));
    console.log(table);
    window['table'] = table;

    console.log(table.schema);
    renderTable(table);

    console.log('length: ', table.length);
    
}

function main() {
    const button = document.querySelector('button')!;
    const input = document.querySelector('input')!;

    const downloadAndShow = async () => {
        button.innerText = "loading ..."
        cleanTable();
        const url = input.value;
        await showArrow(url);
        button.innerText = "SHOW"
    };

    button.onclick = downloadAndShow;
    input.onkeydown = (ev) => {
        if (ev.key == 'Enter') {
            downloadAndShow();
        }
    };


}

main();