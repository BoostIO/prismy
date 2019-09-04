<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [prismy](./prismy.md) &gt; [createWithErrorHandler](./prismy.createwitherrorhandler.md)

## createWithErrorHandler() function

Factory function to create a simple error handler middleware

<b>Signature:</b>

```typescript
export declare function createWithErrorHandler({ dev, json }?: WithErrorHandlerOptions): PrismyPureMiddleware;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  { dev, json } | <code>WithErrorHandlerOptions</code> |  |

<b>Returns:</b>

`PrismyPureMiddleware`

A prismy compatible middleware error handler

## Remarks

Catches errors thrown and returns either text or json response depending on configuration. Will display either the string error message or the full stack if `dev = true`
