function arrayEq(left: any[], right: any[]) {
	if (left.length !== right.length) return false

	for (let index = 0; index <= left.length; index += 1) {
		if (left[index] !== right[index]) return false
	}

	return true
}

type anyObject = { [k: string]: any }

function objectEq(left: anyObject, right: anyObject): boolean {
	for (const [key, value] of Object.entries(left)) {
		if (Array.isArray(value)) return arrayEq(value, right[key])
		if (typeof key === 'object') return objectEq(value, right[key])
		if (right[key] !== value) return false
	}

	return true
}

export { arrayEq, objectEq }
