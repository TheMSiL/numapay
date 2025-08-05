/** @type {import('tailwindcss').Config} */
export default {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      screens: {
        "1xl": "1520px",
        xx: "1300px",
        ll: '1150px',
        l: "850px",
        s: '450px',
        xs: "380px",
      },
      fontSize: {
        "8xl": ["5.25rem", "6rem"], // 84px / 96px
        "6xl": ["4.5rem", "5.625rem"], // 72px / 90px
        "5xl": ["4rem", "4.75rem"], // 64px / 76px
        "4xl": ["2.625rem", "3.375rem"], // 42px / 54px
        "3xl": ["2.25rem", "2.75rem"], // 36px / 44px
        "3x": ["2rem", "2.5rem"], // 32px / 40px
        "3xx": ["1.75rem", "2.5rem"], // 28px / 40px
        "2xx": ["1.625rem", "2.25rem"], // 26px / 36px
        "2xl": ["1.5rem", "2rem"], // 24px / 32px
        xx: ["1.3125rem", "1.875rem"], // 21px / 30px
        xl: ["1.25rem", "1.875rem"], // 20px / 30px
        x: ["1.1875rem", "1.75rem"], // 19px / 28px
        lg: ["1.125rem", "1.75rem"], // 18px / 28px
        l: ["0.938rem", "1.5rem"], // 15px / 24px
        base: ["1rem", "1.5rem"], // 16px / 24px
        sm: ["0.875rem", "1.25rem"], // 14px / 20px
        smx: ["0.8125rem", "1.125rem"], // 13px / 18px
        xs: ["0.75rem", "1rem"], // 12px / 16px
      },
      colors: {
        primary: "#0A0A0A",
        codGray: "#191919",
        concrete: "#F2F2F2",
        mainYellow: "#FF6",
        mainGray: "#828282",
        mineShaft: "#3c3c3c",
        half: "#FEFFDC",
        alabaster: "#f8f8f8",
      },
      boxShadow: {
        default: "0px 5px 0px 0px #0A0A0A",
        default_4: "0px 4px 0px 0px #0A0A0A",
        default_gray: "0px 5px 0px 0px #3C3C3C",
        default_yellow: "0px 4px 0px 0px #FF6",
        default_yellow_5: "0px 5px 0px 0px #FF6",
      },
      borderRadius: {
        "3xx": "32px",
        "4xl": "40px",
      },
    },
  },
  plugins: [],
};
