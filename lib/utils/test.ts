import { Option } from '@/option'
import { arrayEq, objectEq } from '@/utils/compare'

const lines = (...lines: any[]) => lines.join('\n')

function debugString(value: any): string {
	if (value instanceof Option)
		return value.isSome ? `Some(${value.unwrap()})` : 'None'

	switch (typeof value) {
		case 'object':
			return JSON.stringify(value)
		default:
			return value.toString()
	}
}

function assertEq<T>(left: T, right: T) {
	let equal = false

	if (Array.isArray(left) && Array.isArray(right)) {
		equal = arrayEq(left, right)
	} else if (typeof left === 'object' && typeof right === 'object') {
		equal = objectEq(left, right)
	} else {
		equal = left === right
	}

	if (!equal) {
		throw new Error(
			lines(
				'Left does not equal Right!',
				`\tLeft:  ${debugString(left)}`,
				`\tRight: ${debugString(right)}`,
			),
		)
	}

	return true
}

export { assertEq }
