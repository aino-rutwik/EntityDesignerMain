import { textChangeRangeIsUnchanged } from "typescript";
import { WebComponent } from "../webComponent";
import './SchemaEditor.css';

export class SchemaEditor extends WebComponent {

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
        const className  = target.className;

    }

    render(): void {
        this.innerHTML=`
        <div class="schema-editor-container">
        <schema-editor-toolbar></schema-editor-toolbar>
        <schema-editor-view></schema-editor-view>
        </div>
        `;
        
    }
    
}