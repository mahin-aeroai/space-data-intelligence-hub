/* ═══════════════════════════════════════════════════
   PHASE 2 JS — Space Data Intelligence Hub
   ═══════════════════════════════════════════════════ */
'use strict';

/* ── SENSOR DATA ── */
const SENSORS=[
  {name:'Multispectral Sensor',icon:'🌈',type:'Optical Passive',col:'#4a9eff',res:'1–30 m',
   desc:'Captures reflected sunlight across 4–13 discrete spectral bands (Blue/Green/Red/NIR/SWIR). The industry workhorse for land monitoring.',
   examples:['Sentinel-2 MSI (13 bands, 10m)','Landsat-9 OLI (9 bands, 15-30m)','Cartosat-3 MX (1m)','MODIS (36 bands, 250m-1km)'],
   apps:['Land cover classification','Vegetation health (NDVI/EVI)','Water body mapping','Agricultural monitoring','Change detection'],
   pros:['Well-established algorithms','Open data widely available','Multi-temporal time series'],
   cons:['Cloud interference','Atmospheric correction needed','No night capability']},
  {name:'Hyperspectral Sensor',icon:'🔬',type:'Optical Passive',col:'#a855f7',res:'5–30 m',
   desc:'200–400 contiguous narrow spectral bands enabling unique material fingerprinting — the "spectrometer in the sky" for mineral and chemical identification.',
   examples:['PRISMA (ASI, 250 bands)','DESIS (DLR on ISS)','AVIRIS-NG (NASA airborne)','HySI (ISRO Chandrayaan-1)'],
   apps:['Mineral and rock type mapping','Precision agriculture (crop stress)','Pollution plume detection','Oil spill characterization','Military target discrimination'],
   pros:['Unique material identification','Subtle spectral differences detectable'],
   cons:['Huge data volumes (100x multispectral)','Complex processing','High instrument cost']},
  {name:'SAR (Synthetic Aperture Radar)',icon:'📡',type:'Microwave Active',col:'#06b6d4',res:'0.25–100 m',
   desc:'Emits coherent microwave pulses and measures backscatter amplitude and phase — works day/night, through all clouds and rain. Band determines penetration depth.',
   examples:['Sentinel-1 C-band (5m IW mode)','RISAT-1A C-band (1m spotlight)','ALOS-4 L-band (3m)','ICEYE X-band (0.25m)'],
   apps:['Flood inundation mapping (all-weather)','Crop type and soil moisture','Urban subsidence (InSAR mm-level)','Ship detection at sea','Forest biomass (L-band)'],
   pros:['All-weather, day & night','Penetrates vegetation (L/P band)','Phase enables mm-level deformation'],
   cons:['Speckle noise complicates interpretation','Complex geometrical distortions','Phase unwrapping algorithms required']},
  {name:'LiDAR',icon:'💡',type:'Optical Active',col:'#22c55e',res:'0.1–2 m vertical',
   desc:'Emits laser pulses at 532nm or 1064nm and measures precise return timing to generate 3D point clouds with centimetre-level vertical accuracy.',
   examples:['ICESat-2 (NASA, 532nm, global)','GEDI (NASA, on ISS)','Airborne LiDAR surveys (Riegl)','Terrestrial LiDAR (Leica)'],
   apps:['High-accuracy DEM generation','Forest canopy height and structure','Building and infrastructure 3D','Coastal erosion monitoring','Powerline inspection'],
   pros:['Centimetre vertical accuracy','3D structure information','Penetrates vegetation to ground'],
   cons:['Very high system cost','Weather-sensitive (fog/rain)','Small swath (airborne)','Limited satellite coverage']},
  {name:'Thermal Infrared Sensor',icon:'🔥',type:'Optical Passive',col:'#f97316',res:'30–1000 m',
   desc:'Detects longwave thermal radiation emitted from Earth\'s surface (8–14 μm). Temperature differences of 0.1°C detectable at 100m resolution.',
   examples:['Landsat-9 TIRS-2 (100m)','MODIS Bands 31-32 (1km)','INSAT-3DR Imager (4km)','ECOSTRESS (70m, on ISS)'],
   apps:['Land surface temperature mapping','Urban heat island analysis','Forest fire active hotspot detection','Drought and crop stress monitoring','Volcano thermal mapping'],
   pros:['Night-time operation possible','Direct temperature measurement','Fire detection through smoke'],
   cons:['Lower spatial resolution than VIS','Cloud interference','Complex atmospheric correction']},
  {name:'Microwave Radiometer',icon:'📻',type:'Microwave Passive',col:'#f59e0b',res:'5–50 km',
   desc:'Passively measures naturally emitted microwave radiation (1–90 GHz). Sensitive to liquid water, ice, and moisture — large footprint but all-weather.',
   examples:['AMSR-2 (JAXA, 89 GHz)','SMOS (ESA, L-band)','GPM Microwave Imager','OSCAT-3 (ISRO Oceansat-3)'],
   apps:['Soil moisture (global daily)','Sea ice extent and concentration','Precipitation estimation','Snow water equivalent','Ocean surface wind speed'],
   pros:['Cloud penetration','Daily global coverage','Long wavelength soil penetration'],
   cons:['Coarse spatial resolution','Radio frequency interference (RFI)','Complex retrieval algorithms']},
  {name:'Ocean Color Sensor',icon:'🌊',type:'Optical Passive',col:'#06b6d4',res:'250m–1km',
   desc:'High-sensitivity radiometer measuring water-leaving radiance in narrow visible/NIR bands to retrieve biological and biogeochemical ocean properties.',
   examples:['OCM-3 (ISRO Oceansat-3, 360m)','MODIS Aqua (250m)','Sentinel-3 OLCI (300m)','PACE OCI (NASA, 2024)'],
   apps:['Chlorophyll-a and phytoplankton','Harmful algal bloom (HAB) detection','Sediment and turbidity mapping','Fisheries potential zone prediction','Ocean carbon cycle monitoring'],
   pros:['Biological parameter retrieval','Wide swath (1400km)','Fisheries resource management'],
   cons:['Clear, calm water preferred','Sun glint contamination','Atmospheric correction critical']},
  {name:'Scatterometer',icon:'🌬️',type:'Microwave Active',col:'#a855f7',res:'12.5–50 km',
   desc:'Emits microwave pulses at multiple incidence angles to measure ocean surface roughness, which is directly related to near-surface wind speed and direction.',
   examples:['OSCAT-3 (ISRO, Ku-band)','ASCAT (EUMETSAT, C-band)','RapidScat (NASA, retired)','HSCAT (HY-2B, China)'],
   apps:['Ocean wind vector retrieval','Cyclone track and intensity monitoring','Sea state for shipping','Antarctic ice dynamics','Large-scale climate monitoring'],
   pros:['All-weather wind retrieval','Global ocean coverage daily','Cyclone warning support'],
   cons:['Coarse resolution (25km)','Wind ambiguity removal needed','Limited in coastal zones']}
];

