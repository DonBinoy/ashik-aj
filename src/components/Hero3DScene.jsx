import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const FloatingGeometry = ({ position, rotation, scale, geometryType = 'box', isForceActive }) => {
    const meshRef = useRef();
    const { pointer, viewport } = useThree();

    // Original position for snapping back
    const originalPos = useMemo(() => new THREE.Vector3(...position), [position]);
    const currentPos = useRef(new THREE.Vector3(...position));
    const velocity = useRef(new THREE.Vector3(0, 0, 0));

    // Random rotation speed
    const rotationSpeed = useMemo(() => ({
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01
    }), []);

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Rotation always active
            meshRef.current.rotation.x += rotationSpeed.x;
            meshRef.current.rotation.y += rotationSpeed.y;
            meshRef.current.rotation.z += rotationSpeed.z;

            // Physics Logic for "The Force"
            if (isForceActive) {
                // Convert normalized pointer (-1 to 1) to world units
                const mouseX = (pointer.x * viewport.width) / 2;
                const mouseY = (pointer.y * viewport.height) / 2;
                const mouseVec = new THREE.Vector3(mouseX, mouseY, 0); // Assuming mouse is at z=0 plane mostly

                // Direction from mouse to object
                const dir = new THREE.Vector3().copy(currentPos.current).sub(mouseVec);
                const desc = dir.length();

                // Repulsion force (Inverse square law-ish)
                if (desc < 15) { // Influence radius
                    const force = dir.normalize().multiplyScalar(50 / (desc * desc + 0.1));
                    velocity.current.add(force.multiplyScalar(delta));
                }
            } else {
                // Spring back to original position
                const force = new THREE.Vector3().copy(originalPos).sub(currentPos.current).multiplyScalar(2); // Spring strength
                velocity.current.add(force.multiplyScalar(delta));

                // Damping (Friction)
                velocity.current.multiplyScalar(0.9);
            }

            // Apply velocity
            currentPos.current.add(velocity.current.clone().multiplyScalar(delta));
            meshRef.current.position.copy(currentPos.current);
        }
    });

    let Geometry = <boxGeometry args={[1, 1, 1]} />;
    if (geometryType === 'octahedron') Geometry = <octahedronGeometry args={[0.8, 0]} />;
    if (geometryType === 'tetrahedron') Geometry = <tetrahedronGeometry args={[0.8, 0]} />;
    if (geometryType === 'icosahedron') Geometry = <icosahedronGeometry args={[0.8, 0]} />;

    // Note: Removed Float wrapper here because we control position manually now for physics
    // To keep "floating" feel, we could add noise to velocity, but for now simple physics is cleaner for this effect.
    return (
        <mesh ref={meshRef} rotation={rotation} scale={scale}>
            {Geometry}
            <meshPhysicalMaterial
                color="#000000"
                emissive="#001133"
                emissiveIntensity={0.2}
                roughness={0.1}
                metalness={1}
                transmission={0}
                reflectivity={1}
                clearcoat={1}
                clearcoatRoughness={0.1}
                ior={2.33}
            />
        </mesh>
    );
};

// Main Scene Component handling input state
const SceneContent = () => {
    const [isForceActive, setIsForceActive] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'KeyW') setIsForceActive(true);
        };
        const handleKeyUp = (e) => {
            if (e.code === 'KeyW') setIsForceActive(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />

            {/* Cinematic Lighting */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#0066FF" distance={20} />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" distance={20} />
            <spotLight position={[0, 15, 0]} angle={0.4} penumbra={1} intensity={2} castShadow color="#ffffff" />
            <spotLight position={[-15, 0, -5]} angle={0.5} intensity={5} color="#0066FF" />

            <Environment preset="city" />

            {/* Floating Elements (Desktop) */}
            <group visible={true}>
                <FloatingGeometry position={[-4, 2, -2]} rotation={[0.5, 0.5, 0]} scale={1.5} geometryType="octahedron" isForceActive={isForceActive} />
                <FloatingGeometry position={[5, -1, -4]} rotation={[-0.2, -0.2, 0]} scale={1.2} geometryType="box" isForceActive={isForceActive} />
                <FloatingGeometry position={[0, 4, -8]} rotation={[0, 0, 0.5]} scale={2} geometryType="icosahedron" isForceActive={isForceActive} />
                <FloatingGeometry position={[-6, -4, -6]} rotation={[0.2, 0, 0]} scale={1} geometryType="tetrahedron" isForceActive={isForceActive} />
            </group>

            {/* Mobile Elements */}
            <FloatingGeometry position={[0, -3, 2]} rotation={[0.5, 0.5, 0]} scale={0.8} geometryType="octahedron" isForceActive={isForceActive} />
            <FloatingGeometry position={[0, 3, 2]} rotation={[-0.2, -0.2, 0]} scale={0.8} geometryType="box" isForceActive={isForceActive} />

            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
            <Sparkles count={80} scale={15} size={3} speed={0.3} opacity={0.4} color="#0066FF" />
        </>
    )
}

const Hero3DScene = () => {
    return (
        <div className="absolute inset-0 z-0 w-full h-full opacity-60 pointer-events-none">
            <Canvas dpr={[1, 1.5]} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.5 }}>
                <SceneContent />

            </Canvas>

            {/* Central Image - Standard Implementation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vh] md:w-[150vh] aspect-square z-10 pointer-events-none hidden md:block">
                <img
                    src="/ashik1.png"
                    alt="Ashik"
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Gradient Overlay for blending */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020202]" style={{ background: 'radial-gradient(circle at center, transparent 0%, #020202 90%)' }} />
            {/* Mobile Scroll Indicator (User Request) */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/40 text-[10px] uppercase tracking-[0.2em] animate-bounce font-medium md:hidden z-20 pointer-events-none whitespace-nowrap">
                Scroll to Explore
            </div>

        </div>
    );
};

export default Hero3DScene;
