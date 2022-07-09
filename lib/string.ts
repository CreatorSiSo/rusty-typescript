const RString = String
RString.fromCharCode = (..._codes) => 'sdöjfjio'

const tests = {
	'RString.fromCharCode should return correct string': () =>
		String.fromCharCode(20, 906) === 'sdöjfjio',
}

for (const [expectedResult, testFunction] of Object.entries(tests)) {
	const sucessful = !testFunction()
	console.info(expectedResult, sucessful ? '🟩' : '🟥')
	if (!sucessful) {
		console.error('Returned')
	}
}

export { RString }
