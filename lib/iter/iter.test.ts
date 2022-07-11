import { describe, test } from 'bun:test'
import { Iter } from '@/iter/iter'
import { Some } from '@/option'
import { assertEq } from '@/utils/test'

describe('Iter', () => {
	test('Iter.fromFn()', () => {
		let count = 0
		const iter = Iter.fromFn(() => {
			count += 1
			return Some(count)
		})

		for (const v of iter) {
			if (v > 9_999) {
				break
			}
		}

		assertEq(count, 10_000)
	})
})