/* ── PROJECTS DATA ── */
const PROJECTS=[
  {num:'01',title:'NDVI Vegetation Health Analysis',icon:'🌿',col:'#22c55e',
   desc:'Calculate the Normalized Difference Vegetation Index from Sentinel-2 or Landsat-9 imagery to assess vegetation health, drought stress, and seasonal change.',
   dataset:'Sentinel-2 L2A (Band 4 Red + Band 8 NIR) from Copernicus Hub or Earth Engine',
   tools:['Python','rasterio','numpy','matplotlib','earthpy'],difficulty:'Beginner',time:'4–6 hours',
   steps:['Download Sentinel-2 L2A product for your AOI from Copernicus Open Access Hub','Stack Band 4 (665nm) and Band 8 (842nm) using rasterio','Calculate NDVI = (NIR − Red) / (NIR + Red + 1e-10)','Apply colour ramp: red (stressed) → yellow → green (healthy)','Clip to study area boundary using geopandas','Export GeoTIFF and visualize with matplotlib'],
   code:`<span class="kw">import</span> rasterio, numpy <span class="kw">as</span> np, matplotlib.pyplot <span class="kw">as</span> plt\n<span class="cm"># Open Sentinel-2 Band 4 (Red) and Band 8 (NIR)</span>\n<span class="kw">with</span> rasterio.open(<span class="st">'S2_B04.tif'</span>) <span class="kw">as</span> src: red = src.read(<span class="num">1</span>).astype(<span class="st">'float32'</span>)\n<span class="kw">with</span> rasterio.open(<span class="st">'S2_B08.tif'</span>) <span class="kw">as</span> src: nir = src.read(<span class="num">1</span>).astype(<span class="st">'float32'</span>)\nndvi = (nir - red) / (nir + red + <span class="num">1e-10</span>)\nplt.imshow(ndvi, cmap=<span class="st">'RdYlGn'</span>, vmin=-<span class="num">1</span>, vmax=<span class="num">1</span>); plt.colorbar(); plt.show()`,
   output:'NDVI map with value range −1 to +1; dense vegetation > 0.6, bare soil ~0.1, water < 0'},

  {num:'02',title:'SAR Flood Mapping',icon:'🌊',col:'#06b6d4',
   desc:'Use Sentinel-1 C-band SAR coherence change detection to map flood inundation — SAR penetrates clouds, enabling rapid disaster response.',
   dataset:'Sentinel-1 GRD IW mode (VV polarization) pre/post-flood from Copernicus',
   tools:['Python','SNAP (ESA)','snapista','numpy','shapely'],difficulty:'Intermediate',time:'1–2 days',
   steps:['Download Sentinel-1 GRD scenes: pre-flood and post-flood','Apply SNAP graph: Calibration → Speckle Filter (Lee 5×5) → Terrain Correction','Export Sigma0_VV bands as GeoTIFF','Compute ratio: post/pre — flooded areas appear bright','Apply threshold (0.5 dB) to create binary flood mask','Vectorize mask and calculate inundated area in hectares'],
   code:`<span class="kw">import</span> numpy <span class="kw">as</span> np, rasterio\n<span class="kw">with</span> rasterio.open(<span class="st">'pre_VV.tif'</span>) <span class="kw">as</span> f: pre = f.read(<span class="num">1</span>)\n<span class="kw">with</span> rasterio.open(<span class="st">'post_VV.tif'</span>) <span class="kw">as</span> f: post = f.read(<span class="num">1</span>)\nratio = <span class="num">10</span> * np.log10(post / (pre + <span class="num">1e-10</span>))\nflood_mask = (ratio < -<span class="num">3</span>).astype(np.uint8)\n<span class="cm"># Pixels where backscatter dropped > 3dB = flooded</span>`,
   output:'Binary flood mask GeoTIFF + vector shapefile with total inundated area statistics'},

  {num:'03',title:'Forest Fire Hotspot Detection',icon:'🔥',col:'#ef4444',
   desc:'Detect active fire hotspots using MODIS or VIIRS thermal anomaly products, then predict high-risk zones using ML on NDVI + land cover + historical data.',
   dataset:'MODIS MCD14ML active fire product (NASA FIRMS) + Sentinel-2 NDVI + DEM',
   tools:['Python','pandas','scikit-learn','folium','earthaccess'],difficulty:'Intermediate',time:'1–2 days',
   steps:['Download NASA FIRMS CSV for your region (last 7 days)','Load fire points and create spatial density map','Fetch Sentinel-2 NDVI and land cover rasters','Build feature matrix: NDVI, slope, aspect, land cover, drought index','Train Random Forest classifier on historical fire data','Predict risk map and visualize on Folium interactive map'],
   code:`<span class="kw">import</span> pandas <span class="kw">as</span> pd; <span class="kw">from</span> sklearn.ensemble <span class="kw">import</span> RandomForestClassifier\ndf = pd.read_csv(<span class="st">'MODIS_fire.csv'</span>)\nfeatures = [<span class="st">'ndvi'</span>, <span class="st">'slope'</span>, <span class="st">'aspect'</span>, <span class="st">'lc_code'</span>, <span class="st">'drought_idx'</span>]\nX = df[features]; y = df[<span class="st">'fire_occurred'</span>]\nrf = RandomForestClassifier(n_estimators=<span class="num">200</span>, random_state=<span class="num">42</span>)\nrf.fit(X, y); <span class="cm"># 91% accuracy on test set</span>`,
   output:'Fire risk probability map (0–1) + active hotspot locations on interactive Folium map'},

  {num:'04',title:'Urban Growth Detection',icon:'🏙️',col:'#f97316',
   desc:'Map urban expansion over 10–20 years using multi-temporal Landsat imagery. Use Random Forest land cover classification and change vector analysis.',
   dataset:'Landsat 5/7/8/9 collection (1990–2024) from USGS Earth Explorer or GEE',
   tools:['Python','Google Earth Engine','geemap','scikit-learn','matplotlib'],difficulty:'Intermediate',time:'2–3 days',
   steps:['Access Landsat image collection for 3 epochs (2000, 2010, 2024) in GEE','Apply cloud masking (Fmask) and compute spectral indices (NDVI, NDBI, NDWI)','Collect training samples for 5 classes: Urban/Vegetation/Water/Bare/Cropland','Train Random Forest classifier on each epoch','Map land cover change from epoch 1 → 3 using transition matrix','Quantify urban area growth in km² and annual rate'],
   code:`<span class="kw">import</span> ee, geemap\nee.Initialize()\nlandsat = ee.ImageCollection(<span class="st">'LANDSAT/LC09/C02/T1_L2'</span>)\n  .filterDate(<span class="st">'2023-01-01'</span>,<span class="st">'2024-01-01'</span>)\n  .filterBounds(aoi).median()\nndbi = landsat.normalizedDifference([<span class="st">'SR_B6'</span>,<span class="st">'SR_B5'</span>]).rename(<span class="st">'NDBI'</span>)`,
   output:'Land cover maps for 3 time periods + change matrix + urban growth rate chart'},

  {num:'05',title:'Crop Type Classification',icon:'🌾',col:'#22c55e',
   desc:'Classify paddy, wheat, sugarcane, and cotton using multi-temporal Sentinel-2 time series and an LSTM neural network on seasonal NDVI profiles.',
   dataset:'Sentinel-2 L2A time series (12 months) + ground truth crop field boundaries',
   tools:['Python','PyTorch','rasterio','geopandas','sklearn'],difficulty:'Advanced',time:'3–5 days',
   steps:['Download monthly Sentinel-2 composites for crop season (Kharif/Rabi)','Extract NDVI/EVI/NDWI time series for each field polygon','Build temporal feature matrix: 12 monthly values × 4 indices = 48 features','Design LSTM: input 12 timesteps × 4 features → 4 crop classes','Train on 80% fields, validate on 20% → target >90% accuracy','Map crop types for the entire district/state'],
   code:`<span class="kw">import</span> torch; <span class="kw">from</span> torch <span class="kw">import</span> nn\n<span class="kw">class</span> CropLSTM(nn.Module):\n  <span class="kw">def</span> __init__(self):\n    super().__init__()\n    self.lstm = nn.LSTM(<span class="num">4</span>, <span class="num">64</span>, num_layers=<span class="num">2</span>, batch_first=<span class="kw">True</span>)\n    self.fc = nn.Linear(<span class="num">64</span>, <span class="num">4</span>)  <span class="cm"># 4 crop classes</span>\n  <span class="kw">def</span> forward(self, x):\n    out, _ = self.lstm(x); <span class="kw">return</span> self.fc(out[:, -<span class="num">1</span>, :])`,
   output:'Crop type classification map + confusion matrix + per-class accuracy report'},

  {num:'06',title:'Ship Detection with YOLOv8',icon:'🚢',col:'#a855f7',
   desc:'Detect and count ships in satellite imagery using a fine-tuned YOLOv8 model trained on the SAR-Ship or DOTA-v2 dataset.',
   dataset:'SAR-Ship dataset (2,000 Sentinel-1 SAR chips) or Airbus Ship Detection (Kaggle)',
   tools:['Python','ultralytics (YOLOv8)','rasterio','cv2','matplotlib'],difficulty:'Advanced',time:'2–4 days',
   steps:['Download SAR-Ship dataset with bounding box annotations','Preprocess SAR images: dB conversion + 0–255 scaling + speckle filter','Split dataset: 80% train / 10% val / 10% test','Fine-tune YOLOv8n on ship class for 100 epochs','Evaluate: mAP@50 target > 0.85','Run inference on new Sentinel-1 scenes + visualize detections'],
   code:`<span class="kw">from</span> ultralytics <span class="kw">import</span> YOLO\nmodel = YOLO(<span class="st">'yolov8n.pt'</span>)\nresults = model.train(data=<span class="st">'ship.yaml'</span>, epochs=<span class="num">100</span>, imgsz=<span class="num">640</span>, batch=<span class="num">16</span>)\n<span class="cm"># Inference on new SAR scene</span>\npreds = model.predict(<span class="st">'sentinel1_scene.png'</span>, conf=<span class="num">0.5</span>)\npreds[<span class="num">0</span>].save(<span class="st">'ship_detections.jpg'</span>)`,
   output:'Bounding box predictions on SAR scene + ship count per image + mAP evaluation report'},

  {num:'07',title:'Building Footprint Extraction',icon:'🏗️',col:'#f59e0b',
   desc:'Extract building footprints from very-high-resolution imagery using a U-Net semantic segmentation model trained on SpaceNet or Microsoft Building Footprints.',
   dataset:'SpaceNet v2 (0.5m RGB) or Open Cities AI Challenge (Maxar WorldView)',
   tools:['Python','PyTorch','segmentation_models_pytorch','albumentations','rasterio'],difficulty:'Advanced',time:'4–7 days',
   steps:['Download SpaceNet AOI + GeoJSON building footprint labels','Create binary mask (building=1, background=0) from GeoJSON polygons','Patch extraction: 256×256 tiles with 50% overlap','Build U-Net (ResNet-34 encoder) with sigmoid output','Train with BCE + Dice loss, augmentations: flip/rotate/brightness','Post-process: remove small objects, smooth boundaries, vectorize'],
   code:`<span class="kw">import</span> segmentation_models_pytorch <span class="kw">as</span> smp\nmodel = smp.Unet(\n  encoder_name=<span class="st">'resnet34'</span>,\n  encoder_weights=<span class="st">'imagenet'</span>,\n  in_channels=<span class="num">3</span>,\n  classes=<span class="num">1</span>,  <span class="cm"># building / no-building</span>\n)\nloss = smp.losses.DiceLoss(mode=<span class="st">'binary'</span>) + smp.losses.SoftBCEWithLogitsLoss()\n<span class="cm"># IoU target: >0.75 on SpaceNet Vegas</span>`,
   output:'Building polygon shapefile + IoU/F1 metrics + visualization overlaid on RGB imagery'}
];

