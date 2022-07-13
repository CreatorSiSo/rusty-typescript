import { Iter } from '../iter/iter'
import { None, Option, Some } from '../option'

class Vec<T> {
	constructor(...elements: T[]) {
		this.array = elements
	}

	get length() {
		return this.array.length
	}

	iter = () => new VecIter(this.array)

	push = (value: T): number => this.array.push(value)
	pop = (): Option<T> => Option.from(this.array.pop())
	at = (index: number): Option<T> => Option.from(this.array.at(index))

	private array
}

class VecIter<T> extends Iter<T> {
	constructor(elements: T[]) {
		super()
		this.elements = elements
	}

	next(): Option<T> {
		if (this.index >= this.elements.length) return None
		this.index += 1
		return Some(this.elements[this.index])
	}

	private index = -1
	private elements
}

export { Vec }
