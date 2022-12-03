/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    fontFamily: {
      montserrat: "Montserrat, sans-serif",
      nunito: "Nunito, sans-serif",
    },
    extend: {
      colors: {
        "voiceflow-blue": "#1C4EFF",
        "voiceflow-blue-light": "#749bff", // Was overriding tailwind default colours with lighter-blue so renamed
        "voiceflow-grey": "#d9d9d9",
        gray: "rgba(0,0,0,0.5)",
      },
      // fontFamily: {
      //   "montserrat": ["Montserrat", "sans-serif"],
      // }
    },
    minWidth: {
      15: "15%",
    },
  },
  variants: {},
  plugins: [],
};
