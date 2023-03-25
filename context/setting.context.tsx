import { createContext, ReactNode, useState } from "react";
import { PaletteMode } from "../types/types";

// Type
export type Settings = {
	mode: PaletteMode;
};

export type SettingsContextValue = {
	settings: Settings;
	saveSettings: (updatedSettings: Settings) => void;
	showLayout: boolean;
	toggleLayout: (value?: boolean) => void;
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
});

export const SettingProvider = ({ children }: { children: ReactNode }) => {
	const [settings, setSettings] = useState<Settings>(initialSettings);
	const [showLayout, setShowLayout] = useState<boolean>(false);

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

	return (
		<SettingsContext.Provider value={{ settings, saveSettings, showLayout, toggleLayout }}>
			{children}
		</SettingsContext.Provider>
	);
};

export const SettingsConsumer = SettingsContext.Consumer;
