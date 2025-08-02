import { useEffect, useState } from 'react'
import { fetchUsers } from '../api/userApi'
import TableFilters from '../components/TableFilters'
import TablePagination from '../components/TablePagination'
import UserModal from '../components/UserModal'
import UserTable from '../components/UserTable'

export function MainPage() {
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [sortField, setSortField] = useState('')
	const [sortOrder, setSortOrder] = useState('')
	const [filters, setFilters] = useState({})
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [selectedUser, setSelectedUser] = useState(null)
	const [columnWidths, setColumnWidths] = useState({})

	useEffect(() => {
		setLoading(true)
		fetchUsers({ page, limit: 10, sortField, sortOrder, filters }).then(
			data => {
				if (data.error) {
					setError(data.error)
					setUsers([])
				} else {
					setUsers(data.users || [])
					setTotalPages(Math.ceil((data.total || 0) / 10))
					setError('')
				}
				setLoading(false)
			}
		)
	}, [page, sortField, sortOrder, filters])

	const handleSort = field => {
		if (sortField !== field) {
			setSortField(field)
			setSortOrder('asc')
		} else if (sortOrder === 'asc') {
			setSortOrder('desc')
		} else if (sortOrder === 'desc') {
			setSortOrder('')
			setSortField('')
		} else {
			setSortOrder('asc')
		}
	}

	const handleFilterChange = newFilters => {
		setFilters(newFilters)
		setPage(1)
	}

	const handlePageChange = newPage => {
		if (newPage >= 1 && newPage <= totalPages) setPage(newPage)
	}

	const handleRowClick = user => {
		setSelectedUser(user)
	}

	const handleCloseModal = () => {
		setSelectedUser(null)
	}

	// Для изменения ширины столбцов
	const handleColumnResize = (key, width) => {
		setColumnWidths(prev => ({ ...prev, [key]: Math.max(width, 50) }))
	}

	return (
		<div style={{ maxWidth: 1400, width: '100%', margin: '0 auto' }}>
			<h1>Пользователи</h1>
			<TableFilters filters={filters} onChange={handleFilterChange} />
			{error && <div style={{ color: 'red' }}>{error}</div>}
			{loading ? (
				<div>Загрузка...</div>
			) : (
				<UserTable
					users={users}
					onSort={handleSort}
					sortField={sortField}
					sortOrder={sortOrder}
					onRowClick={handleRowClick}
					columnWidths={columnWidths}
					onColumnResize={handleColumnResize}
				/>
			)}
			<TablePagination
				page={page}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
			<UserModal user={selectedUser} onClose={handleCloseModal} />
		</div>
	)
}
