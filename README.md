## RTK Query + TypeScript `exactOptionalPropertyTypes` Repro

Minimal reproduction of a (likely) incorrect type interaction between **RTK Query** and the **TypeScript** compiler option `"exactOptionalPropertyTypes"`.

When `exactOptionalPropertyTypes` is enabled, the `data` property returned from an RTK Query hook (even after a guard like `if (result.isSuccess)`) remains typed as possibly `undefined`. The same pattern appears for `error` after `isError` checks.

Without this flag, control flow narrowing works as expected and `data` is treated as definitely defined inside an `isSuccess` block.

---

### TL;DR
| Scenario | Inside `if (result.isSuccess) {}` | Type of `result.data` |
|----------|----------------------------------|-----------------------|
| `exactOptionalPropertyTypes: false` | Narrowed | `Pokemon` |
| `exactOptionalPropertyTypes: true`  | Not fully narrowed | `Pokemon | undefined` |

---

### Repo Contents
Key files that show the issue:

* `src/api.ts` – Defines the `pokemonApi` with a simple `getPokemonByName` query.
* `src/App.tsx` – Calls `useGetPokemonByNameQuery('bulbasaur')` and logs the result.
* `tsconfig.app.json` – Enables the `"exactOptionalPropertyTypes"` compiler option.

```ts
// src/App.tsx (excerpt)
const result = useGetPokemonByNameQuery('bulbasaur')

if (result.isSuccess) {
	// Expect: result.data: Pokemon
	// Actual (with exactOptionalPropertyTypes = true): Pokemon | undefined
	console.log(result.data.id)
}
```