/* ── AI AEROSPACE DATA ── */
const AI_AERO=[
  {icon:'🛰️',col:'rgba(74,158,255,.12)',bdr:'rgba(74,158,255,.2)',title:'AI in Satellites (On-Board)',
   desc:'Edge AI chips on satellites (NVIDIA Jetson, Xilinx Versal) process imagery on-orbit, transmitting only results — reducing downlink by 90%. Planet\'s Pelican constellation uses on-orbit ML.',
   algos:['Lightweight CNN','MobileNetV3','TensorFlow Lite','ONNX Runtime'],
   orgs:'Planet Labs · Spire · D-Orbit · phi-sat-2 (ESA)'},
  {icon:'🚁',col:'rgba(168,85,247,.12)',bdr:'rgba(168,85,247,.2)',title:'Autonomous UAV Navigation',
   desc:'Deep reinforcement learning enables UAVs to navigate GPS-denied environments, avoid obstacles, and complete missions autonomously using visual odometry and SLAM.',
   algos:['PPO/SAC RL','Visual SLAM','YOLO detection','ORB-SLAM3'],
   orgs:'Skydio · Zipline · Wing (Google) · ideaForge'},
  {icon:'🔮',col:'rgba(6,182,212,.12)',bdr:'rgba(6,182,212,.2)',title:'Mission Planning AI',
   desc:'Genetic algorithms and reinforcement learning optimize satellite observation schedules, contact windows, and manoeuvre sequences — maximizing science return per orbit.',
   algos:['Genetic Algorithms','RL (PPO)','Integer Programming','Constraint Satisfaction'],
   orgs:'ESA ESOC · NASA JPL · Airbus DS · Palantir'},
  {icon:'🌡️',col:'rgba(249,115,22,.12)',bdr:'rgba(249,115,22,.2)',title:'Satellite Health Monitoring',
   desc:'Anomaly detection models monitor 1000s of telemetry parameters in real-time — flagging battery degradation, attitude control anomalies, or payload faults before they become critical.',
   algos:['Isolation Forest','LSTM Autoencoder','One-class SVM','Transformer'],
   orgs:'ISRO ISTRAC · Intelsat · ESA ESOC · In-Space Missions'},
  {icon:'🌍',col:'rgba(34,197,94,.12)',bdr:'rgba(34,197,94,.2)',title:'AI Weather Forecasting',
   desc:'Huawei Pangu-Weather and Google DeepMind\'s GraphCast outperform ECMWF IFS at 1–14 day forecasts with 1000× speedup, trained entirely on 40 years of ERA5 reanalysis.',
   algos:['Graph Neural Network','Vision Transformer','FourCastNet','Diffusion Model'],
   orgs:'DeepMind · Huawei · NVIDIA · ECMWF · NCMRWF'},
  {icon:'🌌',col:'rgba(245,158,11,.12)',bdr:'rgba(245,158,11,.2)',title:'Space Situational Awareness',
   desc:'AI tracks 27,000+ debris objects, predicts conjunction events, and autonomously recommends collision avoidance manoeuvres — critical as constellation density increases.',
   algos:['LSTM (orbit propagation)','GNN (conjunction)','CV (optical tracking)','RL (avoidance)'],
   orgs:'18th Space Control Sqn · LeoLabs · Slingshot · ESA Space Debris Office'},
  {icon:'🔭',col:'rgba(239,68,68,.12)',bdr:'rgba(239,68,68,.2)',title:'AI in Astronomy / JWST',
   desc:'Convolutional networks classify galaxy morphologies, detect transient events, identify exoplanet candidates in light curves — processing data volumes no human team could manage.',
   algos:['ResNet galaxy classifier','Random Forest transient','CNN exoplanet transit','VAE anomaly'],
   orgs:'NASA GSFC · STScI · ESA · AstroML community'},
  {icon:'🏭',col:'rgba(148,163,184,.12)',bdr:'rgba(148,163,184,.15)',title:'Predictive Maintenance',
   desc:'ML models trained on historical telemetry predict component failures in ground systems, launch vehicles, and spacecraft — shifting from reactive to predictive maintenance.',
   algos:['XGBoost failure prediction','LSTM degradation','Bayesian survival models'],
   orgs:'ISRO · HAL · Airbus · Boeing · Thales Alenia · SpaceX'}
];

/* ── HACKATHON DATA ── */
const HACK_THEMES=[
  {icon:'🔥',name:'Forest Fire Detection',year:'SIH 2023',data:'MODIS FIRMS + Sentinel-2 NDVI + DEM',challenge:'Early warning 14 days before ignition using time-series anomaly'},
  {icon:'🌊',name:'Flood Monitoring',year:'ISRO Hackathon 2022',data:'Sentinel-1 SAR + INSAT-3D rainfall + DEM',challenge:'24-hour flood extent mapping through cloud cover'},
  {icon:'🌙',name:'Lunar Crater Mapping',year:'ISRO Space Hackathon 2020',data:'Chandrayaan-2 TMC-2 ortho images + OHRC',challenge:'Automated sub-km crater detection for safe landing site selection'},
  {icon:'🌤️',name:'Cloud Motion Prediction',year:'SIH 2022',data:'INSAT-3D/3DR imagery (30-min intervals)',challenge:'6-hour cloud vector extrapolation for cyclone track forecasting'},
  {icon:'🌱',name:'Crop Acreage Estimation',year:'ISRO Hackathon 2019',data:'Resourcesat AWiFS + Kharif crop calendar',challenge:'State-level acreage for 5 crops with <5% error vs FASAL programme'},
  {icon:'🏙️',name:'Urban Sprawl Analysis',year:'SIH 2021',data:'Cartosat-3 + Landsat-8 time series',challenge:'Map 10-year urban growth for 50 Indian cities to support master planning'},
  {icon:'🐟',name:'Fish Potential Zone Prediction',year:'ISRO Hackathon 2018',data:'Oceansat OCM chlorophyll + SST + wind',challenge:'Daily 48-hour potential fishing zone advisory for 5 Indian ocean regions'},
  {icon:'🌧️',name:'Rainfall Estimation',year:'SIH 2020',data:'INSAT-3D + GPM DPR + rain gauge network',challenge:'1-hour flash flood rainfall nowcasting at 1km resolution'}
];

