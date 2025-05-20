
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ImmersiveStoryCanvasProps {
  stage?: number;
}

const ImmersiveStoryCanvas: React.FC<ImmersiveStoryCanvasProps> = ({ stage = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const timeRef = useRef<number>(0);
  const isAnimatingRef = useRef<boolean>(false);
  const targetColorRef = useRef<THREE.Color>(new THREE.Color(0x6D28D9));

  // Colors based on journey stage
  const stageColors = [
    new THREE.Color(0xEF4444), // Red for challenge
    new THREE.Color(0xF97316), // Orange for struggle
    new THREE.Color(0x6D28D9), // Purple for turning point
    new THREE.Color(0x10B981), // Green for transformation
    new THREE.Color(0x8B5CF6), // Purple for success
  ];

  useEffect(() => {
    // Update target color when stage changes
    if (stage !== undefined && stageColors[stage]) {
      targetColorRef.current = stageColors[stage];
    }
  }, [stage]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene, camera, and renderer if they don't exist
    if (!sceneRef.current) {
      // Create scene
      sceneRef.current = new THREE.Scene();
      
      // Create camera
      cameraRef.current = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      cameraRef.current.position.z = 30;
      
      // Create renderer with better quality settings
      rendererRef.current = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true
      });
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current.setClearColor(0x000000, 0);
      rendererRef.current.setPixelRatio(window.devicePixelRatio);
      containerRef.current.appendChild(rendererRef.current.domElement);

      // Create particles for dynamic 3D environment
      const particleCount = 3000;
      const particleGeometry = new THREE.BufferGeometry();
      
      // Create more interesting particle positions for 3D space
      const positionArray = new Float32Array(particleCount * 3);
      const sizeArray = new Float32Array(particleCount);
      const colorArray = new Float32Array(particleCount * 3);
      
      const color = new THREE.Color();
      
      for (let i = 0; i < particleCount; i++) {
        // Position particles in a sphere
        const radius = 50;
        const theta = THREE.MathUtils.randFloatSpread(360); 
        const phi = THREE.MathUtils.randFloatSpread(360);
        
        positionArray[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
        positionArray[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
        positionArray[i * 3 + 2] = radius * Math.cos(theta);
        
        // Vary particle sizes for depth effect
        sizeArray[i] = Math.random() * 0.5 + 0.1;
        
        // Initial color (purple)
        color.set(targetColorRef.current);
        colorArray[i * 3] = color.r;
        colorArray[i * 3 + 1] = color.g;
        colorArray[i * 3 + 2] = color.b;
      }
      
      particleGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positionArray, 3)
      );
      particleGeometry.setAttribute(
        'size',
        new THREE.BufferAttribute(sizeArray, 1)
      );
      particleGeometry.setAttribute(
        'color',
        new THREE.BufferAttribute(colorArray, 3)
      );
      
      // Create custom shader material for more control over particles
      const particleMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          pointSize: { value: window.innerHeight / 100 }
        },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float time;
          uniform float pointSize;
          
          void main() {
            vColor = color;
            vec3 pos = position;
            // Add some subtle animation
            pos.x += sin(time * 0.001 + position.z * 0.05) * 0.3;
            pos.y += cos(time * 0.001 + position.x * 0.05) * 0.3;
            pos.z += sin(time * 0.001 + position.y * 0.05) * 0.3;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * pointSize * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          
          void main() {
            // Create a soft, glowing particle
            float distanceToCenter = length(gl_PointCoord - vec2(0.5));
            float strength = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
            gl_FragColor = vec4(vColor, strength);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      
      // Create the particle system
      particlesRef.current = new THREE.Points(particleGeometry, particleMaterial);
      sceneRef.current.add(particlesRef.current);

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      sceneRef.current.add(ambientLight);

      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 1, 1);
      sceneRef.current.add(directionalLight);

      // Animation function
      const animate = (time: number) => {
        timeRef.current = time;
        
        if (!isAnimatingRef.current) return;
        
        requestAnimationFrame(animate);
        
        if (particlesRef.current) {
          // Rotate particles
          particlesRef.current.rotation.x += 0.0003;
          particlesRef.current.rotation.y += 0.0005;
          
          // Update shader time
          if (particlesRef.current.material instanceof THREE.ShaderMaterial) {
            particlesRef.current.material.uniforms.time.value = time;
          }
          
          // Gradually change colors toward target color
          if (particlesRef.current.geometry.attributes.color) {
            const colors = particlesRef.current.geometry.attributes.color.array as Float32Array;
            const particleCount = colors.length / 3;
            let needsUpdate = false;
            
            for (let i = 0; i < particleCount; i++) {
              const r = colors[i * 3];
              const g = colors[i * 3 + 1];
              const b = colors[i * 3 + 2];
              
              // Ease toward target color
              colors[i * 3] += (targetColorRef.current.r - r) * 0.01;
              colors[i * 3 + 1] += (targetColorRef.current.g - g) * 0.01;
              colors[i * 3 + 2] += (targetColorRef.current.b - b) * 0.01;
              
              if (Math.abs(targetColorRef.current.r - r) > 0.001 ||
                  Math.abs(targetColorRef.current.g - g) > 0.001 ||
                  Math.abs(targetColorRef.current.b - b) > 0.001) {
                needsUpdate = true;
              }
            }
            
            if (needsUpdate) {
              particlesRef.current.geometry.attributes.color.needsUpdate = true;
            }
          }
        }
        
        // Render
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      };

      // Start animation
      isAnimatingRef.current = true;
      requestAnimationFrame(animate);

      // Handle window resize
      const handleResize = () => {
        if (cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = window.innerWidth / window.innerHeight;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(window.innerWidth, window.innerHeight);
          
          // Update point size based on window height
          if (particlesRef.current && 
              particlesRef.current.material instanceof THREE.ShaderMaterial) {
            particlesRef.current.material.uniforms.pointSize.value = 
              window.innerHeight / 100;
          }
        }
      };

      window.addEventListener('resize', handleResize);
      
      // Handle mouse movement for interactive parallax effect
      const handleMouseMove = (event: MouseEvent) => {
        if (cameraRef.current) {
          const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
          const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
          
          // Subtle camera movement for parallax effect
          cameraRef.current.position.x += (mouseX * 2 - cameraRef.current.position.x) * 0.02;
          cameraRef.current.position.y += (mouseY * 2 - cameraRef.current.position.y) * 0.02;
          cameraRef.current.lookAt(0, 0, 0);
        }
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      // Clean up function
      return () => {
        isAnimatingRef.current = false;
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        
        if (rendererRef.current && containerRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement);
          rendererRef.current.dispose();
        }
      };
    }
  }, []);

  return <div ref={containerRef} className="absolute inset-0" />;
};

export default ImmersiveStoryCanvas;
