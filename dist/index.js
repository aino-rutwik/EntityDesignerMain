(()=>{"use strict";class e extends HTMLElement{}class t{constructor(e,t,n){this.id=e,this.name=t,this.columns=n}}var n=function(e,t,n,i){return new(n||(n=Promise))((function(a,o){function c(e){try{l(i.next(e))}catch(e){o(e)}}function s(e){try{l(i.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,s)}l((i=i.apply(e,t||[])).next())}))};class i{static createTable(e,t){return n(this,void 0,void 0,(function*(){const n=`/type/create/${e}/${encodeURIComponent(t)}`,i=yield fetch(n,{method:"POST"});if(!i.ok)throw new Error(`Failed to create entity type: ${i.statusText}`);return yield i.json()}))}static createColumn(e,t){return n(this,void 0,void 0,(function*(){const n=`/type/property/add?0=${e}&1="${encodeURIComponent(t.colName)}"&2="${encodeURIComponent(t.colDataType)}"`,i=yield fetch(n,{method:"POST",headers:{"Content-Type":"application/json"}});if(!i.ok)throw new Error(`Failed to add property type for column ${t.colName}: ${i.statusText}`)}))}static saveTableDb(e,t,a){return n(this,void 0,void 0,(function*(){try{const n=yield i.createTable(e,t);for(const e of a)yield i.createColumn(n,e);console.log("Table and columns created successfully")}catch(e){console.error("Error saving table and columns:",e)}}))}static fetchEntityMeta(e){return n(this,void 0,void 0,(function*(){const t=`/type/${e}`;try{const e=yield fetch(t,{method:"GET",headers:{"Content-Type":"application/json"}});if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);const n=yield e.json();return console.log("Data",n),n}catch(e){return console.error("Error:",e),null}}))}}class a{constructor(e,t,n,i,a){this.colId=e,this.colCheck=t,this.colName=n,this.colDataType=i,this.colDefaultValue=a}}class o{static convertJsonToTableRecord(e){const n=Object.entries(e.propertyMap).map((([e,t])=>new a(e,t.idProperty?"PrimaryKey":"NotPrimaryKey",t.name,t.type,t.generationType||"")));return new t(e.id.toString(),e.name,n)}}class c{getTableColumnObject(e){return t=this,n=void 0,c=function*(){try{const t=yield i.fetchEntityMeta(e);if(!t)throw new Error("Failed to fetch entity metadata");return o.convertJsonToTableRecord(t)}catch(e){return console.error("Error in getTableColumnObject:",e),null}},new((a=void 0)||(a=Promise))((function(e,i){function o(e){try{l(c.next(e))}catch(e){i(e)}}function s(e){try{l(c.throw(e))}catch(e){i(e)}}function l(t){var n;t.done?e(t.value):(n=t.value,n instanceof a?n:new a((function(e){e(n)}))).then(o,s)}l((c=c.apply(t,n||[])).next())}));var t,n,a,c}}class s extends e{constructor(){super(),this.handleClickEvent=this.handleClickEvent.bind(this),this.handleDeleteClick=this.handleDeleteClick.bind(this)}connectedCallback(){this.render(),this.addEventListener("click",this.handleClickEvent)}disconnectedCallback(){this.removeEventListener("click",this.handleClickEvent)}handleClickEvent(e){e.stopPropagation();const t=e.target.className;"schemaEditorView__container-table-creation-info-midcontain-columns-more"===t?this.setupDropdown():"delete-option"===t?this.handleDeleteClick():"cancel-option"===t&&this.setupDropdown()}setupDropdown(){this.querySelector(".dropdown-content").classList.toggle("show")}handleDeleteClick(){this.remove()}getChecKBoxValue(){return this.querySelector('input[type="checkbox"]').checked}render(){this.innerHTML='\n        <div class="schemaEditorView__container-table-creation-info-midcontain-columns-info">\n            <div class="container">\n                <input type="checkbox" checked="checked" class="midcontain-columns-info-checkbox">\n                <span class="checkmark"></span>\n            </div>\n            <input class="schemaEditorView__container-table-creation-info-midcontain-columns-name" type="text" placeholder="Enter column name">\n            <div class="schemaEditorView__container-table-creation-info-midcontain-columns-datatype" for=\'options\'>\n                <select class="schemaEditorView__container-table-creation-info-midcontain-columns-datatype-options">\n                    <option value="java.lang.Number">Number</option>\n                    <option value="java.lang.String">String</option>\n                    <option value="java.lang.Boolean">Boolean</option>\n                </select>\n            </div>\n            <input class="schemaEditorView__container-table-creation-info-midcontain-columns-default" type="text" placeholder="Enter default value">\n            <div class="schemaEditorView__container-table-creation-info-midcontain-columns-more">\n                <i class="fa-solid fa-ellipsis-vertical"></i>\n                <div class="dropdown-content">\n                    <div class="delete-option">Delete</div>\n                    <div class="update-option">update</div>\n                    <div class="cancel-option">cancel</div>\n                </div>\n            </div>\n        </div>'}}class l{static registerAll(){for(const e of this.webComponents){const t=e.elementTag,n=e.elementClass;window.customElements.define(t,n)}}}l.webComponents=[{elementTag:"ed-header",elementClass:class extends e{constructor(){super(),this.handleClickEvent=this.handleClickEvent.bind(this)}connectedCallback(){this.render(),this.addEventListener("click",this.handleClickEvent)}disconnectedCallback(){this.removeEventListener("click",this.handleClickEvent)}handleClickEvent(e){e.stopPropagation()}render(){this.innerHTML='\n        <div class="header-tabs">\n        <div class="header-schema">\n        <div>Schema</div>\n        </div>\n        <div class="header-tab2">\n        <div>tab-2</div>\n        </div>\n        <div class="header-tab3">\n        <div>tab-3</div>\n        </div>\n        <div class="header-tab4">\n        <div>tab-4</div>\n    </div>\n        '}}},{elementTag:"ed-footer",elementClass:class extends e{constructor(){super(),this.handleClickEvent=this.handleClickEvent.bind(this)}connectedCallback(){this.render(),this.addEventListener("click",this.handleClickEvent)}disconnectedCallback(){this.removeEventListener("click",this.handleClickEvent)}handleClickEvent(e){e.target.className}render(){this.innerHTML=""}}},{elementTag:"schema-editor-toolbar",elementClass:class extends e{constructor(){super(),this.handleClickEvent=this.handleClickEvent.bind(this)}connectedCallback(){this.render(),this.addEventListener("click",this.handleClickEvent)}disconnectedCallback(){this.removeEventListener("click",this.handleClickEvent)}handleClickEvent(e){}render(){this.innerHTML='\n        <div class="schemaEditorToolbar__container">\n            <div class="schemaEditorToolbar__container-tabs">\n                <div class="schemaEditorToolbar__container-tabs-create-table">\n                Text\n                </div>\n                <div class="schemaEditorToolbar__container-tabs-option2">\n                Text\n                </div>\n                <div class="schemaEditorToolbar__container-tabs-option3">\n                Text\n                </div>\n            </div>\n        </div>\n        '}}},{elementTag:"schema-editor",elementClass:class extends e{constructor(){super(),this.handleClickEvent=this.handleClickEvent.bind(this)}connectedCallback(){this.render(),this.addEventListener("click",this.handleClickEvent)}disconnectedCallback(){this.removeEventListener("click",this.handleClickEvent)}handleClickEvent(e){e.target.className}render(){this.innerHTML='\n        <div class="schema-editor-container">\n        <schema-editor-toolbar></schema-editor-toolbar>\n        <schema-editor-view></schema-editor-view>\n        </div>\n        '}}},{elementTag:"schema-editor-view",elementClass:class extends e{constructor(){super(),this.tableId=1,this.handleClickEvent=this.handleClickEvent.bind(this),this.handleSaveTableEvent=this.handleSaveTableEvent.bind(this),this.handleDisplayTableInfo=this.handleDisplayTableInfo.bind(this),this.handleCreateTableEvent=this.handleCreateTableEvent.bind(this),this.handleClearDisplayedTableInfo=this.handleClearDisplayedTableInfo.bind(this)}connectedCallback(){this.render(),this.tableRecords=new Map,this.list=this.querySelector("schema-editor-view-table-list"),this.view=this.querySelector("schema-editor-view-table-view"),this.addEventListener("click",this.handleClickEvent),this.addEventListener("save-table-event",this.handleSaveTableEvent),this.addEventListener("display-table-info",this.handleDisplayTableInfo),this.addEventListener("create-table",this.handleCreateTableEvent),this.addEventListener("clear-displayed-table-info",this.handleClearDisplayedTableInfo)}disconnectedCallback(){this.removeEventListener("click",this.handleClickEvent),this.removeEventListener("save-table-event",this.handleSaveTableEvent),this.addEventListener("display-table-info",this.handleDisplayTableInfo),this.removeEventListener("create-table",this.handleCreateTableEvent),this.removeEventListener("clear-displayed-table-info",this.handleClearDisplayedTableInfo)}handleSaveTableEvent(e){let n=e.detail;const i=this.view.dataset.tableid;if(this.tableRecords.has(i)){const e=this.tableRecords.get(i);e&&(e.name=n.name,e.columns=n.columns,this.tableRecords.set(i,e))}else{const e=this.tableId.toString(),i=new t(e,n.name,n.columns);this.list.createTable(e,n.name),this.tableRecords.set(e,i),this.tableId++}}handleDisplayTableInfo(e){this.view.clearTableInfo();const t=e.detail.tableId,n=this.tableRecords.get(t);this.view.displayTableInfo(t,n),this.view.dataset.tableid=t}handleClearDisplayedTableInfo(e){this.view.clearTableInfo(),this.view.createFirstColumn(),this.view.dataset.tableid=null}handleCreateTableEvent(e){}handleClickEvent(e){e.stopPropagation(),e.target.className}render(){this.innerHTML='\n        <div class="schemaEditorView__container">\n            <schema-editor-view-table-list></schema-editor-view-table-list>\n            <schema-editor-view-table-view></schema-editor-view-table-view>\n        </div>\n        '}}},{elementTag:"schema-editor-view-table-list",elementClass:class extends e{constructor(){super(),this.tableRecords=new Map,this.handleClickEvent=this.handleClickEvent.bind(this),this.entityHelper=new c}connectedCallback(){this.render(),this.generateExistingTableList(),this.addEventListener("click",this.handleClickEvent)}disconnectedCallback(){this.removeEventListener("click",this.handleClickEvent)}handleClickEvent(e){e.stopPropagation();const t=e.target,n=t.className;if("schemaEditorView__container-table-list-element"===n){const e=t.dataset.tableid,n=new CustomEvent("display-table-info",{bubbles:!0,detail:{tableId:e}});this.dispatchEvent(n)}else if("schemaEditorView__container-table-list-create-table-btn"===n){const e=new CustomEvent("clear-displayed-table-info",{bubbles:!0});this.dispatchEvent(e)}}generateExistingTableList(){this.querySelector(".schemaEditorView__container-table-list-name");const e=this.entityHelper.getTableColumnObject;console.log(e)}createTable(e,t){const n=document.querySelector(".schemaEditorView__container-table-list-name"),i=document.createElement("div");i.className="schemaEditorView__container-table-list-element",i.dataset.tableid=e,i.textContent=t,n.append(i)}render(){this.innerHTML='\n        <div class="schemaEditorView__container-table-list">\n            <button class="schemaEditorView__container-table-list-create-table-btn">Create Table</button>\n            <div class="schemaEditorView__container-table-list-Search-btn">\n                <div class="schemaEditorView__container-table-list-Search-btn-search-icon">\n                    <i class="fa-solid fa-magnifying-glass"></i>\n                </div>\n                <div class="schemaEditorView__container-table-list-Search-btn-input">\n                    <input type="text" placeholder="Table name?">\n                </div>\n            </div>\n            <div class="schemaEditorView__container-table-list-name">\n            </div>\n        </div>\n        '}}},{elementTag:"schema-editor-view-table-view",elementClass:class extends e{constructor(){super(),this.columnId=2,this.handleClickEvent=this.handleClickEvent.bind(this)}connectedCallback(){this.render(),this.addEventListener("click",this.handleClickEvent)}disconnectedCallback(){this.removeEventListener("click",this.handleClickEvent)}handleClickEvent(e){e.stopPropagation();const t=e.target,n=t.className;this.closest("fa-solid"),"schemaEditorView__container-table-creation-info-footer-cols-btns-addbtn"===n?this.createColumn():"schemaEditorView__container-table-creation-info-footer-save-btn"===n?this.saveTable("98"):"schemaEditorView__container-table-creation-info-footer-reset-btn"===n?(this.clearTableInfo(),this.createFirstColumn()):t.closest(".schemaEditorView__container-table-creation-info-moreOption")&&this.showDropDownBox()}showDropDownBox(){this.querySelector(".schemaEditorView__container-table-creation-info-DropMoreOption").classList.toggle("open")}createColumn(){const e=this.columnId++,t=this.querySelector(".schemaEditorView__container-table-creation-info-midcontain-columns"),n=new s;n.dataset.columnid=e.toString(),t.append(n)}createExistingColumns(e,t,n,i,a){const o=this.querySelector(".schemaEditorView__container-table-creation-info-midcontain-columns"),c=new s;c.dataset.colId=e,c.dataset.colCheck=t,c.dataset.colName=n,c.dataset.colDataType=i,c.dataset.colDefaultVal=a,o.append(c),c.querySelector(".schemaEditorView__container-table-creation-info-midcontain-columns-name").value=n,c.querySelector(".schemaEditorView__container-table-creation-info-midcontain-columns-datatype-options").value=i,c.querySelector(".schemaEditorView__container-table-creation-info-midcontain-columns-default").value=a}createFirstColumn(){const e=this.columnId++,t=this.querySelector(".schemaEditorView__container-table-creation-info-midcontain-columns"),n=new s;n.dataset.columnid=e.toString(),t.append(n)}clearTableInfo(){this.querySelector(".schemaEditorView__container-table-creation-info-table-name-input").value="";const e=this.querySelector(".schemaEditorView__container-table-creation-info-midcontain-columns");for(let t=e.childNodes.length-1;t>=0;t--){const n=e.childNodes[t];n instanceof s&&n.remove()}}saveTable(e){return t=this,n=void 0,c=function*(){const t=this.querySelector(".schemaEditorView__container-table-creation-info-table-name-input").value;if(""!==t){const n=[],o=this.querySelector(".schemaEditorView__container-table-creation-info-midcontain-columns");let c=!0;if(o.childNodes.forEach((e=>{if(e instanceof s){const t=e.dataset.columnid,i=e.querySelector(".midcontain-columns-info-checkbox").value,o=e.querySelector(".schemaEditorView__container-table-creation-info-midcontain-columns-name").value,s=e.querySelector(".schemaEditorView__container-table-creation-info-midcontain-columns-datatype-options").value,l=e.querySelector(".schemaEditorView__container-table-creation-info-midcontain-columns-default").value;if(""!==o){const e=new a(t,i,o,s,l);n.push(e)}else c=!1}})),c){const a=new CustomEvent("save-table-event",{bubbles:!0,detail:{name:t,columns:n}});this.dispatchEvent(a),yield i.saveTableDb(e,t,n)}else alert("All columns must have a name.")}else alert("Table name can't be empty")},new((o=void 0)||(o=Promise))((function(e,i){function a(e){try{l(c.next(e))}catch(e){i(e)}}function s(e){try{l(c.throw(e))}catch(e){i(e)}}function l(t){var n;t.done?e(t.value):(n=t.value,n instanceof o?n:new o((function(e){e(n)}))).then(a,s)}l((c=c.apply(t,n||[])).next())}));var t,n,o,c}displayTableInfo(e,t){const n=t.name,i=t.columns;this.querySelector(".schemaEditorView__container-table-creation-info-table-name-input").value=n,i.forEach((e=>{let t=e.colId,n=e.colCheck,i=e.colName,a=e.colDataType,o=e.colDefaultValue;this.createExistingColumns(t,n,i,a,o)}))}render(){this.innerHTML='\n        <div class="schemaEditorView__container-table-creation">\n        <div class="schemaEditorView__container-table-creation-info">\n            <div class="schemaEditorView__container-table-creation-info-header">\n                <div class="schemaEditorView__container-table-creation-info-table-name-box">\n                    <h2> Name: </h2>\n                    <input class="schemaEditorView__container-table-creation-info-table-name-input" type="text" placeholder="Enter Table Name">\n                </div>\n                <div class="container">\n                <input type="checkbox" checked="checked">\n                    <h2>Include System Properties</h2>\n                <span class="checkmark"></span>\n                </div>\n                <div class="container">\n                <input type="checkbox" checked="checked">\n                    <h2> Expose DataType</h2>\n                <span class="checkmark"></span>\n                </div>\n            </div>\n            <div class="schemaEditorView__container-table-creation-info-midcontain">\n                <div class="schemaEditorView__container-table-creation-info-midcontain-heading">\n                    <div class="schemaEditorView__container-table-creation-info-midcontain-heading-col-expose">\n                        <h2>Expose Data</h2>\n                    </div>\n                    <div class="schemaEditorView__container-table-creation-info-midcontain-heading-col-name">\n                        <h2>Column Name</h2>\n                    </div>\n                    <div class="schemaEditorView__container-table-creation-info-midcontain-heading-col-type">\n                        <h2>Select Data Type</h2>\n                    </div>\n                    <div class="schemaEditorView__container-table-creation-info-midcontain-heading-col-default">\n                        <h2>Default value</h2>\n                    </div>\n                </div>\n                <div class="schemaEditorView__container-table-creation-info-DropMoreOption">\n                    <div class="schemaEditorView__container-table-creation-info-moreOption">\n                        <p>note: System Properties :</p>\n                        <i class="fa-solid fa-caret-down"></i>\n                    </div>\n                    <div class="schemaEditorView__dropdown-content">\n                            <table-column></table-column>\n                            <table-column></table-column>\n                            <table-column></table-column>\n                            <table-column></table-column>\n                            <table-column></table-column>\n                    </div>\n                </div>\n                \n                <div class="schemaEditorView__container-table-creation-info-midcontain-columns">\n                    <table-column data-columnid=\'1\'></table-column>\n                </div>\n            </div>\n        </div>\n            <div class="schemaEditorView__container-table-creation-info-footer">\n                <div  class="schemaEditorView__container-table-creation-info-footer-left">\n                    <button class="schemaEditorView__container-table-creation-info-footer-cancel-btn">CANCEL</button>\n                    <button class="schemaEditorView__container-table-creation-info-footer-reset-btn">RESET</button>\n                </div>\n                <div  class="schemaEditorView__container-table-creation-info-footer-right">\n                    <button class="schemaEditorView__container-table-creation-info-footer-cols-btns-addbtn">ADD COLUMN</button>\n                    <button class="schemaEditorView__container-table-creation-info-footer-save-btn">SAVE</button>\n                </div>\n            </div>\n        </div>\n        '}}},{elementTag:"table-column",elementClass:s}],l.registerAll()})();