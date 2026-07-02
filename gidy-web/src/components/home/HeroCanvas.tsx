import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
    camera.position.z = 30

    // Particle system
    const count = window.innerWidth < 768 ? 600 : 1200
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    const colorOptions = [
      new THREE.Color('#f97316'),
      new THREE.Color('#f59e0b'),
      new THREE.Color('#ea580c'),
      new THREE.Color('#fb923c'),
    ]

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40

      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      sizes[i] = Math.random() * 1.5 + 0.5
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const material = new THREE.PointsMaterial({
      size: 0.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Connection lines (few, subtle)
    const lineCount = 30
    const lineMaterial = new THREE.LineBasicMaterial({
      color: '#f97316',
      transparent: true,
      opacity: 0.08,
    })
    for (let i = 0; i < lineCount; i++) {
      const lGeo = new THREE.BufferGeometry()
      const idx1 = Math.floor(Math.random() * count) * 3
      const idx2 = Math.floor(Math.random() * count) * 3
      lGeo.setAttribute('position', new THREE.BufferAttribute(
        new Float32Array([
          positions[idx1], positions[idx1 + 1], positions[idx1 + 2],
          positions[idx2], positions[idx2 + 1], positions[idx2 + 2],
        ]), 3
      ))
      scene.add(new THREE.Line(lGeo, lineMaterial))
    }

    let animId: number
    const clock = new THREE.Clock()

    function animate() {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      particles.rotation.y = t * 0.03
      particles.rotation.x = t * 0.01
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!canvas) return
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60"
      aria-hidden="true"
    />
  )
}
