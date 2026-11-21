# Image prompts — HSE Portfolio

> ### Status
> **In use:** hero-bg, contact-bg, expertise-occupational, expertise-environment, expertise-systems, activity-campaign.
> **Still needed** (currently filled with re-cropped duplicates): `expertise-fire`, `activity-toolbox`,
> `activity-inspection`, `activity-training`, `activity-fire`, `activity-5s`, `activity-documentation`.
> Ask the generator for **photographs** — flat vector drawings were rejected. Then map them in `src/data/assets.ts`.

Generate these in any image model (Midjourney, DALL·E, Firefly, Imagen, etc.).
Save each result into **`public/images/_incoming/`** using the exact **file name** shown,
then run:

```bash
python scripts/optimize_images.py
```

The script resizes, compresses to WebP and puts every file in the right place.
Any image you skip simply keeps the branded fallback — nothing breaks.

> **Honesty rule:** these are *illustrative* images. The site labels them “Illustrative”.
> Real photos of your own work go in each activity/project `gallery` (with `verified: true`),
> only after company approval.

---

## Shared style (append to EVERY prompt)

```
cinematic photograph, shot on ARRI Alexa, 35mm anamorphic lens, shallow depth of field,
moody blue-hour lighting with warm sodium-amber practical lights, deep navy shadows,
subtle atmospheric haze, high dynamic range, filmic colour grade (teal-navy and amber),
ultra-detailed, photorealistic, no text, no logos, no watermarks, no brand names
```

**Negative prompt** (if supported):
`text, letters, logo, watermark, cartoon, illustration, 3d render, oversaturated, extra fingers, distorted hands, missing PPE, people without hard hats in work areas`

People: keep faces turned away, in silhouette or out of focus — these must never look like real, identifiable colleagues.
PPE must be correct: hard hat, safety glasses, hi-vis vest, gloves, safety boots.

---

## 1. Hero backdrop — **most important**

| File name | Ratio | Min size |
|---|---|---|
| `hero-bg.jpg` | 16:9 | 2560 × 1440 |

```
Wide establishing shot of a modern industrial electrical facility in Kuwait at blue hour,
large steel structure with switchgear rooms, cable trays and transformer yard, tall light masts
casting warm amber pools of light, desert-dusk sky fading from deep navy to burnt orange at the horizon,
light haze and floating dust in the light beams, wet reflective concrete ground,
composition: main structures and brightest lights on the RIGHT half, calm dark negative space on the LEFT third
for headline text, no people
```
*(Your own portrait cut-out is layered in front of this automatically.)*

## 2. Contact backdrop

| `contact-bg.jpg` | 21:9 | 2400 × 1030 |
|---|---|---|

```
Night panorama of an industrial plant skyline in the Gulf, rows of warm amber site lights,
red aviation warning lights on tall stacks, steel pipe racks in silhouette, deep navy sky,
very dark lower half for text, calm and premium, no people
```

## 3. Expertise panels (4 images, portrait-ish)

| File name | Ratio | Min size |
|---|---|---|
| `expertise-occupational.jpg` | 4:3 | 1800 × 1350 |
| `expertise-fire.jpg` | 4:3 | 1800 × 1350 |
| `expertise-environment.jpg` | 4:3 | 1800 × 1350 |
| `expertise-systems.jpg` | 4:3 | 1800 × 1350 |

**Occupational safety**
```
Close-up of a worker's gloved hands applying a red lockout-tagout padlock to an electrical
isolation switch on a grey industrial panel, yellow hard hat edge visible in the foreground,
hi-vis vest, shallow depth of field, amber key light, face not visible, lower third darker
```

**Fire & emergency safety**
```
Row of red fire extinguishers mounted on a clean industrial wall with an inspection tag in sharp focus,
emergency exit sign glowing green in the soft-focus background, dramatic side light, lower third darker
```

**Environmental management**
```
Colour-coded industrial waste segregation bins (green, yellow, blue, red) neatly arranged at a
workshop yard at dusk, clean concrete floor with yellow floor markings, warm practical lights, lower third darker
```

**HSE management systems**
```
Top-down cinematic shot of a desk at night: clipboard with a printed safety inspection checklist
(no readable text), a yellow hard hat, safety glasses and a pen, warm desk lamp light,
navy background, lower third darker
```

## 4. Activity & project covers (8 images, landscape)

| File name | Ratio | Min size |
|---|---|---|
| `activity-campaign.jpg` | 16:11 | 1400 × 960 |
| `activity-toolbox.jpg` | 16:11 | 1400 × 960 |
| `activity-inspection.jpg` | 16:11 | 1400 × 960 |
| `activity-training.jpg` | 16:11 | 1400 × 960 |
| `activity-fire.jpg` | 16:11 | 1400 × 960 |
| `activity-5s.jpg` | 16:11 | 1400 × 960 |
| `activity-documentation.jpg` | 16:11 | 1400 × 960 |
| `activity-environment.jpg` | 16:11 | 1400 × 960 |

**Safety campaign (hydration / PPE awareness)**
```
Workers in hi-vis vests and hard hats gathered around a water cooler station with
paper cups at an industrial site in hot desert sunlight, faces turned away, golden hour
```

**Toolbox talk**
```
Small group of workers in full PPE standing in a semicircle listening to a safety briefing
next to an overhead EOT crane in a workshop, seen from behind, warm overhead lights
```

**Workplace inspection**
```
HSE officer in white hard hat and hi-vis vest, seen from behind, holding a clipboard while inspecting
electrical distribution panels in a switchgear room, cool blue light with amber accents
```

**Safety training**
```
Classroom-style safety training in an industrial training room, trainees in hi-vis vests watching a
CPR / basic life support demonstration on a training mannequin, faces out of focus
```

**Fire safety**
```
Close-up of a gloved hand checking the pressure gauge of a red fire extinguisher, inspection tag in focus,
industrial background bokeh, dramatic light
```

**5S implementation**
```
Spotless industrial workshop with a tool shadow board, labelled storage, yellow floor demarcation lines
and organised workstations, wide angle, clean and orderly, warm light
```

**HSE documentation**
```
Binders labelled with coloured tabs (no readable text), safety data sheets, a laptop and a hard hat on an
office desk overlooking an industrial yard through the window at dusk
```

**Environmental activities**
```
Neatly segregated scrap metal, cable drums and recyclable materials in marked bays at an industrial yard,
yellow floor markings, dusk light, no people
```

## 5. Optional — higher-resolution portrait

Your **real** photo at ≥ 2000 px (the current one is 928 px, which limits sharpness
in the full-screen hero). Send it over and it will be cut out, colour-matched and dropped into
`public/images/profile/` (hero cut-out + About portrait).
