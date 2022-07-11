import { arrayEq } from '@/utils/compare'

const lines = (...lines: any[]) => lines.join('\n')

function assertEq<T>(left: T, right: T) {
	let equal = false

	if (Array.isArray(left) && Array.isArray(right)) {
		equal = arrayEq(left, right)
	}
	// TODO: Check for object equalitiy
	else {
		equal = left === right
	}

	if (!equal)
		throw new Error(
			lines(
				'Left does not equal Right!',
				`\tLeft:  ${left}`,
				`\tRight: ${right}`,
			),
		)

	return true
}

export { assertEq }
