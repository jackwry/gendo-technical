import { formJsonHttpResponse } from '@/http'
import { validatePostRequest } from './validatePostRequest'
import { PrismaClient } from '@prisma/client'
import { formatPostAsJsonApiResponse } from '@/ApiModels/PostJsonApiData'

const prisma = new PrismaClient()
const defaultUser = 'alice@prisma.io'

export const GET = async (): Promise<Response> => {
  // TODO Get user email or ID from auth token
  const posts = await prisma.post.findMany({ where: { user: { email: defaultUser } }, include: { file: true } })

  const jsonApiPosts = posts.map((post) => formatPostAsJsonApiResponse(post, post.file))
  return formJsonHttpResponse({ data: jsonApiPosts }, 200)
}

export const POST = async (request: Request): Promise<Response> => {
  // TODO Get user email or ID from auth token
  const jsonPayload = await request.json()
  const validatedRequest = validatePostRequest(jsonPayload)

  if (!validatedRequest.success) return formJsonHttpResponse(createValidationError(), 422)
  const { data } = validatedRequest

  const post = await prisma.post.create({
    data: {
      title: data.title,
      description: data.description,
      user: { connect: { email: defaultUser } },
      file: { create: { dataType: data.fileDataType, encodedDataBase64: data.fileEncodedData } },
    },
    include: { file: true },
  })

  const jsonApiPost = formatPostAsJsonApiResponse(post, post.file)
  return formJsonHttpResponse({ data: jsonApiPost }, 201)
}

const createValidationError = () => ({
  errors: [
    {
      code: 'VALIDATION_ERROR',
      message: 'The request does not meet the required format. Please see nested errors',
    },
  ],
})
