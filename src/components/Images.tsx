import React from 'react'
import Image, { ImageData } from './Image'

const Images: React.FC<{ imageData: ImageData[] }> = (props) => {
  const imageElements = []

  for (let i = 0; i < 12; i++) {
    const image = props.imageData[i]
    imageElements.push(<Image {...image}></Image>)
  }

  return imageElements
}

export default Images
