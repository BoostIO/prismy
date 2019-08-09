import got from 'got'
import {
  prismy,
  res,
  Selector,
  Middleware,
  middleware,
  testHandler,
  redirect,
  setBody,
  setStatusCode,
  updateHeaders,
  setHeaders
} from '../src'

describe('middleware', () => {
  it('creates Middleware via selectors and middleware handler', async () => {
    const rawUrlSelector: Selector<string> = context => context.req.url!
    const errorMiddleware: Middleware = middleware(
      [rawUrlSelector],
      next => async url => {
        try {
          return await next()
        } catch (error) {
          return res(`${url} : ${error.message}`, 500)
        }
      }
    )
    const handler = prismy(
      [],
      () => {
        throw new Error('Hey!')
      },
      [errorMiddleware]
    )

    await testHandler(handler, async url => {
      const response = await got(url, {
        throwHttpErrors: false
      })
      expect(response).toMatchObject({
        statusCode: 500,
        body: '/ : Hey!'
      })
    })
  })

  it('accepts async selectors', async () => {
    const asyncRawUrlSelector: Selector<string> = async context =>
      context.req.url!
    const errorMiddleware: Middleware = middleware(
      [asyncRawUrlSelector],
      next => async url => {
        try {
          return await next()
        } catch (error) {
          return res(`${url} : ${error.message}`, 500)
        }
      }
    )
    const handler = prismy(
      [],
      () => {
        throw new Error('Hey!')
      },
      [errorMiddleware]
    )

    await testHandler(handler, async url => {
      const response = await got(url, {
        throwHttpErrors: false
      })
      expect(response).toMatchObject({
        statusCode: 500,
        body: '/ : Hey!'
      })
    })
  })
})

describe('redirect', () => {
  it('redirects', async () => {
    const handler = prismy([], () => {
      return redirect('https://github.com')
    })

    await testHandler(handler, async url => {
      const response = await got(url, {
        followRedirect: false
      })
      expect(response).toMatchObject({
        statusCode: 302,
        headers: {
          location: 'https://github.com'
        }
      })
    })
  })

  it('redirects with specific statusCode', async () => {
    const handler = prismy([], () => {
      return redirect('https://github.com', 301)
    })

    await testHandler(handler, async url => {
      const response = await got(url, {
        followRedirect: false
      })
      expect(response).toMatchObject({
        statusCode: 301,
        headers: {
          location: 'https://github.com'
        }
      })
    })
  })

  it('redirects with specific headers', async () => {
    const handler = prismy([], () => {
      return redirect('https://github.com', undefined, {
        'x-test': 'Hello, World!'
      })
    })

    await testHandler(handler, async url => {
      const response = await got(url, {
        followRedirect: false
      })
      expect(response).toMatchObject({
        statusCode: 302,
        headers: {
          location: 'https://github.com',
          'x-test': 'Hello, World!'
        }
      })
    })
  })
})

describe('setBody', () => {
  it('replaces body', () => {
    const resObj = res('Hello, World!')

    const newResObj = setBody(resObj, 'Good Bye!')

    expect(newResObj).toEqual({
      body: 'Good Bye!',
      statusCode: 200,
      headers: {}
    })
  })
})

describe('setStatusCode', () => {
  it('replaces statusCode', () => {
    const resObj = res('Hello, World!')

    const newResObj = setStatusCode(resObj, 201)

    expect(newResObj).toEqual({
      body: 'Hello, World!',
      statusCode: 201,
      headers: {}
    })
  })
})

describe('updateHeaders', () => {
  it('update headers', () => {
    const resObj = res(null, 200, {
      'x-test-message': 'Hello, World!'
    })

    const newResObj = updateHeaders(resObj, {
      'x-test-message': 'Good Bye!',
      'x-extra-message': 'Adios!'
    })

    expect(newResObj).toEqual({
      body: null,
      statusCode: 200,
      headers: {
        'x-test-message': 'Good Bye!',
        'x-extra-message': 'Adios!'
      }
    })
  })
})

describe('setHeaders', () => {
  it('replace headers', () => {
    const resObj = res(null, 200, {
      'x-test-message': 'Hello, World!'
    })

    const newResObj = setHeaders(resObj, {
      'x-extra-message': 'Hola!'
    })

    expect(newResObj).toEqual({
      body: null,
      statusCode: 200,
      headers: {
        'x-extra-message': 'Hola!'
      }
    })
  })
})