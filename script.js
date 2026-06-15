/* ═══════════════════════════════════════════════════════════════════
   Space Data Intelligence Hub — script.js  v2.0
   ═══════════════════════════════════════════════════════════════════ */
'use strict';

/* ──────────────────────────────────────────────────────────────────
   1. STAR CANVAS
────────────────────────────────────────────────────────────────── */
(function initStars(){
  const c=document.getElementById('starCanvas');if(!c)return;
  const ctx=c.getContext('2d');
  function resize(){c.width=c.offsetWidth;c.height=c.offsetHeight}
  resize();window.addEventListener('resize',resize);
  const stars=Array.from({length:260},()=>({
    x:Math.random(),y:Math.random(),
    r:Math.random()*1.6+0.3,
    a:Math.random(),
    da:(Math.random()*0.007+0.002)*(Math.random()<.5?1:-1),
    speed:Math.random()*0.00012+0.00004
  }));
  function draw(){
    const{width:w,height:h}=c;ctx.clearRect(0,0,w,h);
    stars.forEach(s=>{
      s.a+=s.da;if(s.a<=0.05||s.a>=1)s.da=-s.da;
      s.y-=s.speed;if(s.y<0){s.y=1;s.x=Math.random()}
      ctx.beginPath();ctx.arc(s.x*w,s.y*h,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,255,255,${Math.max(0,Math.min(1,s.a))})`;ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ──────────────────────────────────────────────────────────────────
   2. SIDEBAR
────────────────────────────────────────────────────────────────── */
(function initSidebar(){
  const sidebar=document.getElementById('sidebar');
  const main=document.getElementById('mainContent');
  const toggle=document.getElementById('sidebarToggle');
  const mobileBtn=document.getElementById('mobileSidebarBtn');
  if(!sidebar)return;
  toggle&&toggle.addEventListener('click',()=>{
    sidebar.classList.toggle('collapsed');
    main&&main.classList.toggle('sidebar-collapsed');
    const ic=toggle.querySelector('i');
    if(ic){ic.classList.toggle('fa-chevron-left');ic.classList.toggle('fa-chevron-right')}
  });
  mobileBtn&&mobileBtn.addEventListener('click',()=>sidebar.classList.toggle('mobile-open'));
  sidebar.addEventListener('click',e=>{
    if(window.innerWidth<992&&e.target.closest('.nav-link'))sidebar.classList.remove('mobile-open');
  });
  document.addEventListener('click',e=>{
    if(window.innerWidth<992&&sidebar.classList.contains('mobile-open')&&!sidebar.contains(e.target)&&e.target!==mobileBtn)
      sidebar.classList.remove('mobile-open');
  });
})();

/* ──────────────────────────────────────────────────────────────────
   3. ACTIVE NAV (IntersectionObserver)
────────────────────────────────────────────────────────────────── */
(function initActiveNav(){
  const links=document.querySelectorAll('#sidebar .nav-link');
  if(!links.length)return;
  const ids=[...links].map(a=>a.getAttribute('href')?.replace('#','')).filter(Boolean);
  const sections=ids.map(id=>document.getElementById(id)).filter(Boolean);
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const id=e.target.id;
        links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id));
      }
    });
  },{rootMargin:'-20% 0px -70% 0px',threshold:0});
  sections.forEach(s=>obs.observe(s));
})();

/* ──────────────────────────────────────────────────────────────────
   4. STAT COUNTERS
────────────────────────────────────────────────────────────────── */
(function initCounters(){
  const els=document.querySelectorAll('.stat-num[data-target]');
  if(!els.length)return;
  function animate(el){
    const target=+el.dataset.target,dur=1800,step=16,steps=dur/step;
    let cur=0;const inc=target/steps;
    const t=setInterval(()=>{
      cur+=inc;
      if(cur>=target){el.textContent=target+'+';clearInterval(t)}
      else el.textContent=Math.floor(cur)+'+';
    },step);
  }
  const hero=document.getElementById('hero');
  if(!hero){els.forEach(animate);return}
  const obs=new IntersectionObserver(en=>{if(en[0].isIntersecting){els.forEach(animate);obs.disconnect()}},{threshold:.3});
  obs.observe(hero);
})();

/* ──────────────────────────────────────────────────────────────────
   5. TAB SYSTEM
────────────────────────────────────────────────────────────────── */
(function initTabs(){
  document.querySelectorAll('.tab-nav').forEach(nav=>{
    nav.addEventListener('click',e=>{
      const item=e.target.closest('.tab-item');if(!item)return;
      const tabId=item.dataset.tab,parent=nav.parentElement;
      nav.querySelectorAll('.tab-item').forEach(t=>t.classList.remove('active'));
      item.classList.add('active');
      parent.querySelectorAll('.tab-content').forEach(tc=>tc.classList.toggle('hidden',tc.id!==tabId));
    });
  });
})();

/* ──────────────────────────────────────────────────────────────────
   6. GLOBAL SEARCH
────────────────────────────────────────────────────────────────── */
(function initSearch(){
  const input=document.getElementById('globalSearch');
  const drop=document.getElementById('searchResults');
  if(!input||!drop)return;
  const idx=[
    {label:'Introduction to Space Data',section:'Module 01',id:'s1'},
    {label:'Global Space Ecosystem',section:'Module 02',id:'s2'},
    {label:'Satellite Types & Missions',section:'Module 03',id:'s3'},
    {label:'Space Data Sources',section:'Module 04',id:'s4'},
    {label:'Data Formats (GeoTIFF, HDF5, NetCDF)',section:'Module 05',id:'s5'},
    {label:'Space Data Tools',section:'Module 06',id:'s6'},
    {label:'Python Ecosystem',section:'Module 07',id:'s7'},
    {label:'AI & Machine Learning',section:'Module 08',id:'s8'},
    {label:'Satellite Processing Pipeline',section:'Module 09',id:'s9'},
    {label:'Reports & Products',section:'Module 10',id:'s10'},
    {label:'Careers in Space Data',section:'Module 11',id:'s11'},
    {label:'Learning Roadmap',section:'Module 12',id:'s12'},
    {label:'Hackathon Guide',section:'Module 13',id:'s13'},
    {label:'Image Library',section:'Module 14',id:'s14'},
    {label:'Knowledge Graph',section:'Module 15',id:'s15'},
    {label:'Searchable Database',section:'Module 16',id:'s16'},
    {label:'Cartosat-3',section:'Earth Observation',id:'s3'},{label:'Resourcesat-2A',section:'EO',id:'s3'},
    {label:'Oceansat-3',section:'EO',id:'s3'},{label:'RISAT-1A',section:'SAR',id:'s3'},
    {label:'Sentinel-2',section:'EO',id:'s3'},{label:'Landsat-9',section:'EO',id:'s3'},
    {label:'INSAT-3DR',section:'Weather',id:'s3'},{label:'GOES-18',section:'Weather',id:'s3'},
    {label:'NavIC',section:'Navigation',id:'s3'},{label:'GPS',section:'Navigation',id:'s3'},
    {label:'Galileo',section:'Navigation',id:'s3'},{label:'GSAT-11',section:'Comm',id:'s3'},
    {label:'Chandrayaan-3',section:'Scientific',id:'s3'},{label:'Aditya-L1',section:'Scientific',id:'s3'},
    {label:'JWST',section:'Scientific',id:'s3'},
    {label:'ISRO',section:'India',id:'s2'},{label:'NASA',section:'USA',id:'s2'},
    {label:'ESA',section:'Europe',id:'s2'},{label:'NOAA',section:'USA',id:'s2'},
    {label:'JAXA',section:'Japan',id:'s2'},{label:'Planet Labs',section:'Private',id:'s2'},
    {label:'SpaceX',section:'Private',id:'s2'},{label:'Maxar',section:'Private',id:'s2'},
    {label:'Bhuvan',section:'Data Source',id:'s4'},{label:'MOSDAC',section:'Data Source',id:'s4'},
    {label:'NASA EarthData',section:'Data Source',id:'s4'},{label:'Copernicus Hub',section:'Data Source',id:'s4'},
    {label:'Google Earth Engine',section:'Cloud',id:'s4'},{label:'AWS Open Data',section:'Cloud',id:'s4'},
    {label:'Microsoft Planetary Computer',section:'Cloud',id:'s4'},
    {label:'GeoTIFF',section:'Raster Format',id:'s5'},{label:'HDF5',section:'Format',id:'s5'},
    {label:'NetCDF',section:'Format',id:'s5'},{label:'GeoJSON',section:'Vector',id:'s5'},
    {label:'GRIB2',section:'Met Format',id:'s5'},{label:'JPEG2000',section:'Raster',id:'s5'},
    {label:'QGIS',section:'GIS Tool',id:'s6'},{label:'ArcGIS',section:'GIS Tool',id:'s6'},
    {label:'SNAP',section:'RS Tool',id:'s6'},{label:'ENVI',section:'RS Tool',id:'s6'},
    {label:'rasterio',section:'Python Lib',id:'s7'},{label:'geopandas',section:'Python Lib',id:'s7'},
    {label:'xarray',section:'Python Lib',id:'s7'},{label:'PyTorch',section:'ML Framework',id:'s7'},
    {label:'Flood Prediction',section:'AI App',id:'s8'},{label:'Fire Detection',section:'AI App',id:'s8'},
    {label:'Crop Health',section:'AI App',id:'s8'},{label:'Urban Growth',section:'AI App',id:'s8'},
    {label:'AI/ML Engineer',section:'Career',id:'s11'},{label:'GIS Analyst',section:'Career',id:'s11'},
    {label:'Remote Sensing Scientist',section:'Career',id:'s11'},
    {label:'ISRO Space Hackathon',section:'Hackathon',id:'s13'},{label:'NASA Space Apps',section:'Hackathon',id:'s13'},
  ];
  function hl(text,q){
    return text.replace(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi'),'<mark>$1</mark>');
  }
  function search(q){
    if(!q||q.length<2){drop.classList.add('hidden');return}
    const r=idx.filter(i=>i.label.toLowerCase().includes(q)||i.section.toLowerCase().includes(q)).slice(0,10);
    drop.innerHTML=r.length
      ?r.map(i=>`<a class="search-result-item" href="#${i.id}"><span class="sri-label">${hl(i.label,q)}</span><span class="sri-section">${i.section}</span></a>`).join('')
      :'<div class="search-no-results">No results found</div>';
    drop.classList.remove('hidden');
  }
  input.addEventListener('input',()=>search(input.value.trim()));
  input.addEventListener('keydown',e=>{if(e.key==='Escape'){drop.classList.add('hidden');input.value=''}});
  document.addEventListener('click',e=>{if(!e.target.closest('.topbar-search'))drop.classList.add('hidden')});
  drop.addEventListener('click',()=>setTimeout(()=>drop.classList.add('hidden'),100));
})();

/* ──────────────────────────────────────────────────────────────────
   7. TABLE FILTERS
────────────────────────────────────────────────────────────────── */
window.filterTable=function(inputId,tableId){
  const input=document.getElementById(inputId),table=document.getElementById(tableId);
  if(!input||!table)return;
  const q=input.value.toLowerCase();
  table.querySelectorAll('tbody tr').forEach(r=>{r.style.display=r.textContent.toLowerCase().includes(q)?'':' none'});
};
window.filterActiveTable=function(){
  const input=document.getElementById('dbSearch');if(!input)return;
  const q=input.value.toLowerCase();
  const s16=document.getElementById('s16');if(!s16)return;
  const active=s16.querySelector('.tab-content:not(.hidden)');if(!active)return;
  const tbody=active.querySelector('tbody');if(!tbody)return;
  tbody.querySelectorAll('tr').forEach(r=>{r.style.display=r.textContent.toLowerCase().includes(q)?'':'none'});
};

/* ──────────────────────────────────────────────────────────────────
   8. CHARTS (Chart.js 4)
────────────────────────────────────────────────────────────────── */
(function initCharts(){
  if(typeof Chart==='undefined')return;
  Chart.defaults.color='#94a3b8';
  Chart.defaults.font.family="'Inter','Segoe UI',sans-serif";
  Chart.defaults.font.size=12;
  const grid='rgba(255,255,255,0.05)';
  const tip={backgroundColor:'rgba(8,15,30,0.96)',borderColor:'rgba(74,158,255,0.25)',borderWidth:1,titleColor:'#f1f5f9',bodyColor:'#94a3b8',padding:10,cornerRadius:8};

  /* Format Chart */
  const fCtx=document.getElementById('formatChart');
  if(fCtx) new Chart(fCtx,{
    type:'bar',
    data:{
      labels:['GeoTIFF','JPEG2000','HDF5','NetCDF','GeoJSON','GRIB2','GeoPackage'],
      datasets:[
        {label:'GIS Support',data:[10,8,7,6,9,5,8],backgroundColor:'rgba(74,158,255,0.7)',borderColor:'#4a9eff',borderWidth:1,borderRadius:5},
        {label:'Compression',data:[5,9,8,7,4,9,6],backgroundColor:'rgba(168,85,247,0.7)',borderColor:'#a855f7',borderWidth:1,borderRadius:5},
        {label:'Scientific Use',data:[7,6,10,10,5,9,5],backgroundColor:'rgba(6,182,212,0.7)',borderColor:'#06b6d4',borderWidth:1,borderRadius:5},
      ]
    },
    options:{
      responsive:true,maintainAspectRatio:true,
      plugins:{legend:{position:'top',labels:{boxWidth:11,padding:14}},tooltip:{...tip},title:{display:true,text:'Format Capability Scores (1–10)',color:'#cbd5e1',padding:{bottom:12}}},
      scales:{x:{grid:{color:grid},ticks:{color:'#64748b'}},y:{grid:{color:grid},ticks:{color:'#64748b'},min:0,max:10}}
    }
  });

  /* AI Usage Chart */
  const aCtx=document.getElementById('aiUsageChart');
  if(aCtx) new Chart(aCtx,{
    type:'doughnut',
    data:{
      labels:['Forest Fire','Flood Prediction','Crop Health','Urban Growth','Illegal Mining','Weather Forecast','Other'],
      datasets:[{
        data:[18,20,22,14,10,11,5],
        backgroundColor:['rgba(239,68,68,.85)','rgba(6,182,212,.85)','rgba(34,197,94,.85)','rgba(249,115,22,.85)','rgba(168,85,247,.85)','rgba(74,158,255,.85)','rgba(148,163,184,.5)'],
        borderColor:'#080f1e',borderWidth:2,hoverOffset:8
      }]
    },
    options:{
      responsive:true,maintainAspectRatio:true,cutout:'62%',
      plugins:{legend:{position:'right',labels:{padding:14,boxWidth:12}},tooltip:{...tip,callbacks:{label:c=>` ${c.label}: ${c.parsed}% of EO-AI usage`}},title:{display:true,text:'AI Application Distribution in Earth Observation',color:'#cbd5e1',padding:{bottom:14}}}
    }
  });

  /* Salary Chart */
  const sCtx=document.getElementById('salaryChart');
  if(sCtx) new Chart(sCtx,{
    type:'bar',
    data:{
      labels:['Aerospace\nEng.','Remote\nSensing','GIS\nAnalyst','Geo\nDev.','AI/ML\nEng.','Data\nSci.','Sat Ops\nEng.','Flight\nDyn.'],
      datasets:[
        {label:'India Min (LPA)',data:[6,5,4,6,10,8,6,8],backgroundColor:'rgba(74,158,255,.65)',borderColor:'#4a9eff',borderWidth:1,borderRadius:4,stack:'india'},
        {label:'India Max (LPA)',data:[19,15,11,16,30,22,12,17],backgroundColor:'rgba(74,158,255,.25)',borderColor:'#4a9eff',borderWidth:1,borderRadius:4,stack:'india'},
        {label:'USA Min ($K)',data:[80,70,55,75,110,90,70,90],backgroundColor:'rgba(168,85,247,.65)',borderColor:'#a855f7',borderWidth:1,borderRadius:4,stack:'usa'},
        {label:'USA Max ($K)',data:[100,70,55,85,140,90,60,70],backgroundColor:'rgba(168,85,247,.25)',borderColor:'#a855f7',borderWidth:1,borderRadius:4,stack:'usa'},
      ]
    },
    options:{
      responsive:true,maintainAspectRatio:true,
      plugins:{legend:{position:'top',labels:{boxWidth:11,padding:12}},tooltip:{...tip,callbacks:{title:i=>i[0].label.replace('\n',' ')}},title:{display:true,text:'Salary Ranges — India (LPA) vs USA ($K)',color:'#cbd5e1',padding:{bottom:12}}},
      scales:{x:{stacked:true,grid:{color:grid},ticks:{color:'#64748b'}},y:{stacked:true,grid:{color:grid},ticks:{color:'#64748b'}}}
    }
  });
})();

/* ──────────────────────────────────────────────────────────────────
   9. KNOWLEDGE GRAPH
────────────────────────────────────────────────────────────────── */
(function initKG(){
  const canvas=document.getElementById('knowledgeGraph');if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const DPR=window.devicePixelRatio||1;
  const types={org:{color:'#4a9eff',r:26},sat:{color:'#a855f7',r:20},dataset:{color:'#22c55e',r:18},tool:{color:'#f97316',r:18},app:{color:'#ef4444',r:15}};
  const rawNodes=[
    {id:'isro',label:'ISRO',type:'org'},{id:'nasa',label:'NASA',type:'org'},
    {id:'esa',label:'ESA',type:'org'},{id:'noaa',label:'NOAA',type:'org'},
    {id:'cartosat',label:'Cartosat',type:'sat'},{id:'sentinel',label:'Sentinel-2',type:'sat'},
    {id:'landsat',label:'Landsat-9',type:'sat'},{id:'goes',label:'GOES-18',type:'sat'},
    {id:'navic',label:'NavIC',type:'sat'},{id:'jwst',label:'JWST',type:'sat'},
    {id:'bhuvan',label:'Bhuvan',type:'dataset'},{id:'earthdata',label:'EarthData',type:'dataset'},
    {id:'copernicus',label:'Copernicus',type:'dataset'},{id:'gee',label:'Earth Engine',type:'dataset'},
    {id:'qgis',label:'QGIS',type:'tool'},{id:'snap',label:'SNAP',type:'tool'},
    {id:'python',label:'Python',type:'tool'},
    {id:'flood',label:'Flood Maps',type:'app'},{id:'fire',label:'Fire Detect',type:'app'},
    {id:'crop',label:'Crop Health',type:'app'},{id:'urban',label:'Urban Maps',type:'app'},
  ];
  const edgePairs=[
    ['isro','cartosat'],['isro','navic'],['isro','bhuvan'],
    ['nasa','landsat'],['nasa','jwst'],['nasa','earthdata'],
    ['esa','sentinel'],['esa','copernicus'],['esa','snap'],
    ['noaa','goes'],
    ['cartosat','bhuvan'],['sentinel','copernicus'],['landsat','earthdata'],
    ['bhuvan','qgis'],['copernicus','snap'],['earthdata','python'],
    ['gee','python'],['gee','crop'],['gee','flood'],
    ['snap','flood'],['snap','fire'],['python','crop'],
    ['python','urban'],['qgis','urban'],['goes','flood'],
    ['cartosat','urban'],['landsat','fire'],
  ];

  function resize(){
    const w=canvas.offsetWidth,h=canvas.offsetHeight||520;
    canvas.style.width=w+'px';canvas.style.height=h+'px';
    canvas.width=w*DPR;canvas.height=h*DPR;
    ctx.scale(DPR,DPR);
  }
  resize();

  const W=()=>canvas.offsetWidth,H=()=>canvas.offsetHeight||520;
  const nodes=rawNodes.map(n=>({...n,x:W()*.1+Math.random()*W()*.8,y:H()*.1+Math.random()*H()*.8,vx:0,vy:0,pinned:false}));
  const byId={};nodes.forEach(n=>byId[n.id]=n);
  const edges=edgePairs.map(([a,b])=>({s:byId[a],t:byId[b]})).filter(e=>e.s&&e.t);
  let hovered=null,dragging=null,dragOX=0,dragOY=0;

  function tick(){
    const w=W(),h=H();
    for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
      const a=nodes[i],b=nodes[j],dx=b.x-a.x,dy=b.y-a.y;
      const d=Math.sqrt(dx*dx+dy*dy)||1,f=3500/(d*d),fx=(dx/d)*f,fy=(dy/d)*f;
      a.vx-=fx;a.vy-=fy;b.vx+=fx;b.vy+=fy;
    }
    edges.forEach(({s:a,t:b})=>{
      const dx=b.x-a.x,dy=b.y-a.y,d=Math.sqrt(dx*dx+dy*dy)||1;
      const delta=(d-110)*0.04,fx=(dx/d)*delta,fy=(dy/d)*delta;
      if(!a.pinned){a.vx+=fx;a.vy+=fy}
      if(!b.pinned){b.vx-=fx;b.vy-=fy}
    });
    nodes.forEach(n=>{
      n.vx+=(w/2-n.x)*0.002;n.vy+=(h/2-n.y)*0.002;
      if(n.pinned)return;
      n.vx*=0.82;n.vy*=0.82;n.x+=n.vx;n.y+=n.vy;
      const r=types[n.type].r+4;
      n.x=Math.max(r,Math.min(w-r,n.x));n.y=Math.max(r,Math.min(h-r,n.y));
    });
  }

  function draw(){
    const w=W(),h=H();
    ctx.clearRect(0,0,w,h);
    edges.forEach(({s:a,t:b})=>{
      const highlight=hovered&&(hovered===a||hovered===b);
      ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
      ctx.strokeStyle=highlight?'rgba(74,158,255,0.55)':'rgba(255,255,255,0.08)';
      ctx.lineWidth=highlight?2:1.2;ctx.stroke();
    });
    nodes.forEach(n=>{
      const nt=types[n.type];
      const grd=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,nt.r*2.2);
      grd.addColorStop(0,nt.color+'40');grd.addColorStop(1,'transparent');
      ctx.beginPath();ctx.arc(n.x,n.y,nt.r*2.2,0,Math.PI*2);ctx.fillStyle=grd;ctx.fill();
      ctx.beginPath();ctx.arc(n.x,n.y,nt.r,0,Math.PI*2);
      ctx.fillStyle=nt.color+'cc';ctx.strokeStyle=nt.color;ctx.lineWidth=2;ctx.fill();ctx.stroke();
      ctx.fillStyle='#e2e8f0';
      ctx.font=`bold ${nt.r>22?11:9}px Inter,sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText(n.label,n.x,n.y+nt.r+12);
    });
    requestAnimationFrame(()=>{tick();draw()});
  }
  draw();

  function getPos(e){
    const rect=canvas.getBoundingClientRect();
    const cx=e.touches?e.touches[0].clientX:e.clientX;
    const cy=e.touches?e.touches[0].clientY:e.clientY;
    return{x:cx-rect.left,y:cy-rect.top};
  }
  function findNode(x,y){return nodes.find(n=>{const dx=n.x-x,dy=n.y-y;return Math.sqrt(dx*dx+dy*dy)<types[n.type].r+6})||null}
  canvas.addEventListener('mousedown',e=>{const{x,y}=getPos(e);dragging=findNode(x,y);if(dragging){dragging.pinned=true;dragOX=dragging.x-x;dragOY=dragging.y-y;canvas.style.cursor='grabbing'}});
  canvas.addEventListener('mousemove',e=>{const{x,y}=getPos(e);if(dragging){dragging.x=x+dragOX;dragging.y=y+dragOY}else{hovered=findNode(x,y);canvas.style.cursor=hovered?'grab':'default'}});
  canvas.addEventListener('mouseup',()=>{if(dragging){dragging.pinned=false;dragging=null}canvas.style.cursor='default'});
  canvas.addEventListener('mouseleave',()=>{if(dragging){dragging.pinned=false;dragging=null}hovered=null});
  canvas.addEventListener('touchstart',e=>{e.preventDefault();const{x,y}=getPos(e);dragging=findNode(x,y);if(dragging){dragging.pinned=true;dragOX=dragging.x-x;dragOY=dragging.y-y}},{passive:false});
  canvas.addEventListener('touchmove',e=>{e.preventDefault();if(!dragging)return;const{x,y}=getPos(e);dragging.x=x+dragOX;dragging.y=y+dragOY},{passive:false});
  canvas.addEventListener('touchend',()=>{if(dragging){dragging.pinned=false;dragging=null}});

  // Legend
  const legend=document.createElement('div');legend.className='kg-legend';
  legend.innerHTML=Object.entries(types).map(([k,v])=>`<span class="kg-leg-item"><span class="kg-dot" style="background:${v.color}"></span>${k.charAt(0).toUpperCase()+k.slice(1)}</span>`).join('');
  canvas.parentElement.appendChild(legend);
  window.addEventListener('resize',()=>{resize();nodes.forEach(n=>{n.x=Math.max(10,Math.min(W()-10,n.x));n.y=Math.max(10,Math.min(H()-10,n.y))})});
})();

