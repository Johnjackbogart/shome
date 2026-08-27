import { type AppStyle, DEFAULT_APP_STYLE } from "@shome/core";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
  const latestRequest = useRef(0);

  const refreshAppStyle = useCallback(async () => {
    if (!enabled) return;
    const requestId = ++latestRequest.current;
    try {
      const response = await api.get<{ appStyle: AppStyle }>("/api/app-style");
      if (requestId !== latestRequest.current) return;
      setAppStyle(response.appStyle);
    } catch {
      if (requestId !== latestRequest.current) return;
      setAppStyle({ ...DEFAULT_APP_STYLE });
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      latestRequest.current += 1;
      setAppStyle({ ...DEFAULT_APP_STYLE });
      return;
    }
    void refreshAppStyle();
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
    borderColor: appStyle.appBorderStyle,
    borderRadius: Number.parseInt(appStyle.appBorderRadius, 10),
    borderStyle: appStyle.appBorderLineStyle,
  };
}

export function appSurfaceAppearance(appStyle: AppStyle): ViewStyle {
  return {
    ...appBorderAppearance(appStyle),
    backgroundColor: appStyle.appSecondaryBackgroundColor,
  };
}

export function appPrimaryText(appStyle: AppStyle): TextStyle {
  return { color: appStyle.appFontColor, fontFamily: appStyle.appFont };
}

export function appSecondaryText(appStyle: AppStyle): TextStyle {
  return { color: appStyle.appSecondaryTextColor, fontFamily: appStyle.appFont };
}
