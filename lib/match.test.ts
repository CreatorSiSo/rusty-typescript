import { describe, test } from 'bun:test'
import { assertEq } from './test'

import { Option, None, Some } from './option'
import { matchBool, matchPrimitive } from './match'

describe('matchPrimitive()', () => {
	test('num', () => {
		const result = matchPrimitive(
			2,
			() => 0,
			[23, (v) => v * 1],
			[0, (v) => v * 2],
			[2, (v) => v * 3],
		)

		assertEq(result, 6)
	})

	test('int', () => {
		const result = matchPrimitive(
			2n,
			() => 0n,
			[23n, (v) => v * 1n],
			[0n, (v) => v * 2n],
			[2n, (v) => v * 3n],
		)

		assertEq(result, 6n)
	})

	// This does not really make sense... (Please use matchBool() insted!)
	// But its possible to do, so it must be tested
	test('bool', () => {
		const result = matchPrimitive(
			true,
			() => 'catch all',
			[false, () => 'case false'],
			[true, () => 'case true'],
		)

		assertEq(result, 'case true')
	})

	test('str', () => {
		const result = matchPrimitive(
			'funny',
			() => '',
			['joke', () => '3'],
			['bad joke', () => '2'],
			['funny', () => '5'],
		)

		assertEq(result, '5')
	})

	test('str => Option<num>', () => {
		const rating = matchPrimitive<str, Option<num>>(
			'funny',
			() => None,
			['joke', () => Some(3)],
			['bad joke', () => Some(1)],
			['funny', () => Some(5)],
		).unwrapOr(0)

		assertEq(rating, 5)
	})
})

test('matchBool()', () => {
	const result = matchBool(
		false,
		() => 'case true',
		() => 'case false',
	)

	assertEq(result, 'case false')
})
