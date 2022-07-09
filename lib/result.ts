interface Result<T, E> {
	readonly isErr: boolean
	readonly isOk: boolean
	unwrap(): T
	unwrapOr(default_: T): T
	unwrapOrElse(f: () => T): T
	expect(msg: string): T
}

/** TODO: Figure out if it is possible to get `None` insted of `None()` to work. **/
function Err<T, E>(msg: string): Result<T, E> {
	return {
		isErr: true,
		isOk: false,

		unwrap() {
			throw new Error(msg)
		},
		unwrapOr(default_: T) {
			return default_
		},
		unwrapOrElse(f: () => T): T {
			return f()
		},
		expect(expectMsg) {
			throw new Error(expectMsg)
		},
	}
}

function Ok<T, E>(data: any): Result<T, E> {
	return {
		isErr: false,
		isOk: true,

		unwrap() {
			return data
		},
		unwrapOr(_) {
			return data
		},
		unwrapOrElse(_: () => T): T {
			return data
		},
		expect(_) {
			return data
		},
	}
}

function test() {
	const result1 = Ok(2)
	console.log(result1.isErr, result1.isOk, result1.unwrap())

	const result2 = Err('Did not succeed!')
	console.log(
		result2.isErr,
		result2.isOk,
		result2.unwrapOr('oijdf'),
		result2.unwrapOrElse(() => 2 * 55),
	)
	console.log(
		result2.isErr,
		result2.isOk,
		result2.expect('sdigh'),
		result2.unwrap(),
	)

	function doesStuff(): Result<{}, Error> {
		return Ok({})
	}
}

export { Result, Err, Ok }
