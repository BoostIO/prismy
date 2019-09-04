<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [prismy](./prismy.md) &gt; [middleware](./prismy.middleware.md)

## middleware() function

Factory function to create a prismy compatible middleware. Accepts selectors to help with testing, DI etc.

<b>Signature:</b>

```typescript
export declare function middleware(selectors: never[], mhandler: (next: () => Promise<ResponseObject<any>>) => () => Promise<ResponseObject<any>>): PrismyMiddleware<[]>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  selectors | <code>never[]</code> | Tuple of selectors |
|  mhandler | <code>(next: () =&gt; Promise&lt;ResponseObject&lt;any&gt;&gt;) =&gt; () =&gt; Promise&lt;ResponseObject&lt;any&gt;&gt;</code> | Middleware handler |

<b>Returns:</b>

`PrismyMiddleware<[]>`

A prismy compatible middleware

## Remarks

Selectors must be a tuple (`[Selector<string>, Selector<number>]`<!-- -->) not an array (`Selector<string>|Selector<number>[] `<!-- -->). Be careful when declaring the array outside of the function call.

Be carefuly to remember the mhandler is a function which returns an \_async\_ function. Not returning an async function can lead to strange type error messages.

Another reason for long type error messages is not having `{"strict": true}` setting in tsconfig.json or not compiling with --strict.

## Example

Simple Example

```ts

const withCors = middleware([], next => async () => {
 const resObject = await next()

 return updateHeaders(resObject, {
   'access-control-allow-origin': '*'
 })
})


```