const HACK_JUDGING=[
  {label:'Technical Innovation',pct:25},{label:'Problem Understanding',pct:20},
  {label:'Working Prototype',pct:20},{label:'Scalability & Impact',pct:15},
  {label:'Data Usage Quality',pct:10},{label:'Presentation & Demo',pct:10}
];

const HACK_MISTAKES=[
  {title:'Ignoring the data',text:'Teams jump to ML without exploring the provided satellite datasets. Always EDA first — understand resolution, coverage, and formats.'},
  {title:'Overly complex architecture',text:'A 5-layer CNN that barely runs beats a fancy Transformer that crashes during demo. Reliability > complexity for judges.'},
  {title:'No baseline comparison',text:'Show that your AI does better than a simple threshold rule. Judges need a performance reference to evaluate your improvement.'},
  {title:'Missing geographic context',text:'Never present results without a map. ISRO judges expect spatial outputs. Show your predictions on a map of India.'},
  {title:'Last-minute deployment',text:'If your demo crashes, your score crashes. Deploy to Streamlit/HuggingFace Spaces 12 hours before submission and test it.'},
  {title:'Weak problem statement slide',text:'Spend 30% of your presentation on WHY this problem matters. Quantify the impact — annual losses, affected population, area burned.'}
];

const HACK_CASES=[
  {title:'Team AgroSat — Winner SIH 2023',org:'IIT Bombay',problem:'Paddy crop damage from floods in Odisha',approach:'Sentinel-1 SAR change detection + Resourcesat LULC for crop mask. Estimated 2.3L hectares flooded paddy in 4 hours post-event.',stack:['Sentinel-1 GRD','SNAP processing','Python change detection','Streamlit dashboard'],result:'1st Place — ₹1 Lakh + NRSC Internship'},
  {title:'Team SkyWatch — ISRO Hackathon 2022',org:'IIIT Hyderabad',problem:'Real-time forest fire risk forecasting',approach:'Multi-source fusion: MODIS active fire + NDVI time series + meteorological data → XGBoost risk model with 91% accuracy. SMS alert system for 1000 forest blocks.',stack:['MODIS FIRMS','Sentinel-2 NDVI','XGBoost','FastAPI','SMS gateway'],result:'2nd Place + FSI Collaboration MoU'},
  {title:'Team LunarAI — ISRO Space Hackathon 2020',org:'VIT Vellore',problem:'Automated safe landing site selection for Chandrayaan-4',approach:'U-Net segmentation on TMC-2 images to detect craters and boulders. Generated slope and roughness maps from OHRC stereo DEM for Malapert region.',stack:['Chandrayaan-2 TMC-2','PyTorch U-Net','GDAL DEM','3D visualization'],result:'1st Place — ₹50K + ISAC Project Internship'},
  {title:'Team WeatherML — SIH 2022',org:'BITS Pilani',problem:'Cyclone track prediction from INSAT-3DR',approach:'ConvLSTM on 48-hour INSAT-3DR IR sequences predicting cyclone centre lat/lon at 6/12/24h. Outperformed IMD statistical model at 24h range.',stack:['INSAT-3DR Level-1B','ConvLSTM (PyTorch)','NWP verification','Flask API'],result:'Winner Track B — IMD Collaboration + Publication in MAUSAM'}
];

const HACK_TEMPLATES=[
  {icon:'📋',name:'Problem Analysis Template',desc:'Structured framework to decompose hackathon problem statements — stakeholders, data gaps, success metrics'},
  {icon:'🏗️',name:'Technical Architecture Doc',desc:'1-page system design template: data flow, model pipeline, deployment, scalability considerations'},
  {icon:'👥',name:'Team Role Assignment Sheet',desc:'Role definitions, responsibility matrix, and communication protocol for 4–5 member teams'},
  {icon:'📊',name:'Judging Scorecard',desc:'Self-assessment checklist aligned to ISRO judging criteria — use before final submission'},
  {icon:'🎯',name:'Demo Script Template',desc:'7-minute presentation script: problem (2m) + solution (3m) + demo (1.5m) + impact (0.5m)'},
  {icon:'📁',name:'GitHub Repo Template',desc:'README template, folder structure, requirements.txt, and Streamlit app boilerplate for quick deployment'}
];

/* ── SOFTWARE DB ── */
const SW_DB=[
  {name:'QGIS 3.x',cat:'GIS Desktop',lic:'Free/GPL',platform:'Win/Mac/Linux',str:'1000+ plugins, vector/raster, PostGIS',url:'qgis.org'},
  {name:'ArcGIS Pro',cat:'GIS Desktop',lic:'Commercial',platform:'Windows',str:'Industry standard, 3D, ModelBuilder',url:'esri.com'},
  {name:'SNAP 9',cat:'Remote Sensing',lic:'Free (ESA)',platform:'Win/Mac/Linux',str:'Sentinel SAR+optical, InSAR processing',url:'step.esa.int'},
  {name:'ENVI 5.7',cat:'Remote Sensing',lic:'Commercial',platform:'Win/Mac/Linux',str:'Hyperspectral, target detection, SPEAR',url:'nv5geospatialsoftware.com'},
  {name:'ERDAS Imagine',cat:'Remote Sensing',lic:'Commercial',platform:'Windows',str:'Photogrammetry, LiDAR, ortho workflow',url:'hexagon.com'},
  {name:'Google Earth Engine',cat:'Cloud Platform',lic:'Free (Research)',platform:'Web/Python',str:'Petabyte EO, global analysis at scale',url:'earthengine.google.com'},
  {name:'Microsoft Planetary Computer',cat:'Cloud Platform',lic:'Free',platform:'Web/Python',str:'STAC, JupyterHub, Landsat/Sentinel/ERA5',url:'planetarycomputer.microsoft.com'},
  {name:'GMAT 2023a',cat:'Astrodynamics',lic:'Free (NASA)',platform:'Win/Mac/Linux',str:'Mission design, orbit propagation, manoeuvres',url:'gmatcentral.org'},
  {name:'STK 12',cat:'Mission Analysis',lic:'Commercial',platform:'Windows',str:'Coverage, link budget, sensor modelling',url:'agi.com'},
  {name:'Jupyter Lab',cat:'IDE/Notebook',lic:'Free',platform:'Web',str:'Interactive Python notebooks, extensions',url:'jupyter.org'},
  {name:'MATLAB R2024a',cat:'Scientific',lic:'Commercial',platform:'Win/Mac/Linux',str:'Simulink, aerospace toolboxes, algorithms',url:'mathworks.com'},
  {name:'GDAL/OGR',cat:'Library',lic:'Free/MIT',platform:'All',str:'Universal raster/vector translation, 160+ formats',url:'gdal.org'},
  {name:'Xilinx Vivado ML',cat:'FPGA Design',lic:'Free/Commercial',platform:'Win/Linux',str:'VHDL/Verilog synthesis, timing closure',url:'xilinx.com'},
  {name:'ArduPilot / PX4',cat:'UAV GCS',lic:'Free/GPL',platform:'All',str:'Autopilot firmware, Mission Planner, MAVLink',url:'ardupilot.org'}
];

/* ══════════════════════════════════════════════════
   RENDER FUNCTIONS
══════════════════════════════════════════════════ */

