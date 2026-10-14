---
name: DGP Construction
description: Finish carpentry in Danbury, CT, drawn as a millwork shop drawing set.
colors:
  ink: "#0E0D0B"
  ink-2: "#3B3933"
  ink-3: "#6A675F"
  line: "#D6D3CA"
  paper: "#FAFAF7"
  white: "#FFFFFF"
  gold: "#E0A11F"
  gold-hi: "#F5C23E"
  gold-lo: "#B8720F"
  gold-ink: "#865100"
  gold-soft: "rgba(224, 161, 31, .2)"
  paper-2: "#D9D5CB"
  paper-3: "#96928A"
  error: "#B3261E"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 1.2rem + 3.6vw, 4.35rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.85rem, 1.2rem + 2.2vw, 3.1rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.2rem, 1rem + .6vw, 1.5rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 118"
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    fontVariation: "'wdth' 100"
  button:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: ".86rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: ".06em"
    fontVariation: "'wdth' 118"
  label:
    fontFamily: "Martian Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: ".72rem"
    fontWeight: 700
    lineHeight: 1.45
    letterSpacing: ".08em"
    fontVariation: "'wdth' 87.5"
  data:
    fontFamily: "Martian Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: ".78rem"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: ".02em"
    fontVariation: "'wdth' 87.5"
rounded:
  none: "0px"
  bubble: "50%"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  section: "clamp(80px, 10vw, 140px)"
  wrap: "1280px"
  header: "76px"
  column-gap: "32px"
components:
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: ".9em 1.35em"
    height: "52px"
  button-gold-hover:
    backgroundColor: "{colors.gold-hi}"
    textColor: "{colors.ink}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: ".9em 1.35em"
    height: "52px"
  button-ink-hover:
    backgroundColor: "{colors.ink-2}"
    textColor: "{colors.paper}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: ".9em 1.35em"
    height: "52px"
  button-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "13px 14px"
    height: "52px"
  mark-chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "6px 9px"
  mark-chip-active:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
  bubble:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.bubble}"
    size: "34px"
  bubble-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    rounded: "{rounded.bubble}"
    size: "34px"
  title-block-cell:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "14px 18px 16px"
  title-block-due:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.gold}"
    rounded: "{rounded.none}"
    padding: "14px 18px 16px"
  action-bar-quote:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    height: "60px"
---

# Design System: DGP Construction

## Overview

**Creative North Star: "The Shop Drawing"**

Every section is a sheet from a millwork shop drawing set. Black linework is ruled on near-white paper, the logo gold works the way a drafter's redline does (revision clouds, callouts, the one mark that says "this changed, look here"), and black sheets carry the general notes, the offer and the footer. Precision is shown before it is claimed: dimension strings in fractions of an inch, detail bubbles, a finish schedule with marks, a title block, a site plan for the service radius.

The density is that of a well-drawn sheet: generous margins, hard 1.5px ink rules between zones, small mono data set against heavy expanded headings. Nothing floats; everything is either ruled onto the sheet or laid on it as a second white sheet with an ink border. Motion belongs to the drawing itself: lines draft in, then the dimension text and redline snap in.

The world rejects the category default for contractors: a dark photo hero, a badge strip and a grid of rounded cards with soft shadows.

**Key Characteristics:**
- Near-white paper sheets ruled with 1.5px ink lines; black sheets for notes, offer and footer.
- Logo gold as redline: revision clouds, callouts, active marks, the primary action.
- Archivo expanded heavy (width 125, weight 800) for headings, echoing the DGP letterforms.
- Martian Mono strictly for measurements, marks and sheet data.
- Square corners everywhere; circles only for drawing bubbles.
- Flat: depth is drawn with line weight, never with shadow.
- One signature motion: the drawing drafts itself.

## Colors

A two-ink drafting palette: warm black linework on warm near-white paper, with one gold family sampled from the DGP logo doing the redline work.

