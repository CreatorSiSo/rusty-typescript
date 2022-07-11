function matchPrimitive<N, R>(
	value: N,
	catchAll: () => R,
	...cases: [N, (value: N) => R][]
) {
	for (let [caseNum, transformFn] of cases) {
		if (caseNum === value) return transformFn(value)
	}

	return catchAll()
}

// TODO: Does it make sense to pass the value into the trueFn and falseFn?
function matchBool<R>(value: boolean, trueFn: () => R, falseFn: () => R) {
	return value === true ? trueFn() : falseFn()
}

// TODO: Add support for Objects and Arrays and rename matchPrimitive() to match()
// console.log(
// 	matchPrimitive<{ int: number }, Option<number>>(
// 		{ int: 2 },
// 		() => None,
// 		[{ int: 23 }, (v) => Some(v.int)],
// 		[{ int: 0 }, (v) => Some(v.int)],
// 		[{ int: 2 }, (v) => Some(v.int)],
// 	).unwrapOr(0),
// )

export { matchPrimitive, matchBool }
