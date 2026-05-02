import { Html, useProgress } from "@react-three/drei";
import { memo, useEffect, useState } from "react";

function CanvasLoader() {
	const { progress } = useProgress();

	return (
		<Html
			as="div"
			center
			className=" flex justify-center items-center w-full h-full flex-col z-30"
		>
			<span className="canvas-loader z-30 text-white"></span>
			<p className="text-[14px] text-white font-bold mt-10 z-30">
				{progress.toFixed(2)}%
			</p>
		</Html>
	);
}

/** RAF-driven progress avoids 100 staggered timeouts; caps below 99% until unload */
export const PreLoader = memo(function PreLoader() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		let rafId = 0;
		const tick = () => {
			setProgress((p) => {
				if (p >= 99) return p;
				return Math.min(
					p + Math.max(0.35, (99 - p) * 0.018),
					99
				);
			});
			rafId = requestAnimationFrame(tick);
		};
		rafId = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafId);
	}, []);

	const displayPct = Math.min(100, Math.floor(progress));

	return (
		<div className="w-[100svw] h-[100svh] overflow-hidden bg-bgPrimaryLight dark:bg-bgPrimaryDark z-[150] fixed top-0 left-0 flex flex-col justify-center items-center gap-8">
			<div className="loader md:w-[150px] md:h-[150px] w-[100px] h-[100px]">
				<div className="loader_cube loader_cube--color"></div>
				<div className="loader_cube loader_cube--glowing"></div>
				<span className="loader-span"></span>
			</div>
			<h1 className="text-2xl text-ctnPrimaryLight dark:text-ctnPrimaryDark">
				{displayPct}%
			</h1>
		</div>
	);
});

export default CanvasLoader;
