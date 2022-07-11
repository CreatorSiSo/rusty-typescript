import { describe, test } from 'bun:test'
import { Range } from '@/iter/range'
import { assertEq } from '@/utils/test'

describe('Range for..of', () => {
	test('0..9', () => {
		const nums = []
		for (let num of Range(0, 9, -1)) {
			nums.push(num)
		}
		assertEq(nums, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
	})

	// TODO: Add float equalitiy check with some epsilon value
	// test('0..2.5', () => {
	// 	const nums = []
	// 	for (let num of Range(0, 0.22, 0.02)) {
	// 		nums.push(num)
	// 	}
	// 	assertEq(
	// 		nums,
	// 		[0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2, 0.22],
	// 	)
	// })

	test('0..-9', () => {
		const nums = []
		for (let num of Range(0, -9)) {
			nums.push(num)
		}
		assertEq(nums, [0, -1, -2, -3, -4, -5, -6, -7, -8, -9])
	})

	test('0..-2.5', () => {
		const nums = []
		for (let num of Range(0, -2.5, 0.5)) {
			nums.push(num)
		}
		assertEq(nums, [0, -0.5, -1, -1.5, -2, -2.5])
	})
})

// TODO: Add tests for CheckedRange
// const range = CheckedRange(Infinity, NaN)
// if (range.isOk) {
// 	for (const num of range.unwrap()) {
// 		console.log(num)
// 	}
// }
