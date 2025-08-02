import { useEffect, useState } from 'react'
import { fetchUsers } from '../api/userApi'

import TablePagination from '../components/TablePagination'
import UserModal from '../components/UserModal'
import UserTable from '../components/UserTable'
import { maxLimit } from '../shared/constants/params'

export function MainPage() {
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [sortField, setSortField] = useState('')
	const [sortOrder, setSortOrder] = useState('')
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [selectedUser, setSelectedUser] = useState(null)
	const [columnWidths, setColumnWidths] = useState({})

	useEffect(() => {
		setLoading(true)
		fetchUsers({
			page,
			limit: maxLimit,
			sortField: sortField === 'city' ? '' : sortField,
			sortOrder,
		}).then(data => {
			if (data.error) {
				setError(data.error)
				setUsers([])
			} else {
				let loadedUsers = data.users || []
				if (sortField === 'city' && sortOrder) {
					loadedUsers = [...loadedUsers].sort((a, b) => {
						const cityA = (a.address?.city || '').toLowerCase()
						const cityB = (b.address?.city || '').toLowerCase()
						if (cityA < cityB) return sortOrder === 'asc' ? -1 : 1
						if (cityA > cityB) return sortOrder === 'asc' ? 1 : -1
						return 0
					})
				}
				setUsers(loadedUsers)
				setTotalPages(Math.ceil((data.total || 0) / maxLimit))
				setError('')
			}
			setLoading(false)
		})
	}, [page, sortField, sortOrder])

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

	const handlePageChange = newPage => {
		if (newPage >= 1 && newPage <= totalPages) setPage(newPage)
	}

	const handleRowClick = user => {
		setSelectedUser(user)
	}

	const handleCloseModal = () => {
		setSelectedUser(null)
	}

	const handleColumnResize = (key, width) => {
		setColumnWidths(prev => ({ ...prev, [key]: Math.max(width, 50) }))
	}

	return (
		<div className='max-w-[1420px] w-full mx-auto px-2'>
			<h1 className='text-2xl font-bold mb-4'>Users</h1>
			{error && <div className='text-red-600 mb-2'>{error}</div>}
			{loading ? (
				<div className='text-gray-500'>Loading...</div>
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
