var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Table } from "apache-arrow";
function renderHeader(ds, thead, columns) {
    var tr = document.createElement('tr');
    thead.appendChild(tr);
    // Row number
    var th = document.createElement('th');
    tr.appendChild(th);
    for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
        var col = columns_1[_i];
        var th_1 = document.createElement('th');
        th_1.innerText = col;
        tr.appendChild(th_1);
    }
}
function renderBody(ds, tbody, columns) {
    for (var i = 0; i < ds.length; i++) {
        var tr = document.createElement('tr');
        tbody.appendChild(tr);
        // Row number
        var td = document.createElement('td');
        td.innerText = i.toString();
        tr.appendChild(td);
        var row = ds.get(i);
        for (var j = 0; j < columns.length; j++) {
            renderCell(row.getValue(j), tr);
        }
    }
}
function renderCell(data, tr) {
    var td = document.createElement('td');
    td.innerText = JSON.stringify(data);
    tr.appendChild(td);
}
function renderTable(ds) {
    var thead = document.querySelector('thead');
    var tbody = document.querySelector('tbody');
    thead.innerHTML = '';
    tbody.innerHTML = '';
    var columnNames = ds.schema.fields.map(function (f) { return f.name; });
    renderHeader(ds, thead, columnNames);
    renderBody(ds, tbody, columnNames);
}
function renderControls(ds) {
    function stringifyMetadata(ds) {
        return Array.from(ds.schema.metadata.entries()).map(function (_a) {
            var k = _a[0], v = _a[1];
            return k + " => \n " + JSON.stringify(JSON.parse(v), null, 4);
        }).join("");
    }
    var metadataDiv = document.querySelector('.controls');
    var checkbox = document.querySelector('.controls input');
    var messageBox = document.querySelector('.controls pre');
    var downloadLink = document.querySelector('.controls a');
    downloadLink.href = document.querySelector('input').value;
    metadataDiv.style.display = 'inline';
    metadataDiv.onchange = function () {
        if (checkbox.checked) {
            messageBox.innerText = stringifyMetadata(ds);
        }
        else {
            messageBox.innerText = '';
        }
    };
}
function cleanTable() {
    console.log('cleanTable');
    var thead = document.querySelector('thead');
    var tbody = document.querySelector('tbody');
    thead.innerHTML = '';
    tbody.innerHTML = '';
    var metadataDiv = document.querySelector('.controls');
    metadataDiv.style.display = 'none';
}
function showArrow(url) {
    return __awaiter(this, void 0, void 0, function () {
        var table;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (url == null) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Table.from(fetch(url))];
                case 1:
                    table = _a.sent();
                    console.log(table);
                    window['table'] = table;
                    console.log(table.schema);
                    renderControls(table);
                    renderTable(table);
                    console.log('length: ', table.length);
                    return [2 /*return*/];
            }
        });
    });
}
function main() {
    var _this = this;
    var button = document.querySelector('button');
    var input = document.querySelector('input');
    var params = new URLSearchParams(document.location.search);
    if (params.has('file')) {
        var url = params.get('file');
        input.value = url;
    }
    var downloadAndShow = function () { return __awaiter(_this, void 0, void 0, function () {
        var url, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    button.innerText = "loading ...";
                    cleanTable();
                    url = input.value;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, showArrow(url)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    alert(error_1.message);
                    return [3 /*break*/, 4];
                case 4:
                    button.innerText = "SHOW";
                    return [2 /*return*/];
            }
        });
    }); };
    button.onclick = downloadAndShow;
    input.onkeydown = function (ev) {
        if (ev.key == 'Enter') {
            downloadAndShow();
        }
    };
}
main();
