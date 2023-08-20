import { formJsonHttpResponse } from '@/http'
import { validatePostRequest } from './validatePostRequest'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const defaultUser = 'alice@prisma.io'

export const POST = async (request: Request): Promise<Response> => {
  const jsonPayload = await request.json()
  const validatedRequest = validatePostRequest(jsonPayload)

  if (!validatedRequest.success) return formJsonHttpResponse(createValidationError(), 422)
  const { data } = validatedRequest

  await prisma.post.create({
    data: {
      title: data.title,
      description: data.description,
      user: { connect: { email: defaultUser } },
      file: { create: { dataType: data.fileDataType, encodedDataBase64: data.fileEncodedData } },
    },
  })

  return formJsonHttpResponse(validatedRequest)
}

const createValidationError = () => ({
  errors: [
    {
      code: 'VALIDATION_ERROR',
      message: 'The request does not meet the required format. Please see nested errors',
    },
  ],
})
