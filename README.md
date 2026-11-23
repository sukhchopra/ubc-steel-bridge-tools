# UBC Steel Bridge: Construction Sequence Tools

Web tools for the Construction Sub-team that turn a bridge design into a construction sequence. They run entirely in the browser: there is no server, and nothing is uploaded anywhere.

| Tool | What it does |
|---|---|
| [Bridge Model Builder](builder/) | Import an S-FRAME `.TEL` stick model, group sticks into members, add cross members, set joints, set up the construction site, export a bridge file |
| [Sequence Studio](studio/) | Open a bridge file and a construction site, plan stages and lifts, play the build |

## Workflow

1. **Builder → Import.** Drop the S-FRAME `.TEL` export of one truss line. Check the units and set the truss spacing and HSS size.
2. **Builder → Members.** Check the suggested members. Shift-click pieces to make new ones; "Join a whole group" turns a pier frame into one member. Every member is checked against the 3′-6″ × 6″ × 4″ box.
3. **Builder → Cross members.** Add laterals, top struts and X braces between the north and south trusses. "Repeat along the span" copies one panel's pattern.
4. **Builder → Joints.** Set each joint: EW or SLOT, number of bolts, which member carries the tab, yard or site.
5. **Builder → Site.** Type in the competition site from the rules' site plan (strips, footings, limits). Save it as a `.site.json` to reuse with other bridges.
6. **Builder → Export.** Download the bridge file (`.bridge.json`).
7. **Studio.** Open the bridge file (and a site file if you want a different one), then build the sequence.

## Sharing work

Each person's work is saved in their own browser. To share, download the file and pass it on through the team drive. This repository is public, so don't commit team bridge designs (`.TEL`, `.bridge.json` or sequences) here.

| File | Made by | Holds |
|---|---|---|
| `*.TEL` | S-FRAME | The 2D analysis model |
| `*.bridge.json` | Builder, Export step | Nodes, members, cross members, joints and site |
| `*.site.json` | Builder, Site step | One construction site, reusable across bridges |
| Sequence JSON | Studio, "Copy sequence JSON" | The stages and lifts for one bridge |

## Hosting on GitHub Pages

1. Push this folder to a GitHub repository (the files go at the top level of the repository).
2. In the repository: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
3. After a minute the tools are at `https://<account>.github.io/<repository>/`.

The `.nojekyll` file stops GitHub from processing the files. `sw.js` and `manifest.webmanifest` let the tools work offline after the first visit and be installed as an app from Chrome or Edge.

## Notes

- three.js r128 and OrbitControls are included in `vendor/` (MIT licence, see `vendor/LICENSE-three.txt`), so the tools don't depend on outside sites. Fonts come from Google Fonts when online and fall back to system fonts offline.
- S-FRAME moment releases are read as 1 = fixed, 2 = released at the start node, 3 = released at the end node. Confirm this on a member you know.
- Units are guessed from the model's size (under 80 means feet). The Import step has a units menu if a file guesses wrong.
