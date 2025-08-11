const regexpDateRFC7231 = /^[A-Z][a-z][a-z], \d\d [A-Z][a-z][a-z] \d\d\d\d \d\d:\d\d:\d\d GMT$/;
const regexpDecimalInteger = /^\d+$/;
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
		} else if (input instanceof Date) {
			this.#timestamp = new Date(input);
		} else {
			let inputFmt: string;
			if (input instanceof Response) {
				inputFmt = input.headers.get("Retry-After") ?? "0";
			} else if (input instanceof Headers) {
				inputFmt = input.get("Retry-After") ?? "0";
			} else {
				inputFmt = input;
			}
			if (regexpDateRFC7231.test(inputFmt)) {
				this.#timestamp = new Date(inputFmt);
			} else if (regexpDecimalInteger.test(inputFmt)) {
				this.#timestamp = new Date(Date.now() + Number(inputFmt) * 1000);
			} else {
				throw new SyntaxError(`\`${inputFmt}\` is not a valid HTTP header \`Retry-After\` value!`);
			}
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
	 * Initialize in safe way.
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