/* ──────────────────────────────────────────────────────────────────
   10. SMOOTH SCROLL
────────────────────────────────────────────────────────────────── */
(function initScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href').slice(1),target=document.getElementById(id);
      if(!target)return;
      e.preventDefault();
      const topbarH=document.getElementById('topbar')?.offsetHeight||62;
      window.scrollTo({top:target.getBoundingClientRect().top+window.scrollY-topbarH-8,behavior:'smooth'});
    });
  });
})();

/* ──────────────────────────────────────────────────────────────────
   11. PDF GENERATION
────────────────────────────────────────────────────────────────── */
window.generatePDF=function(){
  document.body.classList.add('printing');
  setTimeout(()=>{window.print();document.body.classList.remove('printing')},300);
};

/* ──────────────────────────────────────────────────────────────────
   12. ENTRANCE ANIMATIONS
────────────────────────────────────────────────────────────────── */
(function initFadeIn(){
  const targets=document.querySelectorAll('.glass-card,.type-card,.agency-card,.sat-card,.tool-card,.ai-card,.report-card,.career-card,.rm-phase,.hack-card');
  if(!targets.length||!window.IntersectionObserver)return;
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}});
  },{threshold:0.07});
  targets.forEach(el=>{el.classList.add('fade-in');obs.observe(el)});
})();

