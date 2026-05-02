import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { About, Hero, Navbar } from "@/components";
import HeroBackground from "@/components/HeroBackground";
import UpArrow from "../public/assets/icons/up-arrow.svg";

const Services = dynamic(() => import("@/components/Services"));

const Experience = dynamic(() => import("@/components/Experience"));

const Tech = dynamic(() => import("@/components/Tech"));

const Contact = dynamic(() => import("@/components/Contact"));

const EarthContainer = dynamic(() => import("@/components/EarthContainer"), {
	ssr: false,
});

const StarsCanvas = dynamic(() => import("@/components/canvas/Stars"), {
	ssr: false,
});

function App({ loading }) {
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	}, []);

	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 768px)");
		setIsMobile(mediaQuery.matches);

		const handleMediaQueryChange = (event) => {
			setIsMobile(event.matches);
		};

		mediaQuery.addEventListener("change", handleMediaQueryChange);

		return () => {
			mediaQuery.removeEventListener("change", handleMediaQueryChange);
		};
	}, []);

	return (
		<main className="relative z-0 w-full h-full">
			<div className=" bg-cover bg-no-repeat bg-center">
				<Navbar />
				<HeroBackground />
				<Hero loading={loading} isMobile={isMobile} />
			</div>
			<section className="relative z-0 flex md:flex-row flex-col-reverse w-full h-full overflow-hidden">
				<About />
			</section>
			<Services />

			<Experience />
			<Tech />

			<section className="relative z-0 flex md:flex-row justify-between flex-col-reverse w-full h-full overflow-x-hidden sm:p-8 p-2 pb-8">
				<Contact />
				<EarthContainer isMobile={isMobile} />
				<StarsCanvas />
			</section>
			<button
				onClick={() => {
					window.scrollTo({
						top: 0,
						left: 0,
						behavior: "smooth",
					});
				}}
				className="fixed md:w-10 md:h-10 h-8 w-8 p-2 bottom-8 md:right-10 right-8 text-center text-secondary backdrop-filter backdrop-blur-xl bg-opacity-20 bg-tertiary rounded-lg hover:scale-110 transition-all duration-300"
			>
				<UpArrow />
			</button>
		</main>
	);
}

export default App;
