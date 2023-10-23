import defaultTheme from 'tailwindcss/defaultTheme'

export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
]
export const theme = {
  extend: {
    fontFamily: {
      "sans": ["Roboto", defaultTheme.fontFamily.sans]
    }
  },
}
export const plugins = []