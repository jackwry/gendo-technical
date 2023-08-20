import axios from 'axios'
import React from 'react'

export type ImageData = { dataType: string; encodedData: string }

const Image: React.FC<Partial<ImageData>> = (props) => {
  const hasImage = props.dataType && props.encodedData

  const onClick = async () => {
    const postData = {
      title: 'A dog in pictues',
      description: 'Here is a picture of my dog',
      fileDataType: props.dataType,
      fileEncodedData: props.encodedData,
    }

    axios
      .post('/api/posts', postData, { headers: { 'Content-Type': 'application/json' } })
      .then((result) => {
        console.log('Success!', result.data)
      })
      .catch((response) => {
        console.error('Error creating post for generated image', response)
      })
  }

  return (
    <div className='flex w-32 h-32 bg-white rounded-md justify-center items-center'>
      {hasImage && (
        <img onClick={onClick} src={`data:${props.dataType};base64,${props.encodedData}`} className='w-5/6 h-5/6'></img>
      )}
    </div>
  )
}

export default Image
