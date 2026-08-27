import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  Modal,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { appPrimaryText, useAppStyle } from "@/lib/app-style";
import {
  COLOR_PRESETS,
  type Hsv,
  hexToHsv,
  hsvToHex,
  hueHex,
  normalizeHex,
  readableTextColor,
} from "@/lib/color";
import { COLORS, UI } from "@/lib/ui";

const HUE_STOPS = [
  "#ff0000",
  "#ffff00",
  "#00ff00",
  "#00ffff",
  "#0000ff",
  "#ff00ff",
  "#ff0000",
] as const;

const SATURATION_AREA_HEIGHT = 190;
const HUE_SLIDER_HEIGHT = 28;

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/**
 * Wires a view up for drag-to-pick: reports the touch as 0..1 ratios of the
 * view's own box, whether the finger starts inside it or drags past its edge.
 *
 * `onDragChange` brackets the gesture so the caller can freeze the surrounding
 * ScrollView: without that, a vertical drag across the saturation area scrolls
 * the sheet out from under the finger instead of picking a color.
 */
function useDragArea(
  onPick: (ratioX: number, ratioY: number) => void,
  onDragChange: (dragging: boolean) => void,
) {
  const viewRef = useRef<View | null>(null);
  const frame = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const latestOnPick = useRef(onPick);
  latestOnPick.current = onPick;
  const latestOnDragChange = useRef(onDragChange);
  latestOnDragChange.current = onDragChange;

  const measure = useCallback(() => {
    viewRef.current?.measureInWindow((x, y, width, height) => {
      frame.current = { x, y, width, height };
    });
  }, []);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        // Claim the gesture before the parent ScrollView can interpret it as a
        // scroll, and keep it until the finger lifts.
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderTerminationRequest: () => false,
        onShouldBlockNativeResponder: () => true,
        onPanResponderGrant: (event) => {
          latestOnDragChange.current(true);
          const { width, height } = frame.current;
          if (width === 0 || height === 0) return;
          const { locationX, locationY } = event.nativeEvent;
          latestOnPick.current(clamp01(locationX / width), clamp01(locationY / height));
        },
        onPanResponderMove: (event) => {
          const { x, y, width, height } = frame.current;
          if (width === 0 || height === 0) return;
          const { pageX, pageY } = event.nativeEvent;
          latestOnPick.current(clamp01((pageX - x) / width), clamp01((pageY - y) / height));
        },
        onPanResponderRelease: () => latestOnDragChange.current(false),
        onPanResponderTerminate: () => latestOnDragChange.current(false),
      }),
    [],
  );

  return { viewRef, onLayout: measure, panHandlers: panResponder.panHandlers };
}

/**
 * A swatch button that opens the picker sheet — the mobile counterpart to the
 * web editor's `<input type="color">`.
 */
