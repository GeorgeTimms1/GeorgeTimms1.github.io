# georgetimms.com

Personal portfolio site for George Timms — software engineer building apps and games for iOS and Steam.

Static site, no build step, no dependencies. Plain HTML / CSS / vanilla JS modules.

## Stack
- `index.html` — markup
- `styles.css` — light/dark theme, responsive
- `script.js` — project data + render
- `assets/` — app icons + favicon SVG

## Local dev
```sh
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy
Deployed via GitHub Pages from the `main` branch. Custom domain `georgetimms.com` is bound via the `CNAME` file in the repo root.
