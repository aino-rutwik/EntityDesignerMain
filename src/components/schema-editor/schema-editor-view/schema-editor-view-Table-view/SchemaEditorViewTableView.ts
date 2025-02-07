import { ColumnRecord } from "../../../../descriptor/ColumnRecord";
import { TableRecord } from "../../../../descriptor/TableRecord";
import { TableColumn } from "../../../Table-column/TableColumn";
import { WebComponent } from "../../../webComponent";
import './SchemaEditorViewTableView.css';
import { Routes } from "../../../../Routes";

export class SchemaEditorViewTableView extends WebComponent {

    private columnId: number;

    constructor() {
        super();
        this.columnId = 2;
        this.handleClickEvent = this.handleClickEvent.bind(this);
    }

    connectedCallback(): void {
        this.render();
        this.addEventListener('click', this.handleClickEvent);
    }
    disconnectedCallback(): void {
        this.removeEventListener('click', this.handleClickEvent);
    }

    handleClickEvent(e: MouseEvent) {
        e.stopPropagation()
        const target = e.target as HTMLElement;
        const className = target.className;

        const systemPropertiesDropDown = this.closest('fa-caret-down' && 'fa-solid');

        if (className === 'schemaEditorView__container-table-creation-info-footer-cols-btns-addbtn') {
            this.createColumn();
        }

        else if (className === 'schemaEditorView__container-table-creation-info-footer-save-btn') {
            //by defult keeping the same shema
            this.saveTable("98");
        }
        else if (className === 'schemaEditorView__container-table-creation-info-footer-reset-btn') {
            this.clearTableInfo();
            this.createFirstColumn();
        }
        else if (target.closest('.schemaEditorView__container-table-creation-info-moreOption')) {
            this.showDropDownBox();
        }
    }

    showDropDownBox() {
        const moreOptionBox = this.querySelector('.schemaEditorView__container-table-creation-info-DropMoreOption') as HTMLElement;
        moreOptionBox.classList.toggle('open');
    }


    createColumn() {
        const columnId = this.columnId++;
        const columnsBox = this.querySelector('.schemaEditorView__container-table-creation-info-midcontain-columns') as HTMLElement;
        const column = new TableColumn();
        column.dataset.columnid = columnId.toString();
        columnsBox.append(column);
    }

    createExistingColumns(colId: string, colCheckBox: string, colName: string, colDataType: string, colDefaultVal: string) {
        const columnsBox = this.querySelector('.schemaEditorView__container-table-creation-info-midcontain-columns') as HTMLElement;
        const column = new TableColumn();

        column.dataset.colId = colId;
        column.dataset.colCheck = colCheckBox;
        column.dataset.colName = colName;
        column.dataset.colDataType = colDataType;
        column.dataset.colDefaultVal = colDefaultVal;

    
        columnsBox.append(column);

        const columnInput = column.querySelector('.schemaEditorView__container-table-creation-info-midcontain-columns-name') as HTMLInputElement;
        columnInput.value = colName;

        const columnDataType = column.querySelector('.schemaEditorView__container-table-creation-info-midcontain-columns-datatype-options') as HTMLSelectElement;
        columnDataType.value = colDataType;

        const columnDefaultValue = column.querySelector('.schemaEditorView__container-table-creation-info-midcontain-columns-default') as HTMLInputElement;
        columnDefaultValue.value = colDefaultVal;
    }
    createFirstColumn() {
        const columnId = this.columnId++;
        const columnsBox = this.querySelector('.schemaEditorView__container-table-creation-info-midcontain-columns') as HTMLElement;
        const column = new TableColumn();
        column.dataset.columnid = columnId.toString();
        columnsBox.append(column);
    }
    /**
     * remove the current value present on the screen in columns
     */
    clearTableInfo() {

        const tableNameInput = this.querySelector('.schemaEditorView__container-table-creation-info-table-name-input') as HTMLInputElement;
        tableNameInput.value = "";

        const columnsContainer = this.querySelector('.schemaEditorView__container-table-creation-info-midcontain-columns') as HTMLElement;
        for (let i = columnsContainer.childNodes.length - 1; i >= 0; i--) {
            const child = columnsContainer.childNodes[i];
            if (child instanceof TableColumn) {
                child.remove();
            }
        }

    }

