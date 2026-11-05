# Himanshu Singh Portfolio: Guide

This is a plain HTML, CSS and JavaScript website. There's no WordPress, no database, no build step and nothing to install. Open `index.html` in a browser and it works. Upload the folder to any web host and it's live.

Use this guide whenever you want to change something or something isn't working.

---

## Contents

1. [Folder structure](#1-folder-structure)
2. [Preview the site on your computer](#2-preview-the-site-on-your-computer)
3. [Which file do I edit?](#3-which-file-do-i-edit)
4. [Images (Google Drive, Unsplash, local)](#4-images)
5. [Your profile photo](#5-your-profile-photo)
6. [Resume / Download CV button](#6-resume--download-cv-button)
7. [Editing text: about, experience, skills, education](#7-editing-text)
8. [Projects: add, remove, filter](#8-projects)
9. [Contact details](#9-contact-details)
10. [Colours, fonts and dark mode](#10-colours-fonts-and-dark-mode)
11. [Putting the site online (hosting)](#11-putting-the-site-online)
12. [Troubleshooting](#12-troubleshooting)
13. [Quick checklist after every change](#13-quick-checklist-after-every-change)
14. [Credits and licences](#14-credits-and-licences)

---

## 1. Folder structure

```
index.html                        All page text: profile card, About, Resume, Work, Contact
README.md                         This guide
css/
  style.css                       Design: colours, fonts, spacing, mobile layout
js/
  config.js                       IMAGES and RESUME link: the file you'll edit most
  main.js                         Behaviour (typing effect, filters, dark mode, copy buttons, image loading)
assets/
  HimanshuSingh_WebDeveloper.pdf  Resume opened by "Download CV"
  img/                            Website screenshots and backup images (full list in section 4e)
    bullstreetedge-site.jpg       Screenshots: one file for each website project
    qualityroofs.jpg
    superduper.jpg
    csrasitework.jpg
    kingsqueens.jpg
    clearway.jpg
    monktech.jpg
    xdctowing.jpg
    legalblow.jpg
    airterminalsguide.jpg
    airterminalscounter.jpg
    airportsinsights.jpg
    bullstreetedge.jpg            Backups: used if the main image fails
    wpthemes.jpg
    xaca.jpg
    n8n.jpg
    ghl.jpg
    abbot.jpg                     Not in use (Abbot card removed)
```

**Keep this structure.** If you rename or move `css/`, `js/` or `assets/`, the page loses its styling, images or resume.

---

## 2. Preview the site on your computer

- **Quickest:** double-click `index.html`. It opens in your browser.
- **Better (matches a real server):** in VS Code, install the *Live Server* extension, right-click `index.html` and choose **Open with Live Server**. The page reloads every time you save a file.

---

## 3. Which file do I edit?

| I want to change… | Edit this | Where |
|---|---|---|
| A project image or my photo | `js/config.js` | `images: { ... }` |
| The resume PDF | `js/config.js` or replace the PDF | `resume:` / `assets/` |
| My name, role, intro text | `index.html` | profile card at the top, About section |
| Experience, internships, skills, education | `index.html` | `<!-- RESUME -->` section |
| Projects (text, links, categories) | `index.html` | `<!-- WORK -->` section |
| Email, phone, LinkedIn | `index.html` | profile card icons **and** `<!-- CONTACT -->` section |
| The words that cycle under my name | `js/main.js` | `var roles = [...]` |
| Colours or fonts | `css/style.css` | the `:root` block at the very top |
| Browser-tab title / Google description | `index.html` | `<title>` and `<meta name="description">` in `<head>` |

Tip: in VS Code press **Ctrl + F** and search for the text you can see on the page. That takes you straight to it.

---

## 4. Images

Every image is set in **`js/config.js`**:

```js
images: {
  profile:        "",                                     // your photo
  bullstreetedge: "assets/img/bullstreetedge-site.jpg",   // a file inside the site folder
  wpthemes:       "https://images.unsplash.com/...",      // an online image
  // ...one line for each project
}
```

Section [4e](#4e-current-project-images) lists every project and the image it uses.

Each value can be any one of these:

| Type | Example |
|---|---|
| Google Drive share link | `"https://drive.google.com/file/d/1AbC.../view?usp=sharing"` |
| Just the Drive file ID | `"1AbCdEfGhIjKlMnOpQrStUvWxYz123456"` |
| Any normal image URL (Unsplash etc.) | `"https://images.unsplash.com/photo-...?w=1200"` |
| A file inside the site folder | `"assets/img/myproject.jpg"` |
| Empty | `""` shows the built-in placeholder |

### 4a. Using Google Drive (recommended)


1. Upload the image to the folder.
2. Right-click the image → **Share** → under *General access* choose **Anyone with the link** (role: Viewer) → **Done**.
   *Sharing the folder is not always enough. Check that each image file is set to "Anyone with the link".*
3. Right-click the image → **Share** → **Copy link**.
4. Paste it into `js/config.js` between the quotes for the right project, e.g.
   `xaca: "https://drive.google.com/file/d/1AbC.../view?usp=sharing",`
5. Save, then refresh the page (Ctrl + F5 for a hard refresh).

**Change an image later without touching any code:** in Drive, right-click the image → **File information** → **Manage versions** → **Upload new version**. The link stays the same, so the site shows the new picture automatically. It can take a few minutes because of caching.

### 4b. Using Unsplash (or Pexels / Pixabay)

1. Open the photo page on unsplash.com.
2. Right-click the large photo → **Copy image address**.
3. Paste it into `js/config.js`. Adding `?w=1200` (or `&w=1200` if there's already a `?`) keeps the file size small.

Unsplash photos are free to use, and no credit is required.

### 4c. Using a local file

Put the image in `assets/img/`, then set the value to `"assets/img/yourfile.jpg"`. Filenames are case-sensitive on most web hosts, so `Photo.JPG` and `photo.jpg` are different files.

### 4d. What happens if an image fails to load

The site tries these in order and uses the first one that works:

1. The link in `config.js`
2. For Drive links: a second Drive address (`drive.google.com/thumbnail?id=...`)
3. The backup image `assets/img/<name>.jpg` (for example `assets/img/n8n.jpg`)
4. The built-in placeholder (title text on a plain tile)

So a broken link never shows a broken-image icon. You'll just see the backup instead.

### 4e. Current project images

This list shows which image each project card uses. The **Image** column is the value set in `js/config.js`. Once the site is online, the full address of a local image is your site's address followed by its path, for example `https://your-site.com/assets/img/clearway.jpg`.

**Website screenshots** (homepages captured on 5 Nov 2026, so they won't update if a site changes):

| Project | Name in `config.js` | Image | Screenshot of |
|---|---|---|---|
| BullStreetEdge | `bullstreetedge` | `assets/img/bullstreetedge-site.jpg` | https://bullstreetedge.com/ |
| Quality Roofs & Exteriors | `qualityroofs` | `assets/img/qualityroofs.jpg` | https://qualityroofsandexteriors.com/ |
| Super Duper Heating & Cooling | `superduper` | `assets/img/superduper.jpg` | https://www.superduperservices.com/ |
| CSRA Site Work and Septic | `csrasitework` | `assets/img/csrasitework.jpg` | https://csrasiteworkandseptic.com/ |
| Kings Queens Roofing | `kingsqueens` | `assets/img/kingsqueens.jpg` | https://kingsqueensroofingny.com/ |
| Clearway Exteriors | `clearway` | `assets/img/clearway.jpg` | https://clrwy.com/ |
| Monk Technologies | `monktech` | `assets/img/monktech.jpg` | https://monktechnologies.net/ |
| XDC Towing | `xdctowing` | `assets/img/xdctowing.jpg` | https://xdctowingnyc.com/ |
| LegalBlow Pro | `legalblow` | `assets/img/legalblow.jpg` | https://spiraclethemes.com/legalblow-pro-addons/ |
| Air Terminals Guide | `airterminalsguide` | `assets/img/airterminalsguide.jpg` | https://www.airterminalsguide.com/ |
| Air Terminals Counter | `airterminalscounter` | `assets/img/airterminalscounter.jpg` | https://www.airterminalscounter.com/ |
| Airports Insights | `airportsinsights` | `assets/img/airportsinsights.jpg` | https://www.airportsinsights.com/ |

**Unsplash photos:**

| Project | Name in `config.js` | Image | Backup |
|---|---|---|---|
| Custom WordPress themes | `wpthemes` | https://images.unsplash.com/photo-1555066931-4365d14bab8c | `assets/img/wpthemes.jpg` |
| Xaca company site & client builds | `xaca` | https://images.unsplash.com/photo-1547658719-da2b51169166 | `assets/img/xaca.jpg` |
| Social post automation | `n8n` | https://images.unsplash.com/photo-1745848413078-f85af10e5bf2 | `assets/img/n8n.jpg` |
| GoHighLevel templates & workflows | `ghl` | https://images.unsplash.com/photo-1686061593213-98dad7c599b9 | `assets/img/ghl.jpg` |

`config.js` adds size settings to the end of each Unsplash link (`?auto=format&fit=crop&w=1200&q=75`).

**Backups for the screenshots:**

- **BullStreetEdge:** its backup is `assets/img/bullstreetedge.jpg`, the older image, so it still shows if `bullstreetedge-site.jpg` fails to load.
- **All the other screenshots:** the image is also its own backup, because the file has the same name the site looks for. If one of these files goes missing, the card shows the built-in placeholder.

**Not in use:** `assets/img/abbot.jpg` and the `abbot` line in `config.js` are left over from the removed Abbot Technologies card. They don't show on the page.

**To replace a screenshot:** save the new image in `assets/img/` with the same filename, at 1200 × 750 px. If you use a new filename, also update its line in `js/config.js`.

### Recommended image sizes

| Image | Shape | Size |
|---|---|---|
| Project images | landscape 16:10 | 1200 × 750 px or larger, JPG, under 400 KB |
| Profile photo | square | 600 × 600 px or larger |

The site crops images to fit, so keep the important part near the centre.

---

## 5. Your profile photo

Until you add one, the card shows an **"HS."** monogram.

1. Upload a square photo to your Drive folder and share it (see 4a).
2. Paste the link into `profile: ""` in `js/config.js`.

On phones the photo shows as a circle next to your name. On larger screens it fills the top of the card.

---

## 6. Resume / Download CV button

By default the button opens `assets/HimanshuSingh_WebDeveloper.pdf`.

- **Replace the file:** overwrite that PDF with your new one, keeping **exactly the same filename**.
- **Or use Drive:** upload the PDF to Drive, share it as "Anyone with the link", and paste the link into `resume:` in `js/config.js`. Visitors then see the newest version whenever you update the file in Drive (use *Manage versions* to keep the same link).

---

## 7. Editing text

All text lives in `index.html`. Each section starts with a comment you can search for:

- `<!-- ============ PROFILE CARD ============ -->`: name, tagline, the three facts (Experience / Live sites / Freelance), buttons, social icons
- `<!-- ABOUT -->`: intro paragraphs, the four numbers (50+, 45+, 450+, 60%), "What I do" cards
- `<!-- RESUME -->`: experience timeline, internships, skills, education, certifications
- `<!-- WORK -->`: projects
- `<!-- CONTACT -->`: contact cards

### Add a new job to Experience

Copy one whole `<li> ... </li>` block inside `<ol class="timeline">` and paste it **at the top** of the list (newest first):

```html
<li>
  <div class="when">Jan 2027 – Present</div>
  <div class="what">
    <h4>Job Title</h4>
    <p class="org"><a href="https://company.com/" target="_blank" rel="noopener">Company Name</a> · Full-time, onsite</p>
    <ul>
      <li>What you did.</li>
      <li>Another thing you did.</li>
    </ul>
  </div>
</li>
```

When you add a job, also update the matching role in your PDF resume so the two match.

### Internships / contract rows

```html
<li><span>Role · <a href="https://company.com/" target="_blank" rel="noopener">Company</a></span><em>Remote</em><time>Sep – Dec 2025</time></li>
```

### Skills

Each skill is an `<i>` tag inside its group. Add `<i>Laravel</i>` to add one, or delete a tag to remove it.

### The cycling roles under your name

In `js/main.js`:

```js
var roles = ["Web Developer", "WordPress Developer", "PHP Developer", "Elementor Expert", "Automation Builder"];
```

Also update the first one inside `index.html` (`<span id="typed">Web Developer</span>`), which is what shows before the animation starts.

### Special characters

In HTML, write `&amp;` for **&**, `&lt;` for **<** and `&gt;` for **>**. Apostrophes and normal punctuation are fine as they are.

---

## 8. Projects

Each project is one `<article class="work">` block inside `<!-- WORK -->`:

```html
<article class="work" data-cat="wordpress integration">
  <div class="thumb" data-img="newproject" data-fallback="Project Name"></div>
  <div class="body">
    <p class="stack">WordPress · Elementor</p>
    <h4>Project Name</h4>
    <p>One or two sentences on what you built and why it mattered.</p>
    <p class="links"><a href="https://example.com" target="_blank" rel="noopener">example.com ↗</a></p>
  </div>
</article>
```

### Add a project

1. Copy an existing `<article class="work"> ... </article>` block and paste it where you want it in the grid.
2. Change the text. Delete the `<p class="links">` line if there's no public link.
3. Give `data-img` a **new, unique name**, e.g. `data-img="newproject"`.
4. In `js/config.js`, add a line for that name inside `images: { }`:
   `newproject: "https://drive.google.com/file/d/.../view",`
   (Put a comma after the previous line.)
5. `data-fallback` is the text shown on the placeholder tile if there's no image.

### Remove a project

Delete its whole `<article class="work"> ... </article>` block. You can leave its line in `config.js` or delete it.

### Filter buttons (WordPress / Custom Themes / Integrations / Automation / All)

`data-cat` controls which filters show the project. Use one or more of `wordpress`, `custom-themes`, `integration` and `automation`, separated by spaces. Every project also shows under **All**.

To add a new filter, e.g. "Shopify":
1. Add a button before the **All** button:
   `<button type="button" data-filter="shopify">Shopify</button>`
2. Add `shopify` to the `data-cat` of the projects that belong to it.

"All" is last in the row and selected when the page loads (it has `class="on"`).

Each button has a small icon, which is an `<svg>` inside the button in `index.html`. Its colour is set in `css/style.css`, for example `.filters [data-filter="wordpress"] svg { fill: #21759b; }`. A new button without an icon still works, so the icon is optional.

### Sticky heading and filters on phones

On screens up to 760 px wide (and at least 500 px tall), the "Selected projects" heading and filter buttons stick below the top bar while the visitor scrolls through the Work section, then scroll away when the section ends. They're grouped in `<div class="work-bar">` in `index.html`, and the styles are under the `.work-bar` rules in `css/style.css`. Picking a filter while scrolled down the list returns to its first card, which is handled in the project filters part of `js/main.js`.

---

## 9. Contact details

Your main email, phone and LinkedIn appear in **two places** in `index.html`, so update both:

1. **Profile card icons:** search for `aria-label="LinkedIn"`, `mailto:` and `tel:`.
2. **Contact section:** search for `<!-- CONTACT -->`.

The second email (`himanshusingh2k1@gmail.com`) and WhatsApp appear only in the Contact section.

Phone links use the international format without spaces: `tel:+919389718063`.

### WhatsApp

The WhatsApp card has **two links**, on the number and on the icon, so change both. Search for `wa.me`:

```
https://wa.me/919389718063?text=Hi%20Himanshu%2C%20I%20want%20to%20discuss%20a%20Project%20with%20you
```

- **Number:** country code and number, with no `+` or spaces.
- **Message:** the text after `?text=`, which appears ready to send. Write `%20` for a space and `%2C` for a comma.

The **Copy** buttons copy whatever text is shown on the card, so they update by themselves when you change the text.

The site has no contact form, so there's no email server or spam to deal with. Visitors reach you directly by email, phone, WhatsApp or LinkedIn.

---

## 10. Colours, fonts and dark mode

Open `css/style.css`. The first block, `:root { ... }`, holds every colour and font:

| Token | What it controls |
|---|---|
| `--accent` | Orange buttons, dots and markers |
| `--accent-ink` | Orange text (darker, so it's readable on white) |
| `--bg` | Page background |
| `--surface` | Card background |
| `--ink` | Main text |
| `--muted` | Secondary text |
| `--line` | Borders |

The same tokens appear **twice more** below it, for dark mode (once under `@media (prefers-color-scheme: dark)` and once under `:root[data-theme="dark"]`). If you change a colour, change it in the dark blocks too, using a lighter or brighter shade there.

**Contact icon colours** are set directly in `style.css` and stay the same in light and dark mode. Search for the value to change it:

| Icon | Colour | Rule in `style.css` |
|---|---|---|
| LinkedIn | `#0a66c2` | `.social a[aria-label="LinkedIn"]` |
| Email | `#ea4335` | `.social a[aria-label="Email"]` |
| Phone | `#34a853` | `.social a[aria-label="Phone"]` |
| WhatsApp | `#25d366` | `.ch-icon` |

**Fonts** come from Google Fonts (Bricolage Grotesque for headings, Instrument Sans for text, JetBrains Mono for small code-style labels). To swap one, change the `<link ... fonts.googleapis.com ...>` line in `index.html` and the `--f-display`, `--f-body` or `--f-mono` value in `style.css`.

**Dark mode:** the site follows the visitor's device setting automatically. The moon button in the top bar switches it manually, and the choice is remembered in that browser.

---

## 11. Putting the site online

Upload **the contents of this folder**, with `index.html` at the top level and not inside another folder.

### Option A: Netlify (free, easiest)
1. Go to https://app.netlify.com/drop
2. Drag the whole site folder onto the page.
3. You get a live link in a few seconds. Add your own domain later under *Domain management*.
4. To update: drag the folder again on the site's **Deploys** page.

### Option B: GitHub Pages (free)
1. Create a new public repository and upload all the files (keep the folders).
2. Repository **Settings** → **Pages** → *Source*: **Deploy from a branch** → branch `main`, folder `/ (root)` → **Save**.
3. The site appears at `https://<username>.github.io/<repo>/` within a minute or two.

### Option C: Hostinger / cPanel / any shared hosting
1. Open **File Manager** and go to `public_html` (or your domain's folder).
2. Upload `Himanshu-Singh-Portfolio.zip` and **Extract** it there.
3. Check that `index.html` sits directly inside `public_html`, not in a subfolder.

### Option D: Vercel
Import the folder or GitHub repo at https://vercel.com/new. Choose framework **Other**. No build command is needed.

---

## 12. Troubleshooting

### A Google Drive image doesn't show (you see the backup image or a placeholder)
- **Sharing:** the *file itself* must be **Anyone with the link → Viewer**. Test by opening the link in a private/incognito window. If Drive asks you to sign in, it isn't shared publicly.
- **Wrong link type:** use the link of the **image file**, not the folder. A folder link looks like `.../drive/folders/...` and won't work.
- **Typo:** check that the quotes and the comma at the end of the line in `config.js` are still there.
- **Just uploaded:** Drive can take a few minutes to serve a new file. Wait, then hard-refresh (Ctrl + F5).
- **HEIC / iPhone photos:** convert to JPG or PNG first. Not every browser shows HEIC.
- **Very large files (10 MB+):** resize to about 1600 px wide before uploading.
- **Still failing?** Download the image and use the local-file method (section 4c). That always works.

### An Unsplash image doesn't show
The link may have been removed. Pick another photo and copy its image address (section 4b), or use a Drive or local image instead.

### The whole page looks unstyled (plain text, no colours)
`css/style.css` isn't being found. Check that the `css` folder was uploaded next to `index.html` and that the name is lowercase.

### Nothing moves: no typing effect, filters don't work, no images
`js/main.js` or `js/config.js` has an error or wasn't uploaded.
- Press **F12** → **Console** tab. A red error shows the file and line number.
- The usual cause is a **missing comma or quote** in `config.js` after editing. Every image line except the last needs a comma at the end.

### "Download CV" shows a 404 / not found page
The PDF filename in `assets/` doesn't exactly match `resume:` in `config.js`. Letters must match exactly, including capitals.

### Changes don't appear after uploading
Your browser is showing a cached copy. Press **Ctrl + F5** (Windows) or **Cmd + Shift + R** (Mac), or check in a private window. On Netlify, check that the new deploy finished.

### Something looks broken on mobile
- Test with Chrome DevTools (**F12** → phone icon) at 375 px wide.
- Long words without spaces (a long URL as text) can push the layout. Put them inside a link or shorten the visible text.
- Avoid fixed widths (like `width: 500px`) in any CSS you add. Use `max-width` instead.

### The email or phone icon does nothing when clicked
`mailto:` and `tel:` links open the visitor's email or phone app. On a computer with no email app set up, nothing happens. That's normal, which is why the Contact section shows the details as text with **Copy** buttons.

### Fonts look different
Google Fonts didn't load (offline, or blocked on a network). The site falls back to the system font automatically. Nothing is broken.

### The section highlight in the top bar is slightly off
It updates as you scroll. If you add a much taller section, it still works. No change needed.

---

## 13. Quick checklist after every change

- [ ] Saved the file
- [ ] Hard-refreshed the page (Ctrl + F5)
- [ ] Checked on a phone-size screen (F12 → phone icon)
- [ ] Checked dark mode (moon button)
- [ ] No red errors in F12 → Console
- [ ] Links open the right pages
- [ ] Re-uploaded **all** changed files to the host

---

## 14. Credits and licences

- **Code and design:** written for this portfolio. It's yours to edit and reuse.
- **Fonts:** Bricolage Grotesque, Instrument Sans and JetBrains Mono, via Google Fonts (SIL Open Font Licence).
- **Project photos (Unsplash Licence, free, no credit required):**
  | Key | Photographer | Source |
  |---|---|---|
  | n8n | dlxmedia.hu | https://unsplash.com/photos/Jrz9YXN1Vwc |
  | ghl | 1981 Digital | https://unsplash.com/photos/bf9sZBcGQl4 |
  | wpthemes | Unsplash | https://images.unsplash.com/photo-1555066931-4365d14bab8c |
  | xaca | Unsplash | https://images.unsplash.com/photo-1547658719-da2b51169166 |
- **Website screenshots** in `assets/img/` show the live project sites listed in section 4e. Those sites' content belongs to their owners.
- **Other backup images** in `assets/img/` were made for this site and are free to use.
