import { content as _content, plugin } from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */

export const content = [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    _content(),
];
export const theme = {
    extend: {},
};
export const plugins = [plugin(), require("@tailwindcss/typography")];

// CommonJS-------------------------------------
// const flowbite = require("flowbite-react/tailwind");

// /** @type {import('tailwindcss').Config} */

// module.exports = {
//     content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
//     theme: {
//         extend: {},
//     },
//     plugins: [flowbite.plugin(), require("@tailwindcss/typography")],
// };
