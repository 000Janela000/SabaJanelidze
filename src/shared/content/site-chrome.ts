// Text of the parts every page shares: the header links, the footer and the theme switch.

// On phones only the links with onPhone show (no sideways scroll at 320 px).
export const nav = [
  { label: "Work", href: "#work", onPhone: true },
  { label: "Work with me", href: "#services", onPhone: false },
  { label: "About", href: "#about", onPhone: false },
  { label: "Contact", href: "#contact", onPhone: true },
  { label: "CV", href: "/cv", onPhone: true },
];

export const footer = {
  cvLink: { label: "For hiring managers", href: "/cv" },
  // On /cv the CV link would point to the page itself, so the footer shows this one instead.
  homeLink: { label: "Home", href: "/" },
  copyright: "© 2026 Saba Janelidze",
};

export const themeSwitch = { label: "Theme", options: { light: "Light", dark: "Dark", auto: "Auto" } };
