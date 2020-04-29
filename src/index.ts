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

function renderControls(ds: Table) {
    
    function stringifyMetadata(ds: Table): string {
        return Array.from(
            ds.schema.metadata.entries()).map(
                ([k, v]) => `${k} => \n ${JSON.stringify(JSON.parse(v), null, 4)}`
            ).join("");
    }

    const metadataDiv = document.querySelector('.controls')! as HTMLElement;
    const checkbox = document.querySelector('.controls input')! as HTMLInputElement;
    const messageBox = document.querySelector('.controls pre')! as HTMLInputElement;
    const downloadLink = document.querySelector('.controls a')! as HTMLAnchorElement;

    downloadLink.href = document.querySelector('input')!.value;
    metadataDiv.style.display = 'inline';
    metadataDiv.onchange = () => {
        if (checkbox.checked) {
            messageBox.innerText = stringifyMetadata(ds);
        } else {
            messageBox.innerText = '';
        }
    }
}

function cleanTable() {
    console.log('cleanTable');
    const thead = document.querySelector('thead')!;
    const tbody = document.querySelector('tbody')!;
    thead.innerHTML = '';
    tbody.innerHTML = '';
    const metadataDiv = document.querySelector('.controls')! as HTMLElement;
    metadataDiv.style.display = 'none';
}

async function showArrow(url?: string) {
    if (url == null) { return; }
    const table = await Table.from(fetch(url));
    console.log(table);
    window['table'] = table;

    console.log(table.schema);

    renderControls(table);
    renderTable(table);

    console.log('length: ', table.length);
    
}

function main() {
    const button = document.querySelector('button')!;
    const input = document.querySelector('input')!;

    const params = new URLSearchParams(document.location.search);
    if (params.has('file')) {
        const url = params.get('file')!;
        input.value = url;
    }

    const downloadAndShow = async () => {
        button.innerText = "loading ..."
        cleanTable();
        const url = input.value;
        try {
            await showArrow(url);
        } catch(error) {
            alert(error.message);
        }
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