import { createContext, ReactNode, useState } from "react";
import { PaletteMode } from "../types/types";

// Type
export type Settings = {
	mode: PaletteMode;
};

export type SettingsContextValue = {
	settings: Settings;
	saveSettings: (updatedSettings: Settings) => void;
};

const initialSettings: Settings = {
	mode: "light",
};

// Create context
export const SettingsContext = createContext<SettingsContextValue>({
	saveSettings: () => null,
	settings: initialSettings,
});

export const SettingProvider = ({ children }: { children: ReactNode }) => {
	const [settings, setSettings] = useState<Settings>(initialSettings);

	const saveSettings = (updatedSettings: Settings) => {
		setSettings(updatedSettings);
	};

	return <SettingsContext.Provider value={{ settings, saveSettings }}>{children}</SettingsContext.Provider>;
};

export const SettingsConsumer = SettingsContext.Consumer;
