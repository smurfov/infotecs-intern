import { BASE_URL, maxLimit } from '../shared/constants/params'

export async function fetchUsers({
	page = 1,
	limit = maxLimit,
	sortField = '',
	sortOrder = '',
	filters = {},
}) {
	let url = `${BASE_URL}?limit=${limit}&skip=${(page - 1) * limit}`
	if (sortField && sortOrder) {
		url += `&sortBy=${sortField}&order=${sortOrder}`
	}
	const filterValues = Object.values(filters).filter(Boolean)
	if (filterValues.length > 0) {
		url += `&search=${encodeURIComponent(filterValues.join(' '))}`
	}
	try {
		const res = await fetch(url)
		if (!res.ok) throw new Error('Ошибка загрузки пользователей')
		return await res.json()
	} catch (e) {
		return { error: e.message }
	}
}
