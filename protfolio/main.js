import * as THREE from 'three'

const container = document.getElementById('three-container')
if (!container) throw new Error('Missing #three-container')

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
container.appendChild(renderer.domElement)

const SEGMENTS = 64
const blobGeo = new THREE.IcosahedronGeometry(1.4, 4)
const wireMaterial = new THREE.MeshBasicMaterial({ color: 0xb6ff00, wireframe: true })
const blob = new THREE.Mesh(blobGeo, wireMaterial)
scene.add(blob)

const innerGeo = new THREE.IcosahedronGeometry(0.9, 3)
const innerMat = new THREE.MeshBasicMaterial({
  color: 0xb6ff00,
  transparent: true,
  opacity: 0.1,
  wireframe: true,
})
const innerBlob = new THREE.Mesh(innerGeo, innerMat)
scene.add(innerBlob)

const pos = blobGeo.attributes.position
const original = new Float32Array(pos.array)

const innerPos = innerGeo.attributes.position
const innerOriginal = new Float32Array(innerPos.array)

const starsGeometry = new THREE.BufferGeometry()
const starsCount = 3000
const starPositions = new Float32Array(starsCount * 3)
for (let i = 0; i < starsCount * 3; i++) {
  starPositions[i] = (Math.random() - 0.5) * 20
}
starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
const stars = new THREE.Points(
  starsGeometry,
  new THREE.PointsMaterial({ size: 0.008, color: 0xb6ff00, transparent: true, opacity: 0.4 })
)
scene.add(stars)

let mouseX = 0
let mouseY = 0
let targetX = 0
let targetY = 0

document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2
})

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

function morphGeometry(posAttr, originalArr, time, intensity) {
  const array = posAttr.array
  for (let i = 0; i < array.length; i += 3) {
    const ix = i, iy = i + 1, iz = i + 2
    const ox = originalArr[ix], oy = originalArr[iy], oz = originalArr[iz]
    const noise =
      Math.sin(ox * 2 + time) * 0.15 * intensity +
      Math.cos(oy * 2 + time * 0.7) * 0.12 * intensity +
      Math.sin(oz * 2 + time * 1.3) * 0.1 * intensity +
      Math.sin((ox + oy) * 1.5 + time * 0.5) * 0.08 * intensity
    const r = 1 + noise
    array[ix] = ox * r
    array[iy] = oy * r
    array[iz] = oz * r
  }
  posAttr.needsUpdate = true
}

function animate() {
  requestAnimationFrame(animate)

  const t = performance.now() * 0.001

  targetX += (mouseX * 0.4 - targetX) * 0.04
  targetY += (-mouseY * 0.4 - targetY) * 0.04

  blob.position.x = targetX
  blob.position.y = targetY
  innerBlob.position.copy(blob.position)

  blob.rotation.x += 0.002
  blob.rotation.y += 0.004
  innerBlob.rotation.x -= 0.001
  innerBlob.rotation.y += 0.003

  const breath = 0.7 + Math.sin(t * 0.4) * 0.3
  morphGeometry(pos, original, t, breath)
  morphGeometry(innerPos, innerOriginal, t * 0.8, breath * 0.6)

  stars.rotation.y += 0.0003

  renderer.render(scene, camera)
}

animate()
