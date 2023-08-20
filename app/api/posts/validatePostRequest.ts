import { z } from 'zod'

const permittedDataTypes = ['image/jpeg'] as const

const postSchema = z.object({
  title: z.string().max(50),
  description: z.string().max(500),
  fileDataType: z.enum(permittedDataTypes),
  fileEncodedData: z.string(),
})

export type PostRequest = z.infer<typeof postSchema>

export const validatePostRequest = (requestBody: any) => postSchema.safeParse(requestBody)
