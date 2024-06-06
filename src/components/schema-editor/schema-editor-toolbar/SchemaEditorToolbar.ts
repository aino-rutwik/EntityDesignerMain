import { WebComponent } from "../../webComponent";
import './SchemaEditorToolbar.css';

export class SchemaEditorToolbar extends WebComponent{

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

    }

    render(): void {
        this.innerHTML = `
        <div class="schemaEditorToolbar__container">
            <div class="schemaEditorToolbar__container-tabs">
                <div class="schemaEditorToolbar__container-tabs-create-table">
                Text
                </div>
                <div class="schemaEditorToolbar__container-tabs-option2">
                Text
                </div>
                <div class="schemaEditorToolbar__container-tabs-option3">
                Text
                </div>
            </div>
        </div>
        `;
    }

}