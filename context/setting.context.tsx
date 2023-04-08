import { createContext, ReactNode, useEffect, useState } from "react";
import { PaletteMode } from "../types/types";
import { English, Vietnamese } from "../translation";
import { useRouter } from "next/router";

export type SettingsContextValue = {
	darkMode: boolean;
	saveDarkMode: (dark: boolean) => void;
	showLayout: boolean;
	toggleLayout: (value?: boolean) => void;
	language: typeof Vietnamese;
};

// Create context
export const SettingsContext = createContext<SettingsContextValue>({
	saveDarkMode: (dark: boolean) => null,
	darkMode: false,
	showLayout: false,
	toggleLayout: (value?: boolean) => null,
	language: Vietnamese,
});

export const SettingProvider = ({ children }: { children: ReactNode }) => {
	const { locale } = useRouter();

	const [darkMode, setDarkMode] = useState<boolean>(false);
	const [showLayout, setShowLayout] = useState<boolean>(false);
	const [language, setLanguage] = useState(Vietnamese);

	const saveDarkMode = (dark: boolean) => {
		if (dark) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("darkMode", "true");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("darkMode", "false");
		}
		setDarkMode(dark);
	};

	const toggleLayout = (value?: boolean) => {
		if (value !== undefined) {
			setShowLayout(value);
		} else {
			setShowLayout((value) => !value);
		}
	};

	useEffect(() => {
		if (locale === "en") {
			setLanguage(English);
		} else {
			setLanguage(Vietnamese);
		}
	}, [locale]);

	useEffect(() => {
		const darkMode = localStorage.getItem("darkMode");

		if (darkMode === "true") {
			document.documentElement.classList.add("dark");
			setDarkMode(true);
		} else {
			document.documentElement.classList.remove("dark");
			setDarkMode(false);
		}
	}, []);

	return (
		<SettingsContext.Provider
			value={{ darkMode: darkMode, saveDarkMode, showLayout, toggleLayout, language }}
		>
			{children}
		</SettingsContext.Provider>
	);
};

export const SettingsConsumer = SettingsContext.Consumer;
