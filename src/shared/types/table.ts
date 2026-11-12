import type { Key, ReactNode } from "react";

export interface SharedTableColumn<Row> {
	id: string;
	header: ReactNode;
	cell: (row: Row) => ReactNode;
}

export interface SharedTableProps<Row> {
	caption: string;
	columns: readonly SharedTableColumn<Row>[];
	rows: readonly Row[];
	getRowKey: (row: Row) => Key;
	busy?: boolean;
}
