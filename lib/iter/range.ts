import { None, Some } from '@/option'
import { Result, Err, Ok } from '@/result'
import { Iter } from '@/iter/iter'
import BigIntMath from '@/utils/bigint-math'

function Range(start: number, end: number, absoluteStep = 1) {
	absoluteStep = Math.abs(absoluteStep)
	const step = start < end ? absoluteStep : -1 * absoluteStep
	const isInRange =
		step < 0 //
			? (number: number) => number >= end
			: (number: number) => number <= end
	let current = start - step

	return Iter.fromFn<number>(() => {
		current += step
		return isInRange(current) ? Some(current) : None
	})
}

// TODO: Write tests for BigIntRange()
// TODO: Maybe combine Range() and BigIntRange()?
function BigIntRange(start: bigint, end: bigint, absoluteStep = 1n) {
	absoluteStep = BigIntMath.abs(absoluteStep)
	const step = start < end ? absoluteStep : -1n * absoluteStep
	const isInRange =
		step < 0 //
			? (int: bigint) => int >= end
			: (int: bigint) => int <= end
	let current = start - step

	return Iter.fromFn<bigint>(() => {
		current = current + step
		return isInRange(current) ? Some(current) : None
	})
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

export { Range, CheckedRange, BigIntRange }
