import { ColumnRecord } from "../../../descriptor/ColumnRecord";
import { TableRecord } from "../../../descriptor/TableRecord";
import { WebComponent } from "../../webComponent";
import './SchemaEditorView.css'
import { SchemaEditorViewTableList } from "./schema-editor-view-Table-list/SchemaEditorViewTableList";
import { SchemaEditorViewTableView } from "./schema-editor-view-Table-view/SchemaEditorViewTableView";

export class SchemaEditorView extends WebComponent {
    private list: SchemaEditorViewTableList;
    private view: SchemaEditorViewTableView;
    private tableId : number;
    private tableRecords : Map<string, TableRecord>;

    constructor(){
        super();
        this.tableId = 1;
        this.handleClickEvent = this.handleClickEvent.bind(this);
        // this.handleCustomEvent = this.handleCustomEvent.bind(this);
        this.handleSaveTableEvent = this.handleSaveTableEvent.bind(this);
        this.handleDisplayTableInfo = this.handleDisplayTableInfo.bind(this);
        this.handleCreateTableEvent = this.handleCreateTableEvent.bind(this);
        this.handleClearDisplayedTableInfo = this.handleClearDisplayedTableInfo.bind(this);
    }

    connectedCallback(): void {
        this.render();

        this.tableRecords = new Map<string, TableRecord>();

        this.list = this.querySelector("schema-editor-view-table-list");
        this.view = this.querySelector("schema-editor-view-table-view");

        this.addEventListener('click', this.handleClickEvent);
        this.addEventListener('save-table-event', this.handleSaveTableEvent);
        this.addEventListener('display-table-info', this.handleDisplayTableInfo);
        this.addEventListener('create-table', this.handleCreateTableEvent);
        this.addEventListener('clear-displayed-table-info', this.handleClearDisplayedTableInfo);
    }

    disconnectedCallback(): void {
        this.removeEventListener('click', this.handleClickEvent);
        // this.removeEventListener('custom', this.handleCustomEvent);
        this.removeEventListener('save-table-event', this.handleSaveTableEvent);
        this.addEventListener('display-table-info', this.handleDisplayTableInfo);
        this.removeEventListener('create-table', this.handleCreateTableEvent);
        this.removeEventListener('clear-displayed-table-info', this.handleClearDisplayedTableInfo);
    }

    handleSaveTableEvent(e: CustomEvent) {
        let data = e.detail as {
            name: string,
            columns: ColumnRecord[];
        };
    
        const tableId = this.view.dataset.tableid;
    
        if (this.tableRecords.has(tableId)) {
            // Update the existing TableRecord
            const existingRecord = this.tableRecords.get(tableId);
            if (existingRecord) {
                existingRecord.name = data.name;
                existingRecord.columns = data.columns;
                this.tableRecords.set(tableId, existingRecord);
            }
        } else {
            // Create a new TableRecord
            const newTableId = this.tableId.toString();
            const tableRecord = new TableRecord(newTableId, data.name, data.columns);
            this.list.createTable(newTableId, data.name);
            this.tableRecords.set(newTableId, tableRecord);
            this.tableId++;
        }
    }
    

    handleDisplayTableInfo(e: CustomEvent){

        this.view.clearTableInfo();

        let data = e.detail as {
            tableId: string
        }
        const tableId = data.tableId;
        
        const tableRecord = this.tableRecords.get(tableId);
        this.view.displayTableInfo(tableId, tableRecord);
        this.view.dataset.tableid = tableId;

    }
    /**
     * clear the table info present on the screen , same as reset button
     */
    handleClearDisplayedTableInfo(e : CustomEvent){
        this.view.clearTableInfo();
        this.view.createFirstColumn();
        this.view.dataset.tableid = null
    }

    handleCreateTableEvent(e: CustomEvent){
        // this.generateTableCreationBox();
    }

    handleClickEvent(e : MouseEvent){
        e.stopPropagation();

        const target = e.target as HTMLElement;
        const className = target.className;

        if(className === "schemaEditorView__container-create-table-btn"){
            // this.generateTableCreationBox();
        }
    }

    // generateTableCreationBox(){
    //     const tableCreationBox = this.querySelector(".schemaEditorView__container") as HTMLElement;
    //     this.view.remove();

    //     this.view = new SchemaEditorViewTableView();
    //     this.view.dataset.tableId = this.tableId.toString();
    //     tableCreationBox.append(this.view);
    // }

    render(): void {
        this.innerHTML = /*html*/`
        <div class="schemaEditorView__container">
            <schema-editor-view-table-list></schema-editor-view-table-list>
            <schema-editor-view-table-view></schema-editor-view-table-view>
        </div>
        `;
    }
    
}