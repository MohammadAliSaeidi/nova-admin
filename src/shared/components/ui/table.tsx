import styled from "styled-components";
import type { SharedTableProps } from "../../types/table";

const TableWrap = styled.div`
	min-width: 0;
	overflow-x: auto;
`;

const TableElement = styled.table`
	width: 100%;
	border-collapse: collapse;
	text-align: start;

	caption {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	th,
	td {
		padding: 12px;
		border-bottom: 1px solid ${({ theme }) => theme.colors.border};
		text-align: start;
	}

	th {
		color: ${({ theme }) => theme.colors.muted};
		font-size: 14px;
	}
`;

export function SharedTable<Row,>({
	caption,
	columns,
	rows,
	getRowKey,
	busy = false,
}: SharedTableProps<Row>) {
	return (
		<TableWrap aria-busy={busy || undefined}>
			<TableElement>
				<caption>{caption}</caption>
				<thead>
					<tr>
						{columns.map((column) => (
							<th key={column.id} scope="col">
								{column.header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row) => (
						<tr key={getRowKey(row)}>
							{columns.map((column) => (
								<td key={column.id}>{column.cell(row)}</td>
							))}
						</tr>
					))}
				</tbody>
			</TableElement>
		</TableWrap>
	);
}
