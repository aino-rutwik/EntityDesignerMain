
export class ColumnRecord {
    id : string;
    name : string;
    dataType : string;
    defaultValue : string;

    constructor(id: string, name: string, dataType: string, defaultValue: string){
        this.id = id;
        this.name = name;
        this.dataType = dataType;
        this.defaultValue =  defaultValue;
    }
}