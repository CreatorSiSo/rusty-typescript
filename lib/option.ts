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

	private inner
}

const None = new Option<any>(false)
const Some = <T>(inner: T) => new Option(true, inner)

function test(): Option<string> {
	const result1 = Some(5)
	console.log(
		result1.isNone,
		result1.isSome,
		result1.unwrap(),
		result1.unwrapOr(2),
		result1.unwrapOrElse(() => 2 * 55),
	)

	const result2 = None
	console.log(
		result2.isNone,
		result2.isSome,
		result2.unwrapOr('oijdf'),
		result2.unwrapOrElse(() => 2 * 55),
	)
	console.log(result2.isNone, result2.isSome, result2.unwrap())

	return None
}

export { Option, None, Some }
