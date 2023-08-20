import { File, Post } from '@prisma/client'

export type PostJsonApiData = {
  id: string
  type: 'post'
  attributes: { title: string; description: string; fileDataType: string; fileEncodedData: string }
}

export const formatPostAsJsonApiResponse = (post: Post, file: File): PostJsonApiData => {
  const { id, title, description } = post
  return {
    id,
    type: 'post',
    attributes: { title, description, fileDataType: file.dataType, fileEncodedData: file.encodedDataBase64 },
  }
}
