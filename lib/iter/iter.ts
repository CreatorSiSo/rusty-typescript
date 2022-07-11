import { Option } from '@/option'

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
			let maybeNext = this.next()
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

	// TODO: Add map<R>(): Map<I, R> method where Map<I, R> is { iter: Iter<I>, fn: (item: I) => R }

	forEach(fn: (item: T) => void): void {
		for (const item of this) {
			fn(item)
		}
	}
}

export { Iter }
