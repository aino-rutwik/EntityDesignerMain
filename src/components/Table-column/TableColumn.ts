import { WebComponent } from "../webComponent";
import './TableColumn.css';

export class TableColumn extends WebComponent {
    
    constructor() {
        super();
        this.handleClickEvent = this.handleClickEvent.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }
    
    connectedCallback(): void {
        this.render();
        this.addEventListener('click', this.handleClickEvent);
        document.addEventListener('click', this.handleDocumentClick);
    }
    
    disconnectedCallback(): void {
        this.removeEventListener('click', this.handleClickEvent);
        document.removeEventListener('click', this.handleDocumentClick);
    }

    handleClickEvent(e: MouseEvent): void {
        e.stopPropagation(); // Stop event propagation to prevent document click event
        const target = e.target as HTMLElement;
        const className = target.className;

        if (className === "schemaEditorView__container-table-creation-info-midcontain-columns-more") {
            this.setupDropdown();
        } else if (className === "delete-option") {
            this.handleDeleteClick();
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

    handleDocumentClick(e: MouseEvent): void {
        const dropdownContent = this.querySelector('.dropdown-content');
        
        // Close dropdown if the click target is not within the column component
        if (!this.contains(e.target as Node) && !dropdownContent.contains(e.target as Node)) {
            dropdownContent.classList.remove('show');
        }
    }

    render(): void {
        this.innerHTML = /*html*/`
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
            <div class="schemaEditorView__container-table-creation-info-midcontain-columns-more">
                <i class="fa-solid fa-ellipsis-vertical"></i>
                <div class="dropdown-content">
                    <div class="delete-option">Delete</div>
                    <div>Update</div>
                </div>
            </div>
        </div>`;
    }
}
