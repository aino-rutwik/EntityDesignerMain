import { singleton } from "tsyringe";
import { Routes } from "../Routes";
import { JsonConverter } from "../common/utils/EntityObjectConverter";
import { TableRecord } from "../descriptor/TableRecord";

@singleton()
export class EntityHelper {
    async getTableColumnObject(name: string): Promise<TableRecord | null> {
        try {
            const json = await Routes.fetchEntityMeta(name);

            if (!json) {
                throw new Error('Failed to fetch entity metadata');
            }

            const tableRecord = JsonConverter.convertJsonToTableRecord(json);
            return tableRecord;
        } catch (error) {
            console.error('Error in getTableColumnObject:', error);
            return null;
        }
    }
}

