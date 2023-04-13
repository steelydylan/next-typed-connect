import { expect, test, describe, vi } from 'vitest'
import { client } from '../src'

// @ts-ignore
global.fetch = vi.fn((url, options) => {
  return Promise.resolve({
    json: () => Promise.resolve({}),
  })
})

describe('client', () => {
  test('get', async () => {
    client.get('/api/sample/[id]', {
      query: { id: '1' },
    })
    expect(fetch).toBeCalledWith('/api/sample/1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
  test('get without brackets', async () => {
    client.get('/api/sample/', {
      query: { id: '1', foo: 'bar' },
    })
    expect(fetch).toBeCalledWith('/api/sample/?id=1&foo=bar', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
  test('post', async () => {
    client.post('/api/sample', {
      body: {
        fuga: 'fuga',
        foo: 'aaa',
      },
    })
    expect(fetch).toBeCalledWith('/api/sample', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fuga: 'fuga',
        foo: 'aaa',
      }),
    })
  })
  test('put', async () => {
    client.put('/api/sample/[id]', {
      query: { id: '1' },
      body: {
        fuga: 'fuga',
        foo: 'aaa',
      },
    })
    expect(fetch).toBeCalledWith('/api/sample/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fuga: 'fuga',
        foo: 'aaa',
      }),
    })
  })
  test('delete', async () => {
    client.delete('/api/sample/[id]', {
      query: { id: '1' },
    })
    expect(fetch).toBeCalledWith('/api/sample/1', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
})
