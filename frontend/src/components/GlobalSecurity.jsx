import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Lock, Network, Globe2 } from 'lucide-react';

const GlobalSecurity = () => {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  const securityFeatures = [
    {
      icon: Shield,
      title: "Global Coverage",
      description: "Our tracking system works across borders with seamless connectivity in over 190+ countries, ensuring your loved ones are protected wherever they go."
    },
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "Military-grade encryption protects all location data and communications, ensuring only authorized users can access sensitive information."
    },
    {
      icon: Network,
      title: "International Response Network",
      description: "Connected with local authorities and emergency services worldwide for rapid response in any situation."
    },
    {
      icon: Globe2,
      title: "24/7 Global Monitoring",
      description: "Our centers across multiple time zones provide round-the-clock monitoring and support in multiple languages."
    }
  ];

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = true;
    controls.minDistance = 1.5;
    controls.maxDistance = 4;
    controlsRef.current = controls;

    // Textures
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('/frontend/public/track1t globe1.jpg');
    const bumpMap = textureLoader.load('/frontend/public/track1t globe2.jpg');

    // Earth
    const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: bumpMap,
      bumpScale: 0.05,
      specular: new THREE.Color(0x333333),
      shininess: 25,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(1.1, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      uniforms: {
        glowColor: { value: new THREE.Color(0x00ff00) },
        viewVector: { value: camera.position }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPositionNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPositionNormal = normalize(normalMatrix * position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPositionNormal;
        uniform vec3 glowColor;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vPositionNormal), 2.0);
          gl_FragColor = vec4(glowColor, intensity * 0.5);
        }
      `
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    // Connection lines
    const createConnectionLine = (startLat, startLng, endLat, endLng) => {
      const startPos = latLongToVector3(startLat, startLng);
      const endPos = latLongToVector3(endLat, endLng);
      
      const points = [];
      for (let i = 0; i <= 100; i++) {
        const t = i / 100;
        const pos = new THREE.Vector3().lerpVectors(startPos, endPos, t);
        pos.normalize();
        pos.multiplyScalar(1 + Math.sin(Math.PI * t) * 0.2);
        points.push(pos);
      }
      
      const curve = new THREE.CatmullRomCurve3(points);
      const geometry = new THREE.TubeGeometry(curve, 100, 0.003, 8, false);
      const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.6
      });
      return new THREE.Mesh(geometry, material);
    };

    const latLongToVector3 = (lat, lng) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.cos(phi);
      const z = Math.sin(phi) * Math.sin(theta);
      return new THREE.Vector3(x, y, z);
    };

    // Add some example connections
    const connections = [
      { start: [35.6762, 139.6503], end: [40.7128, -74.0060] },  // Tokyo to New York
      { start: [51.5074, -0.1278], end: [-33.8688, 151.2093] },  // London to Sydney
      { start: [1.3521, 103.8198], end: [55.7558, 37.6173] }     // Singapore to Moscow
    ];

    connections.forEach(conn => {
      const line = createConnectionLine(conn.start[0], conn.start[1], conn.end[0], conn.end[1]);
      scene.add(line);
    });

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      earth.rotation.y += 0.001;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-black/50 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Security Features */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">
              Global <span className="text-pink-500">Security</span> Network
            </h2>
            <div className="grid gap-4">
              {securityFeatures.map((feature, index) => (
                <Card key={index} className="bg-zinc-900/50 border-zinc-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <feature.icon className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <h3 className="text-white text-lg font-semibold mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Globe Visualization */}
          <div className="relative h-[600px] bg-black/20 rounded-lg" ref={mountRef} />
        </div>
      </div>
    </div>
  );
};

export default GlobalSecurity;