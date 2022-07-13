import { Some } from '@/option'
import { assertEq } from '@/utils/test'
import { describe, test } from 'bun:test'
import { Vec } from './vec'

describe('Vec', () => {
	test('Vec.iter()', () => {
		const vec = new Vec(0.4, 0, 2, 9898, 359)
		const iter1 = vec.iter()
		const iter2 = vec.iter()

		assertEq(iter1.take(3).next(), Some(9898))
		assertEq(iter2.next(), Some(0.4))

		assertEq(iter1.next(), Some(359))
		assertEq(iter2.take(3).next(), Some(359))

		assertEq(vec.length, 5)
	})

	// test('Numbers', () => {
	// const vec = new Vec<number>()
	// Range(0, 999_999 * 99).forEach(() =>
	// 	vec.push(Math.round(Math.random() * 10)),
	// )
	// const timerName = 'For Loop'
	// console.time(timerName)
	// const newArray = []
	// for (let i = 0, l = vec.length; i < l; i++) {
	// 	newArray[i] = String(vec.at(i))
	// }
	// console.timeEnd(timerName)
	// vec.iter().forEach(() => {})
	// console.log(vec)
	// })
})
