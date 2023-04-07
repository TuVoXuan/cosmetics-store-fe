import { createContext, ReactNode, useEffect, useState } from "react";
import { PaletteMode } from "../types/types";
import { English, Vietnamese } from "../translation";
import { useRouter } from "next/router";

// Type
export type Settings = {
	mode: PaletteMode;
};

export type SettingsContextValue = {
	settings: Settings;
	saveSettings: (updatedSettings: Settings) => void;
	showLayout: boolean;
	toggleLayout: (value?: boolean) => void;
	language: typeof Vietnamese;
};

const initialSettings: Settings = {
	mode: "light",
};

// Create context
export const SettingsContext = createContext<SettingsContextValue>({
	saveSettings: () => null,
	settings: initialSettings,
	showLayout: false,
	toggleLayout: (value?: boolean) => null,
	language: Vietnamese,
});

export const SettingProvider = ({ children }: { children: ReactNode }) => {
	const { locale } = useRouter();

	const [settings, setSettings] = useState<Settings>(initialSettings);
	const [showLayout, setShowLayout] = useState<boolean>(false);
	const [language, setLanguage] = useState(Vietnamese);

	const saveSettings = (updatedSettings: Settings) => {
		setSettings(updatedSettings);
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

	return (
		<SettingsContext.Provider value={{ settings, saveSettings, showLayout, toggleLayout, language }}>
			{children}
		</SettingsContext.Provider>
	);
};

export const SettingsConsumer = SettingsContext.Consumer;
