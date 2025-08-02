const columns = [
	{ key: 'lastName', label: 'Last Name' },
	{ key: 'firstName', label: 'First Name' },
	{ key: 'maidenName', label: 'Maiden Name' },
	{ key: 'age', label: 'Age' },
	{ key: 'gender', label: 'Gender' },
	{ key: 'phone', label: 'Phone' },
	{ key: 'email', label: 'Email' },
	{ key: 'country', label: 'Country' },
	{ key: 'city', label: 'City' },
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
		<div className='w-full max-w-[1400px] mx-auto'>
			<div className='overflow-x-auto max-w-full'>
				<table
					className='min-w-[1400px] border-collapse border-2 border-gray-300'
					style={{ width: '100%' }}
				>
					<thead>
						<tr>
							{columns.map(col => (
								<th
									key={col.key}
									className={
										`min-w-[50px] border px-2 py-2 text-left select-none cursor-pointer bg-gray-300 text-gray-700 relative` +
										(sortField === col.key ? 'text-blue-600' : '')
									}
									style={{ width: columnWidths[col.key] || 120 }}
									onClick={e => {
										if (e.target.dataset.resizer) return
										onSort(col.key)
									}}
								>
									{col.label}
									{sortField === col.key
										? sortOrder === 'asc'
											? ' ▲'
											: sortOrder === 'desc'
											? ' ▼'
											: ''
										: ''}
									<span
										data-resizer='true'
										className='absolute top-0 right-0 h-full w-2 cursor-col-resize select-none z-10'
										onMouseDown={e => {
											e.preventDefault()
											e.stopPropagation()
											const startX = e.clientX
											const startWidth = columnWidths[col.key] || 120
											const onMouseMove = moveEvent => {
												const newWidth = Math.max(
													50,
													startWidth + (moveEvent.clientX - startX)
												)
												if (onColumnResize) onColumnResize(col.key, newWidth)
											}
											const onMouseUp = () => {
												window.removeEventListener('mousemove', onMouseMove)
												window.removeEventListener('mouseup', onMouseUp)
											}
											window.addEventListener('mousemove', onMouseMove)
											window.addEventListener('mouseup', onMouseUp)
										}}
									/>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{users.map(user => (
							<tr
								key={user.id}
								className='hover:bg-gray-200 hover:text-gray-700 cursor-pointer'
								onClick={() => onRowClick(user)}
							>
								<td className='border px-2 py-1'>{user.lastName}</td>
								<td className='border px-2 py-1'>{user.firstName}</td>
								<td className='border px-2 py-1'>{user.maidenName}</td>
								<td className='border px-2 py-1'>{user.age}</td>
								<td className='border px-2 py-1'>{user.gender}</td>
								<td className='border px-2 py-1'>{user.phone}</td>
								<td className='border px-2 py-1'>{user.email}</td>
								<td className='border px-2 py-1'>{user.address?.country}</td>
								<td className='border px-2 py-1'>{user.address?.city}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
