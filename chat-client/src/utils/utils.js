export const config = {
	headers: {
		"Content-Type": "application/json",
	},
}

export const getTime = (postedAt) => {
	const getTime = new Date(postedAt.toString())
	const hours = getTime.getHours()
	let minutes = getTime.getMinutes()

	minutes = minutes < 10 ? '0' + minutes : minutes

	return hours + ":" + minutes
}