export abstract class WebComponent extends HTMLElement {
    abstract connectedCallback(): void;
    abstract disconnectedCallback(): void;
    abstract render(): void;
}