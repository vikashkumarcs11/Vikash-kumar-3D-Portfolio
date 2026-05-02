import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

import EarthModel from "./models/EarthModel";

function EarthInner({ isMobile }) {
	const { nodes, materials } = useGLTF("models/planet/scene.gltf");
	const earthRef = useRef();

	useFrame(() => {
		if (earthRef.current) {
			earthRef.current.rotation.y += 0.01;
		}
	});

	return (
		<>
			{!isMobile && (
				<OrbitControls
					autoRotate
					enableZoom={false}
					maxPolarAngle={Math.PI / 2}
					minPolarAngle={Math.PI / 2}
					enableDamping
					dampingFactor={0.05}
					enablePan={false}
					enableRotate
					makeDefault
				/>
			)}
			<EarthModel
				materials={materials}
				nodes={nodes}
				scale={2.2}
				position={[0, 0, 0]}
				earthRef={earthRef}
			/>
		</>
	);
}

function EarthCanvas({ isMobile }) {
	const maxDpr = isMobile ? 1.35 : 2;
	return (
		<Canvas
			dpr={[1, maxDpr]}
			gl={{
				outputColorSpace: THREE.SRGBColorSpace,
				alpha: true,
				powerPreference: "high-performance",
			}}
			className="cursor-pointer"
		>
			<Suspense fallback={null}>
				<EarthInner isMobile={isMobile} />
			</Suspense>
		</Canvas>
	);
}

export default EarthCanvas;
