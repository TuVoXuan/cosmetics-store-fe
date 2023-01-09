import { Switch } from "@headlessui/react";
import React, { useState } from "react";
import Moon from "../icons/moon";
import Sun from "../icons/sun";

export default function ToggleBtn() {
	const [dark, setDark] = useState(false);

	return (
		<div>
			<Switch
				checked={dark}
				onChange={setDark}
				className={`${dark ? "bg-dark-100" : "bg-gray-accent"}
          relative inline-flex w-14 p-1 shrink-0 cursor-pointer rounded-2xl border-none transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
			>
				<div
					aria-hidden="true"
					className={`${dark ? "translate-x-[100%]" : "translate-x-0"}
            pointer-events-none inline-block p-1 transform rounded-full bg-primary-100 shadow-lg ring-0 transition duration-200 ease-in-out`}
				>
					{dark ? (
						<Moon width={16} height={16} color="#F7FAFC" />
					) : (
						<Sun width={16} height={16} color="#F7FAFC" />
					)}
				</div>
			</Switch>
		</div>
	);
}
