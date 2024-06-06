import { WebComponent } from "../webComponent";
import './Header.css';

export class Header extends WebComponent {

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

    handleClickEvent(e: MouseEvent){
        e.stopPropagation();

    }

    render(): void {
        this.innerHTML = /*html*/`
        <div class="header-tabs">
        <div class="header-schema">
        <div>Schema</div>
        </div>
        <div class="header-tab2">
        <div>tab-2</div>
        </div>
        <div class="header-tab3">
        <div>tab-3</div>
        </div>
        <div class="header-tab4">
        <div>tab-4</div>
    </div>
        `
    }
   
    
}