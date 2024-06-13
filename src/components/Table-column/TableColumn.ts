import { WebComponent } from "../webComponent";
import './TableColumn.css';

export class TableColumn extends WebComponent {
    
    constructor() {
        super();
        this.handleClickEvent = this.handleClickEvent.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }
    
    connectedCallback(): void {
        this.render();
        this.addEventListener('click', this.handleClickEvent);
    }
    
    disconnectedCallback(): void {
        this.removeEventListener('click', this.handleClickEvent);
    }

    handleClickEvent(e: MouseEvent): void {
        e.stopPropagation(); // Stop event propagation to prevent document click event
        const target = e.target as HTMLElement;
        const className = target.className;

        if (className === "schemaEditorView__container-table-creation-info-midcontain-columns-more") {
            this.setupDropdown();
        } else if (className === "delete-option") {
            this.handleDeleteClick();
        }else if (className === "cancel-option"){
            this.setupDropdown();
        }
    }

    setupDropdown(): void {
        const dropdownContent = this.querySelector('.dropdown-content');
        dropdownContent.classList.toggle('show');
    }

    handleDeleteClick(): void {
        // Remove the entire column
        this.remove();
    }

    getChecKBoxValue(): boolean{
        const checkbox = this.querySelector('input[type="checkbox"]') as HTMLInputElement;
        return checkbox.checked;
    }

    render(): void {
        this.innerHTML = /*html*/`
        <div class="schemaEditorView__container-table-creation-info-midcontain-columns-info">
            <div class="container">
                <input type="checkbox" checked="checked" class="midcontain-columns-info-checkbox">
                <span class="checkmark"></span>
            </div>
            <input class="schemaEditorView__container-table-creation-info-midcontain-columns-name" type="text" placeholder="Enter column name">
            <div class="schemaEditorView__container-table-creation-info-midcontain-columns-datatype" for='options'>
                <select class="schemaEditorView__container-table-creation-info-midcontain-columns-datatype-options">
                    <option value="java.lang.Number">Number</option>
                    <option value="java.lang.String">String</option>
                    <option value="java.lang.Boolean">Boolean</option>
                </select>
            </div>
            <input class="schemaEditorView__container-table-creation-info-midcontain-columns-default" type="text" placeholder="Enter default value">
            <div class="schemaEditorView__container-table-creation-info-midcontain-columns-more">
                <i class="fa-solid fa-ellipsis-vertical"></i>
                <div class="dropdown-content">
                    <div class="delete-option">Delete</div>
                    <div class="update-option">update</div>
                    <div class="cancel-option">cancel</div>
                </div>
            </div>
        </div>`;
    }
}
