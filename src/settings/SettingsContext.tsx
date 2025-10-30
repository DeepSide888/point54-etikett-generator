import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultTheme, type Theme } from "./defaultTheme";

type Ctx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  reset: () => void;
  loadFromFile: (file: File) => Promise<void>;
  exportToFile: () => void;
  savePreset: (name: string) => void;
  loadPreset: (name: string) => void;
  listPresets: () => string[];
};

const SettingsCtx = createContext<Ctx | null>(null);

const LS_KEY = "p54_label_theme";
const LS_PRESETS = "p54_label_presets";

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      return stored ? JSON.parse(stored) as Theme : defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(theme));
  }, [theme]);

  const reset = () => setTheme(defaultTheme);

  const loadFromFile = async (file: File) => {
    const text = await file.text();
    const json = JSON.parse(text);
    setTheme(json);
  };

  const exportToFile = () => {
    const blob = new Blob([JSON.stringify(theme, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "point54_label_theme.json";
    a.click();
  };

  const savePreset = (name: string) => {
    const all = JSON.parse(localStorage.getItem(LS_PRESETS) || "{}");
    all[name] = theme;
    localStorage.setItem(LS_PRESETS, JSON.stringify(all));
  };

  const loadPreset = (name: string) => {
    const all = JSON.parse(localStorage.getItem(LS_PRESETS) || "{}");
    if (all[name]) setTheme(all[name]);
  };

  const listPresets = () => Object.keys(JSON.parse(localStorage.getItem(LS_PRESETS) || "{}"));

  const value = useMemo(
    () => ({ theme, setTheme, reset, loadFromFile, exportToFile, savePreset, loadPreset, listPresets }),
    [theme]
  );

  return <SettingsCtx.Provider value={value}>{children}</SettingsCtx.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsCtx);
  if (!ctx) throw new Error("SettingsProvider manquant");
  return ctx;
}
