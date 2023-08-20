export const formJsonHttpResponse = (body: any) =>
  new Response(JSON.stringify(body), { headers: { 'content-type': 'application/json' } })
