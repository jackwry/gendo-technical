import { formJsonHttpResponse } from '@/http'

export const POST = (request: Request): Response => {
  return formJsonHttpResponse({ foo: 'bar' })
}
