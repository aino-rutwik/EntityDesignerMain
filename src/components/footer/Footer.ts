import { WebComponent } from "../webComponent";
import './Footer.css';

export class Footer extends WebComponent {

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
        const target = e.target as HTMLElement;
        const className = target.className;
    }

    render(): void {
        this.innerHTML = ``;
    }
    
}