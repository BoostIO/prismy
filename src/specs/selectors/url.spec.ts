import { UrlObject, UrlWithStringQuery } from 'url'
import got from 'got'
import { Url } from '../..'
import { testServer } from '../testServer'

describe('Url', () => {
  it('injects url', async () => {
    class MyHandler {
      handle(@Url() url: UrlObject) {
        return url
      }
    }

    await testServer(MyHandler, async url => {
      const response = await got(url, {
        json: true
      })

      expect(response).toMatchObject({
        statusCode: 200,
        body: expect.objectContaining({
          path: '/'
        })
      })
    })
  })

  it('reuses parsed url', async () => {
    class MyHandler {
      handle(@Url() url: UrlWithStringQuery, @Url() url2: UrlWithStringQuery) {
        return JSON.stringify(url === url2)
      }
    }

    await testServer(MyHandler, async url => {
      const response = await got(url)

      expect(response).toMatchObject({
        statusCode: 200,
        body: 'true'
      })
    })
  })
})