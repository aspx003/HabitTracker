import { createTheme } from "@shopify/restyle";

// Base palette values (for reference only, not exported)
const palette = {
  // Light mode
  white: "#F8F9FC",
  pureWhite: "#FFFFFF",
  mistGrey: "#E5E9F0",
  deepViolet: "#5F4BCF",
  oceanTeal: "#1E887C",
  richBlack: "#1A1A24",
  slateGrey: "#5E677B",
  coolGrey: "#8E98A8",
  forestGreen: "#34A853",
  goldenrod: "#FB8B2C",
  crimson: "#E53E3E",

  // Dark mode
  deepSpace: "#0F0F12",
  raisedCard: "#1C1C21",
  onyx: "#2C2C33",
  electricLavender: "#8B7EF6",
  tealGlow: "#2CB1A1",
  pureWhiteDark: "#FFFFFF",
  softSilver: "#ADADB8",
  dimGrey: "#5E5E6B",
  mintGreen: "#4CD964",
  sunsetOrange: "#FF9F4D",
  roseRed: "#FF5E5E",
};

// Light theme
export const lightTheme = createTheme({
  colors: {
    // Base
    mainBackground: palette.white,
    surface: palette.pureWhite,
    border: palette.mistGrey,

    // Brand & Actions
    primary: palette.deepViolet,
    secondary: palette.oceanTeal,

    // Text
    textPrimary: palette.richBlack,
    textSecondary: palette.slateGrey,
    textTertiary: palette.coolGrey,

    // Icons & Tabs
    iconDefault: palette.slateGrey,
    tabIconDefault: palette.coolGrey,
    tabIconSelected: palette.deepViolet,

    // Status
    success: palette.forestGreen,
    warning: palette.goldenrod,
    alert: palette.crimson,

    //special
    selectedTab: palette.white,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 56,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    header: {
      fontWeight: "bold",
      fontSize: 34,
      color: "textPrimary",
    },
    subheader: {
      fontSize: 24,
      fontWeight: "600",
      color: "textPrimary",
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: "textSecondary",
    },
    caption: {
      fontSize: 14,
      color: "textTertiary",
    },
    button: {
      fontSize: 16,
      fontWeight: "600",
      color: "mainBackground", // often white on primary background
    },
    defaults: {
      fontSize: 16,
      color: "textPrimary",
    },
    error: {
      fontSize: 16,
      color: "alert",
    },
  },
});

// Dark theme
export const darkTheme = createTheme({
  colors: {
    // Base
    mainBackground: palette.deepSpace,
    surface: palette.raisedCard,
    border: palette.onyx,

    // Brand & Actions
    primary: palette.electricLavender,
    secondary: palette.tealGlow,

    // Text
    textPrimary: palette.pureWhiteDark,
    textSecondary: palette.softSilver,
    textTertiary: palette.dimGrey,

    // Icons & Tabs
    iconDefault: palette.softSilver,
    tabIconDefault: palette.dimGrey,
    tabIconSelected: palette.electricLavender,

    // Status
    success: palette.mintGreen,
    warning: palette.sunsetOrange,
    alert: palette.roseRed,

    //special
    selectedTab: palette.white,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 56,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    header: {
      fontWeight: "bold",
      fontSize: 34,
      color: "textPrimary",
    },
    subheader: {
      fontSize: 24,
      fontWeight: "600",
      color: "textPrimary",
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: "textSecondary",
    },
    caption: {
      fontSize: 14,
      color: "textTertiary",
    },
    button: {
      fontSize: 16,
      fontWeight: "600",
      color: "textPrimary",
    },
    defaults: {
      fontSize: 16,
      color: "textPrimary",
    },
    error: {
      fontSize: 16,
      color: "alert",
    },
  },
});

// Export types
export type Theme = typeof lightTheme;
export type DarkTheme = typeof darkTheme;