### Primary
- **Redline Gold** (gold): the logo gold. Primary button fill, revision clouds, redline strokes in drawings, the active schedule mark, gold bubbles, the open FAQ marker, the selection highlight, the mobile action bar top rule and quote cell. On black sheets it may also be used as text (title-block due value, footer column titles, contact icons).
- **Lit Gold** (gold-hi): hover state of the gold button only.
- **Burnt Gold** (gold-lo): the deep shade of the logo bevel; used as the text caret color. Reserved, not a surface color.
- **Gold Ink** (gold-ink): the only gold allowed as text on paper or white (6.3:1 on paper). Scope lines in the schedule, review tags, redline annotation text in drawings, the form meta line, dimension labels in the process steps, FAQ question hover.
- **Gold Wash** (gold-soft): 20% gold. Focus halo on fields, hover wash on the file drop and preference chips.

### Neutral
- **Drafting Ink** (ink): all linework, body text, heading text, 1.5px rules, black sheet backgrounds, the ink button.
- **Graphite** (ink-2): secondary prose on paper, dimension text in drawings, ink button hover, the "bad detail" linework.
- **Pencil** (ink-3): captions, table headers, dimension leaders, hatching, glass strokes, quiet metadata (5.4:1 on paper).
- **Rule Gray** (line): hairline 1px dividers between rows inside a section (reviews, schedule rows, FAQ items, mobile nav).
- **Vellum** (paper): the page sheet and the light text color on black sheets.
- **Sheet White** (white): a second sheet laid on the page: title block cells, detail cards, photo frames, gallery captions, the quote form, step number discs.
- **Vellum Shade** (paper-2): body text on black sheets.
- **Vellum Pencil** (paper-3): captions and plan linework on black sheets.

### Tertiary
- **Error Red** (error): field error text and invalid field border only.

### Named Rules
**The Redline Rule.** Gold marks what matters, the way a redline does on a drawing: the primary action, the revision cloud, the active item. If gold appears on something that is not an action, an active state or an annotation, it is decoration and does not belong.

**The Gold Ink Rule.** Gold text on paper or white is always Gold Ink, never Redline Gold. Redline Gold as text is legal only on Drafting Ink.

## Typography

**Display Font:** Archivo variable, width axis 62 to 125, self-hosted (fallback Helvetica Neue, Arial)
**Body Font:** Archivo at normal width (same family)
**Label/Mono Font:** Martian Mono variable, set at width 87.5 (fallback ui-monospace, SFMono-Regular, Menlo)

**Character:** One grotesque stretched across its width axis does all the talking: fully expanded and heavy for headings, like the DGP letterforms, normal width for reading. A condensed mono is the drafter's hand for the numbers.

### Hierarchy
- **Display** (800, width 125, clamp 2.25rem to 4.35rem, 1.02): the H1, sentence case, held to about 13ch.
- **Headline** (800, width 125, clamp 1.85rem to 3.1rem, 1.02): section H2s, sentence case, held to 13 to 18ch.
- **Title** (800, width 118, clamp 1.2rem to 1.5rem, 1.15): H3s for schedule items and process steps. Note leads in the general notes use 800 at width 115, 1.15rem.
- **Body** (400, 1.0625rem, 1.6): running copy, 44 to 68ch measure. The lede steps up to clamp 1.08rem to 1.25rem in Graphite.
- **Button** (700, width 118, .86rem, .06em tracking, uppercase): every button and the mobile quote cell.
- **Label** (Martian Mono 700, .7 to .74rem, .04 to .08em tracking, uppercase): title-block terms, schedule column heads, schedule marks, footer column titles, form meta.
- **Data** (Martian Mono 500, .78rem, .02em tracking): captions, scope lines, file lists, phone number in the nav, and in SVG the dimension and redline text (11.5px, haloed with a 5px paper stroke so it reads over linework).

### Named Rules
**The Mono Is Measurement Rule.** Martian Mono is used only for numbers, marks, captions and sheet data. Never for headings, prose or buttons.

