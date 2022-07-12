import { None, Option, Some } from '@/option'

interface Iter<T> extends Iterable<T> {
	// TODO: Maybe add custom arguments to next: next<P>(...args: P[]): Option<T>
	next(): Option<T>
}

class Iter<T> {
	static fromFn<R>(fn: () => Option<R>): Iter<R> {
		const iter = new Iter<R>()
		iter.next = fn
		return iter
	}

	[Symbol.iterator] = () => ({
		next: () => {
			const maybeNext = this.next()
			return maybeNext.isSome
				? { value: maybeNext.unwrap() }
				: { value: undefined, done: true as true }
		},
	})

	take(n: number) {
		let took = 0
		while (took < n) {
			this.next()
			took += 1
		}
		return this
	}

	map<R>(fn: (item: T) => R): Map<T, R> {
		return new Map(this, fn)
	}

	forEach(fn: (item: T) => void): void {
		for (const item of this) {
			fn(item)
		}
	}
}

// TODO: Add tests for Map() and Iter.map()
class Map<I, R> extends Iter<R> {
	constructor(iter: Iter<I>, fn: (item: I) => R) {
		super()
		this.iter = iter
		this.fn = fn
	}

	next(): Option<R> {
		const maybeNext = this.iter.next()
		return maybeNext.isSome ? Some(this.fn(maybeNext.unwrap())) : None
	}

	private iter: Iter<I>
	private fn: (item: I) => R
}

export { Iter }