/* Sensors */
function renderSensors(){
  const grid=document.getElementById('sensorGrid'); if(!grid) return;
  grid.innerHTML=SENSORS.map(s=>`
    <div class="col-lg-6 col-xl-4">
      <div class="sensor-card">
        <div class="sensor-header">
          <div class="sensor-icon" style="background:${s.col}18;border:1px solid ${s.col}30">${s.icon}</div>
          <div>
            <div style="font-size:.95rem;font-weight:700;color:var(--text-primary)">${s.name}</div>
            <span class="sensor-type-badge" style="color:${s.col};border-color:${s.col}40;background:${s.col}10">${s.type}</span>
            <div style="font-size:.72rem;color:var(--text-dim);margin-top:2px">Resolution: ${s.res}</div>
          </div>
        </div>
        <div class="sensor-body">
          <p>${s.desc}</p>
          <div class="sensor-section-title">Satellite Examples</div>
          <div style="font-size:.78rem;color:var(--accent-blue);margin-bottom:10px">${s.examples.map(e=>`• ${e}`).join('<br/>')}</div>
          <div class="sensor-section-title">Applications</div>
          <div class="sensor-tags">${s.apps.map(a=>`<span class="sensor-tag">${a}</span>`).join('')}</div>
          <div class="sensor-pros-cons">
            <div class="pros-col"><strong>Advantages</strong><ul>${s.pros.map(p=>`<li>${p}</li>`).join('')}</ul></div>
            <div class="cons-col"><strong>Limitations</strong><ul>${s.cons.map(c=>`<li>${c}</li>`).join('')}</ul></div>
          </div>
        </div>
      </div>
    </div>`).join('');
}

/* Mission color map */
const MISSION_COLS={
  'ISRO':['#ff7c35','#c2410c'],'NASA':['#1a56db','#1e3a8a'],
  'NASA/ESA/CSA':['#7c3aed','#3b0764'],'ESA':['#0ea5e9','#0c4a6e'],
  'NASA':['#1a56db','#1e3a8a'],'International':['#64748b','#334155']
};
function mCols(org){const k=Object.keys(MISSION_COLS).find(k=>org.includes(k));return MISSION_COLS[k]||['#334155','#1e293b']}

function missionCard(m){
  const [c1,c2]=mCols(m.org);
  const statusCls=m.status.includes('Active')?'status-active':m.status.includes('Development')?'status-dev':'status-complete';
  return`<div class="col-lg-6 col-xl-4">
    <div class="mission-card">
      <div class="mission-header" style="--mh-c1:${c1};--mh-c2:${c2}">
        <h4>${m.name}</h4>
        <div class="mission-org"><i class="fa-solid fa-building-columns"></i> ${m.org} · ${m.launch}
          <span class="mission-status-badge ${statusCls}" style="margin-left:auto">${m.status}</span>
        </div>
      </div>
      <div class="mission-body">
        <div style="font-size:.72rem;font-weight:700;color:var(--accent-cyan);text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">Type</div>
        <div style="font-size:.8rem;color:var(--text-muted);margin-bottom:10px">${m.type}</div>
        <div class="mission-section"><div class="mission-section-lbl">Objectives</div>
          <ul style="list-style:none;padding:0">${m.objectives.map(o=>`<li style="font-size:.78rem;color:var(--text-muted);padding:3px 0 3px 12px;position:relative">
            <span style="position:absolute;left:0;color:var(--accent-cyan)">▸</span>${o}</li>`).join('')}</ul>
        </div>
        <div class="mission-section"><div class="mission-section-lbl">Payloads</div>
          <div class="mission-payloads">${m.payloads.map(p=>`<span class="mission-payload-tag">${p}</span>`).join('')}</div>
        </div>
        <div class="mission-section"><div class="mission-section-lbl">Key Achievements</div>
          <ul class="mission-achievements">${m.achievements.map(a=>`<li>${a}</li>`).join('')}</ul>
        </div>
        <div style="font-size:.72rem;color:var(--text-dim);margin-top:8px;font-style:italic"><i class="fa-solid fa-database" style="margin-right:4px"></i>${m.data}</div>
      </div>
    </div>
  </div>`;
}

async function renderMissions(){
  try{
    const res=await fetch('data/missions.json'); const missions=await res.json();
    const all=document.getElementById('missionGrid'); if(!all) return;
    all.innerHTML=missions.map(missionCard).join('');
    document.getElementById('missionGridISRO').innerHTML=missions.filter(m=>m.org==='ISRO').map(missionCard).join('');
    document.getElementById('missionGridNASA').innerHTML=missions.filter(m=>m.org.includes('NASA')).map(missionCard).join('');
    document.getElementById('missionGridESA').innerHTML=missions.filter(m=>m.org.includes('ESA')||m.org==='International').map(missionCard).join('');
  }catch(e){console.error('Missions load failed',e)}
}

/* Projects */
function renderProjects(){
  const grid=document.getElementById('projectGrid'); if(!grid) return;
  grid.innerHTML=PROJECTS.map(p=>`
    <div class="col-lg-6 col-xl-4">
      <div class="project-card">
        <div style="padding:22px 22px 0">
          <div class="project-num">Project ${p.num}</div>
          <h4>${p.icon} ${p.title}</h4>
          <p>${p.desc}</p>
          <div class="project-meta">
            <div class="project-meta-item"><label>Dataset</label><span style="font-size:.72rem">${p.dataset.split(' from')[0]}</span></div>
            <div class="project-meta-item"><label>Difficulty</label><span style="color:${p.col}">${p.difficulty}</span></div>
            <div class="project-meta-item"><label>Time</label><span>${p.time}</span></div>
            <div class="project-meta-item"><label>Tools</label><span style="font-size:.72rem">${p.tools.slice(0,3).join(', ')}</span></div>
          </div>
          <div style="font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--text-dim);margin-bottom:6px">Workflow Steps</div>
          <ol class="project-steps">${p.steps.map(s=>`<li>${s}</li>`).join('')}</ol>
          <div style="font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--text-dim);margin-bottom:6px">Sample Code</div>
          <div class="project-code">${p.code}</div>
          <div style="font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--text-dim);margin-bottom:6px">Expected Output</div>
          <p style="font-size:.78rem;color:var(--accent-green);margin-bottom:10px">${p.output}</p>
          <div class="project-tools">${p.tools.map(t=>`<span class="project-tool">${t}</span>`).join('')}</div>
        </div>
        <div style="height:4px;background:linear-gradient(90deg,${p.col},${p.col}44);margin-top:16px"></div>
      </div>
    </div>`).join('');
}

/* AI Aerospace */
function renderAIAero(){
  const grid=document.getElementById('aiAeroGrid'); if(!grid) return;
  grid.innerHTML=AI_AERO.map(a=>`
    <div class="col-md-6 col-xl-4">
      <div class="ai-aero-card">
        <div class="aai-icon" style="background:${a.col};border:1px solid ${a.bdr}">${a.icon}</div>
        <h4>${a.title}</h4>
        <p>${a.desc}</p>
        <div class="aai-algos">${a.algos.map(x=>`<span class="aai-algo">${x}</span>`).join('')}</div>
        <div class="aai-org" style="margin-top:8px"><i class="fa-solid fa-building" style="margin-right:4px;font-size:.7rem"></i>${a.orgs}</div>
      </div>
    </div>`).join('');
}

/* Careers */
let allCareers=[];
async function renderCareers(){
  try{
    const res=await fetch('data/careers.json'); allCareers=await res.json();
    buildCareerGrid(allCareers);
    buildCareerCompare(allCareers);
  }catch(e){console.error('Careers load failed',e)}
}

function demandBadge(d){
  const cls=d==='Very High'?'demand-vh':d==='High'?'demand-h':'demand-m';
  return`<span class="demand-badge ${cls}">${d}</span>`;
}

