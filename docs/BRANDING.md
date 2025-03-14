# BRANDING GUIDELINES

## Table of Contents

- [Favicons and Site Manifest](#favicons-and-site-manifest)
- [Logo Usage](#logo-usage)
    - [Minimum Spacing](#minimum-spacing)
- [Color Palette](#color-palette)
    - [Color Usage](#color-usage)
- [Typography](#typography)
- [Additional Guidelines](#additional-guidelines)

## Favicons and Site Manifest

The `assets/favicon` folder contains all necessary favicon assets for different devices and browsers. These should be
referenced in the `<head>` section of `index.html` as follows:

```html
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="manifest" href="/site.webmanifest" />
```

### `site.webmanifest`

The `site.webmanifest` file contains metadata for progressive web app (PWA) support. It should be placed in the root
directory and include:

```json
{
    "name": "hangbuddies",
    "short_name": "hg",
    "icons": [
        {
            "src": "/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "theme_color": "#A41623",
    "background_color": "#F4F1DE",
    "display": "standalone"
}
```

## Logo Usage

The brand includes two main logos:

1. **Primary Logo** (Icon + Title): Used on websites, banners, and full-branding materials.
2. **Icon Logo** (Standalone Symbol): Used on social media, favicons, and other small-scale branding.

### Minimum Spacing

- Always maintain clear space around the logo at least **equal to its height**.
- Do not alter proportions, colors, or apply effects like shadows.

## Color Palette

The brand uses an **earthy tones** palette with a slightly brighter accent color:

| Name           | Hex       | Usage                                      |
| -------------- | --------- | ------------------------------------------ |
| **Primary**    | `#A41623` | Main brand color, buttons, call-to-actions |
| **Secondary**  | `#E9C46A` | Highlighting elements                      |
| **Accent**     | `#2F5463` | Emphasized elements, links                 |
| **Background** | `#F4F1DE` | Main background color                      |
| **Text**       | `#3B2C35` | Main text                                  |

### Color Usage

- **Primary color (#A65C3C)** should be the dominant color in UI elements like buttons and important features.
- **Secondary color (#F2C57C)** is used for highlighting specific elements like hover effects.
- **Accent color (#2F5463)** can be applied to important links or secondary CTAs.
- **Background color (#EEE5E9)** ensures a neutral, clean look.
- **Text color (#3B2C35)** provides good readability.

## Typography

We use a clean, modern sans-serif typeface. Suggested fonts:

- **Primary**: `Inter`, `Poppins`, or `Montserrat`
- **Secondary**: `Arial`, `Helvetica`, or `sans-serif`

## Additional Guidelines

- Avoid excessive use of shadows and gradients to maintain a minimalistic aesthetic.
- Ensure logo visibility by using contrasting background colors.
