import { arrayEq } from '@/utils/compare'

class Option<T> {
	static from<I>(maybeValue: I | undefined): Option<I> {
		return maybeValue === undefined ? None : Some(maybeValue)
	}

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
		for (const [matchFn, transformFn] of cases) {
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

export { Option, None, Some, caseNone, caseSome, caseEval }
