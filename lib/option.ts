class Option<T> {
	constructor(isSome: boolean, inner?: T) {
		this.inner = inner
		this.isSome = isSome
		this.isNone = !isSome
	}

	readonly isNone
	readonly isSome

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

	private inner
	private __type__ = 'Option'
}

const None = new Option<any>(false)
const Some = <T>(inner: T) => new Option(true, inner)

// function match<T>(value: T) {
// 	if (value.__type__ === 'Option') {
// 	}
// }
function matchOption<T, R>(
	option: Option<T>,
	catchAll: () => R,
	caseNone: () => R,
	...caseSome: [(value: T) => boolean, (value: T) => R][]
) {
	if (option.isNone) return caseNone()

	// return caseSome[0][1](option.unwrap())
	const inner = option.unwrap()
	for (let [matchFn, transformFn] of caseSome) {
		if (matchFn(inner)) return transformFn(inner)
	}
}

const maybeNum = Some(9)
let matchResult = matchOption(
	maybeNum,
	() => 'catch all',
	() => 'none',
	[(v) => v === 4, (v) => 'not equal'],
	[(v) => v === 9, (v) => (v + 20).toString()],
)
console.log(matchResult)

function test(): Option<string> {
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

export { Option, None, Some }
