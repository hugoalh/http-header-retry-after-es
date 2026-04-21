# HTTP Header Retry-After (ES)

[**⚖️** MIT](./LICENSE.md)

🔗
[GitHub](https://github.com/hugoalh/http-header-retry-after-es)
[JSR](https://jsr.io/@hugoalh/http-header-retry-after)
[NPM](https://www.npmjs.com/package/@hugoalh/http-header-retry-after)

An ECMAScript module to handle the [HTTP header `Retry-After`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Retry-After) according to the specification [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110#field.retry-after).

## 🎯 Targets

| **Runtime \\ Source** | **GitHub Raw** | **JSR** | **NPM** |
|:--|:-:|:-:|:-:|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ✔️ | ✔️ |
| **[Deno](https://deno.land/)** >= v2.1.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v20.9.0 | ❌ | ✔️ | ✔️ |

## 🛡️ Runtime Permissions

This does not request any runtime permission.

## #️⃣ Sources

- GitHub Raw
  ```
  https://raw.githubusercontent.com/hugoalh/http-header-retry-after-es/{Tag}/mod.ts
  ```
- JSR
  ```
  jsr:@hugoalh/http-header-retry-after[@{Tag}]
  ```
- NPM
  ```
  npm:@hugoalh/http-header-retry-after[@{Tag}]
  ```

> [!NOTE]
> - It is recommended to include tag for immutability.
> - These are not part of the public APIs hence should not be used:
>   - Benchmark/Test file (e.g.: `example.bench.ts`, `example.test.ts`).
>   - Entrypoint name or path include any underscore prefix (e.g.: `_example.ts`, `foo/_example.ts`).
>   - Identifier/Namespace/Symbol include any underscore prefix (e.g.: `_example`, `Foo._example`).

## ⤵️ Entrypoints

| **Name** | **Path** | **Description** |
|:--|:--|:--|
| `.` | `./mod.ts` | Default. |

## 🧩 APIs

- ```ts
  class HTTPHeaderRetryAfter {
    constructor(input: number | string | Date | Headers | Response);
    getDate(): Date;
    getRemainTimeMilliseconds(): number;
    getRemainTimeSeconds(): number;
    stringify(): string;
    toString(): string;
    static parseSafe(input: number | string | Date | Headers | Response): HTTPHeaderRetryAfter | null;
  }
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/doc/)
>   - [JSR](https://jsr.io/@hugoalh/http-header-retry-after)

## ✍️ Examples

- ```ts
  new HTTPHeaderRetryAfter("Wed, 21 Oct 2015 07:28:00 GMT").getRemainTimeMilliseconds();
  //=> 0
  ```
- ```ts
  new HTTPHeaderRetryAfter("120");
  ```
