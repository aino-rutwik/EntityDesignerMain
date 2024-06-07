import { ColumnRecord } from "./ColumnRecord";

export class TableRecord {
    id : string;
    name : string;
    columns : ColumnRecord[];

    constructor(id:string, name: string, columns : ColumnRecord[]){
        this.id = id;
        this.name = name;
        this.columns = columns;
    }

}