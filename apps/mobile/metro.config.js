// Expo's default Metro config detects the npm workspace root on its own; the
// wrapper below only adds NativeWind's CSS-to-StyleSheet pipeline.
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./src/global.css" });
