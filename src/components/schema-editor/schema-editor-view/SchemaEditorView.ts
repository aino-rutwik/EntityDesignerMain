import { WebComponent } from "../../webComponent";
import './SchemaEditorView.css'
import { SchemaEditorViewTableList } from "./schema-editor-view-Table-list/SchemaEditorViewTableList";
import { SchemaEditorViewTableView } from "./schema-editor-view-Table-view/SchemaEditorViewTableView";

export class SchemaEditorView extends WebComponent {
    private list: SchemaEditorViewTableList;
    private view: SchemaEditorViewTableView;

    constructor(){
        super();
        this.handleClickEvent = this.handleClickEvent.bind(this);

    }

    connectedCallback(): void {
        this.render();

        this.list = this.querySelector("schema-editor-view-table-list");
        this.view = this.querySelector("schema-editor-view-table-view");

        this.addEventListener('click', this.handleClickEvent);
    }

    disconnectedCallback(): void {
        this.removeEventListener('click', this.handleClickEvent);
    }

    handleClickEvent(e : MouseEvent){
        e.stopPropagation();

        const target = e.target as HTMLElement;
        const className = target.className;

        if(className === "schemaEditorView__container-create-table-btn"){
            this.generateTableCreationBox();
        }
    }

    generateTableCreationBox(){
        const tableCreationBox = this.querySelector(".schemaEditorView__container") as HTMLElement;
        this.view.remove();

        this.view = new SchemaEditorViewTableView();
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