// TablePagination.jsx

export default function TablePagination({ page, totalPages, onPageChange }) {
	return (
		<div style={{ margin: '16px 0' }}>
			<button onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
				Назад
			</button>
			<span style={{ margin: '0 8px' }}>
				Страница {page} из {totalPages}
			</span>
			<button
				onClick={() => onPageChange(page + 1)}
				disabled={page >= totalPages}
			>
				Вперед
			</button>
		</div>
	)
}
