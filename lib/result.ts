class Result<T, E> {
	constructor(isOk: boolean, value: T | E) {
		this.value = value
		this.isOk = isOk
		this.isErr = !isOk
	}

	readonly isErr
	readonly isOk

	expect(msg: string): T {
		if (this.isErr) throw new Error(msg)
		// TODO: Find out if there is a better way to deal with this insted of type assertion
		return this.value as T
	}
	unwrap(): T {
		if (this.isErr) throw this.value
		return this.value as T
	}
	unwrapOr(default_: T): T {
		return this.isErr ? default_ : (this.value as T)
	}
	unwrapOrElse(fn: () => T): T {
		return this.isErr ? fn() : (this.value as T)
	}

	private value
}

const Err = <E>(msg: string) => new Result<any, E>(false, new Error(msg))
const Ok = <T>(inner: T) => new Result<T, any>(true, inner)

export { Result, Err, Ok }
