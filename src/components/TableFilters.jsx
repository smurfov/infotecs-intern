// TableFilters.jsx

export default function TableFilters({ filters, onChange }) {
	return (
		<div style={{ marginBottom: 16 }}>
			<input
				placeholder='Фамилия'
				value={filters.lastName || ''}
				onChange={e => onChange({ ...filters, lastName: e.target.value })}
			/>
			<input
				placeholder='Имя'
				value={filters.firstName || ''}
				onChange={e => onChange({ ...filters, firstName: e.target.value })}
			/>
			<input
				placeholder='Город'
				value={filters.city || ''}
				onChange={e => onChange({ ...filters, city: e.target.value })}
			/>
			{/* Добавьте другие поля фильтрации по необходимости */}
		</div>
	)
}
