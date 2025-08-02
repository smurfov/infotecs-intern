// userApi.js
// Функции для работы с API пользователей

const BASE_URL = 'https://dummyjson.com/users'

export async function fetchUsers({
	page = 1,
	limit = 10,
	sortField = '',
	sortOrder = '',
	filters = {},
}) {
	let url = `${BASE_URL}?limit=${limit}&skip=${(page - 1) * limit}`
	if (sortField && sortOrder) {
		url += `&sortBy=${sortField}&order=${sortOrder}`
	}
	// Добавьте фильтры в URL при необходимости
	// ...
	try {
		const res = await fetch(url)
		if (!res.ok) throw new Error('Ошибка загрузки пользователей')
		return await res.json()
	} catch (e) {
		return { error: e.message }
	}
}

export async function fetchUserById(id) {
	try {
		const res = await fetch(`${BASE_URL}/${id}`)
		if (!res.ok) throw new Error('Ошибка загрузки пользователя')
		return await res.json()
	} catch (e) {
		return { error: e.message }
	}
}