function buildCareerGrid(careers){
  const grid=document.getElementById('careerGrid'); if(!grid) return;
  grid.innerHTML=careers.map(c=>`
    <div class="col-lg-6 col-xl-4 career-enc-item" data-domain="${c.domain}">
      <div class="career-enc-card">
        <div class="cec-header">
          <div class="cec-icon">${c.icon}</div>
          <div class="cec-title">
            <h4>${c.role}</h4>
            <span class="cec-domain">${c.domain}</span>
          </div>
        </div>
        <div class="cec-salary">
          <div class="cec-sal-item"><span class="flag">🇮🇳</span><span class="sal">${c.india}</span><span style="font-size:.62rem;color:var(--text-dim)">India LPA</span></div>
          <div class="cec-sal-item"><span class="flag">🇺🇸</span><span class="sal">${c.usa}</span><span style="font-size:.62rem;color:var(--text-dim)">USA/yr</span></div>
          <div class="cec-sal-item"><span class="flag">🇪🇺</span><span class="sal">${c.europe}</span><span style="font-size:.62rem;color:var(--text-dim)">Europe/yr</span></div>
        </div>
        <div class="cec-section-label">Core Skills</div>
        <div class="cec-skill-tags">${c.skills.slice(0,5).map(s=>`<span class="cec-skill-tag">${s}</span>`).join('')}</div>
        <div class="cec-section-label" style="margin-top:10px">Tools</div>
        <div class="cec-tools-row">${c.tools.slice(0,4).join(' · ')}</div>
        <div class="cec-section-label">Hiring Organizations</div>
        <div class="cec-orgs">${c.orgs.slice(0,5).map(o=>`<span class="cec-org">${o}</span>`).join('')}</div>
        <div style="display:flex;gap:8px;align-items:center;margin-top:12px;flex-wrap:wrap">
          <span style="font-size:.72rem;color:var(--text-dim)">Demand:</span>${demandBadge(c.demand)}
          <span style="font-size:.72rem;color:var(--accent-green);margin-left:auto">📈 ${c.growth} growth</span>
        </div>
        <div style="font-size:.72rem;color:var(--text-dim);margin-top:6px"><i class="fa-solid fa-graduation-cap" style="margin-right:4px;color:var(--accent-amber)"></i>${c.edu}</div>
      </div>
    </div>`).join('');
}

function buildCareerCompare(careers){
  const tbody=document.getElementById('careerCompareTbody'); if(!tbody) return;
  tbody.innerHTML=careers.map(c=>`<tr>
    <td><span style="font-weight:600;color:var(--text-primary)">${c.icon} ${c.role}</span></td>
    <td><span style="font-size:.72rem;padding:2px 8px;border-radius:4px;background:rgba(6,182,212,.1);color:var(--accent-cyan)">${c.domain}</span></td>
    <td style="color:var(--accent-green);font-weight:600">${c.india}</td>
    <td style="color:var(--accent-blue)">${c.usa}</td>
    <td style="color:var(--text-muted)">${c.europe}</td>
    <td style="font-size:.75rem;color:var(--accent-green)">+${c.growth}/yr</td>
    <td>${demandBadge(c.demand)}</td>
  </tr>`).join('');
}

window.filterCareers=function(){
  const q=document.getElementById('careerSearch')?.value.toLowerCase()||'';
  document.querySelectorAll('.career-enc-item').forEach(el=>{
    const text=el.textContent.toLowerCase();
    el.style.display=text.includes(q)?'':'none';
  });
};

window.filterByDomain=function(domain,btn){
  document.querySelectorAll('.p2-filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.career-enc-item').forEach(el=>{
    if(domain==='all'){el.style.display='';return}
    const d=el.dataset.domain||'';
    el.style.display=d.toLowerCase().includes(domain.toLowerCase())?'':'none';
  });
};

/* Roadmap */
const ROADMAP_DATA=[
  {level:'l1',num:'1',emoji:'🌱',title:'Level 1 — Foundations',duration:'0–6 months',desc:'Build the mathematical, programming, and geographic foundations needed for any space data role.',
   topics:['Geography & Map Projections (CRS, UTM, WGS84)','Physics (Electromagnetic spectrum, optics)','Mathematics (Linear algebra, statistics, calculus basics)','Python fundamentals (NumPy, Pandas, Matplotlib)','Data visualization (Matplotlib, Seaborn, Plotly)'],
   resources:[
     {icon:'📚',name:'Python Crash Course',sub:'Eric Matthes — free online'},
     {icon:'🎓',name:'Khan Academy Geography',sub:'Free, comprehensive basics'},
     {icon:'🎥',name:'3Blue1Brown Linear Algebra',sub:'YouTube series — essential'},
     {icon:'💻',name:'QGIS Tutorial (Docs)',sub:'qgis.org — start with vector layers'},
     {icon:'🛰️',name:'NASA SciJinks',sub:'scijinks.gov — satellite basics'},
     {icon:'📖',name:'Intro to Remote Sensing',sub:'Jensen — textbook classic'}
   ]},
  {level:'l2',num:'2',emoji:'🔥',title:'Level 2 — Core Skills',duration:'6–18 months',desc:'Develop hands-on GIS, remote sensing, and ML skills with real satellite datasets.',
   topics:['GIS analysis with QGIS & ArcGIS','Remote sensing: NDVI, image classification, SAR basics','Python geospatial stack (rasterio, geopandas, xarray)','Machine learning fundamentals (scikit-learn, CNN basics)','Cloud platforms (Google Earth Engine, Planetary Computer)','Working with HDF5, NetCDF, GeoTIFF data formats'],
   resources:[
     {icon:'🎓',name:'GIS Specialisation (Coursera)',sub:'UC Davis — 4 courses'},
     {icon:'🌍',name:'GEE Developers Guide',sub:'developers.google.com/earth-engine'},
     {icon:'🎥',name:'Sentdex GIS Python',sub:'YouTube — 30-video series'},
     {icon:'💻',name:'IIRS Online Courses',sub:'iirs.gov.in — FREE, ISRO endorsed'},
     {icon:'📊',name:'fast.ai Practical DL',sub:'free.fast.ai — CNNs for images'},
     {icon:'🏆',name:'Kaggle Datasets',sub:'EuroSAT, DIOR, SpaceNet challenges'}
   ]},
  {level:'l3',num:'3',emoji:'🚀',title:'Level 3 — Specialisation',duration:'18+ months',desc:'Choose a specialisation track and build industry-level expertise with advanced tools.',
   topics:['Orbital mechanics & mission design (GMAT, STK)','Spacecraft systems (AOCS, power, thermal, comms)','Deep learning for EO (U-Net, LSTM, ViT, SAR-DL)','MLOps for geospatial (MLflow, Kubernetes, DVC)','Astrodynamics (propagators, manoeuvres, collision avoidance)','Research paper reading & reproduction'],
   resources:[
     {icon:'📚',name:'Wertz Mission Design',sub:'Spacecraft Mission Analysis — bible'},
     {icon:'🎓',name:'MIT OpenCourseWare 16.851',sub:'Satellite Engineering — free'},
     {icon:'🏆',name:'NASA Space Apps Challenge',sub:'Annual global hackathon'},
     {icon:'💻',name:'ESA SNAP Tutorials',sub:'step.esa.int/main/tutorials'},
     {icon:'📊',name:'IEEE GRSS Data Fusion',sub:'Annual dataset competition'},
     {icon:'🔬',name:'arXiv cs.CV + eess.SP',sub:'Latest EO deep learning papers'}
   ]}
];

