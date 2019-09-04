<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [prismy](./prismy.md) &gt; [resolveSelectors](./prismy.resolveselectors.md)

## resolveSelectors() function

Executes the selectors and produces an array of args to be passed to a handler

<b>Signature:</b>

```typescript
export declare function resolveSelectors<A extends any[]>(context: Context, selectors: Selectors<A>): Promise<A>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  context | <code>Context</code> | Context object to be passed to the selectors |
|  selectors | <code>Selectors&lt;A&gt;</code> | array of selectos |

<b>Returns:</b>

`Promise<A>`

arguments for a handler
