# Latitude Kitchen — portfolio demonstration

Latitude Kitchen is a fictional contemporary global restaurant concept: **familiar flavours, reimagined together**. It demonstrates a premium hospitality website without claiming a real restaurant, kitchen, chef, address, service, or availability.

## Technology

Semantic HTML, mobile-first CSS, vanilla JavaScript, a local SVG mark, and locally stored licensed photography. There is no framework, package manager, build step, backend, third-party embed, analytics, or external JavaScript.

## Interactive features

- Cinematic full-bleed hero with restrained capable-device parallax
- Keyboard-friendly twelve-direction Taste the World selector with licensed imagery, in-place stories, and cuisine-aware menu discovery
- Menu section/dietary filters, search, reset, result announcements, and empty state
- Accessible dish detail dialogs with focus management, Escape/backdrop dismissal, and focus return
- Local-time “Tonight at Latitude” context that never claims live availability
- Four-step reservation demonstration with validation, review, duplicate-submit prevention, and confirmation
- International cocktail, zero-proof, wine, beer, water, coffee, and tea menu with responsible-service guidance
- Focus-managed ordering, directions, and calling integration explanations
- IntersectionObserver reveals with reduced-motion and no-JavaScript fallbacks

## Photography and licensing

Main imagery is genuine photography downloaded from individual Pexels photo pages and stored locally. `CREDITS.md` records filenames, placement, photographers, exact source pages, access date, and licence. Images communicate visual direction only and are not presented as food prepared by Latitude Kitchen.

## Preview

Open `index.html` with the VS Code **Live Server: Open with Live Server** command. No build is required.

## Simulated features and production connections

This demo does not create reservations or orders, check availability, open a real map, place calls, collect payments, or persist data. A client version could connect approved buttons to OpenTable, Resy, Tock, or another reservation provider and to a verified online-ordering/POS system. A secure server-side form service could handle event enquiries with consent, validation, spam controls, retention rules, and privacy disclosures. Analytics should be added only with client approval and suitable consent controls. A verified custom domain can point to an eventual GitHub Pages deployment.

## Privacy and security

No form information is transmitted, written to cookies, local storage, or a database. Invalid entries remain in the current page for correction; successful demo completion clears the form. Production requires HTTPS, server-side validation, data minimization, a privacy policy, and defined retention/deletion practices.

## Accessibility

The site includes semantic landmarks, a skip link, labelled controls, visible focus, live status messages, arrow-key tabs, keyboard-accessible dialogs, useful form errors, and comfortable touch targets. Essential content remains readable without JavaScript. `prefers-reduced-motion` disables reveals, smooth scrolling, and parallax.

## GitHub Pages

After content, licensing, accessibility, privacy, and real integrations receive client approval, publish the static root to a repository and select its deployment branch in **Settings → Pages**. Nothing in this demonstration has been deployed.