    async saveTable(schemaId: string) {
        const tableName = (this.querySelector('.schemaEditorView__container-table-creation-info-table-name-input') as HTMLInputElement).value;
        if (tableName !== "") {
            const columns: ColumnRecord[] = [];
            const columnContainer = this.querySelector('.schemaEditorView__container-table-creation-info-midcontain-columns') as HTMLElement;

            let allColumnValid = true;

            columnContainer.childNodes.forEach((child) => {
                if (child instanceof TableColumn) {
                    const columnId = child.dataset.columnid;
                    const checkboxValue = (child.querySelector('.midcontain-columns-info-checkbox') as HTMLInputElement).value;
                    const name = (child.querySelector('.schemaEditorView__container-table-creation-info-midcontain-columns-name') as HTMLInputElement).value;
                    const dataType = (child.querySelector('.schemaEditorView__container-table-creation-info-midcontain-columns-datatype-options') as HTMLSelectElement).value;
                    const defaultValue = (child.querySelector('.schemaEditorView__container-table-creation-info-midcontain-columns-default') as HTMLInputElement).value;

                    if (name !== "") {
                        const record = new ColumnRecord(columnId, checkboxValue, name, dataType, defaultValue);
                        columns.push(record);
                    } else {
                        allColumnValid = false;
                    }
                }
            });

            if (allColumnValid) {
                const event = new CustomEvent("save-table-event", {
                    bubbles: true,
                    detail: {
                        name: tableName,
                        columns: columns
                    }
                });

                this.dispatchEvent(event);

                // Call saveTableDb from Routes class
                await Routes.saveTableDb(schemaId, tableName, columns);
            } else {
                alert("All columns must have a name.");
            }
        } else {
            alert("Table name can't be empty");
        }
    }


    /**
    * displays the table creation contaier on the screen for the specific tableId
    * @param tableId 
    */
    displayTableInfo(tableId: string, tableRecord: TableRecord) {

        const tableName = tableRecord.name;
        const tableColumns = tableRecord.columns;

        const tableNameInput = this.querySelector('.schemaEditorView__container-table-creation-info-table-name-input') as HTMLInputElement;
        tableNameInput.value = tableName;

        tableColumns.forEach(element => {
            let colId = element.colId;
            let colCheck = element.colCheck;
            let colName = element.colName;
            let colDataType = element.colDataType;
            let colDefaultVal = element.colDefaultValue;
            this.createExistingColumns(colId,colCheck,colName, colDataType, colDefaultVal);
        });


    }

    render(): void {
        this.innerHTML = /*html*/`
        <div class="schemaEditorView__container-table-creation">
        <div class="schemaEditorView__container-table-creation-info">
            <div class="schemaEditorView__container-table-creation-info-header">
                <div class="schemaEditorView__container-table-creation-info-table-name-box">
                    <h2> Name: </h2>
                    <input class="schemaEditorView__container-table-creation-info-table-name-input" type="text" placeholder="Enter Table Name">
                </div>
                <div class="container">
                <input type="checkbox" checked="checked">
                    <h2>Include System Properties</h2>
                <span class="checkmark"></span>
                </div>
                <div class="container">
                <input type="checkbox" checked="checked">
                    <h2> Expose DataType</h2>
                <span class="checkmark"></span>
                </div>
            </div>
            <div class="schemaEditorView__container-table-creation-info-midcontain">
                <div class="schemaEditorView__container-table-creation-info-midcontain-heading">
                    <div class="schemaEditorView__container-table-creation-info-midcontain-heading-col-expose">
                        <h2>Expose Data</h2>
                    </div>
                    <div class="schemaEditorView__container-table-creation-info-midcontain-heading-col-name">
                        <h2>Column Name</h2>
                    </div>
                    <div class="schemaEditorView__container-table-creation-info-midcontain-heading-col-type">
                        <h2>Select Data Type</h2>
                    </div>
                    <div class="schemaEditorView__container-table-creation-info-midcontain-heading-col-default">
                        <h2>Default value</h2>
                    </div>
                </div>
                <div class="schemaEditorView__container-table-creation-info-DropMoreOption">
                    <div class="schemaEditorView__container-table-creation-info-moreOption">
                        <p>note: System Properties :</p>
                        <i class="fa-solid fa-caret-down"></i>
                    </div>
                    <div class="schemaEditorView__dropdown-content">
                            <table-column></table-column>
                            <table-column></table-column>
                            <table-column></table-column>
                            <table-column></table-column>
                            <table-column></table-column>
                    </div>
                </div>
                
                <div class="schemaEditorView__container-table-creation-info-midcontain-columns">
                    <table-column data-columnid='1'></table-column>
                </div>
            </div>
        </div>
            <div class="schemaEditorView__container-table-creation-info-footer">
                <div  class="schemaEditorView__container-table-creation-info-footer-left">
                    <button class="schemaEditorView__container-table-creation-info-footer-cancel-btn">CANCEL</button>
                    <button class="schemaEditorView__container-table-creation-info-footer-reset-btn">RESET</button>
                </div>
                <div  class="schemaEditorView__container-table-creation-info-footer-right">
                    <button class="schemaEditorView__container-table-creation-info-footer-cols-btns-addbtn">ADD COLUMN</button>
                    <button class="schemaEditorView__container-table-creation-info-footer-save-btn">SAVE</button>
                </div>
            </div>
        </div>
        `;
    }


}
