export default function UserModal({ user, onClose }) {
	if (!user) return null
	return (
		<div className='fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50'>
			<div className='bg-white mx-3 p-6 rounded-lg min-w-[300px] max-w-[400px] relative shadow-lg'>
				<button
					onClick={onClose}
					className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
				>
					Close
				</button>
				<h2 className='text-xl font-semibold mb-2 text-gray-500'>
					{user.lastName} {user.firstName} {user.maidenName}
				</h2>
				<img
					src={user.image}
					alt='avatar'
					className='w-20 h-20 rounded-full mx-auto mb-2 object-cover'
				/>
				<p className='text-gray-500'>Age: {user.age}</p>
				<p className='text-gray-500'>Height: {user.height} см</p>
				<p className='text-gray-500'>Weight: {user.weight} кг</p>
				<p className='text-gray-500'>Phone: {user.phone}</p>
				<p className='text-gray-500'>Email: {user.email}</p>
				<p className='text-gray-500'>Country: {user.address?.country}</p>
				<p className='text-gray-500'>City: {user.address?.city}</p>
				<p className='text-gray-500'>Address: {user.address?.address}</p>
			</div>
		</div>
	)
}
