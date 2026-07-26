const regexpDateRFC7231 = /^[A-Z][a-z][a-z], \d\d [A-Z][a-z][a-z] \d\d\d\d \d\d:\d\d:\d\d GMT$/;
const regexpDecimalInteger = /^\d+$/;
function convertStringInputToTimestamp(input: string): Date {
	if (regexpDateRFC7231.test(input)) {
		return new Date(input);
	}
	if (regexpDecimalInteger.test(input)) {
		return new Date(Date.now() + Number(input) * 1000);
	}
	throw new SyntaxError(`\`${input}\` is not a valid HTTP header \`Retry-After\` value!`);
}
/**
 * Handle the HTTP header `Retry-After` according to the specification RFC 9110.
 */
export class HTTPHeaderRetryAfter {
	get [Symbol.toStringTag](): string {
		return "HTTPHeaderRetryAfter";
	}
	#timestamp: Date;
	/**
	 * Initialize.
	 * @param {number | string | Date | Headers | Response} input Input.
	 */
	constructor(input: number | string | Date | Headers | Response) {
		if (typeof input === "number") {
			if (!(input >= 0 && input <= Number.MAX_SAFE_INTEGER)) {
				throw new RangeError(`Parameter \`input\` is not a number which is positive and safe!`);
			}
			this.#timestamp = new Date(Date.now() + input * 1000);
		} else if (typeof input === "string") {
			this.#timestamp = convertStringInputToTimestamp(input);
		} else if (input instanceof Date) {
			this.#timestamp = new Date(input);
		} else if (input instanceof Headers) {
			const value: string | null = input.get("Retry-After");
			this.#timestamp = (value === null) ? new Date() : convertStringInputToTimestamp(value);
		} else if (input instanceof Response) {
			const value: string | null = input.headers.get("Retry-After");
			this.#timestamp = (value === null) ? new Date() : convertStringInputToTimestamp(value);
		} else {
			throw new SyntaxError(`Unable to handle \`${input}\` to a valid HTTP header \`Retry-After\` value!`);
		}
	}
	/**
	 * Get `Date`.
	 * @returns {Date}
	 */
	getDate(): Date {
		return new Date(this.#timestamp);
	}
	/**
	 * Get remain time in milliseconds.
	 * @returns {number}
	 */
	getRemainTimeMilliseconds(): number {
		return Math.max(0, this.#timestamp.valueOf() - Date.now());
	}
	/**
	 * Get remain time in seconds.
	 * @returns {number}
	 */
	getRemainTimeSeconds(): number {
		return (this.getRemainTimeMilliseconds() / 1000);
	}
	/**
	 * Stringify.
	 * @returns {string}
	 */
	stringify(): string {
		return this.toString();
	}
	/**
	 * Convert to string.
	 * @returns {string}
	 */
	toString(): string {
		return this.#timestamp.toUTCString();
	}
	/**
	 * Initialize, in safe way.
	 * @param {number | string | Date | Headers | Response} input Input.
	 * @returns {HTTPHeaderRetryAfter | null}
	 */
	static parseSafe(input: number | string | Date | Headers | Response): HTTPHeaderRetryAfter | null {
		try {
			return new this(input);
		} catch {
			return null;
		}
	}
}
export default HTTPHeaderRetryAfter;
