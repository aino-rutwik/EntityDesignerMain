import { WebComponent } from "../../../webComponent";
import './SchemaEditorViewTableList.css';

export class SchemaEditorViewTableList extends WebComponent{

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
    }

    render(): void {
        this.innerHTML =/*html*/`
        <div class="schemaEditorView__container-table_list">
        <div>table's List</div>
        <button class="schemaEditorView__container-create-table-btn"> create table </button>
        </div>
        `;
    }
    
}