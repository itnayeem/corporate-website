import { z } from "zod/v4";
export declare const siteContentTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "site_content";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "site_content";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        data: import("drizzle-orm/pg-core").PgColumn<{
            name: "data";
            tableName: "site_content";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "site_content";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const insertSiteContentSchema: z.ZodObject<{
    id: z.ZodString;
    data: z.ZodOptional<z.ZodType<import("drizzle-zod").Json, unknown, z.core.$ZodTypeInternals<import("drizzle-zod").Json, unknown>>>;
}, {
    out: {};
    in: {};
}>;
export type InsertSiteContent = z.infer<typeof insertSiteContentSchema>;
export type SiteContentRow = typeof siteContentTable.$inferSelect;
//# sourceMappingURL=siteContent.d.ts.map