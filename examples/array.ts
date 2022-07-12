import { Iter } from '@/iter/iter'
import { None, Some } from '@/option'

const array = [20, 99, 0, 34756, 3]

const average =
	array.reduce((accum: number, item: number) => accum + item) / array.length
console.log(average)

let resultString = ''
Iter.fromFn<number>(() => {
	const random = Math.random()
	return random < 0.999999 ? Some(random) : None
})
	.map((item) => [item, item + 1, item + 3])
	.forEach(([before, middle, after]) => {
		resultString += Math.round(before * 4)
		resultString += Math.round(middle * 3)
		resultString += Math.round(after * 2)
	})

let index = 0
const amounts: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
Iter.fromFn<number>(() => {
	if (index >= resultString.length) return None
	const digit = Number.parseInt(resultString[index])
	index += 1
	return Some(digit)
}).forEach((digit) => {
	amounts[digit] += 1
})
console.log(amounts)
