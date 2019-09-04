import { IncomingMessage, ServerResponse } from 'http'
import { send } from 'micro'
import {
  ResponseObject,
  Selector,
  Selectors,
  PrismyPureMiddleware,
  Unpromise,
  PrismyRequestListener
} from './types'
import { res, compileHandler } from './utils'

export function prismyx<A extends any[]>(
  selectors: Selectors<A>,
  handler: (...args: A) => ResponseObject<any> | Promise<ResponseObject<any>>,
  middlewareList: PrismyPureMiddleware[] = []
): PrismyRequestListener<A> {
  async function requestListener(
    req: IncomingMessage,
    response: ServerResponse
  ) {
    const context = {
      req
    }
    const next = async () => compileHandler(selectors, handler)(context)

    const pipe = middlewareList.reduce((next, middleware) => {
      return () => middleware(context)(next)
    }, next)

    let resObject
    try {
      resObject = await pipe()
    } catch (error) {
      resObject = res(`Unhandled Error: ${error.message}`, 500)
    }

    Object.entries(resObject.headers).forEach(([key, value]) => {
      /* istanbul ignore if */
      if (value == null) {
        return
      }
      response.setHeader(key, value)
    })

    await send(response, resObject.statusCode, resObject.body)
  }

  requestListener.handler = handler

  return requestListener
}

export function prismy(
  selectors: [],
  handler: () => ResponseObject<any> | Promise<ResponseObject<any>>,
  middlewareList?: PrismyPureMiddleware[]
): PrismyRequestListener<[]>
export function prismy<A1>(
  selectors: [Selector<A1>],
  handler: (
    arg1: Unpromise<A1>
  ) => ResponseObject<any> | Promise<ResponseObject<any>>,
  middlewareList?: PrismyPureMiddleware[]
): PrismyRequestListener<[Unpromise<A1>]>
export function prismy<A1, A2>(
  selectors: [Selector<A1>, Selector<A2>],
  handler: (
    arg1: Unpromise<A1>,
    arg2: Unpromise<A2>
  ) => ResponseObject<any> | Promise<ResponseObject<any>>,
  middlewareList?: PrismyPureMiddleware[]
): PrismyRequestListener<[Unpromise<A1>, Unpromise<A2>]>
export function prismy<A1, A2, A3>(
  selectors: [Selector<A1>, Selector<A2>, Selector<A3>],
  handler: (
    arg1: Unpromise<A1>,
    arg2: Unpromise<A2>,
    arg3: Unpromise<A3>
  ) => ResponseObject<any> | Promise<ResponseObject<any>>,
  middlewareList?: PrismyPureMiddleware[]
): PrismyRequestListener<[Unpromise<A1>, Unpromise<A2>, Unpromise<A3>]>
export function prismy<A1, A2, A3, A4>(
  selectors: [Selector<A1>, Selector<A2>, Selector<A3>, Selector<A4>],
  handler: (
    arg1: Unpromise<A1>,
    arg2: Unpromise<A2>,
    arg3: Unpromise<A3>,
    arg4: Unpromise<A4>
  ) => ResponseObject<any> | Promise<ResponseObject<any>>,
  middlewareList?: PrismyPureMiddleware[]
): PrismyRequestListener<
  [Unpromise<A1>, Unpromise<A2>, Unpromise<A3>, Unpromise<A4>]
>
export function prismy<A1, A2, A3, A4, A5>(
  selectors: [
    Selector<A1>,
    Selector<A2>,
    Selector<A3>,
    Selector<A4>,
    Selector<A5>
  ],
  handler: (
    arg1: Unpromise<A1>,
    arg2: Unpromise<A2>,
    arg3: Unpromise<A3>,
    arg4: Unpromise<A4>,
    arg5: Unpromise<A5>
  ) => ResponseObject<any> | Promise<ResponseObject<any>>,
  middlewareList?: PrismyPureMiddleware[]
): PrismyRequestListener<
  [Unpromise<A1>, Unpromise<A2>, Unpromise<A3>, Unpromise<A4>, Unpromise<A5>]
