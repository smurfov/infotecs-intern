export default function TablePagination({ page, totalPages, onPageChange }) {
	return (
		<div className='my-4 flex items-center gap-2'>
			<button
				className='px-3 py-1 border rounded text-gray-700 bg-gray-100 disabled:opacity-50'
				onClick={() => onPageChange(page - 1)}
				disabled={page <= 1}
			>
				Prev
			</button>
			<span className='mx-2'>
				Page {page} of {totalPages}
			</span>
			<button
				className='px-3 py-1 border rounded text-gray-700 bg-gray-100 disabled:opacity-50'
				onClick={() => onPageChange(page + 1)}
				disabled={page >= totalPages}
			>
				Next
			</button>
		</div>
	)
}
