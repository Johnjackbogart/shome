import { type AppStyle, DEFAULT_APP_STYLE } from "@shome/core";
import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from "react";
import type { TextStyle, ViewStyle } from "react-native";
import { api } from "./api";

type AppStyleContextValue = {
  appStyle: AppStyle;
  setAppStyle: (style: AppStyle) => void;
  refreshAppStyle: () => Promise<void>;
};

const AppStyleContext = createContext<AppStyleContextValue | null>(null);

export function AppStyleProvider({ enabled, children }: { enabled: boolean; children: ReactNode }) {
  const [appStyle, setAppStyle] = useState<AppStyle>({ ...DEFAULT_APP_STYLE });

  const refreshAppStyle = useCallback(async () => {
    if (!enabled) return;
    const response = await api.get<{ appStyle: AppStyle }>("/api/app-style");
    setAppStyle(response.appStyle);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      setAppStyle({ ...DEFAULT_APP_STYLE });
      return;
    }
    // The default app style remains usable while offline or before the first
    // request returns, so this preference must not block navigation.
    void refreshAppStyle().catch(() => undefined);
  }, [enabled, refreshAppStyle]);

  return (
    <AppStyleContext.Provider value={{ appStyle, setAppStyle, refreshAppStyle }}>
      {children}
    </AppStyleContext.Provider>
  );
}

export function useAppStyle() {
  const value = useContext(AppStyleContext);
  if (!value) throw new Error("useAppStyle must be used inside AppStyleProvider");
  return value;
}

export function appBorderAppearance(appStyle: AppStyle): ViewStyle {
  return {
    borderColor: appStyle.borderColor,
    borderRadius: Number.parseInt(appStyle.borderRadius, 10),
    borderStyle: appStyle.borderLineStyle,
  };
}

export function appSurfaceAppearance(appStyle: AppStyle): ViewStyle {
  return {
    ...appBorderAppearance(appStyle),
    backgroundColor: appStyle.secondaryBackgroundColor,
  };
}

export function appPrimaryText(appStyle: AppStyle): TextStyle {
  return { color: appStyle.fontColor, fontFamily: appStyle.font };
}

export function appSecondaryText(appStyle: AppStyle): TextStyle {
  return { color: appStyle.secondaryTextColor, fontFamily: appStyle.font };
}
