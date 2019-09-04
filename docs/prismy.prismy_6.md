<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [prismy](./prismy.md) &gt; [prismy](./prismy.prismy_6.md)

## prismy() function

<b>Signature:</b>

```typescript
export declare function prismy<A1, A2, A3, A4, A5, A6>(selectors: [Selector<A1>, Selector<A2>, Selector<A3>, Selector<A4>, Selector<A5>, Selector<A6>], handler: (arg1: Unpromise<A1>, arg2: Unpromise<A2>, arg3: Unpromise<A3>, arg4: Unpromise<A4>, arg5: Unpromise<A5>, arg6: Unpromise<A6>) => ResponseObject<any> | Promise<ResponseObject<any>>, middlewareList?: PrismyPureMiddleware[]): PrismyRequestListener<[Unpromise<A1>, Unpromise<A2>, Unpromise<A3>, Unpromise<A4>, Unpromise<A5>, Unpromise<A6>]>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  selectors | <code>[Selector&lt;A1&gt;, Selector&lt;A2&gt;, Selector&lt;A3&gt;, Selector&lt;A4&gt;, Selector&lt;A5&gt;, Selector&lt;A6&gt;]</code> |  |
|  handler | <code>(arg1: Unpromise&lt;A1&gt;, arg2: Unpromise&lt;A2&gt;, arg3: Unpromise&lt;A3&gt;, arg4: Unpromise&lt;A4&gt;, arg5: Unpromise&lt;A5&gt;, arg6: Unpromise&lt;A6&gt;) =&gt; ResponseObject&lt;any&gt; &#124; Promise&lt;ResponseObject&lt;any&gt;&gt;</code> |  |
|  middlewareList | <code>PrismyPureMiddleware[]</code> |  |

<b>Returns:</b>

`PrismyRequestListener<[Unpromise<A1>, Unpromise<A2>, Unpromise<A3>, Unpromise<A4>, Unpromise<A5>, Unpromise<A6>]>`
