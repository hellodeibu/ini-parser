/**
 * Attempts to figure out what type the value is and parses it accordingly.
 * Resorts to `JSON.parse` if unable to figure out. If this is unsuccessful,
 * returns input string untouched.
 */
export function parseValue(value?: string) {
	let trues: string[] = [ 'true', 'yes', 'on' ]
	let falses: string[] = [ 'false', 'no', 'off' ]

	if (!value) {
		return value
	} else if (value[0] === '"') {
		return value
	} else if (parseInt(value, 10).toString() === value) {
		return parseInt(value, 10)
	} else if (trues.indexOf(value.toLowerCase()) > -1) {
		return true
	} else if (falses.indexOf(value.toLowerCase()) > -1) {
		return false
	} else {
		try {
			return JSON.parse(value)
		} catch {
			return value
		}
	}
}

export interface ResolveCallback {
	(
		/**
		 * The raw text to be resolved.
		 */
		value: string | undefined,
		/**
		 * The key associated with the value.
		 */
		key: string,
		/**
		 * The built-in resolve function that you can use as a fallback.
		 */
		fallback: typeof parseValue,
	// tslint:disable-next-line:no-any
	): any
}

export interface ResolvedParseOptions {
	comment: RegExp | false
	isCommentCharInProp: boolean,
	delimiter: RegExp
	newline: RegExp
	resolve: boolean | ResolveCallback
}
