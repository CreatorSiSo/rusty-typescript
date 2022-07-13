import { describe, test } from 'bun:test'
import { Option, None, Some, caseNone, caseSome } from '@/option'
import { assertEq } from './utils/test'

describe('Option', () => {
	test('Option.match()', () => {
		const maybeNum = Some([9, 9, 7])
		const matchResult = maybeNum.match(
			() => 'catch all',
			[caseNone, () => 'sdhfgipuhaih'],
			[caseSome([4]), () => 'not equal'],
			[caseSome([9, 9, 7]), ([, second, third]) => (second + third).toString()],
		)

		assertEq(matchResult, '16')
	})

	test('', () => {
		const checkResult = <T>(result: Option<T>, or: T, elseFn: () => T) => {
			try {
				console.debug(
					'None:',
					result.isNone,
					'Some:',
					result.isSome,
					result.unwrap(),
					result.unwrapOr(or),
					result.unwrapOrElse(elseFn),
				)
			} catch (error) {
				// TODO: Check if it throws the correct Error
				// TODO: Make assertEq() work for Errors
			}
		}

		const result1 = Some(5)
		checkResult(result1, 2, () => 2 * 55)

		const result1String = result1.map((num) => num.toString())
		checkResult(result1String, '2', () => '2 * 55')

		const result2 = None
		checkResult(result2, 'oijdf', () => 2 * 55)
	})
})
