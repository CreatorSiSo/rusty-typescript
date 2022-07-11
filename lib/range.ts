import { Option, None, Some } from './option'
import { Result, Err, Ok } from './result'
import { Iter } from './iter'

function Range(
	start: number,
	end: number,
	absoluteStep: number = 1,
): Iterable<number> {
	absoluteStep = Math.abs(absoluteStep)
	const step = start < end ? absoluteStep : -1 * absoluteStep
	const isInRange =
		step < 0 //
			? (num: number) => num >= end
			: (num: number) => num <= end

	return {
		*[Symbol.iterator]() {
			let current = start

			while (isInRange(current)) {
				yield current
				current += step
			}
		},
	}
}

class RangeIter extends Iter<num> {
	constructor(start: num, end: num, step: num = 1) {
		super()
		this.step = Math.abs(step)
		this.current = start - this.step
		this.end = end
	}

	next(): Option<num> {
		this.current += this.step
		return this.current >= this.end ? None : Some(this.current)
	}

	private current: number
	private step: number
	private end: number
}

function CheckedRange(
	start: number,
	end: number,
	step = 1,
): Result<Iterable<number>, Error> {
	if (!Number.isFinite(start))
		return Err('Can not create Range that starts at `Infinity`!')

	if (Number.isNaN(start) || Number.isNaN(end))
		return Err('Can not create Range that starts or ends at `NaN`!')

	return Ok(Range(start, end, step))
}

export { Range, CheckedRange }

function test() {
	let rangeIter = new RangeIter(0, 9)
	rangeIter.next()
	rangeIter.next()
	rangeIter.take(5)
	rangeIter.forEach((v) => console.log(v))

	for (const num of rangeIter) {
		console.log(num)
	}
}
