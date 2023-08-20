import React from 'react'

type ImageData = { dataType: string; encodedData: string }

export const Images: React.FC<{ imageData: ImageData[] }> = (props) => {
  const images = []

  for (let i = 0; i < 12; i++) {
    images.push(<div className='w-32 h-32 bg-white rounded-md'></div>)
  }

  return images
}
