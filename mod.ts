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
	 * Initialize.
	 * @param {number | string | Date | Headers | Response} input Input.
	 */
	constructor(input: number | string | Date | Headers | Response);
	/**
	 * Initialize.
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
			let inputFmt: string;
			if (input instanceof Response) {
				inputFmt = input.headers.get("Retry-After") ?? "0";
			} else if (input instanceof Headers) {
				inputFmt = input.get("Retry-After") ?? "0";
			} else {
				inputFmt = input;
			}
			if (regexpDecimalInteger.test(inputFmt)) {
				this.#timestamp = new Date(Date.now() + Number(inputFmt) * 1000);
			} else if (regexpHTTPDate.test(inputFmt)) {
				this.#timestamp = new Date(inputFmt);
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
	 * Get `Date`.
	 * @returns {Date}
	 * @deprecated Use {@linkcode HTTPHeaderRetryAfter.getDate} instead.
	 */
	get date(): Date {
		return this.getDate();
	}
	/**
	 * Get remain time in milliseconds.
	 * @returns {number}
	 * @deprecated Use {@linkcode HTTPHeaderRetryAfter.getRemainTimeMilliseconds} instead.
	 */
	get remainTimeMilliseconds(): number {
		return this.getRemainTimeMilliseconds();
	}
	/**
	 * Get remain time in seconds.
	 * @returns {number}
	 * @deprecated Use {@linkcode HTTPHeaderRetryAfter.getRemainTimeSeconds} instead.
	 */
	get remainTimeSeconds(): number {
		return this.getRemainTimeSeconds();
	}
	/**
	 * Try to initialize.
	 * @param {number | string | Date | Headers | Response} input Input.
	 * @returns {HTTPHeaderRetryAfter | null}
	 */
	static parse(input: number | string | Date | Headers | Response): HTTPHeaderRetryAfter | null {
		try {
			return new this(input);
		} catch {
			return null;
		}
	}
}
export default HTTPHeaderRetryAfter;
