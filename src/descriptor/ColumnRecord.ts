
export class ColumnRecord {
    colId : string;
    colName : string;
    colDataType : string;
    colDefaultValue : string;

    constructor(id: string, name: string, dataType: string, defaultValue: string){
        this.colId = id;
        this.colName = name;
        this.colDataType = dataType;
        this.colDefaultValue =  defaultValue;
    }
}