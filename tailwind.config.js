const colors = require("tailwindcss/colors");
module.exports = {
  darkMode: "media",
  theme: {
    colors: {
      primary: "#231f21",
      darkGrey: "#495056",
      greyBlue: "#596571",
      secondary: "#c6c6c6",
      yellow: "#fff697",
      black: "#010101",
      error: "#F44336",
      info: "#4FC3F7",
      success: "#4CAF50",
      warning: "#DBBB00",
      white: "#ffffff",
      dev: "#000",
      admin: "#fccf03",
      moderator: "#8403fc",
      member: "#c6c6c6",
      eSports: "#0362fc",
      airsoft: "#00a125",
      prospect: "#05ff3f",
      gaming: "#0362fc",
      default: "#FF5500",
      liked: "#0362fc",
      likedInfo: "#428bff",
      textWhite: "#dadada",
      ...colors,
    },
    fontSize: {
      small: "0.8rem",
      base: "1rem",
      text: "1.3333333333rem",
      headline: "5rem",
      large: "7rem",
      "h-2": "4rem",
      "h-3": "3rem",
      "h-4": "2rem",
      "h-5": "1.5rem",
      "h-6": "1.3rem",
    },
    extend: {
      backgroundImage: {
        default: "url('/backgrounds/default.jpg')",
      },
      spacing: {
        smallest: "0.25rem",
        smaller: "1rem",
        small: "2rem",
        base: "4rem",
        large: "8rem",
      },
      borderRadius: {
        base: "4rem",
        large: "8rem",
        larger: "10rem",
      },
      brightness: {
        hover: "0.9",
      },
      keyframes: {
        "animate-width": {
          "0%": {
            width: "1%",
          },
          "100%": {
            width: "100%",
          },
        },
        rotate: {
          from: {
            transform: "rotate(359deg)",
          },
          to: {
            transform: "rotate(0deg)",
          },
        },
      },
      animation: {
        loading: "animate-width 2s infinite linear",
        rotate: "rotate 2s infinite linear",
      },
      containers: {
        xs: "20rem" /* 320px */,
        sm: "24rem" /* 384px */,
        md: "28rem" /* 448px */,
        lg: "32rem" /* 512px */,
        xl: "36rem" /* 576px */,
        "2xl": "42rem" /* 672px */,
        "3xl": "48rem" /* 768px */,
        "4xl": "56rem" /* 896px */,
        "5xl": "64rem" /* 1024px */,
        "6xl": "72rem" /* 1152px */,
        "7xl": "80rem" /* 1280px */,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/container-queries")],
};
