import { TableColumn } from "../../../Table-column/TableColumn";
import { WebComponent } from "../../../webComponent";
import './SchemaEditorViewTableView.css';

export class SchemaEditorViewTableView extends WebComponent{
    constructor(){
        super();
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
        const target = e.target as HTMLElement;
        const className = target.className;

        if(className === 'schemaEditorView__container-table-creation-info-midcontain-cols-btns-addbtn'){
            this.createColumn();
        }
    }

    createColumn(){
        const columnsBox = this.querySelector('.schemaEditorView__container-table-creation-info-midcontain-columns') as HTMLElement;
        const column = new TableColumn();
        columnsBox.append(column);
    }
    
    render(): void {
        this.innerHTML = /*html*/`
        <div class="schemaEditorView__container-table-creation">
        <div class="schemaEditorView__container-table-creation-info">
            <div class="schemaEditorView__container-table-creation-info-header">
                <div class="schemaEditorView__container-table-creation-info-table-name-box">
                    <div> Name: </div>
                    <input class="schemaEditorView__container-table-creation-info-table-name-input" type="text" placeholder="Enter Table Name">
                </div>
                <div class="container">
                <input type="checkbox" checked="checked">
                Include System Properties
                <span class="checkmark"></span>
                </div>
                <div class="container">
                <input type="checkbox" checked="checked">
                Expose DataType
                <span class="checkmark"></span>
                </div>
            </div>
            <div class="schemaEditorView__container-table-creation-info-midcontain">
                <div class="schemaEditorView__container-table-creation-info-midcontain-heading">
                    <div class="schemaEditorView__container-table-creation-info-midcontain-heading-col-expose">
                        Expose Data
                    </div>
                    <div class="schemaEditorView__container-table-creation-info-midcontain-heading-col-name">
                        Column Name
                    </div>
                    <div class="schemaEditorView__container-table-creation-info-midcontain-heading-col-type">
                        Select Data Type
                    </div>
                    <div class="schemaEditorView__container-table-creation-info-midcontain-heading-col-default">
                        Default value
                    </div>
                </div>
                <div class="schemaEditorView__container-table-creation-info-midcontain-columns">
                    <table-column></table-column>
                </div>
            </div>
        </div>
            <div class="schemaEditorView__container-table-creation-info-footer">
                <button class="schemaEditorView__container-table-creation-info-midcontain-cols-btns-addbtn">Add columns</button>
                <button class="schemaEditorView__container-table-creation-info-midcontain-save-btn">Save</button>
            </div>
        </div>
        `;
    }
    
}