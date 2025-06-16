const regexpDecimalInteger = /^\d+$/;
const regexpHTTPDate = /^[A-Z][a-z][a-z], \d\d [A-Z][a-z][a-z] \d\d\d\d \d\d:\d\d:\d\d GMT$/;
/**
 * Handle the HTTP header `Retry-After` according to the specification RFC 9110.
 */
export class HTTPHeaderRetryAfter {
	get [Symbol.toStringTag](): string {
		return "HTTPHeaderRetryAfter";
	}
	#timestamp: Date;
	/**
	 * Handle the HTTP header `Retry-After` according to the specification RFC 9110.
	 * @param {number | string | Date | Headers | Response} input Input.
	 */
	constructor(input: number | string | Date | Headers | Response);
	/**
	 * Handle the HTTP header `Retry-After` according to the specification RFC 9110.
	 * @param {HTTPHeaderRetryAfter} input Input.
	 * @deprecated This input type is deprecated.
	 */
	constructor(input: HTTPHeaderRetryAfter);
	constructor(input: number | string | Date | Headers | HTTPHeaderRetryAfter | Response) {
		if (typeof input === "number") {
			if (!(input >= 0)) {
				throw new RangeError(`Parameter \`input\` is not a number which is positive!`);
			}
			this.#timestamp = new Date(Date.now() + input * 1000);
		} else if (input instanceof Date) {
			this.#timestamp = new Date(input);
		} else if (input instanceof HTTPHeaderRetryAfter) {
			this.#timestamp = new Date(input.#timestamp);
		} else {
			let inputRaw: string;
			if (input instanceof Response) {
				inputRaw = input.headers.get("Retry-After") ?? "0";
			} else if (input instanceof Headers) {
				inputRaw = input.get("Retry-After") ?? "0";
			} else {
				inputRaw = input;
			}
			if (regexpDecimalInteger.test(inputRaw)) {
				this.#timestamp = new Date(Date.now() + Number(inputRaw) * 1000);
			} else if (regexpHTTPDate.test(inputRaw)) {
				this.#timestamp = new Date(inputRaw);
			} else {
				throw new SyntaxError(`\`${inputRaw}\` is not a valid HTTP header \`Retry-After\` syntax!`);
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
	 * @returns {number} Remain time in milliseconds.
	 */
	getRemainTimeMilliseconds(): number {
		return Math.max(0, this.#timestamp.valueOf() - Date.now());
	}
	/**
	 * Get remain time in seconds.
	 * @returns {number} Remain time in seconds.
	 */
	getRemainTimeSeconds(): number {
		return (this.getRemainTimeMilliseconds() / 1000);
	}
	/**
	 * Get `Date`.
	 * @returns {Date}
	 */
	get date(): Date {
		return new Date(this.#timestamp);
	}
	/**
	 * Get remain time in milliseconds.
	 * @returns {number} Remain time in milliseconds.
	 */
	get remainTimeMilliseconds(): number {
		return Math.max(0, this.#timestamp.valueOf() - Date.now());
	}
	/**
	 * Get remain time in seconds.
	 * @returns {number} Remain time in seconds.
	 */
	get remainTimeSeconds(): number {
		return (this.getRemainTimeMilliseconds() / 1000);
	}
}
export default HTTPHeaderRetryAfter;
