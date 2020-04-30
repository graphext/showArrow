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
    const checkboxFirstRows = document.querySelector('.controls #showFirstRows')! as HTMLInputElement;

    const numRows = Math.min(ds.length, checkboxFirstRows.checked ? 1000 : Infinity);
    for (let i = 0; i < numRows; i++) {
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

    const metadataDiv = document.querySelector('.controls')! as HTMLElement;
    const checkboxMetadata = document.querySelector('.controls #showMetadata')! as HTMLInputElement;
    const checkboxFirstRows = document.querySelector('.controls #showFirstRows')! as HTMLInputElement;
    const messageBox = document.querySelector('.controls #tableMetadata')! as HTMLInputElement;
    const downloadLink = document.querySelector('.controls a')! as HTMLAnchorElement;

    downloadLink.href = document.querySelector('input')!.value;
    metadataDiv.style.display = 'inline';
    checkboxMetadata.onchange = () => {
        if (checkboxMetadata.checked) {
            messageBox.innerText = stringifyMap(ds.schema.metadata);
        } else {
            messageBox.innerText = '';
        }
    }
    checkboxFirstRows.onchange = () => {
        cleanTable();
        renderTable(ds);
    }
}

function stringifyMap(obj: Map<string, string | Map<string, string>>, indent = 4): string {
    return Array.from(obj).map(
        ([k, v]) => {
            if (v instanceof Map) {
                return `\n "${k}": ${stringifyMap(v, indent + 4)}`;
            }
            return `\n "${k}": ${JSON.stringify(JSON.parse(v), null, indent)}`;
        }
    ).join("");
}

function renderColumns(ds: Table) {
    const columnsDiv = document.querySelector('.columns')! as HTMLElement;
    const columnTemplate = document.getElementById('columnInfoTemplate')! as HTMLTemplateElement;

    for (let i = 0; i < ds.numCols; i++) {
        const column = ds.getColumnAt(i)!;

        const columnElement = columnTemplate.content.cloneNode(true) as HTMLElement;
        const columnName = columnElement.querySelector('.name')! as HTMLElement;
        const columnType = columnElement.querySelector('.type')! as HTMLElement;
        const messageBox = columnElement.querySelector('pre')!;

        columnName.innerText = column.name;
        columnType.innerText = `${column.type.toString()} · ${JSON.parse(column.metadata.get('type')!)}`;
        messageBox.innerText = stringifyMap(column.metadata);

        columnsDiv.appendChild(columnElement);
    }
}

function cleanTable() {
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
    renderColumns(table);
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
    
    async function downloadAndShow() {
        button.innerText = "loading ..."
        cleanTable();
        const url = input.value;
        try {
            await showArrow(url);
        } catch(error) {
            console.error(error);
            alert(error.message);
        }
        button.innerText = "SHOW"
        params.set('file', url);

        history.pushState(null, document.title, `${document.location.origin}${document.location.pathname}?${params.toString()}`);
    };

    button.onclick = downloadAndShow;
    input.onkeydown = (ev) => {
        if (ev.key == 'Enter') {
            downloadAndShow();
        }
    };

}

main();