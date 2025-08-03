# HTTP Header Retry-After (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh/http-header-retry-after-es](https://img.shields.io/github/v/release/hugoalh/http-header-retry-after-es?label=hugoalh/http-header-retry-after-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/http-header-retry-after-es")](https://github.com/hugoalh/http-header-retry-after-es)
[![JSR: @hugoalh/http-header-retry-after](https://img.shields.io/jsr/v/@hugoalh/http-header-retry-after?label=@hugoalh/http-header-retry-after&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/http-header-retry-after")](https://jsr.io/@hugoalh/http-header-retry-after)
[![NPM: @hugoalh/http-header-retry-after](https://img.shields.io/npm/v/@hugoalh/http-header-retry-after?label=@hugoalh/http-header-retry-after&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/http-header-retry-after")](https://www.npmjs.com/package/@hugoalh/http-header-retry-after)

An ECMAScript (JavaScript & TypeScript) module to handle the [HTTP header `Retry-After`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Retry-After) according to the specification [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110#field.retry-after).

## 🔰 Begin

### 🎯 Targets

| **Targets** | **Remote** | **JSR** | **NPM** |
|:--|:-:|:-:|:-:|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ✔️ | ✔️ |
| **[Deno](https://deno.land/)** >= v2.1.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v20.9.0 | ❌ | ✔️ | ✔️ |

> [!NOTE]
> - It is possible to use this module in other methods/ways which not listed in here, however those methods/ways are not officially supported, and should beware maybe cause security issues.

### #️⃣ Resources Identifier

- **Remote - GitHub Raw:**
  ```
  https://raw.githubusercontent.com/hugoalh/http-header-retry-after-es/{Tag}/mod.ts
  ```
- **JSR:**
  ```
  [jsr:]@hugoalh/http-header-retry-after[@{Tag}]
  ```
- **NPM:**
  ```
  [npm:]@hugoalh/http-header-retry-after[@{Tag}]
  ```

> [!NOTE]
> - For usage of remote resources, it is recommended to import the entire module with the main path `mod.ts`, however it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `_bar`, `_foo`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - For usage of JSR or NPM resources, it is recommended to import the entire module with the main entrypoint, however it is also able to import part of the module with sub entrypoint if available, please visit the [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub entrypoints.
> - It is recommended to use this module with tag for immutability.

### 🛡️ Runtime Permissions

*This module does not request any runtime permission.*

## 🧩 APIs

- ```ts
  class HTTPHeaderRetryAfter {
    constructor(input: number | string | Date | Headers | Response);
    getDate(): Date;
    getRemainTimeMilliseconds(): number;
    getRemainTimeSeconds(): number;
    static parse(input: number | string | Date | Headers | Response): HTTPHeaderRetryAfter | null;
  }
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/documentation_generator/)
>   - [JSR](https://jsr.io/@hugoalh/http-header-retry-after)

## ✍️ Examples

- ```ts
  new HTTPHeaderRetryAfter("Wed, 21 Oct 2015 07:28:00 GMT").getRemainTimeMilliseconds();
  //=> 0
  ```
- ```ts
  new HTTPHeaderRetryAfter("120");
  ```
