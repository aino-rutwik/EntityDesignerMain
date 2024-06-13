import { ColumnRecord } from "./descriptor/ColumnRecord";

export class Routes {

    static async createTable(schemaId: string, tableName: string): Promise<number> {
        const createEntityTypeUrl = `/type/create/${schemaId}/${encodeURIComponent(tableName)}`;
        const entityTypeIdResponse = await fetch(createEntityTypeUrl, {
            method: 'POST'
        });

        if (!entityTypeIdResponse.ok) {
            throw new Error(`Failed to create entity type: ${entityTypeIdResponse.statusText}`);
        }

        const entityTypeId = await entityTypeIdResponse.json();
        return entityTypeId;
    }

    static async createColumn(entityTypeId: number, column: ColumnRecord): Promise<void> {
        // const addPropertyTypeUrl = `/type/property/add?0=${entityTypeId}&1=${encodeURIComponent(column.colName)}&2='java.lang.Boolean'`;
        const addPropertyTypeUrl = `/type/property/add?0=${entityTypeId}&1="${encodeURIComponent(column.colName)}"&2="${encodeURIComponent(column.colDataType)}"`;

    
        const addPropertyResponse = await fetch(addPropertyTypeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        if (!addPropertyResponse.ok) {
            throw new Error(`Failed to add property type for column ${column.colName}: ${addPropertyResponse.statusText}`);
        }
    }

    static async saveTableDb(schemaId: string, tableName: string, columns: ColumnRecord[]): Promise<void> {
        try {
            // Step 1: Create the table and get the table ID
            const entityTypeId = await Routes.createTable(schemaId, tableName);

            // Step 2: Add columns to the table
            for (const column of columns) {
                await Routes.createColumn(entityTypeId, column);
            }

            console.log('Table and columns created successfully');
        } catch (error) {
            console.error('Error saving table and columns:', error);
        }
    }

    static async fetchEntityMeta(tableName: string): Promise<any> {
        const url = `/type/${tableName}`;
    
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Data', data);
            return data; // Make sure to return the data
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    }
    
}

