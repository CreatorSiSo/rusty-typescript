import { describe, test } from 'bun:test'
import { Result, Ok, Err } from '@/result'
import { assertEq } from './utils/test'

describe('Option', () => {
	test('Option.match()', () => {
		// TODO: Clean up test and make them work
		const result1 = Ok(2)
		console.log(result1.isErr, result1.isOk, result1.unwrap())

		const result2 = Err('Did not succeed!')
		console.log(
			result2.isErr,
			result2.isOk,
			result2.unwrapOr('oijdf'),
			result2.unwrapOrElse(() => 2 * 55),
		)
		console.log(
			result2.isErr,
			result2.isOk,
			// result2.expect('sdigh'),
			// result2.unwrap(),
		)
	})

	test('return Result', () => {
		function doesStuff(): Result<never[], Error> {
			return Ok([])
		}

		assertEq(doesStuff(), Ok([]))
	})
})
