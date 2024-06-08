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

        if(className === "schemaEditorView__container-table-list-element"){
            const tableId = target.dataset.tableid;

            const event = new CustomEvent('display-table-info', {
                bubbles : true,
                detail :{
                    tableId:tableId
                }
            });

            this.dispatchEvent(event);
        }
        else if (className === "schemaEditorView__container-table-list-create-table-btn"){
            
            const event = new CustomEvent('clear-displayed-table-info',{bubbles: true});
            this.dispatchEvent(event);
        }
    }

    /**
     * add new entry of the table in the table list
     * @param tableId 
     * @param tableName 
     */
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