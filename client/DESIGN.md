---
version: "2.0.0"
name: "Raw Editorial Brutalism"
description: "A high-contrast, structural brutalist interface with editorial typography and strict grid layouts. Optimized for developer portfolios and high-performance engineering platforms."
colors:
  yellow: "#FFEB3B"
  red: "#FF5252"
  blue: "#2196F3"
  black: "#000000"
  dark: "#121212"
  light: "#F5F5F0"
typography:
  sans: "System UI stack (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif)"
  serif: "Libertinus Serif, Georgia, serif"
  mono: "JetBrains Mono, monospace"
components:
  border-radius: "0px (Strictly sharp)"
  border-width: "2px, 3px, 4px solid"
  shadows: "Hard offset geometric shadows (2px to 8px)"
---

## Overview

The current design schema embraces **Raw Editorial Brutalism**. It combines the unpolished, structural aesthetic of classic brutalism with the refined typography and grid systems of editorial design. The result is a highly legible, confrontational, yet systematically organized interface.

Key characteristics include absolute sharp corners (`0px` border-radius), thick unbroken black borders separating semantic sections, and high-contrast solid color fills. There are no gradients, no soft corners, and no blurred drop-shadows. Every element is explicitly bordered and structurally stacked.

- **Style:** Structural, Editorial, Raw, High-Contrast
- **Keywords:** 0px radius, hard offset shadows, thick borders, grid architecture, text outlines, monochrome with primary accents.
- **Light/Dark:** ✓ Full Dark Mode (Default) / ✓ Light Mode Supported

## Theme & Variables

The system relies on CSS variables for seamless theme switching between Light and Dark modes.

**Dark Mode (Default):**
- `--bg`: `#0e0e10`
- `--bg-soft`: `#18181c`
- `--bg-softer`: `#24242a`
- `--ink`: `#ffffff`
- `--ink-dim`: `#a1a1aa`
- `--ink-faint`: `#71717a`

**Light Mode:**
- `--bg`: `#f8f8f5`
- `--bg-soft`: `#ffffff`
- `--bg-softer`: `#eef0ea`
- `--ink`: `#000000`
- `--ink-dim`: `#4b5563`
- `--ink-faint`: `#9ca3af`

**Brutalist Accent Palette:**
- **Yellow:** `#FFEB3B`
- **Red:** `#FF5252`
- **Blue:** `#2196F3`
- **Black:** `#000000`

## Typography

- **Headings (Display):** System UI Stack, `font-black` (900 weight), heavily uppercase. Used for massive structural titles.
- **Editorial Serif:** Libertinus Serif. Used for sophisticated contrast in specific editorial or long-form sections.
- **Monospace:** JetBrains Mono. Used for metadata, badges, and technical readouts.
- **Text Effects:** The `.text-outline` class (`-webkit-text-stroke: 2px var(--ink); color: transparent;`) is used heavily on massive display text to create architectural typography contrast.

## Layout & Architecture

- **Grid System:** Strict 12-column CSS/Tailwind grid (`grid-cols-1 md:grid-cols-12`). Sections are built like architectural blueprints with explicit split-screens and metric matrixes.
- **Borders as Structure:** Layouts do not rely on whitespace alone; they use thick (`2px`, `3px`) black borders (`border-black`) to strictly divide content regions, creating a "wireframe" aesthetic.
- **Component Containment:** Content is enclosed in explicitly defined border blocks rather than floating openly on the page.

## Elevation & Depth

No soft shadows or blurs are permitted. Depth is achieved entirely through solid, offset geometric layers.

- **Shadow Style:** Hard offset shadows (`box-shadow: Xpx Xpx 0px var(--shadow-color)`).
- **Scale:**
  - Base/Small: `2px 2px 0px #000`
  - Medium/Standard: `4px 4px 0px #000`, `6px 6px 0px #000`
  - Elevated: `8px 8px 0px #000`
- **Interactions:**
  - **Hover:** Elements translate up and left (`-translate-x-[1px] -translate-y-[1px]`) while the shadow grows to fill the space.
  - **Active (Click):** Elements translate down and right (`translate-x-[1px] translate-y-[1px]`), compressing the shadow to simulate a tactile mechanical press.

## Shapes & Components

- **Corner Radius:** **Strictly 0px.** Absolutely no rounded corners (`rounded-none` everywhere).
- **Buttons (`.brutal-btn`):** Solid background (usually accent color or `bg-soft`), thick border, hard shadow. Font is uppercase, bold, and strictly tracked.
- **Cards (`.brutal-card`):** Structured containers with `bg-soft` or `bg-softer`, heavy borders, and fixed hard shadows. 
- **Badges (`.brutal-badge`):** Used extensively for metadata. Often monospace, uppercase, bordered, and filled with primary accent colors (e.g. `bg-brutal-yellow`).
- **Scrollbar:** Custom, thick, blocky scrollbar matching the brutalist theme.
- **Custom Cursor:** The standard pointer is disabled (`cursor: none` on hover/fine pointers) to integrate with the custom raw cursor stack.

## Do's and Don'ts

- **Do** use `rounded-none` on *every* interactive and structural element.
- **Do** use explicit black borders (`border-2`, `border-3`) to segregate layouts and sections.
- **Do** use `uppercase`, `font-black`, and `font-bold` for UI labels, badges, and headings.
- **Do** use hard shadows for depth (e.g., `shadow-[4px_4px_0px_#000]`).
- **Don't** use border-radius (no `rounded-md`, `rounded-lg`).
- **Don't** use standard Tailwind drop shadows (`shadow-md`, `shadow-lg`) as they introduce disallowed blurs.
- **Don't** use gradients or muted pastel colors; stick to high-contrast monochrome and neon/primary accents.
- **Don't** leave text or UI elements "floating" without structural borders or geometric grounding.
