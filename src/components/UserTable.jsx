// UserTable.jsx

const columns = [
	{ key: 'lastName', label: 'Фамилия' },
	{ key: 'firstName', label: 'Имя' },
	{ key: 'maidenName', label: 'Отчество' },
	{ key: 'age', label: 'Возраст' },
	{ key: 'gender', label: 'Пол' },
	{ key: 'phone', label: 'Телефон' },
	{ key: 'email', label: 'Email' },
	{ key: 'country', label: 'Страна' },
	{ key: 'city', label: 'Город' },
]

export default function UserTable({
	users,
	onSort,
	sortField,
	sortOrder,
	onRowClick,
	columnWidths,
	onColumnResize,
}) {
	return (
		<div style={{ width: '100%', maxWidth: 1400, overflowX: 'auto' }}>
			<table style={{ width: '100%', borderCollapse: 'collapse' }}>
				<thead>
					<tr>
						{columns.map((col, idx) => (
							<th
								key={col.key}
								style={{
									minWidth: 50,
									width: columnWidths[col.key] || 120,
									cursor: 'pointer',
									border: '1px solid #ccc',
								}}
								onClick={() => onSort(col.key)}
							>
								{col.label}
								{sortField === col.key
									? sortOrder === 'asc'
										? ' ▲'
										: sortOrder === 'desc'
										? ' ▼'
										: ''
									: ''}
								{/* Для изменения ширины столбца можно добавить обработчик onMouseDown */}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{users.map(user => (
						<tr
							key={user.id}
							onClick={() => onRowClick(user)}
							style={{ cursor: 'pointer' }}
						>
							<td>{user.lastName}</td>
							<td>{user.firstName}</td>
							<td>{user.maidenName}</td>
							<td>{user.age}</td>
							<td>{user.gender}</td>
							<td>{user.phone}</td>
							<td>{user.email}</td>
							<td>{user.address?.country}</td>
							<td>{user.address?.city}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
