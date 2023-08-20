'use client'

import Images from '@/components/Images'
import { ImageData } from '@/components/Image'
import dynamic from 'next/dynamic'
import { Suspense, useState } from 'react'

const Blob = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Blob), { ssr: false })
const Dog = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Dog), { ssr: false })
// Use later in the task, if you'd like
const Duck = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Duck), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

const serializeFileData = async (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('An unexpected error occured generating the file'))
  })

const parseSerializedFile = (serializedFile: string): ImageData => {
  const [dataTypeSegment, encodedDataSegment] = serializedFile.split(';')
  const dataType = dataTypeSegment.split(':')[1]
  const encodedData = encodedDataSegment.split('base64,')[1]
  return { dataType, encodedData }
}

export default function Page() {
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [images, setImages] = useState([] as ImageData[])

  const handleGenerateClick = async () => {
    if (isGeneratingImage) return

    try {
      setIsGeneratingImage(true)
      const dogNumber = Math.ceil(5 * Math.random())
      const response = await fetch(`/images/dog-${dogNumber.toString().padStart(2, '0')}.jpg`)
      const serialzedFile = await serializeFileData(await response.blob())
      const imageData = parseSerializedFile(serialzedFile)
      setImages([...images, imageData])
    } finally {
      setIsGeneratingImage(false)
    }
  }

  return (
    <>
      <div className='bg-gray-100'>
        <div className='flex mx-auto w-full flex-col md:flex-row md:w-4/5 md:px-12'>
          <div className='mx-auto flex w-fit items-center'>
            <div className='flex w-fit flex-col items-start px-6 pt-12 text-center md:text-left'>
              <h1 className='text-5xl font-bold leading-tight'>InstaGen</h1>
              <p className='w-full uppercase text-blue-400 mt-[-10px] mb-2'>A product by Gendo</p>
              <p className='mb-8 text-2xl leading-normal'>Generate and post your own custom images.</p>
            </div>
          </div>
          <View className='top-0 flex h-72 w-full flex-col items-center justify-center'>
            <Blob />
            <Common color={null} />
          </View>
        </div>
      </div>

      <div className='mx-auto flex w-full flex-col flex-wrap items-center px-12 md:flex-row lg:w-4/5'>
        <div className='relative h-96 w-full py-8 sm:w-1/2'>
          <View orbit className='relative h-full sm:w-full'>
            <Suspense fallback={null}>
              <Dog scale={2} position={[0, -1.6, 0]} rotation={[0.0, -0.3, 0]} />
              <Common color={'lightblue'} />
            </Suspense>
          </View>
        </div>
        <div className='relative h-48 w-full py-2 sm:w-1/2 md:my-12 pl-8'>
          <h2 className='mb-3 text-3xl font-bold leading-none text-gray-800'>Generate your image!</h2>
          <p className='mb-8 text-gray-600'>
            Drag, scroll, pinch, and rotate the canvas to frame your image, and then when you're happy, hit generate.
          </p>
          <div
            className='border border-blue-400 w-fit p-2 rounded-md hover:cursor-pointer hover:bg-blue-50 text-blue-500'
            onClick={handleGenerateClick}
          >
            Generate
          </div>
        </div>
      </div>
      <div className='bg-gray-100 p-8'>
        <div className='mx-auto flex w-full flex-col flex-wrap items-center md:flex-row lg:w-4/5'>
          <div className='mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 lg:w-4/5'>
            <Images imageData={images}></Images>
          </div>
        </div>
      </div>
    </>
  )
}
