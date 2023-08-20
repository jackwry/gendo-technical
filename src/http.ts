export const formJsonHttpResponse = (body: any, statusCode?: number) =>
  new Response(JSON.stringify(body), {
    headers: { 'content-type': 'application/json' },
    status: statusCode,
  })
