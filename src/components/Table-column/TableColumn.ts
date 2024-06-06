import { WebComponent } from "../webComponent";
import './TableColumn.css'

export class TableColumn extends WebComponent{
    
    constructor(){
        super();
    }
    connectedCallback(): void {
        this.render();
    }
    disconnectedCallback(): void {
        
    }

    render(): void {
        this.innerHTML=/*html*/`
        <div class="schemaEditorView__container-table-creation-info-midcontain-columns-info">
        <div class="container">
        <input type="checkbox" checked="checked">
        <span class="checkmark"></span>
        </div>
        <input class="schemaEditorView__container-table-creation-info-midcontain-columns-name" type="text" placeholder="Enter column name">
        <div class="schemaEditorView__container-table-creation-info-midcontain-columns-datatype" for='options'>
            <select class="schemaEditorView__container-table-creation-info-midcontain-columns-datatype-options">
                <option value="number">Number</option>
                <option value="string">String</option>
                <option value="boolean">Boolean</option>
            </select>
        </div>

        <input class="schemaEditorView__container-table-creation-info-midcontain-columns-default" type="text" placeholder="Enter default value">
        </div>
        `;
    }
    
}