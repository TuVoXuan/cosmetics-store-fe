import React, { useRef } from "react";
import Expand from "../icons/expand";

interface Props {
	title: string;
	children: string;
}

export default function SmallPara({ title, children }: Props) {
	const titleRef = useRef<HTMLButtonElement>(null);
	const paraRef = useRef<HTMLDivElement>(null);
	const paraWrapRef = useRef<HTMLDivElement>(null);

	const handleClick = () => {
		if (titleRef.current) {
			titleRef.current.classList.toggle("rotate-180");
		}
		if (paraRef.current) {
			if (paraRef.current.clientHeight) {
				paraRef.current.style.height = "0";
			} else {
				if (paraWrapRef.current) {
					paraRef.current.style.height = paraWrapRef.current.clientHeight + "px";
				}
			}
		}
	};

	return (
		<div>
			<div onClick={handleClick} className="flex items-start justify-between gap-x-6">
				<h4 className="font-semibold text-heading-4 lg:text-paragraph-1 dark:text-white">{title}</h4>

				<button
					ref={titleRef}
					className="p-4 transition-all duration-300 ease-linear border-2 rounded-full border-gray-accent dark:border-black-dark-2"
				>
					<Expand height={16} width={16} className="dark:text-white" />
				</button>
			</div>
			<div ref={paraRef} className="h-0 mt-4 overflow-hidden transition-all duration-300 ease-linear">
				<p ref={paraWrapRef} className="text-paragraph-4 lg:text-paragraph-3 dark:text-white">
					{children}
				</p>
			</div>
		</div>
	);
}
