import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { SchemaEditorToolbar } from "./components";
import { SchemaEditor } from "./components";
import { SchemaEditorView } from "./components";
import { SchemaEditorViewTableList } from "./components";
import { SchemaEditorViewTableView } from "./components";
import { TableColumn } from "./components";

export class WebComponentRegistration{

    static webComponents = [
        
    {
        elementTag: 'ed-header',
        elementClass: Header,
    },
    {
        elementTag: 'ed-footer',
        elementClass: Footer,
    },
    {
        elementTag: 'schema-editor-toolbar',
        elementClass: SchemaEditorToolbar,
    },
    {
        elementTag: 'schema-editor',
        elementClass: SchemaEditor,
    },
    {
        elementTag: 'schema-editor-view',
        elementClass: SchemaEditorView,
    },
    {
        elementTag: 'schema-editor-view-table-list',
        elementClass: SchemaEditorViewTableList,
    },
    {
        elementTag: 'schema-editor-view-table-view',
        elementClass: SchemaEditorViewTableView,
    },
    {
        elementTag: 'table-column',
        elementClass: TableColumn,
    }

    ]
    public static registerAll() {
        for (const component of this.webComponents) {
          const elementTag = component.elementTag;
          const elementClass = component.elementClass;
          /**
           * Registers a custom element with the given element tag and associated element class.
           * @param elementTag - The element tag to register.
           * @param elementClass - The element class to associate with the element tag.
           */
          window.customElements.define(elementTag, elementClass);
        }
      }
}