export function ColorField({
  label,
  value,
  onChange,
  borderColor,
  className,
}: {
  label: string;
  value: string;
  onChange: (hex: string) => void;
  borderColor?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const swatch = normalizeHex(value) ?? "#000000";

  return (
    <View className={`gap-1 ${className ?? ""}`}>
      <Text className="text-xs text-slate-400">{label}</Text>
      <Pressable
        onPress={() => setOpen(true)}
        className={`${UI.input} flex-row items-center gap-2 py-2`}
        style={borderColor ? { borderColor } : undefined}
        accessibilityRole="button"
        accessibilityLabel={`${label}, ${swatch}`}
        accessibilityHint="Opens the color picker"
      >
        <View
          className="size-6 rounded-md border border-white/20"
          style={{ backgroundColor: swatch }}
        />
        <Text className="text-sm text-slate-100">{swatch}</Text>
      </Pressable>

      <ColorPickerSheet
        label={label}
        visible={open}
        value={swatch}
        onChange={onChange}
        onClose={() => setOpen(false)}
      />
    </View>
  );
}

function ColorPickerSheet({
  label,
  visible,
  value,
  onChange,
  onClose,
}: {
  label: string;
  visible: boolean;
  value: string;
  onChange: (hex: string) => void;
  onClose: () => void;
}) {
  const { appStyle } = useAppStyle();
  // Hue and saturation live here rather than being re-derived from the hex on
  // every render: black and white have no hue of their own, so round-tripping
  // through the hex would snap the sliders back to red as you drag into a corner.
  const [hsv, setHsv] = useState<Hsv>(() => hexToHsv(value));
  const [hexDraft, setHexDraft] = useState(value);
  const [seededFrom, setSeededFrom] = useState(value);
  const [dragging, setDragging] = useState(false);

  if (visible && seededFrom !== value && hsvToHex(hsv) !== value) {
    // The field changed underneath us (reset button, or a fresh open).
    setHsv(hexToHsv(value));
    setHexDraft(value);
    setSeededFrom(value);
  }

  const commit = useCallback(
    (next: Hsv) => {
      setHsv(next);
      const hex = hsvToHex(next);
      setHexDraft(hex);
      setSeededFrom(hex);
      onChange(hex);
    },
    [onChange],
  );

  const saturationArea = useDragArea(
    useCallback(
      (ratioX: number, ratioY: number) => commit({ h: hsv.h, s: ratioX, v: 1 - ratioY }),
      [commit, hsv.h],
    ),
    setDragging,
  );

  const hueSlider = useDragArea(
    useCallback((ratioX: number) => commit({ ...hsv, h: ratioX * 360 }), [commit, hsv]),
    setDragging,
  );

  function applyHexDraft(text: string) {
    setHexDraft(text);
    const normalized = normalizeHex(text);
    if (!normalized) return;
    setHsv(hexToHsv(normalized));
    setSeededFrom(normalized);
    onChange(normalized);
  }

  function selectPreset(preset: string) {
    setHsv(hexToHsv(preset));
    setHexDraft(preset);
    setSeededFrom(preset);
    onChange(preset);
  }

  const current = hsvToHex(hsv);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      {/* Tapping the dimmed area behind the sheet dismisses it, matching the
          filters sheet on the feed. */}
      <Pressable
        className="flex-1 bg-black/60"
        onPress={onClose}
        accessibilityLabel={`Close ${label} picker`}
      />
      <SafeAreaView style={{ backgroundColor: appStyle.appBackgroundColor }} edges={["bottom"]}>
        <View
          className="max-h-[85vh] rounded-t-3xl border-t px-5 pt-4 pb-2"
          style={{
            backgroundColor: appStyle.appBackgroundColor,
            borderColor: appStyle.appBorderStyle,
          }}
        >
          <View className="flex-row items-center justify-between pb-3">
            <Text className="text-lg font-semibold text-white" style={appPrimaryText(appStyle)}>
              {label}
            </Text>
            <Pressable
              onPress={onClose}
              className="rounded-full p-2 active:bg-white/10"
              accessibilityRole="button"
              accessibilityLabel={`Close ${label} picker`}
            >
              <Ionicons name="close" size={22} color={COLORS.muted} />
            </Pressable>
          </View>

          <ScrollView
            contentContainerClassName="gap-4 pb-2"
            keyboardShouldPersistTaps="handled"
            scrollEnabled={!dragging}
          >
            <View
              ref={saturationArea.viewRef}
              onLayout={saturationArea.onLayout}
              {...saturationArea.panHandlers}
              className="overflow-hidden rounded-2xl border border-white/10"
              style={{ height: SATURATION_AREA_HEIGHT, backgroundColor: hueHex(hsv.h) }}
              accessibilityRole="adjustable"
              accessibilityLabel={`${label} saturation and brightness`}
            >
              {/* White on the left fading out to the right, then black rising
                  from the bottom: the two overlays turn the flat hue into the
                  usual saturation/brightness field. */}
              <LinearGradient
                colors={["#ffffff", "rgba(255,255,255,0)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
                pointerEvents="none"
              />
              <LinearGradient
                colors={["rgba(0,0,0,0)", "#000000"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={StyleSheet.absoluteFill}
                pointerEvents="none"
              />
              <View
                pointerEvents="none"
                className="absolute size-6 rounded-full border-2"
                style={{
                  borderColor: readableTextColor(current),
                  backgroundColor: current,
                  left: `${hsv.s * 100}%`,
                  top: `${(1 - hsv.v) * 100}%`,
                  transform: [{ translateX: -12 }, { translateY: -12 }],
                }}
              />
            </View>

            <View
              ref={hueSlider.viewRef}
              onLayout={hueSlider.onLayout}
              {...hueSlider.panHandlers}
              className="justify-center overflow-hidden rounded-full border border-white/10"
              style={{ height: HUE_SLIDER_HEIGHT }}
              accessibilityRole="adjustable"
              accessibilityLabel={`${label} hue`}
            >
              <LinearGradient
                colors={HUE_STOPS}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={StyleSheet.absoluteFill}
                pointerEvents="none"
              />
              <View
                pointerEvents="none"
                className="absolute size-6 rounded-full border-2 border-white"
                style={{
                  backgroundColor: hueHex(hsv.h),
                  left: `${(hsv.h / 360) * 100}%`,
                  transform: [{ translateX: -12 }],
                }}
              />
            </View>

            <View className="flex-row items-center gap-3">
              <View
                className="size-11 rounded-xl border border-white/20"
                style={{ backgroundColor: current }}
                accessibilityLabel={`Selected color ${current}`}
              />
              <TextInput
                className={`${UI.input} flex-1 py-2 text-sm`}
                value={hexDraft}
                onChangeText={applyHexDraft}
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={7}
                placeholder="#000000"
                placeholderTextColor="#64748b"
                accessibilityLabel={`${label} hex code`}
              />
            </View>

            <View className="flex-row flex-wrap gap-2">
              {COLOR_PRESETS.map((preset) => {
                const selected = preset === current;
                return (
                  <Pressable
                    key={preset}
                    onPress={() => selectPreset(preset)}
                    className="size-10 items-center justify-center rounded-xl border border-white/20 active:opacity-80"
                    style={{ backgroundColor: preset }}
                    accessibilityRole="radio"
                    accessibilityLabel={`Use ${preset}`}
                    accessibilityState={{ selected }}
                  >
                    {selected ? (
                      <Ionicons name="checkmark" size={18} color={readableTextColor(preset)} />
                    ) : null}
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              onPress={onClose}
              className={UI.primaryButton}
              style={{ backgroundColor: appStyle.appAccentBackgroundColor }}
              accessibilityRole="button"
              accessibilityLabel={`Done picking ${label}`}
            >
              <Text className="text-sm font-semibold text-slate-950">Done</Text>
            </Pressable>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
