namespace Std {
	// let test = 0

	export class Option {
		constructor(data: any, state: OptionState) {
			// console.log(test)
			// test = 2
			// console.log(test)

			this.data = data
			this.state = state
		}

		get isSome() {
			return true
		}
		get isNone() {
			return false
		}

		private data: any
		private state: OptionState
	}

	const enum OptionState {
		None = 0,
		Some = 1,
	}
}

export { Std }

console.log(new Std.Option(null, 0))

// enum Result {
// 	Ok = 1,
// 	Error = 0,
// }