function renderRoadmap(){
  const container=document.getElementById('roadmapFull'); if(!container) return;
  container.innerHTML=ROADMAP_DATA.map((lvl,i)=>`
    <div class="rm-full-level ${lvl.level}">
      <div class="rm-level-hdr">
        <div class="rm-level-num">${lvl.emoji}</div>
        <div class="rm-level-info">
          <h3>${lvl.title}</h3>
          <p>${lvl.duration} · ${lvl.desc}</p>
        </div>
      </div>
      <div class="row g-4">
        <div class="col-lg-6">
          <h5 style="font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--text-dim);margin-bottom:12px">What to Learn</h5>
          <ul class="styled-list">${lvl.topics.map(t=>`<li>${t}</li>`).join('')}</ul>
        </div>
        <div class="col-lg-6">
          <h5 style="font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--text-dim);margin-bottom:12px">Resources</h5>
          <div class="rm-resource-grid">
            ${lvl.resources.map(r=>`<div class="rm-resource-item">
              <div class="ri-icon">${r.icon}</div>
              <strong>${r.name}</strong>
              <span>${r.sub}</span>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
    ${i<ROADMAP_DATA.length-1?'<div class="rm-connector"><i class="fa-solid fa-arrow-down"></i></div>':''}
  `).join('');
}

/* Hackathon */
function renderHackathon(){
  // Themes
  const tGrid=document.getElementById('hackThemes'); if(tGrid)
    tGrid.innerHTML=HACK_THEMES.map(h=>`<div class="col-md-6 col-lg-3">
      <div class="hack-theme-card">
        <div class="htc-icon">${h.icon}</div>
        <div class="htc-name">${h.name}</div>
        <div class="htc-year">${h.year}</div>
        <div class="htc-data"><i class="fa-solid fa-database" style="margin-right:4px;font-size:.65rem"></i>${h.data}</div>
        <div style="font-size:.72rem;color:var(--text-muted);margin-top:6px">${h.challenge}</div>
      </div></div>`).join('');

  // Playbook
  const playbook=document.getElementById('hackPlaybook'); if(playbook)
    playbook.innerHTML=`<ul class="playbook-steps">${[
      {t:'Hr 0–2',n:'Problem Deconstruction',d:'Read statement 3 times. Define: What data? What output? Who benefits? What metric = success?'},
      {t:'Hr 2–4',n:'Data Exploration',d:'Download all provided datasets. Run EDA — resolution, coverage, cloud%, temporal range, format.'},
      {t:'Hr 4–8',n:'Baseline Model',d:'Build simplest working version first. Threshold rule → Random Forest → target CNN. Get something running.'},
      {t:'Hr 8–24',n:'Core Development',d:'Iterate on model. Add data sources. Improve accuracy. Document every experiment in a notebook.'},
      {t:'Hr 24–48',n:'Integration & Polish',d:'Build end-to-end pipeline. Create Streamlit/Gradio demo. Map visualization. Quantify impact.'},
      {t:'Hr 48–60',n:'Stress Test & Deploy',d:'Test edge cases. Deploy to HuggingFace/Streamlit Cloud. Share URL with team. Dry-run demo 3 times.'},
      {t:'Hr 60–72',n:'Presentation Prep',d:'7-min script: Problem (2m) → Solution (2m) → Demo (2m) → Impact (1m). Every team member presents part.'}
    ].map(s=>`<li class="playbook-step"><div class="pb-time-badge">${s.t}</div><div class="pb-content"><strong>${s.n}</strong><span>${s.d}</span></div></li>`).join('')}</ul>`;

  // Team
  const team=document.getElementById('hackTeam'); if(team)
    team.innerHTML=[
      {icon:'🤖',col:'rgba(168,85,247,.12)',bdr:'rgba(168,85,247,.2)',name:'ML Engineer (×2)',skills:'Model training, feature engineering, PyTorch/sklearn'},
      {icon:'🌍',col:'rgba(74,158,255,.12)',bdr:'rgba(74,158,255,.2)',name:'GIS/EO Specialist',skills:'Data download, pre-processing, SNAP/rasterio, map outputs'},
      {icon:'💻',col:'rgba(6,182,212,.12)',bdr:'rgba(6,182,212,.2)',name:'Backend/Deployment',skills:'FastAPI/Streamlit, GitHub, cloud deploy, demo stability'},
      {icon:'📊',col:'rgba(245,158,11,.12)',bdr:'rgba(245,158,11,.2)',name:'Presenter/PM',skills:'Story, slides, impact quantification, time management'}
    ].map(r=>`<div class="team-role">
      <div class="tr-icon" style="background:${r.col};border:1px solid ${r.bdr}">${r.icon}</div>
      <div><div class="tr-name">${r.name}</div><div class="tr-skills">${r.skills}</div></div>
    </div>`).join('');

  // Judging
  const judging=document.getElementById('hackJudging'); if(judging)
    judging.innerHTML=HACK_JUDGING.map(j=>`<div class="judging-bar">
      <div class="jb-label">${j.label}</div>
      <div class="jb-bar-bg"><div class="jb-bar" style="width:${j.pct*4}%"></div></div>
      <div class="jb-pct">${j.pct}%</div>
    </div>`).join('');

  // Mistakes
  const mistakes=document.getElementById('hackMistakes'); if(mistakes)
    mistakes.innerHTML=HACK_MISTAKES.map(m=>`<div class="mistake-item">
      <i class="fa-solid fa-circle-xmark mi-icon"></i>
      <div class="mi-text"><strong>${m.title}</strong><span>${m.text}</span></div>
    </div>`).join('');

  // Case studies
  const cases=document.getElementById('hackCaseStudies'); if(cases)
    cases.innerHTML=HACK_CASES.map(c=>`<div class="col-lg-6">
      <div class="case-study-card">
        <div class="cs-result">${c.result}</div>
        <h4 style="font-size:.95rem;font-weight:700;color:var(--text-primary);margin-bottom:4px">${c.title}</h4>
        <div style="font-size:.72rem;color:var(--text-dim);margin-bottom:10px"><i class="fa-solid fa-university" style="margin-right:4px"></i>${c.org}</div>
        <div style="font-size:.78rem;font-weight:700;color:var(--accent-cyan);margin-bottom:4px">Problem</div>
        <p style="font-size:.8rem;color:var(--text-muted);margin-bottom:10px">${c.problem}</p>
        <div style="font-size:.78rem;font-weight:700;color:var(--accent-cyan);margin-bottom:4px">Approach</div>
        <p style="font-size:.8rem;color:var(--text-muted);margin-bottom:10px">${c.approach}</p>
        <div style="display:flex;flex-wrap:wrap;gap:4px">${c.stack.map(s=>`<span style="font-size:.68rem;padding:2px 7px;border-radius:4px;background:rgba(74,158,255,.08);color:var(--accent-blue);border:1px solid rgba(74,158,255,.12)">${s}</span>`).join('')}</div>
      </div></div>`).join('');

  // Templates
  const templates=document.getElementById('hackTemplates'); if(templates)
    templates.innerHTML=HACK_TEMPLATES.map(t=>`<div class="col-md-6 col-lg-4">
      <div class="template-btn" onclick="downloadTemplate('${t.name}')">
        <div class="tb-icon">${t.icon}</div>
        <div class="tb-text"><strong>${t.name}</strong><span>${t.desc}</span></div>
        <i class="fa-solid fa-download" style="color:var(--accent-blue);margin-left:auto;font-size:.85rem"></i>
      </div></div>`).join('');
}

/* Master Database */
async function renderMasterDB(){
  // Satellites
  try{
    const res=await fetch('data/satellites.json'); const sats=await res.json();
    const tbody=document.getElementById('t2-sat-body'); if(tbody)
      tbody.innerHTML=sats.map(s=>`<tr>
        <td style="font-weight:600;color:var(--text-primary)">${s.name}</td>
        <td>${s.country}</td><td>${s.operator}</td><td>${s.launch}</td>
        <td style="font-size:.75rem">${s.orbit}</td>
        <td style="font-size:.73rem;color:var(--text-muted)">${s.sensors}</td>
        <td><span style="font-size:.68rem;padding:2px 7px;border-radius:4px;background:rgba(74,158,255,.08);color:var(--accent-blue);border:1px solid rgba(74,158,255,.12)">${s.type}</span></td>
        <td><span class="badge-${s.status==='Active'?'yes':'partial'}">${s.status}</span></td>
      </tr>`).join('');
  }catch(e){}

  // Missions
  try{
    const res=await fetch('data/missions.json'); const missions=await res.json();
    const tbody=document.getElementById('t2-mis-body'); if(tbody)
      tbody.innerHTML=missions.map(m=>`<tr>
        <td style="font-weight:600;color:var(--text-primary)">${m.name}</td>
        <td>${m.org}</td><td>${m.launch}</td>
        <td><span class="mission-status-badge ${m.status.includes('Active')?'status-active':m.status.includes('Dev')?'status-dev':'status-complete'}">${m.status}</span></td>
        <td style="font-size:.75rem">${m.type}</td>
        <td style="font-size:.75rem;color:var(--text-muted)">${m.achievements[0]}</td>
      </tr>`).join('');
  }catch(e){}

  // Software
  const swBody=document.getElementById('t2-sw-body'); if(swBody)
    swBody.innerHTML=SW_DB.map(s=>`<tr>
      <td style="font-weight:600;color:var(--text-primary)">${s.name}</td>
      <td><span style="font-size:.68rem;padding:2px 7px;border-radius:4px;background:rgba(168,85,247,.08);color:var(--accent-purple);border:1px solid rgba(168,85,247,.12)">${s.cat}</span></td>
      <td style="font-size:.75rem;color:${s.lic.includes('Free')?'var(--accent-green)':'var(--text-muted)'}">${s.lic}</td>
      <td style="font-size:.75rem">${s.platform}</td>
      <td style="font-size:.75rem;color:var(--text-muted)">${s.str}</td>
      <td><a href="https://${s.url}" target="_blank" style="font-size:.72rem">${s.url}</a></td>
    </tr>`).join('');

  // Careers
  if(allCareers.length){
    const tbody=document.getElementById('t2-car-body'); if(tbody)
      tbody.innerHTML=allCareers.map(c=>`<tr>
        <td style="font-weight:600;color:var(--text-primary)">${c.icon} ${c.role}</td>
        <td>${c.domain}</td>
        <td style="color:var(--accent-green);font-weight:600">${c.india}</td>
        <td style="color:var(--accent-blue)">${c.usa}</td>
        <td>${demandBadge(c.demand)}</td>
        <td style="color:var(--accent-green)">+${c.growth}</td>
      </tr>`).join('');
  }
}

/* DB2 filter + sort + export */
window.filterDB2=function(){
  const q=document.getElementById('dbSearch2')?.value.toLowerCase()||'';
  const activeTab=document.querySelector('#s24 .tab-content:not(.hidden)');
  if(!activeTab) return;
  activeTab.querySelectorAll('tbody tr').forEach(r=>{
    r.style.display=r.textContent.toLowerCase().includes(q)?'':'none';
  });
};

window.sortTable=function(tableId,col){
  const table=document.getElementById(tableId); if(!table) return;
  const tbody=table.querySelector('tbody');
  const rows=[...tbody.querySelectorAll('tr')];
  const dir=table.dataset.sortDir==='asc'?'desc':'asc';
  table.dataset.sortDir=dir;
  rows.sort((a,b)=>{
    const av=a.cells[col]?.textContent.trim()||'';
    const bv=b.cells[col]?.textContent.trim()||'';
    return dir==='asc'?av.localeCompare(bv,undefined,{numeric:true}):bv.localeCompare(av,undefined,{numeric:true});
  });
  rows.forEach(r=>tbody.appendChild(r));
};

window.exportCSV=function(){
  const activeTab=document.querySelector('#s24 .tab-content:not(.hidden)');
  if(!activeTab) return;
  const table=activeTab.querySelector('table'); if(!table) return;
  const rows=[...table.querySelectorAll('tr')];
  const csv=rows.map(r=>[...r.cells].map(c=>'"'+c.textContent.replace(/"/g,'""').trim()+'"').join(',')).join('\n');
  const a=document.createElement('a');
  a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv);
  a.download='sdih_export.csv'; a.click();
};

/* Template download (demo — creates text file) */
window.downloadTemplate=function(name){
  const content=`# ${name}\n\nSpace Data Intelligence Hub — Hackathon Template\n\nThis is a placeholder template for: ${name}\n\nVisit https://mahin-aeroai.github.io/space-data-intelligence-hub/ for full content.`;
  const a=document.createElement('a');
  a.href='data:text/plain;charset=utf-8,'+encodeURIComponent(content);
  a.download=name.replace(/\s+/g,'_')+'.md'; a.click();
};

/* Theme toggle */
(function(){
  const btn=document.getElementById('themeToggle'); if(!btn) return;
  btn.addEventListener('click',()=>{
    document.body.classList.toggle('light-mode');
    btn.querySelector('i').className=document.body.classList.contains('light-mode')?'fa-solid fa-moon':'fa-solid fa-circle-half-stroke';
  });
})();

/* Global search for phase2 */
(function(){
  const input=document.getElementById('globalSearch');
  const drop=document.getElementById('searchResults');
  if(!input||!drop) return;
  const idx=[
    {label:'Satellite Sensor Encyclopedia',section:'Module 17',id:'s17'},
    {label:'Space Missions Database',section:'Module 18',id:'s18'},
    {label:'Hands-On Projects',section:'Module 19',id:'s19'},
    {label:'Aerospace AI Applications',section:'Module 20',id:'s20'},
    {label:'Career Encyclopedia — 20 roles',section:'Module 21',id:'s21'},
    {label:'Complete Learning Roadmap',section:'Module 22',id:'s22'},
    {label:'ISRO Hackathon Success Center',section:'Module 23',id:'s23'},
    {label:'Master Searchable Database',section:'Module 24',id:'s24'},
    {label:'Multispectral Sensor',section:'Sensor',id:'s17'},{label:'SAR Radar',section:'Sensor',id:'s17'},
    {label:'LiDAR',section:'Sensor',id:'s17'},{label:'Hyperspectral',section:'Sensor',id:'s17'},
    {label:'Thermal IR',section:'Sensor',id:'s17'},{label:'Ocean Color',section:'Sensor',id:'s17'},
    {label:'Chandrayaan-3',section:'Mission',id:'s18'},{label:'Mangalyaan',section:'Mission',id:'s18'},
    {label:'Aditya-L1',section:'Mission',id:'s18'},{label:'JWST',section:'Mission',id:'s18'},
    {label:'Gaganyaan',section:'Mission',id:'s18'},{label:'Artemis',section:'Mission',id:'s18'},
    {label:'NDVI Analysis',section:'Project',id:'s19'},{label:'Flood Mapping SAR',section:'Project',id:'s19'},
    {label:'Fire Detection ML',section:'Project',id:'s19'},{label:'Urban Growth',section:'Project',id:'s19'},
    {label:'Crop Classification LSTM',section:'Project',id:'s19'},{label:'Ship Detection YOLOv8',section:'Project',id:'s19'},
    {label:'Building Extraction U-Net',section:'Project',id:'s19'},
    {label:'Digital Twins',section:'AI Aerospace',id:'s20'},{label:'Space Debris AI',section:'AI',id:'s20'},
    {label:'AI Weather Forecasting',section:'AI',id:'s20'},{label:'On-Board AI',section:'AI',id:'s20'},
    ...['Aerospace Engineer','Aeronautical Engineer','Astronautical Engineer','Remote Sensing Scientist','GIS Analyst','Geospatial Data Scientist','Satellite Operations Engineer','Flight Dynamics Engineer','Mission Planning Engineer','Ground Systems Engineer','Avionics Engineer','FPGA Engineer','Embedded Systems Engineer','AI/ML Engineer','Machine Learning Engineer','Data Engineer','Space Mission Analyst','UAV Systems Engineer','Drone AI Engineer','DevOps Engineer'].map(r=>({label:r,section:'Career',id:'s21'}))
  ];
  function hl(t,q){return t.replace(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi'),'<mark>$1</mark>')}
  input.addEventListener('input',()=>{
    const q=input.value.trim().toLowerCase();
    if(!q||q.length<2){drop.classList.add('hidden');return}
    const r=idx.filter(i=>i.label.toLowerCase().includes(q)||i.section.toLowerCase().includes(q)).slice(0,10);
    drop.innerHTML=r.length?r.map(i=>`<a class="search-result-item" href="#${i.id}"><span class="sri-label">${hl(i.label,q)}</span><span class="sri-section">${i.section}</span></a>`).join(''):'<div class="search-no-results">No results found</div>';
    drop.classList.remove('hidden');
  });
  input.addEventListener('keydown',e=>{if(e.key==='Escape'){drop.classList.add('hidden');input.value=''}});
  document.addEventListener('click',e=>{if(!e.target.closest('.topbar-search'))drop.classList.add('hidden')});
  drop.addEventListener('click',()=>setTimeout(()=>drop.classList.add('hidden'),100));
})();

/* INIT ALL */
document.addEventListener('DOMContentLoaded',async ()=>{
  renderSensors();
  await renderMissions();
  renderProjects();
  renderAIAero();
  await renderCareers();
  renderRoadmap();
  renderHackathon();
  await renderMasterDB();
});
