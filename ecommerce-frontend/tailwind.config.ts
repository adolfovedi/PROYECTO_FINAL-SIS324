/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    colors: {
      'marron': '#CB994E',
      'marron-claro': '#E2DCCC',
      'anaranjado': '#FFB902',
    },
    backgroundImage: {
      'custom-gradient': 'linear-gradient(to right, #FFB902, #FF9D01)',
    },
  },
};
export const plugins = [];