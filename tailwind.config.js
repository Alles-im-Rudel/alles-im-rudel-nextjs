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
      gaming: "#B8B8B5",
      default: "#FF5500",
      liked: "#0362fc",
      likedInfo: "#428bff",
      ...colors,
    },
    fontSize: {
      small: "0.8rem",
      base: "1rem",
      text: "1.3333333333rem",
      headline: "5rem",
      "h-2": "4rem",
      "h-3": "3rem",
      "h-4": "2rem",
      "h-5": "1.5rem",
      "h-6": "1.5rem",
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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
