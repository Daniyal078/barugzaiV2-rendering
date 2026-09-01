'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface Viewer360Props {
  imageSrc: string
  height?: string
  className?: string
}

export default function Viewer360({ imageSrc, height = '560px', className = '' }: Viewer360Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    lon: 180,
    lat: 0,
    targetLon: 180,
    targetLat: 0,
    autoRotate: true,
    animationId: 0,
    image: null as HTMLImageElement | null,
    gl: null as WebGLRenderingContext | null,
    program: null as WebGLProgram | null,
    texture: null as WebGLTexture | null,
    positionBuffer: null as WebGLBuffer | null,
    texCoordBuffer: null as WebGLBuffer | null,
    sphereVertices: null as Float32Array | null,
    sphereTexCoords: null as Float32Array | null,
    sphereIndices: null as Uint16Array | null,
    indexBuffer: null as WebGLBuffer | null,
    vertexCount: 0,
  })
  const [isLoaded, setIsLoaded] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  const createSphere = useCallback((latBands: number, lonBands: number) => {
    const vertices: number[] = []
    const texCoords: number[] = []
    const indices: number[] = []

    for (let lat = 0; lat <= latBands; lat++) {
      const theta = (lat * Math.PI) / latBands
      const sinTheta = Math.sin(theta)
      const cosTheta = Math.cos(theta)

      for (let lon = 0; lon <= lonBands; lon++) {
        const phi = (lon * 2 * Math.PI) / lonBands
        const sinPhi = Math.sin(phi)
        const cosPhi = Math.cos(phi)

        vertices.push(cosPhi * sinTheta, cosTheta, sinPhi * sinTheta)
        texCoords.push(1 - lon / lonBands, 1 - lat / latBands)
      }
    }

    for (let lat = 0; lat < latBands; lat++) {
      for (let lon = 0; lon < lonBands; lon++) {
        const first = lat * (lonBands + 1) + lon
        const second = first + lonBands + 1
        indices.push(first, second, first + 1, second, second + 1, first + 1)
      }
    }

    return {
      vertices: new Float32Array(vertices),
      texCoords: new Float32Array(texCoords),
      indices: new Uint16Array(indices),
    }
  }, [])

  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null
    if (!gl) return

    // Vertex shader — renders a sphere from inside
    const vsSource = `
      attribute vec3 a_position;
      attribute vec2 a_texCoord;
      uniform mat4 u_projectionMatrix;
      uniform mat4 u_viewMatrix;
      varying vec2 v_texCoord;
      void main() {
        gl_Position = u_projectionMatrix * u_viewMatrix * vec4(a_position, 1.0);
        v_texCoord = a_texCoord;
      }
    `
    // Fragment shader
    const fsSource = `
      precision mediump float;
      uniform sampler2D u_texture;
      varying vec2 v_texCoord;
      void main() {
        gl_FragColor = texture2D(u_texture, v_texCoord);
      }
    `

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      return shader
    }

    const vs = compileShader(gl.VERTEX_SHADER, vsSource)
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource)
    const program = gl.createProgram()!
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    gl.useProgram(program)

    const sphere = createSphere(64, 64)
    stateRef.current.sphereVertices = sphere.vertices
    stateRef.current.sphereTexCoords = sphere.texCoords
    stateRef.current.sphereIndices = sphere.indices
    stateRef.current.vertexCount = sphere.indices.length

    const posBuffer = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, sphere.vertices, gl.STATIC_DRAW)

    const texBuffer = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, sphere.texCoords, gl.STATIC_DRAW)

    const idxBuffer = gl.createBuffer()!
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, sphere.indices, gl.STATIC_DRAW)

    stateRef.current.gl = gl
    stateRef.current.program = program
    stateRef.current.positionBuffer = posBuffer
    stateRef.current.texCoordBuffer = texBuffer
    stateRef.current.indexBuffer = idxBuffer
  }, [createSphere])

  const loadTexture = useCallback((src: string) => {
    const { gl, program } = stateRef.current
    if (!gl || !program) return

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const texture = gl.createTexture()!
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true) // Fix: WebGL's Y-axis is inverted vs image coords
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      stateRef.current.texture = texture
      stateRef.current.image = img
      setIsLoaded(true)
    }
    img.src = src
  }, [])

  // Matrix helpers
  const perspective = (fov: number, aspect: number, near: number, far: number): Float32Array => {
    const f = 1.0 / Math.tan((fov * Math.PI) / 360)
    const nf = 1 / (near - far)
    return new Float32Array([
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (far + near) * nf, -1,
      0, 0, 2 * far * near * nf, 0,
    ])
  }

  const lookAt = (eye: number[], center: number[], up: number[]): Float32Array => {
    const z = normalize([eye[0] - center[0], eye[1] - center[1], eye[2] - center[2]])
    const x = normalize(cross(up, z))
    const y = cross(z, x)
    return new Float32Array([
      x[0], y[0], z[0], 0,
      x[1], y[1], z[1], 0,
      x[2], y[2], z[2], 0,
      -dot(x, eye), -dot(y, eye), -dot(z, eye), 1,
    ])
  }

  const normalize = (v: number[]) => {
    const len = Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2)
    return v.map(x => x / len)
  }
  const cross = (a: number[], b: number[]) => [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ]
  const dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

  const render = useCallback(() => {
    const state = stateRef.current
    const { gl, program, texture, positionBuffer, texCoordBuffer, indexBuffer, vertexCount } = state
    const canvas = canvasRef.current
    if (!gl || !program || !texture || !canvas) return

    // Smooth easing
    state.lon += (state.targetLon - state.lon) * 0.08
    state.lat += (state.targetLat - state.lat) * 0.08
    state.lat = Math.max(-80, Math.min(80, state.lat))

    // Auto-rotate when idle
    if (state.autoRotate) {
      state.targetLon += 0.05
      state.lon += 0.05
    }

    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.enable(gl.DEPTH_TEST)
    gl.frontFace(gl.CW) // Render back faces (inside sphere)

    const projMatrix = perspective(75, canvas.width / canvas.height, 0.1, 1000)

    const lonRad = (state.lon * Math.PI) / 180
    const latRad = (state.lat * Math.PI) / 180
    const lookX = Math.cos(latRad) * Math.sin(lonRad)
    const lookY = Math.sin(latRad)
    const lookZ = Math.cos(latRad) * Math.cos(lonRad)
    const viewMatrix = lookAt([0, 0, 0], [lookX, lookY, lookZ], [0, 1, 0])

    const projLoc = gl.getUniformLocation(program, 'u_projectionMatrix')
    const viewLoc = gl.getUniformLocation(program, 'u_viewMatrix')
    gl.uniformMatrix4fv(projLoc, false, projMatrix)
    gl.uniformMatrix4fv(viewLoc, false, viewMatrix)

    // Bind position
    const posLoc = gl.getAttribLocation(program, 'a_position')
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0)

    // Bind texcoords
    const texLoc = gl.getAttribLocation(program, 'a_texCoord')
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
    gl.enableVertexAttribArray(texLoc)
    gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0)

    // Bind texture
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.uniform1i(gl.getUniformLocation(program, 'u_texture'), 0)

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
    gl.drawElements(gl.TRIANGLES, vertexCount, gl.UNSIGNED_SHORT, 0)

    // eslint-disable-next-line react-hooks/immutability
    state.animationId = requestAnimationFrame(render)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const resize = () => {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }
    resize()

    initWebGL()
    loadTexture(imageSrc)

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
      cancelAnimationFrame(stateRef.current.animationId)
    }
  }, [imageSrc, initWebGL, loadTexture])

  useEffect(() => {
    if (isLoaded) {
      stateRef.current.animationId = requestAnimationFrame(render)
    }
    return () => cancelAnimationFrame(stateRef.current.animationId)
  }, [isLoaded, render])

  // Pointer events (works for both mouse and touch via pointer events API)
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    stateRef.current.isDragging = true
    stateRef.current.autoRotate = false
    stateRef.current.startX = e.clientX
    stateRef.current.startY = e.clientY
    setIsDragging(true)
    if (!hasInteracted) setHasInteracted(true)
      ; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }, [hasInteracted])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!stateRef.current.isDragging) return
    const dx = e.clientX - stateRef.current.startX
    const dy = e.clientY - stateRef.current.startY
    stateRef.current.targetLon -= dx * 0.25
    stateRef.current.targetLat += dy * 0.15
    stateRef.current.targetLat = Math.max(-80, Math.min(80, stateRef.current.targetLat))
    stateRef.current.startX = e.clientX
    stateRef.current.startY = e.clientY
  }, [])

  const handlePointerUp = useCallback(() => {
    stateRef.current.isDragging = false
    setIsDragging(false)
    // Resume auto-rotate after 3 seconds idle
    setTimeout(() => {
      if (!stateRef.current.isDragging) {
        stateRef.current.autoRotate = true
      }
    }, 3000)
  }, [])

  // Touch-specific pinch-to-zoom could be added here

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none ${className}`}
      style={{ height, width: '100%' }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'none' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />

      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
          <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin mb-3" />
          <p className="text-white/60 text-sm tracking-widest uppercase">Loading 360°</p>
        </div>
      )}

      {/* Instruction overlay — fades after first interaction */}
      {isLoaded && !hasInteracted && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none animate-pulse">
          <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2.5 flex items-center gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <path d="M5 9V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4" />
              <path d="M9 12h6M12 9l3 3-3 3" />
            </svg>
            <span className="text-white text-xs tracking-widest uppercase">Drag to explore interior</span>
          </div>
        </div>
      )}

      {/* 360° badge */}
      {isLoaded && (
        <div className="absolute bottom-4 right-4 pointer-events-none">
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5 flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span className="text-white/70 text-xs font-light tracking-widest">360°</span>
          </div>
        </div>
      )}
    </div>
  )
}