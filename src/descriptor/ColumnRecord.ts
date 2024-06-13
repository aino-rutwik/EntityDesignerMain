
export class ColumnRecord {
    colId : string;
    colCheck : string;
    colName : string;
    colDataType : string;
    colDefaultValue : string;

    constructor(id: string, colCheck: string, name: string, dataType: string, defaultValue: string){
        this.colId = id;
        this.colCheck = colCheck;
        this.colName = name;
        this.colDataType = dataType;
        this.colDefaultValue =  defaultValue;
    }
}