**The Sentence Case Rule.** Headings are set in sentence case at full expansion. Caps belong to buttons and mono labels. (The expanded caps H1 broke the first viewport on mobile; sentence case is the recorded decision.)

## Layout

A 12-column grid (32px column gap) inside a 1280px wrap with fluid gutters (clamp 16px to 40px). Each section is a sheet: vertical padding clamp 80px to 140px and a 1.5px ink rule across its top edge. The hero is a 6/6 split (copy left, self-drafting elevation right) with the full-width title block directly beneath, both inside the first viewport. Other sections use asymmetric splits: 5 + 6 (about, FAQ, contact), 7 + 4 (schedule with sticky preview), 7 + 4 (notes with photo). Side panels (detail pair, schedule preview, FAQ head) stick under the header at header height plus 32px.

The header is sticky, 76px tall (64px under 900px), paper at 94% with a light blur and a 1.5px ink bottom rule. Breakpoints: 1080px (hero becomes 7/5, detail pair and about go full width, title block wraps to two columns), 900px (single column, hamburger nav, schedule rows show inline thumbnails instead of the sticky preview, process steps stack with a vertical dimension line, fixed bottom action bar appears), 640px (fields and details single column, hero buttons full width, dimension text enlarged to 13.5px).

## Elevation & Depth

Flat. There are no drop shadows anywhere. Depth is drawn the way a drafter draws it: line weight (heavy 2.2, mid 1.2, thin 0.8, dim 0.8 in Pencil), hatching, and sheet layering where a white sheet with a 1.5px ink border sits on the paper sheet, or a white sheet sits on a black field (the quote form). The only box-shadow in the system is the 4px Gold Wash focus halo on form fields, which is a state signal, not elevation.

### Named Rules
**The Line Weight Rule.** Hierarchy in drawings and on the page comes from stroke weight and ink value, never from shadow or blur. If something needs to come forward, rule it heavier or lay it on a white sheet.

## Shapes

Square corners on every rectangle (0px): buttons, fields, chips, frames, cards, the title block, the action bar. Borders are 1.5px Drafting Ink for structure, 1px Rule Gray for row dividers, 1px ink for title block cell divisions. Circles are reserved for drafting conventions: detail and sheet bubbles (34px), process step discs (64px, 2px ink), general note numbers (36px, gold outline), the FAQ plus marker (28px). The revision cloud (a scalloped closed path in gold, 2px non-scaling stroke) is the signature silhouette; it rings the title-block due value and the active schedule mark. Icons are inline SVG line icons with square caps and miter joins at 1.8 stroke.

## Components

### Buttons
Blunt, drafted, uppercase.
- **Shape:** square (0px), 1.5px border in the button's own ink, minimum 52px tall (44px small, 60px for the form submit).
- **Gold (primary):** Redline Gold fill, Drafting Ink text. One per view region; it is the quote action.
- **Ink:** Drafting Ink fill, Vellum text; hover to Graphite.
- **Line:** transparent with ink border; hover fills ink. On black sheets the border and text turn Vellum and hover fills Vellum.
- **Hover / Focus / Active:** trailing arrow icon slides 3px right on hover; active presses down 1px; focus is a 2px ink outline offset 3px (gold on black sheets). Loading and disabled drop to 60% opacity.

### Chips (schedule marks and preference chips)
- **Mark chip:** Martian Mono label (TR-1, WN-1, DK-1) in a 1.5px ink box. On the active schedule row it fills Redline Gold and a gold revision cloud scales in around it.
- **Preference chip:** 44px square-cornered toggle with 1.5px ink border; hover Gold Wash, checked fills Drafting Ink with Vellum text.

### Cards / Containers
- **Corner Style:** square (0px).
- **Background:** Sheet White laid on Vellum (detail cards, photo frames with 10px mat), or transparent with a 50% Vellum border on black sheets.
- **Shadow Strategy:** none; see Elevation & Depth.
- **Border:** 1.5px Drafting Ink.
- **Internal Padding:** 18px for detail cards, 10px mat for frames.

