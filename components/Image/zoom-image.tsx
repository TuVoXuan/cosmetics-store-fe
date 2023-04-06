import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Props {
	url: string;
	alt: string;
}

export default function ZoomImage({ url, alt }: Props) {
	const containerRef = useRef<HTMLDivElement>(null);
	const imageZoomRef = useRef<HTMLImageElement>(null);
	const handleMouseMove = (e: MouseEvent) => {
		if (containerRef.current && imageZoomRef.current) {
			imageZoomRef.current.style.opacity = "1";
			const positionPx = e.x - containerRef.current.getBoundingClientRect().left;
			const positionX = (positionPx / containerRef.current.offsetWidth) * 100;

			const positionPy = e.y - containerRef.current.getBoundingClientRect().top;
			const positionY = (positionPy / containerRef.current.offsetHeight) * 100;

			imageZoomRef.current.style.setProperty("--zoom-x", positionX + "%");
			imageZoomRef.current.style.setProperty("--zoom-y", positionY + "%");
		}
	};

	const handleMouseOut = () => {
		if (imageZoomRef.current) {
			imageZoomRef.current.style.opacity = "0";
		}
	};

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.addEventListener("mousemove", handleMouseMove);
			containerRef.current.addEventListener("mouseout", handleMouseOut);
		}
	}, []);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.classList.add("animate-fade-in-out");
		}

		setTimeout(() => {
			if (containerRef.current) {
				containerRef.current.classList.remove("animate-fade-in-out");
			}
		}, 1100);
	}, [url]);

	return (
		<div
			ref={containerRef}
			className="relative flex items-center w-full mb-6 bg-gray-accent dark:bg-black-dark-2 rounded-xl aspect-square"
		>
			<Image src={url} alt={alt} fill className="rounded-xl" />
			<Image
				ref={imageZoomRef}
				src={url}
				alt={alt}
				fill
				className="absolute left-0 z-10 scale-150 pointer-events-none clip-path-circle"
			/>
		</div>
	);
}
