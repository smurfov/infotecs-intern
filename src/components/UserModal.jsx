// UserModal.jsx

export default function UserModal({ user, onClose }) {
	if (!user) return null
	return (
		<div
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				background: 'rgba(0,0,0,0.3)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div
				style={{
					background: '#fff',
					padding: 24,
					borderRadius: 8,
					minWidth: 300,
					maxWidth: 400,
				}}
			>
				<button onClick={onClose} style={{ float: 'right' }}>
					Закрыть
				</button>
				<h2>
					{user.lastName} {user.firstName} {user.maidenName}
				</h2>
				<img
					src={user.image}
					alt='avatar'
					style={{ width: 80, borderRadius: '50%' }}
				/>
				<p>Возраст: {user.age}</p>
				<p>Рост: {user.height} см</p>
				<p>Вес: {user.weight} кг</p>
				<p>Телефон: {user.phone}</p>
				<p>Email: {user.email}</p>
				<p>Страна: {user.address?.country}</p>
				<p>Город: {user.address?.city}</p>
				<p>Адрес: {user.address?.address}</p>
			</div>
		</div>
	)
}
