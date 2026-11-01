# Yixin Zhang (张益新) — Academic Personal Homepage (`al-folio` / `academicpages` Style)

[![ORCID](https://img.shields.io/badge/ORCID-0009--0004--7641--4450-A6CE39?style=flat-square&logo=orcid&logoColor=white)](https://orcid.org/0009-0004-7641-4450)
[![Semantic Scholar](https://img.shields.io/badge/Semantic_Scholar-2397424547-1857B6?style=flat-square&logo=semanticscholar&logoColor=white)](https://www.semanticscholar.org/author/Yixin-Zhang/2397424547)
[![arXiv](https://img.shields.io/badge/arXiv-2512.05576-B31B1B?style=flat-square&logo=arxiv&logoColor=white)](https://arxiv.org/abs/2512.05576)
[![Hugging Face](https://img.shields.io/badge/Hugging_Face-%40update0909-FFD21E?style=flat-square&logo=huggingface&logoColor=black)](https://huggingface.co/update0909)
[![GDE](https://img.shields.io/badge/Google_Developer_Expert-Machine_Learning-4285F4?style=flat-square&logo=google&logoColor=white)](https://g.dev/updatezhang)

This repository contains the zero-build, publication-grade bilingual (**English + 中文**) academic &amp; industrial-translation personal homepage for **Yixin Zhang (张益新)**, Affiliated Researcher at **Alma Mater Studiorum - Università di Bologna (DISI)**, Chief Architect of **TrustAgent Systems**, and **Google Developer Expert (Machine Learning)**.

---

## 1. Included Files & Architecture

| File | Purpose |
|---|---|
| `index.html` | Self-contained bilingual (`EN` / `中文`) academic &amp; industrial-transfer homepage with **Google Scholar Highwire Press meta tags** (`citation_*`), **Schema.org `Person` JSON-LD** (`sameAs` disambiguation graph), and **`#transfer` 60–90 Day Listed-OEM Embodied Turnkey Co-Build Portal**. |
| `styles.css` | Clean `al-folio` / `academicpages` academic typography, responsive grid, industrial-transfer KPI cards, and Light / Dark theme variables. |
| `script.js` | Instant language switcher (`?lang=en` / `?lang=zh` + `localStorage`), theme switcher, interactive `[BibTeX]` citation modal, **1-Page Executive Turnkey Decision Card modal**, and one-click OEM/FA referral card copy. |
| `citations.bib` | Canonical BibTeX entries for *CureAgent* (`arXiv:2512.05576`), *Self-Evolving Intelligent Agents* (`ISBN: 978-7-121-51835-5`), *Proactive Turn-Taking at TRPs* (`10.5281/zenodo.23605760`), and *Embodied Sim-to-Real Harness* (`10.5281/zenodo.23605772`). |
| `validate_homepage.py` | Deterministic automated validator auditing HTML/JSON-LD/ORCID checksum, BibTeX parity, bilingual `data-lang` parity, internal anchor resolution, canonical URL &amp; GitHub handle integrity, and zero-PII/compliance guardrails. |
| `test_script_runtime.js` | Isolated Node VM runtime test suite verifying bilingual modal switching, clipboard API + `execCommand` fallback resilience, and toast feedback. |
| `.gitignore` | Blocks local `_config.yml` and temporary caches from ever being staged or published to public GitHub Pages. |
| `.nojekyll` | Bypasses Jekyll Ruby build delays for instant static asset serving on GitHub Pages. |

---

## 2. Safe Non-Destructive Sync to Live GitHub Pages (`https://yixinzhangagent.github.io/`)

The live public portal is hosted at **`https://yixinzhangagent.github.io/`** (repository: `yixinzhangagent/yixinzhangagent.github.io`, verified on ORCID `0009-0004-7641-4450`).

> **Privacy &amp; Safety Guardrail**: Deploy **only** the 6 static public files (`index.html`, `styles.css`, `script.js`, `citations.bib`, `.nojekyll`, `README.md`) via a fast-forward commit on a clean clone—never stage `_config.yml` and never force-push over remote history.

```bash
python3 /Users/yixin0909zhang/Downloads/同步空间/resume/academic_homepage/validate_homepage.py && \
node /Users/yixin0909zhang/Downloads/同步空间/resume/academic_homepage/test_script_runtime.js && \
rm -rf /tmp/yixinzhangagent_pages_sync && \
gh repo clone yixinzhangagent/yixinzhangagent.github.io /tmp/yixinzhangagent_pages_sync && \
cp /Users/yixin0909zhang/Downloads/同步空间/resume/academic_homepage/{index.html,styles.css,script.js,citations.bib,.nojekyll,README.md} /tmp/yixinzhangagent_pages_sync/ && \
cd /tmp/yixinzhangagent_pages_sync && \
git status --short && \
git add index.html styles.css script.js citations.bib .nojekyll README.md && \
git commit -m "Update bilingual academic & 60-90d OEM turnkey portal" && \
git push origin main
```

### Local Preview
```bash
python3 -m http.server 8080 --directory /Users/yixin0909zhang/Downloads/同步空间/resume/academic_homepage
# Open http://localhost:8080 (or http://localhost:8080/?lang=zh)
```

---

## 3. Post-Deployment Academic Indexing Checklist

1. **ORCID (`0009-0004-7641-4450`)**: Verified live `Academic Personal Homepage` points to `https://yixinzhangagent.github.io`.
2. **OpenReview (`~Yixin_Zhang33`)**: Link `https://yixinzhangagent.github.io/` under *Personal Links*.
3. **Google Scholar &amp; Semantic Scholar (`2397424547`)**: Set *Homepage* to `https://yixinzhangagent.github.io/` so crawlers index the embedded `citation_*` meta tags and Schema.org `Person` graph.
