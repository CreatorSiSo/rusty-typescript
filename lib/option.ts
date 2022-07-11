import { arrayEq } from '@/utils/compare'

class Option<T> {
	constructor(isSome: boolean, inner?: T) {
		this.isSome = isSome
		this.inner = inner
	}

	readonly isSome
	get isNone() {
		return !this.isSome
	}

	expect(msg: string): T {
		if (this.isNone) throw new Error(msg)
		return this.inner!
	}
	unwrap(): T {
		if (this.isNone) throw new Error('Value is `None`!')
		return this.inner!
	}
	unwrapOr(default_: T): T {
		return this.isNone ? default_ : this.inner!
	}
	unwrapOrElse(fn: () => T): T {
		return this.isNone ? fn() : this.inner!
	}

	map<R>(fn: (from: T) => R): Option<R> {
		return this.isNone ? None : Some(fn(this.inner!))
	}

	match<R>(
		catchAll: () => R,
		...cases: [(option: Option<T>) => boolean, (value: T) => R][]
	) {
		for (let [matchFn, transformFn] of cases) {
			if (matchFn(this)) return transformFn(this.inner!)
		}

		return catchAll()
	}

	private inner
}

const None = new Option<any>(false)
const Some = <T>(inner: T) => new Option(true, inner)

const caseNone = <T>(option: Option<T>) => option.isNone
function caseSome<T>(value: T) {
	return (option: Option<T>) => {
		if (option.isNone) return false

		const inner = option.unwrap()

		if (Array.isArray(inner) && Array.isArray(value))
			return arrayEq(inner, value)
		return inner === value
	}
}
function caseEval<T>(fn: (value: T) => boolean) {
	return (option: Option<T>) => (option.isNone ? false : fn(option.unwrap()))
}

function test(): Option<string> {
	const maybeNum = Some([9, 9, 7])
	let matchResult = maybeNum.match(
		() => 'catch all',
		[caseNone, () => 'sdhfgipuhaih'],
		[caseSome([4]), () => 'not equal'],
		[caseSome([9, 9, 7]), ([, second, third]) => (second + third).toString()],
	)
	console.log(matchResult)

	const checkResult = <T>(result: Option<T>, or: T, elseFn: () => T) =>
		console.log(
			'None:',
			result.isNone,
			'Some:',
			result.isSome,
			result.unwrap(),
			result.unwrapOr(or),
			result.unwrapOrElse(elseFn),
		)

	const result1 = Some(5)
	checkResult(result1, 2, () => 2 * 55)

	const result1String = result1.map((num) => num.toString())
	checkResult(result1String, '2', () => '2 * 55')

	const result2 = None
	checkResult(result2, 'oijdf', () => 2 * 55)

	return None
}

export { Option, None, Some, caseNone, caseSome, caseEval }
