import { Option } from '@/option'

interface Iter<T> extends Iterable<T> {
	next(...args: []): Option<T>
}

class Iter<T> {
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
