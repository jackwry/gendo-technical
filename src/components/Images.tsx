import React from 'react'

export type ImageData = { dataType: string; encodedData: string }

export const Images: React.FC<{ imageData: ImageData[] }> = (props) => {
  const imageElements = []

  for (let i = 0; i < 12; i++) {
    const image = props.imageData[i]
    imageElements.push(
      <div className='flex w-32 h-32 bg-white rounded-md justify-center items-center'>
        {image && <img src={`data:${image.dataType};base64,${image.encodedData}`} className='w-5/6 h-5/6'></img>}
      </div>,
    )
  }

  return imageElements
}
