/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#D6D6D6",
        element: "#FBFBFB",
        darkenedElement: "#F6F6F6",
        purple: "#B667C3",
        subtext: "#A9A9A9",
        almostblack: "#313131",
        linearStart: "#F0F0F0",
        linearEnd: "#E7E7E7",
      },
      fontFamily: {
        montserratBold: ["var(--font-montserratBold)"],
      },
      boxShadow: {
        equal: "0px 0px 20px 0px rgba(182, 103, 195, 1)",
      },
    },
  },
  plugins: [],
};

module.exports = config;
