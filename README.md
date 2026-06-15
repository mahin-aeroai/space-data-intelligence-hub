# 🛰️ Space Data Intelligence Hub

> The complete guide to the global satellite-data ecosystem — from raw telemetry to AI-driven insights.

![Space Data Intelligence Hub](https://img.shields.io/badge/version-2.0-blue?style=flat-square&logo=satellite)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat-square&logo=chartdotjs&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## 🌐 Live Demo

| Page | Description |
|------|-------------|
| [`index.html`](https://mahin-aeroai.github.io/space-data-intelligence-hub/) | Full 16-module learning hub |
| [`architecture.html`](https://mahin-aeroai.github.io/space-data-intelligence-hub/architecture.html) | Standalone architecture visualizer |

---

## ✨ Features

### 📚 Full Learning Hub (`index.html`)
A 16-module educational portal covering the complete satellite data ecosystem:

| Module | Topic |
|--------|-------|
| 01 | Introduction to Space Data |
| 02 | Global Space Ecosystem (ISRO, NASA, ESA, NOAA, private) |
| 03 | Satellite Types & Missions (EO, Weather, Nav, Comm, Scientific) |
| 04 | Space Data Sources (Bhuvan, EarthData, Copernicus, GEE, AWS) |
| 05 | Data Formats (GeoTIFF, HDF5, NetCDF, GeoJSON, GRIB2) |
| 06 | Reading Tools (QGIS, SNAP, ENVI, ArcGIS, Earth Engine) |
| 07 | Python Ecosystem (rasterio, geopandas, xarray, PyTorch) |
| 08 | AI & ML for Satellite Data |
| 09 | End-to-End Processing Pipeline |
| 10 | Report Generation & Products |
| 11 | Career Paths & Salary Ranges |
| 12 | Learning Roadmap (Beginner → Advanced) |
| 13 | Hackathon Guide (ISRO, NASA Space Apps, Copernicus Masters) |
| 14 | Image Library (satellites, launch vehicles, Earth, Moon) |
| 15 | Interactive Knowledge Graph |
| 16 | Searchable Database (orgs, satellites, software, hackathons) |

### 🏗️ Architecture Visualizer (`architecture.html`)
A standalone wow-factor dashboard with:
- **Live orbital mechanics canvas** — 9 satellites (Cartosat-3, Sentinel-2, Landsat-9, NavIC, GPS, Galileo, INSAT-3DR, GOES-18, GSAT-11) orbiting at correct relative speeds
- **End-to-end architecture flow diagram** — 13 nodes from satellite to decision-maker, connected by gradient bezier curves
- **6-stage clickable pipeline** — each stage reveals a 100-word technical deep-dive with technology tags
- **Agency ecosystem cards** — 8 agencies with hover glow and mission tags
- **Chart.js visualizations** — satellite distribution doughnut, AI application bar chart, format score bars
- **Career salary table** — 8 roles with India LPA vs USA $K ranges

---

## 🎨 Design System

```
Deep space dark theme · Glassmorphism cards · Observatory aesthetic
```

| Token | Value | Usage |
|-------|-------|-------|
| `--space-black` | `#020817` | Page background |
| `--space-navy` | `#0f172a` | Sidebar, cards |
| `--accent-blue` | `#4a9eff` | Primary accent, links |
| `--accent-cyan` | `#06b6d4` | Badges, highlights |
| `--accent-purple` | `#a855f7` | Secondary accent |
| `--accent-orange` | `#f97316` | Alerts, hackathons |
| `--accent-green` | `#22c55e` | Success, careers |

**Typography:** Inter / Segoe UI system stack  
**Icons:** Font Awesome 6.5 (Solid + Brands)  
**Charts:** Chart.js 4.4.1  
**Diagrams:** Mermaid.js 10 (ES module)  
**Grid:** Bootstrap 5.3.2

---

## 🚀 Getting Started

### Option 1 — Open locally
```bash
git clone https://github.com/mahin-aeroai/space-data-intelligence-hub.git
cd space-data-intelligence-hub
# Open index.html in your browser — no build step required
open index.html
```

### Option 2 — GitHub Pages (live in 60 seconds)
1. Fork this repo
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)` folder
4. Visit `https://<your-username>.github.io/space-data-intelligence-hub/`

### Option 3 — Python local server (recommended for best performance)
```bash
python -m http.server 8080
# Open http://localhost:8080
```

---

## 📁 Project Structure

```
space-data-intelligence-hub/
│
├── index.html           # 16-module full learning hub (1,240 lines)
├── architecture.html    # Standalone architecture visualizer (542 lines)
├── styles.css           # Shared design system — dark theme (908 lines)
├── script.js            # All interactivity — 14 features (440 lines)
└── README.md            # You are here
```

---

## ⚡ Interactive Features

| Feature | Description |
|---------|-------------|
| 🌟 Star canvas | 260-star animated field with twinkle + drift |
| 🛰️ Live orbits | Real-time LEO/MEO/GEO animation via canvas |
| 🏗️ Architecture graph | Bezier flow diagram — 13 nodes, 17 edges |
| 🔍 Global search | 80+ indexed items — satellites, agencies, formats, tools |
| 📊 Chart.js charts | Doughnut, bar, stacked bar, format score bars |
| 🕸️ Knowledge graph | Force-directed physics simulation — drag to explore |
| 🗂️ Tab system | Satellite types, image gallery, database tabs |
| 🔎 Table filter | Live search across data sources and database tables |
| 📱 Responsive | Mobile sidebar overlay, responsive grid breakpoints |
| 🖨️ Print / PDF | Clean print stylesheet, `window.print()` export |
| ✨ Entrance animations | IntersectionObserver scroll-triggered fade-in |
| 🔼 Back-to-top | Appears after 400px scroll |

---

## 📡 Data Coverage

| Category | Count |
|----------|-------|
| Satellite profiles (with specs) | 17 |
| Space agencies & companies | 17 |
| Data sources / portals | 15 |
| Data formats documented | 12 |
| Software tools | 12 |
| Python libraries | 14 |
| AI/ML applications | 6 |
| Career roles profiled | 8 |
| Hackathons listed | 8 |
| Knowledge graph nodes | 21 |

---

## 🛠️ Tech Stack

```
Frontend only — zero backend, zero build tools, zero dependencies to install
```

| Library | Version | CDN |
|---------|---------|-----|
| Bootstrap | 5.3.2 | cdnjs.cloudflare.com |
| Font Awesome | 6.5.0 | cdnjs.cloudflare.com |
| Chart.js | 4.4.1 | cdnjs.cloudflare.com |
| Mermaid.js | 10 (ES module) | cdn.jsdelivr.net |

All external resources load from CDN — no npm, no webpack, no Node.js.

---

## 🎓 Who Is This For?

| Audience | Use Case |
|----------|----------|
| **Engineering students** | Learn satellite data concepts and career paths |
| **Aerospace engineers** | Reference for data formats, pipelines, tools |
| **GIS analysts** | Discover data sources and processing workflows |
| **ML engineers** | Understand EO applications for AI/deep learning |
| **Hackathon teams** | ISRO/NASA Space Apps prep — data sources, 72-hr playbook |
| **Researchers** | Quick reference for agency portals and datasets |

---

## 📸 Key Sections Preview

### 🛰️ Satellite Types Covered
- **Earth Observation:** Cartosat-3, Resourcesat-2A, Oceansat-3, RISAT-1A, Sentinel-2, Landsat-9
- **Weather:** INSAT-3DR, Meteosat-12, GOES-18
- **Navigation:** NavIC, GPS Block IIF, Galileo
- **Communication:** GSAT-11, Intelsat-39
- **Scientific:** Chandrayaan-3, Aditya-L1, JWST, Mangalyaan

### 🌍 Agencies Covered
India: ISRO, NRSC, SAC, IN-SPACe, NSIL  
USA: NASA, NOAA, USGS  
Europe/Japan/Canada: ESA, EUMETSAT, JAXA, CSA  
Private: SpaceX, Planet Labs, Maxar, ICEYE, BlackSky

### 💼 Career Salary Ranges (India)
| Role | Range |
|------|-------|
| AI/ML Engineer (Space) | ₹10–40 LPA |
| Data Scientist (EO) | ₹8–30 LPA |
| Aerospace Engineer | ₹6–25 LPA |
| GIS Analyst | ₹4–15 LPA |

---

## 🤝 Contributing

Contributions welcome! To add a satellite, agency, data source, or career role:

1. Fork the repo
2. Edit the relevant section in `index.html`
3. Add the item to the search index in `script.js` (the `idx` array)
4. Submit a pull request with a brief description

**Please keep all additions factually accurate with citations where possible.**

---

## 📜 License

MIT License — free to use, modify, and distribute with attribution.

---

## 🙏 Data Credits

All satellite data, imagery, and specifications are credited to their respective agencies:

- **ISRO** — isro.gov.in
- **NASA** — nasa.gov / earthdata.nasa.gov
- **ESA** — esa.int / copernicus.eu
- **NOAA** — noaa.gov
- **USGS** — usgs.gov / earthexplorer.usgs.gov
- **EUMETSAT** — eumetsat.int
- **JAXA** — jaxa.jp

Images sourced from Wikimedia Commons (public domain / CC-BY).

---

## 👤 Author

**Mahin** — B.Tech Aerospace Engineering (VIT Bhopal) · PG Certificate AI & ML (IIIT Hyderabad × Accenture)  
GitHub: [@mahin-aeroai](https://github.com/mahin-aeroai)

---

<div align="center">
  <sub>Built for students, researchers, aerospace engineers, GIS analysts, and hackathon teams.</sub>
  <br/>
  <sub>⭐ Star this repo if it helped you!</sub>
</div>
