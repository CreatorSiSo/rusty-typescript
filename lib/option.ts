interface Option<T> {
	readonly isNone: boolean
	readonly isSome: boolean
	unwrap(): T
	unwrapOr(default_: T): T
	unwrapOrElse(f: () => T): T
}

/** TODO: Figure out if it is possible to get `None` insted of `None()` to work. **/
function None<T>(): Option<T> {
	return {
		isNone: true,
		isSome: false,
		unwrap() {
			throw new Error('Value is None!')
		},
		unwrapOr(default_: T) {
			return default_
		},
		unwrapOrElse(f: () => T): T {
			return f()
		},
	}
}

function Some<T>(inner: T): Option<T> {
	return {
		isNone: false,
		isSome: true,
		unwrap() {
			return inner
		},
		unwrapOr(or) {
			return inner
		},
		unwrapOrElse(f: () => T): T {
			return inner
		},
	}
}

const result1 = Some(5)
console.log(
	result1.isNone,
	result1.isSome,
	result1.unwrap(),
	result1.unwrapOr(2),
	result1.unwrapOrElse(() => 2 * 55),
)

const result2 = None()
console.log(
	result2.isNone,
	result2.isSome,
	result2.unwrapOr('oijdf'),
	result2.unwrapOrElse(() => 2 * 55),
)
console.log(result2.isNone, result2.isSome, result2.unwrap())

export { Option, None, Some }