### Inputs / Fields
- **Style:** Sheet White, square, 52px minimum, 13px by 14px padding, light gray 1.5px stroke that darkens to Pencil on hover. Labels above in Archivo 700 at .88rem.
- **Focus:** border goes Drafting Ink plus a 4px Gold Wash halo.
- **Error:** border and message in Error Red. File drop is a dashed 1.5px Pencil box that washes gold on hover.

### Navigation
- **Desktop:** Archivo 600 at width 108, .92rem; hover draws a 2px gold underline from the left. The phone number sits in mono. A small gold button closes the row.
- **Mobile:** 48px square ink-bordered toggle; the menu drops as a paper panel with ruled 1.15rem rows. A fixed bottom action bar on Drafting Ink (Text us, Call, and a gold "24-hour quote" cell) with a 1.5px gold top rule.

### Title Block
The drawing's title block: a ruled strip of term/value cells (mono label terms in Pencil, Archivo 700 values) on Sheet White inside a 1.5px ink border. The final cell is a black "due" cell whose value is set in expanded heavy gold and ringed by a drafted revision cloud. A transparent variant with Vellum rules closes the footer.

### Drawings
Inline SVG elevations and details. Linework strokes are grouped by weight (heavy, mid, thin, dim); a redline group carries gold strokes with round caps, and annotations use Gold Ink mono text. Captions pair a bubble with a mono caption whose lead word is uppercase ink. Detail pairs compare a Graphite "typical" detail (A) against an ink DGP detail (B, gold bubble).

### Schedule, Notes and Site Plan
- **Finish schedule:** a ruled table: mono column heads between a 1.5px and a 1px ink rule, rows divided by Rule Gray, closed with a 1.5px ink rule. Hovering or focusing a row makes it active and swaps the sticky preview photo.
- **General notes:** a counter-numbered list on a black sheet; each number in a 36px gold-outlined circle, rows ruled with 22% Vellum.
- **Site plan:** a black-sheet plan with dashed state lines, dashed radius rings, a gold dashed service radius and a gold home marker.

### Signature motion: the drafting reveal
Drawings and the hero title block draft themselves: every stroke carries `pathLength="1"` and animates its dash offset from 1 to 0 over 1.3s on the expo-out curve, staggered 70ms per line; text, ticks and fades follow after the linework. It is opt-in: the root only gets the drafting class when JavaScript runs and reduced motion is not requested, and a 3s failsafe removes it. Content is fully visible without it. The hero drafts on load; everything else drafts on scroll into view.

## Do's and Don'ts

### Do:
- **Do** rule sections and structure with 1.5px Drafting Ink lines, and divide rows inside a section with 1px Rule Gray.
- **Do** use Redline Gold only for the primary action, revision clouds, redline strokes and active states.
- **Do** set gold text on light surfaces in Gold Ink (#865100); Redline Gold text only on Drafting Ink.
- **Do** set headings in Archivo 800 at width 125, sentence case.
- **Do** keep Martian Mono to measurements, marks, captions and sheet data.
- **Do** lay emphasized content on a Sheet White panel with a 1.5px ink border instead of lifting it.
- **Do** reuse the drafting reveal (pathLength 1, dash offset, opt-in class, reduced-motion skip) for any new drawing.

### Don't:
- **Don't** add drop shadows to any panel, card or button; the field focus halo is the only box-shadow.
- **Don't** round rectangle corners; circles are only for bubbles, step discs, note numbers and the FAQ marker.
- **Don't** use Redline Gold (#E0A11F) as text on paper or white.
- **Don't** use Martian Mono for headings, body copy or buttons.
- **Don't** introduce a second accent hue; the palette is ink, paper and the logo gold.
- **Don't** hide content behind the drafting motion; the unanimated state must be complete.
