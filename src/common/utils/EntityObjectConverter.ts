import { ColumnRecord } from "../../descriptor/ColumnRecord";
import { TableRecord } from "../../descriptor/TableRecord";

type PropertyMap = {
    [key: string]: {
        name: string;
        type: string;
        idProperty: boolean;
        generationType?: string;
    };
};

interface JsonObject {
    id: number;
    name: string;
    propertyMap: PropertyMap;
    transformed: boolean;
    enabledTransformations: string[];
    transformedType: boolean;
    idPropertyType: {
        name: string;
        type: string;
        generationType: string;
        idProperty: boolean;
    };
}

export class JsonConverter {
    static convertJsonToTableRecord(json: JsonObject): TableRecord {
        const columns: ColumnRecord[] = Object.entries(json.propertyMap).map(([key, value]) => {
            return new ColumnRecord(
                key,
                value.idProperty ? "PrimaryKey" : "NotPrimaryKey",
                value.name,
                value.type,
                value.generationType || ""
            );
        });

        return new TableRecord(
            json.id.toString(),
            json.name,
            columns
        );
    }
}
