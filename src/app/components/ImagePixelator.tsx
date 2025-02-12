'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Slider } from "./ui/slider"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Download } from 'lucide-react'
import { faqItems, galleryImages } from '../data/content'
import Image from 'next/image'

export default function ImagePixelator() {
  const [image, setImage] = useState<string | null>(null)
  const [pixelSize, setPixelSize] = useState(10)
  const [blackAndWhite, setBlackAndWhite] = useState(false)
  const [bwThreshold, setBwThreshold] = useState(128)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const pixelateImage = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx || !image) return

    const img = new window.Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height

      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      for (let y = 0; y < canvas.height; y += pixelSize) {
        for (let x = 0; x < canvas.width; x += pixelSize) {
          let r = 0, g = 0, b = 0
          let count = 0
          
          for (let py = 0; py < pixelSize && y + py < canvas.height; py++) {
            for (let px = 0; px < pixelSize && x + px < canvas.width; px++) {
              const idx = ((y + py) * canvas.width + (x + px)) * 4
              r += data[idx]
              g += data[idx + 1]
              b += data[idx + 2]
              count++
            }
          }
          
          r = Math.round(r / count)
          g = Math.round(g / count)
          b = Math.round(b / count)

          if (blackAndWhite) {
            const avg = (r + g + b) / 3
            const bwColor = avg > bwThreshold ? 255 : 0
            r = g = b = bwColor
          }

          for (let py = 0; py < pixelSize && y + py < canvas.height; py++) {
            for (let px = 0; px < pixelSize && x + px < canvas.width; px++) {
              const pixelIndex = ((y + py) * canvas.width + (x + px)) * 4
              data[pixelIndex] = r
              data[pixelIndex + 1] = g
              data[pixelIndex + 2] = b
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0)
    }
    img.src = image
  }, [image, pixelSize, blackAndWhite, bwThreshold])

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.download = 'pixelated-image.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  useEffect(() => {
    if (image) {
      pixelateImage()
    }
  }, [image, pixelSize, blackAndWhite, bwThreshold, pixelateImage])

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-7xl font-bold mb-4">
          Create{' '}
          <span className="text-8xl font-pixel text-violet-600">pixelated</span>
          {' '}images fast
        </h1>
      </div>
      <div className="container mx-auto p-4 max-w-2xl">
        <h1 className="text-4xl font-bold mb-4 text-center">Free Image Pixelator</h1>
        <div className="mb-4">
          <Label htmlFor="image-upload" className="block mb-2">Upload an image:</Label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
          />
        </div>
        {image && (
          <>
            <div className="mb-4">
              <Label htmlFor="pixel-size" className="block mb-2">Pixel Size: {pixelSize}</Label>
              <Slider
                id="pixel-size"
                min={1}
                max={50}
                step={1}
                value={[pixelSize]}
                onValueChange={(value) => setPixelSize(value[0])}
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-4 mb-4">
              <div className="flex justify-between gap-4">
                <Button
                  onClick={() => setBlackAndWhite(!blackAndWhite)}
                  className={`${
                    blackAndWhite 
                      ? 'bg-gray-800 hover:bg-gray-900' 
                      : 'bg-violet-600 hover:bg-violet-700'
                  }`}
                >
                  {blackAndWhite ? 'Black&White' : 'Colored'}
                </Button>
                <Button onClick={handleDownload} className="bg-violet-600 hover:bg-violet-700">
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
              </div>
              {blackAndWhite && (
                <div className="flex flex-col gap-1 w-full">
                  <Label htmlFor="bw-threshold" className="block mb-2">B&W Sensitivity: {bwThreshold}</Label>
                  <Slider
                    id="bw-threshold"
                    min={0}
                    max={255}
                    step={1}
                    value={[bwThreshold]}
                    onValueChange={(value) => setBwThreshold(value[0])}
                    className="w-full"
                  />
                </div>
              )}
            </div>
            <div className="mt-4">
              <canvas ref={canvasRef} className="max-w-full h-auto border border-gray-300" />
            </div>
          </>
        )}
      </div>
      <div className="container mx-auto p-4 max-w-4xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative group">
              <Image 
                src={image.src} 
                alt={image.title}
                width={400}
                height={300}
                priority={index < 3}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={75}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-xl font-semibold">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto p-4 max-w-4xl mt-12 mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">FAQ</h2>
        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-semibold mb-2">{item.question}</h3>
              <p className="text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}