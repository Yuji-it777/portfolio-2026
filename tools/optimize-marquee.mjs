import sharp from 'sharp'
import { readdir, stat, readFile, rename } from 'fs/promises'
import { join, parse } from 'path'

const INPUT_DIR = 'protfolio/public/marquee'
const WIDTH = 840
const HEIGHT = 540

async function main() {
  const files = await readdir(INPUT_DIR)
  const images = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f))

  let totalOriginal = 0
  let totalOptimized = 0

  for (const file of images) {
    const inputPath = join(INPUT_DIR, file)
    const { name } = parse(file)

    const originalStat = await stat(inputPath)
    totalOriginal += originalStat.size

    const buffer = await readFile(inputPath)

    const webpPath = join(INPUT_DIR, `${name}.webp`)
    const jpgTmpPath = join(INPUT_DIR, `${name}.tmp.jpg`)

    await sharp(buffer)
      .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
      .webp({ quality: 80 })
      .toFile(webpPath)

    await sharp(buffer)
      .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(jpgTmpPath)

    await rename(webpPath, webpPath)

    const webpStat = await stat(webpPath)
    const jpgStat = await stat(jpgTmpPath)
    totalOptimized += jpgStat.size

    await rename(jpgTmpPath, inputPath)

    console.log(
      `${file}: ${(originalStat.size / 1024 / 1024).toFixed(1)}MB → ` +
      `WebP ${(webpStat.size / 1024 / 1024).toFixed(1)}MB | ` +
      `JPEG ${(jpgStat.size / 1024 / 1024).toFixed(1)}MB ` +
      `(${((1 - jpgStat.size / originalStat.size) * 100).toFixed(0)}% savings)`
    )
  }

  console.log(`\nTotal: ${(totalOriginal / 1024 / 1024).toFixed(1)}MB → ${(totalOptimized / 1024 / 1024).toFixed(1)}MB`)
}

main().catch(console.error)