/* ──────────────────────────────────────────────────────────────────
   13. TOPBAR SHADOW ON SCROLL
────────────────────────────────────────────────────────────────── */
(function(){
  const tb=document.getElementById('topbar');if(!tb)return;
  window.addEventListener('scroll',()=>tb.classList.toggle('scrolled',window.scrollY>20),{passive:true});
})();

/* ──────────────────────────────────────────────────────────────────
   14. BACK-TO-TOP
────────────────────────────────────────────────────────────────── */
(function(){
  const btn=document.createElement('button');
  btn.id='backToTop';btn.innerHTML='<i class="fa-solid fa-chevron-up"></i>';
  btn.title='Back to top';btn.setAttribute('aria-label','Back to top');
  document.body.appendChild(btn);
  window.addEventListener('scroll',()=>btn.classList.toggle('visible',window.scrollY>400),{passive:true});
  btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
})();

/* ── PHASE NAV BANNER — sync with sidebar collapse ── */
(function(){
  const banner=document.getElementById('phaseNavBanner');
  const sidebar=document.getElementById('sidebar');
  const toggle=document.getElementById('sidebarToggle');
  if(!banner||!sidebar||!toggle) return;
  toggle.addEventListener('click',()=>{
    setTimeout(()=>{
      banner.classList.toggle('sidebar-collapsed', sidebar.classList.contains('collapsed'));
    }, 10);
  });
})();