>
export function prismy<A1, A2, A3, A4, A5, A6>(
  selectors: [
    Selector<A1>,
    Selector<A2>,
    Selector<A3>,
    Selector<A4>,
    Selector<A5>,
    Selector<A6>
  ],
  handler: (
    arg1: Unpromise<A1>,
    arg2: Unpromise<A2>,
    arg3: Unpromise<A3>,
    arg4: Unpromise<A4>,
    arg5: Unpromise<A5>,
    arg6: Unpromise<A6>
  ) => ResponseObject<any> | Promise<ResponseObject<any>>,
  middlewareList?: PrismyPureMiddleware[]
): PrismyRequestListener<
  [
    Unpromise<A1>,
    Unpromise<A2>,
    Unpromise<A3>,
    Unpromise<A4>,
    Unpromise<A5>,
    Unpromise<A6>
  ]
>
export function prismy<A1, A2, A3, A4, A5, A6, A7>(
  selectors: [
    Selector<A1>,
    Selector<A2>,
    Selector<A3>,
    Selector<A4>,
    Selector<A5>,
    Selector<A6>,
    Selector<A7>
  ],
  handler: (
    arg1: Unpromise<A1>,
    arg2: Unpromise<A2>,
    arg3: Unpromise<A3>,
    arg4: Unpromise<A4>,
    arg5: Unpromise<A5>,
    arg6: Unpromise<A6>,
    arg7: Unpromise<A7>
  ) => ResponseObject<any> | Promise<ResponseObject<any>>,
  middlewareList?: PrismyPureMiddleware[]
): PrismyRequestListener<
  [
    Unpromise<A1>,
    Unpromise<A2>,
    Unpromise<A3>,
    Unpromise<A4>,
    Unpromise<A5>,
    Unpromise<A6>,
    Unpromise<A7>
  ]
>
export function prismy<A1, A2, A3, A4, A5, A6, A7, A8>(
  selectors: [
    Selector<A1>,
    Selector<A2>,
    Selector<A3>,
    Selector<A4>,
    Selector<A5>,
    Selector<A6>,
    Selector<A7>,
    Selector<A8>
  ],
  handler: (
    arg1: Unpromise<A1>,
    arg2: Unpromise<A2>,
    arg3: Unpromise<A3>,
    arg4: Unpromise<A4>,
    arg5: Unpromise<A5>,
    arg6: Unpromise<A6>,
    arg7: Unpromise<A7>,
    arg8: Unpromise<A8>
  ) => ResponseObject<any> | Promise<ResponseObject<any>>,
  middlewareList?: PrismyPureMiddleware[]
): PrismyRequestListener<
  [
    Unpromise<A1>,
    Unpromise<A2>,
    Unpromise<A3>,
    Unpromise<A4>,
    Unpromise<A5>,
    Unpromise<A6>,
    Unpromise<A7>,
    Unpromise<A8>
  ]
>
export function prismy<A1, A2, A3, A4, A5, A6, A7, A8, A9>(
  selectors: [
    Selector<A1>,
    Selector<A2>,
    Selector<A3>,
    Selector<A4>,
    Selector<A5>,
    Selector<A6>,
    Selector<A7>,
    Selector<A8>,
    Selector<A9>
  ],
  handler: (
    arg1: Unpromise<A1>,
    arg2: Unpromise<A2>,
    arg3: Unpromise<A3>,
    arg4: Unpromise<A4>,
    arg5: Unpromise<A5>,
    arg6: Unpromise<A6>,
    arg7: Unpromise<A7>,
    arg8: Unpromise<A8>,
    arg9: Unpromise<A9>
  ) => ResponseObject<any> | Promise<ResponseObject<any>>,
  middlewareList?: PrismyPureMiddleware[]
): PrismyRequestListener<
  [
    Unpromise<A1>,
    Unpromise<A2>,
    Unpromise<A3>,
    Unpromise<A4>,
    Unpromise<A5>,
    Unpromise<A6>,
    Unpromise<A7>,
    Unpromise<A8>,
    Unpromise<A9>
  ]
