import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { useEffect, useState } from "react";

import "@/styles/globals.css";
import { PreLoader } from "@/components/Loader";

export default function App({ Component, pageProps }) {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const MIN_MS = 400;
		const MAX_MS = 2200;
		let dead = false;
		let settleTimer = null;
		const t0 = typeof performance !== "undefined" ? performance.now() : 0;

		const applyMinDelay = () => {
			clearTimeout(settleTimer);
			const elapsed =
				typeof performance !== "undefined" ? performance.now() - t0 : MIN_MS;
			const remainder = Math.max(0, MIN_MS - elapsed);
			settleTimer = setTimeout(() => {
				if (!dead) setLoading(false);
			}, remainder);
		};

		let finished = false;
		const finish = () => {
			if (dead || finished) return;
			finished = true;
			clearTimeout(hardCap);
			applyMinDelay();
		};

		const hardCap = setTimeout(finish, MAX_MS);

		const runIdle = () =>
			new Promise((resolve) => {
				if (typeof window === "undefined") {
					resolve();
					return;
				}
				if ("requestIdleCallback" in window) {
					window.requestIdleCallback(() => resolve(), { timeout: 1200 });
				} else {
					requestAnimationFrame(() => resolve());
				}
			});

		(async () => {
			try {
				if (
					typeof document !== "undefined" &&
					document.fonts &&
					document.fonts.ready
				) {
					await document.fonts.ready;
				}
			} catch {
				// ignore
			}
			await runIdle();
			if (
				typeof document !== "undefined" &&
				document.readyState === "complete"
			) {
				finish();
				return;
			}
			if (typeof window !== "undefined") {
				window.addEventListener(
					"load",
					() => {
						finish();
					},
					{ once: true }
				);
				return;
			}
			finish();
		})().catch(() => finish());

		return () => {
			dead = true;
			clearTimeout(hardCap);
			clearTimeout(settleTimer);
		};
	}, []);

	useEffect(() => {
		if (loading) {
			document.body.style.overflowY = "hidden";
		} else {
			document.body.style.overflowY = "auto";
		}
	}, [loading]);

	const title = "Vikash kumar | Portfolio | (Vkr)";
	const description =
		"Hello! I'm Vikash kumar, a passionate web developer and problem solver. Welcome to my portfolio";
	const avatar =
		"https://res.cloudinary.com/dyle3hnpw/image/upload/v1696091629/portfolio/WhatsApp_Image_2023-09-30_at_10.02.55_PM_jk44v9.jpg";
	const url = "https://vikashkumargportfolio.netlify.app/";

	return (
		<>
			<Head> 
				<title>{title}</title>
				<meta name="description" content={description} key="desc" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta property="og:title" content={title} />
				<meta property="og:site_name" content={title}></meta>
				<meta property="og:description" content={description} />
				<meta property="og:image" content={avatar} />
				<meta property="og:image:width" content="612" />
				<meta property="og:image:height" content="612" />
				<meta property="og:url" content={url} />
				<meta property="og:type" content="website" />

				<meta property="twitter:image" content={avatar} />
				<meta property="twitter:card" content="summary_large_image" />
				<meta name="twitter:creator" content="@vikash_kumar" />
				<meta property="twitter:title" content={title} />
				<meta property="twitter:description" content={description} />

				<link rel="canonical" href={url} />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/assets/icons/favicon/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/assets/icons/favicon/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/assets/icons/favicon/favicon-16x16.png"
				/>
				<link
					rel="manifest"
					href="/assets/icons/favicon/site.webmanifest"
				/>
			</Head>

			<ThemeProvider attribute="class" defaultTheme="dark">
				<Component {...pageProps} loading={loading} />
				{loading ? <PreLoader /> : null}
				<Analytics />
			</ThemeProvider>
		</>
	);
}
