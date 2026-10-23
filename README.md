# Yixin Zhang (张益新) — Academic Personal Homepage (`al-folio` / `academicpages` Style)

[![ORCID](https://img.shields.io/badge/ORCID-0009--0004--7641--4450-A6CE39?style=flat-square&logo=orcid&logoColor=white)](https://orcid.org/0009-0004-7641-4450)
[![Semantic Scholar](https://img.shields.io/badge/Semantic_Scholar-2397424547-1857B6?style=flat-square&logo=semanticscholar&logoColor=white)](https://www.semanticscholar.org/author/Yixin-Zhang/2397424547)
[![arXiv](https://img.shields.io/badge/arXiv-2512.05576-B31B1B?style=flat-square&logo=arxiv&logoColor=white)](https://arxiv.org/abs/2512.05576)
[![Hugging Face](https://img.shields.io/badge/Hugging_Face-%40update0909-FFD21E?style=flat-square&logo=huggingface&logoColor=black)](https://huggingface.co/update0909)
[![GDE](https://img.shields.io/badge/Google_Developer_Expert-Machine_Learning-4285F4?style=flat-square&logo=google&logoColor=white)](https://g.dev/updatezhang)

This repository contains the zero-build, publication-grade bilingual (**English + 中文**) academic personal homepage for **Yixin Zhang (张益新)**, Research Scientist at **Yuansiwujie** and **Google Developer Expert (Machine Learning)**.

---

## 1. Included Files & Architecture

| File | Purpose |
|---|---|
| `index.html` | Self-contained bilingual (`EN` / `中文`) academic homepage with **Google Scholar Highwire Press meta tags** (`citation_*`) and **Schema.org `Person` JSON-LD** (`sameAs` disambiguation graph). |
| `styles.css` | Clean `al-folio` / `academicpages` academic typography, responsive grid, and Light / Dark theme variables. |
| `script.js` | Instant language switcher (`?lang=en` / `?lang=zh` + `localStorage`), theme switcher, and interactive `[BibTeX]` citation modal with one-click copy. |
| `citations.bib` | Canonical BibTeX entries for *CureAgent* (`arXiv:2512.05576`), *Proactive Turn-Taking at TRPs*, and *Humanoid Robotics Sim-to-Real Incident Postmortem & Harness*. |
| `_config.yml` | GitHub Pages metadata configuration. |
| `.nojekyll` | Bypasses Jekyll Ruby build delays for instant static asset serving on GitHub Pages. |

---

## 2. One-Command Deployment to GitHub Pages

You can deploy this homepage directly to either **`https://june01.github.io`** (recommended primary research organization/account) or **`https://zyxcambridge.github.io`**.

### Option A: Deploy to `https://june01.github.io` (One Command)

```bash
cd /Users/yixin0909zhang/Downloads/同步空间/resume/academic_homepage && \
git init && \
git checkout -B main && \
git add index.html styles.css script.js citations.bib _config.yml .nojekyll README.md && \
git commit -m "Deploy Yixin Zhang academic homepage (Module M4)" && \
git remote add origin https://github.com/June01/june01.github.io.git && \
git push -u origin main --force
```

### Option B: Deploy to `https://zyxcambridge.github.io` (One Command)

```bash
cd /Users/yixin0909zhang/Downloads/同步空间/resume/academic_homepage && \
git init && \
git checkout -B main && \
git add index.html styles.css script.js citations.bib _config.yml .nojekyll README.md && \
git commit -m "Deploy Yixin Zhang academic homepage (Module M4)" && \
git remote add origin https://github.com/zyxcambridge/zyxcambridge.github.io.git && \
git push -u origin main --force
```

### Local Preview
```bash
python3 -m http.server 8080 --directory /Users/yixin0909zhang/Downloads/同步空间/resume/academic_homepage
# Open http://localhost:8080 (or http://localhost:8080/?lang=zh)
```

---

## 3. Post-Deployment Academic Indexing Checklist

1. **ORCID (`0009-0004-7641-4450`)**: Add `https://june01.github.io` under *Websites & social links* as `Academic Homepage`.
2. **Google Scholar Profile**: Set *Homepage* to `https://june01.github.io` so Google Scholar crawls the embedded `citation_*` meta tags and verifies authorship of `arXiv:2512.05576`.
3. **Semantic Scholar (`2397424547`) & OpenReview**: Add `https://june01.github.io` as your personal homepage URL.