>
export function prismy<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10>(
  selectors: [
    Selector<A1>,
    Selector<A2>,
    Selector<A3>,
    Selector<A4>,
    Selector<A5>,
    Selector<A6>,
    Selector<A7>,
    Selector<A8>,
    Selector<A9>,
    Selector<A10>
  ],
  handler: (
    arg1: Unpromise<A1>,
    arg2: Unpromise<A2>,
    arg3: Unpromise<A3>,
    arg4: Unpromise<A4>,
    arg5: Unpromise<A5>,
    arg6: Unpromise<A6>,
    arg7: Unpromise<A7>,
    arg8: Unpromise<A8>,
    arg9: Unpromise<A9>,
    arg10: Unpromise<A10>
  ) => ResponseObject<any> | Promise<ResponseObject<any>>,
  middlewareList?: PrismyPureMiddleware[]
): PrismyRequestListener<
  [
    Unpromise<A1>,
    Unpromise<A2>,
    Unpromise<A3>,
    Unpromise<A4>,
    Unpromise<A5>,
    Unpromise<A6>,
    Unpromise<A7>,
    Unpromise<A8>,
    Unpromise<A9>,
    Unpromise<A10>
  ]
>
export function prismy<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11>(
  selectors: [
    Selector<A1>,
    Selector<A2>,
    Selector<A3>,
    Selector<A4>,
    Selector<A5>,
    Selector<A6>,
    Selector<A7>,
    Selector<A8>,
    Selector<A9>,
    Selector<A10>,
    Selector<A11>
  ],
  handler: (
    arg1: Unpromise<A1>,
    arg2: Unpromise<A2>,
    arg3: Unpromise<A3>,
    arg4: Unpromise<A4>,
    arg5: Unpromise<A5>,
    arg6: Unpromise<A6>,
    arg7: Unpromise<A7>,
    arg8: Unpromise<A8>,
    arg9: Unpromise<A9>,
    arg10: Unpromise<A10>,
    arg11: Unpromise<A11>
  ) => ResponseObject<any> | Promise<ResponseObject<any>>,
  middlewareList?: PrismyPureMiddleware[]
): PrismyRequestListener<
  [
    Unpromise<A1>,
    Unpromise<A2>,
    Unpromise<A3>,
    Unpromise<A4>,
    Unpromise<A5>,
    Unpromise<A6>,
    Unpromise<A7>,
    Unpromise<A8>,
    Unpromise<A9>,
    Unpromise<A10>,
    Unpromise<A11>
  ]
>
export function prismy<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12>(
  selectors: [
    Selector<A1>,
    Selector<A2>,
    Selector<A3>,
    Selector<A4>,
    Selector<A5>,
    Selector<A6>,
    Selector<A7>,
    Selector<A8>,
    Selector<A9>,
    Selector<A10>,
    Selector<A11>,
    Selector<A12>
  ],
  handler: (
    arg1: Unpromise<A1>,
    arg2: Unpromise<A2>,
    arg3: Unpromise<A3>,
    arg4: Unpromise<A4>,
    arg5: Unpromise<A5>,
    arg6: Unpromise<A6>,
    arg7: Unpromise<A7>,
    arg8: Unpromise<A8>,
    arg9: Unpromise<A9>,
    arg10: Unpromise<A10>,
    arg11: Unpromise<A11>,
    arg12: Unpromise<A12>
  ) => ResponseObject<any> | Promise<ResponseObject<any>>,
  middlewareList?: PrismyPureMiddleware[]
): PrismyRequestListener<
  [
    Unpromise<A1>,
    Unpromise<A2>,
    Unpromise<A3>,
    Unpromise<A4>,
    Unpromise<A5>,
    Unpromise<A6>,
    Unpromise<A7>,
    Unpromise<A8>,
    Unpromise<A9>,
    Unpromise<A10>,
    Unpromise<A11>,
    Unpromise<A12>
  ]
>
export function prismy(
  selectors: Selector<any>[],
  handler: (
    ...args: any[]
  ) => ResponseObject<any> | Promise<ResponseObject<any>>,
  middlewareList?: PrismyPureMiddleware[]
): PrismyRequestListener<any[]> {
  return prismyx(selectors, handler, middlewareList)
}
