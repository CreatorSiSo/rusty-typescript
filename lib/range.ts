import { Result, Err, Ok } from './result'

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

function test() {
	for (const num of Range(0, -0.1, -0.01)) {
		console.log(num)
	}

	for (const num of Range(0, -5, -1)) {
		console.log(num)
	}

	for (const num of Range(0, 5)) {
		console.log(num)
	}

	const range = CheckedRange(Infinity, NaN)
	if (range.isOk) {
		for (const num of range.unwrap()) {
			console.log(num)
		}
	}
}
// test()

export { Range, CheckedRange }
