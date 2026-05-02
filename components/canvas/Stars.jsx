import { memo, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const STAR_COUNT = 5000;

function Stars(props) {
	const ref = useRef();
	const sphere = useMemo(() => {
		const buf = new Float32Array(STAR_COUNT * 3);
		for (let i = 0; i < buf.length; i++) {
			buf[i] = (Math.random() - 0.5) * 2.4;
		}
		return buf;
	}, []);

	useFrame((_, delta) => {
		if (!ref.current) return;
		ref.current.rotation.x -= delta / 10;
		ref.current.rotation.y -= delta / 15;
	});

	return (
		<group rotation={[0, 0, Math.PI / 4]}>
			<Points
				ref={ref}
				positions={sphere}
				stride={3}
				frustumCulled
				{...props}
			>
				<PointMaterial
					transparent
					color="#f272c8"
					size={0.002}
					sizeAttenuation
					depthWrite={false}
				/>
			</Points>
		</group>
	);
}

const StarsScene = memo(Stars);

function StarsCanvas() {
	return (
		<div className="w-full h-auto absolute inset-0 z-[-1]">
			<Canvas
				camera={{ position: [0, 0, 1] }}
				dpr={[1, 1.65]}
				gl={{
					outputColorSpace: THREE.SRGBColorSpace,
					alpha: false,
					powerPreference: "high-performance",
				}}
			>
				<StarsScene />
			</Canvas>
		</div>
	);
}

export default memo(StarsCanvas);
