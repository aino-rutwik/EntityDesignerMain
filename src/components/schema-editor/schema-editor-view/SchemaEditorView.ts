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
        this.handleCustomEvent = this.handleCustomEvent.bind(this);
        this.handleCreateTableEvent = this.handleCreateTableEvent.bind(this);
    }

    connectedCallback(): void {
        this.render();

        this.tableRecords = new Map<string, TableRecord>();

        this.list = this.querySelector("schema-editor-view-table-list");
        this.view = this.querySelector("schema-editor-view-table-view");

        this.addEventListener('click', this.handleClickEvent);
        this.addEventListener('custom', this.handleCustomEvent);
        this.addEventListener('create-table', this.handleCreateTableEvent);
    }

    disconnectedCallback(): void {
        this.removeEventListener('click', this.handleClickEvent);
        this.removeEventListener('custom', this.handleCustomEvent);
        this.removeEventListener('create-table', this.handleCreateTableEvent);
    }

    handleCustomEvent(e: CustomEvent) {
        let data = e.detail as {
            name: string,
            columns: ColumnRecord[]
        }
        
        const tableRecord = new TableRecord(this.tableId.toString(), data.name, data.columns);
        this.tableRecords.set(this.tableId.toString(), tableRecord);

        this.list.createTable(tableRecord.id, tableRecord.name)

        this.tableId++;
    }

    handleCreateTableEvent(e: CustomEvent){
        this.generateTableCreationBox();
    }

    handleClickEvent(e : MouseEvent){
        e.stopPropagation();

        const target = e.target as HTMLElement;
        const className = target.className;

        if(className === "schemaEditorView__container-create-table-btn"){
            this.generateTableCreationBox();
        }
        else if(className === "schemaEditorView__container-table-creation-info-midcontain-save-btn"){
            this.saveTableInfo();
        }
    }

    saveTableInfo(){
        const tablesList = document.querySelector('.schemaEditorView__container-table-list-name') as HTMLElement;

        const tableListElement = document.createElement('div');
        tableListElement.className = 'schemaEditorView__container-table-list-element';
        tableListElement.dataset.tableid = this.tableId.toString();
        tablesList.append(tableListElement);
        this.tableId++;

    }

    saveColumnInfo(tableId: String, columnId:string){
        // adds the column info in the columns map with
    }


    generateTableCreationBox(){
        const tableCreationBox = this.querySelector(".schemaEditorView__container") as HTMLElement;
        this.view.remove();

        this.view = new SchemaEditorViewTableView();
        this.view.dataset.tableId = this.tableId.toString();
        tableCreationBox.append(this.view);
    }

    render(): void {
        this.innerHTML = /*html*/`
        <div class="schemaEditorView__container">
            <schema-editor-view-table-list></schema-editor-view-table-list>
            <schema-editor-view-table-view></schema-editor-view-table-view>
        </div>
        `;
    }
    
}