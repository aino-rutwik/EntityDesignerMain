import { TableRecord } from "../../../../descriptor/TableRecord";
import { WebComponent } from "../../../webComponent";
import './SchemaEditorViewTableList.css';

export class SchemaEditorViewTableList extends WebComponent{

    private tableRecords : Map<string, TableRecord>;

    constructor(){
        super();
        this.tableRecords = new Map<string, TableRecord>();
        this.handleClickEvent = this.handleClickEvent.bind(this);
    }

    connectedCallback(): void {
        this.render();
        this.addEventListener('click', this.handleClickEvent);
    }
    disconnectedCallback(): void {
        this.removeEventListener('click', this.handleClickEvent);
    }

    handleClickEvent(e : MouseEvent){

        e.stopPropagation();
        const target = e.target as HTMLElement;
        const className = target.className;

        if(className === "schemaEditorView__container-table-list-create-table-btn"){
            const event = new CustomEvent('create-table');
            this.dispatchEvent(event);
        }
        else if(className === "schemaEditorView__container-table-list-element"){
            this.initTable(null);
        }
    }
    /**
     * function will generate the table creation window , holding the privously saved values of the columns and tableName
     * @param tableId id of the table
     */
    initTable(tableId: string){

    }

    createTable(tableId : string, tableName : string){
        const tablesList = document.querySelector('.schemaEditorView__container-table-list-name') as HTMLElement;
        
        const tableListElement = document.createElement('div');
        tableListElement.className = 'schemaEditorView__container-table-list-element';
        tableListElement.dataset.tableid = tableId;
        tableListElement.textContent = tableName;
        tablesList.append(tableListElement);

    }

    render(): void {
        this.innerHTML =/*html*/`
        <div class="schemaEditorView__container-table-list">
            <button class="schemaEditorView__container-table-list-create-table-btn">Create Table</button>
            <div class="schemaEditorView__container-table-list-Search-btn">
                <div class="schemaEditorView__container-table-list-Search-btn-search-icon">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>
                <div class="schemaEditorView__container-table-list-Search-btn-input">
                    <input type="text" placeholder="Table name?">
                </div>
            </div>
            <div class="schemaEditorView__container-table-list-name">
            </div>
        </div>
        `;
    }
    
}