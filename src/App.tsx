import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight, ArrowUp, Atom, BrainCircuit, CalendarDays, Check, ChevronDown,
  ChevronLeft, ChevronRight, Clock3, Code2, Database, Download, ExternalLink,
  GraduationCap, HeartHandshake,
  Mail, MapPin, Menu, Microscope, Network, Quote, Search, Send, Share2, Sparkles,
  Terminal, Trophy, Users, X, Zap
} from "lucide-react";

type Page = "inicio" | "investigacion" | "comunidad" | "equipo" | "unete";

const photos = {
  team: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=1200&q=85",
  group: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85",
  lab: "https://images.unsplash.com/photo-1719159381981-1327b22aff9b?auto=format&fit=crop&w=1200&q=85",
  code: "https://images.unsplash.com/photo-1632910121591-29e2484c0259?auto=format&fit=crop&w=1200&q=85",
  ai: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?auto=format&fit=crop&w=1200&q=85",
  data: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?auto=format&fit=crop&w=1200&q=85",
  campus: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=85",
  portrait: "https://images.unsplash.com/photo-1753434047547-6ff7b83f7269?auto=format&fit=crop&w=800&q=85",
};

const research = [
  { id: 1, title: "Modelo de aprendizaje adaptativo con IA para plataformas LMS", authors: "Camila Rocha, Diego Vargas", year: "2025", area: "IA", type: "Artículo", image: photos.ai, summary: "Un modelo que personaliza rutas de aprendizaje a partir del desempeño y ritmo de cada estudiante." },
  { id: 2, title: "Análisis de la calidad en procesos de desarrollo de software", authors: "Mateo Quiroga, Valeria Rojas", year: "2025", area: "Ingeniería de Software", type: "Proyecto", image: photos.code, summary: "Evaluación de prácticas ágiles y su impacto en la mantenibilidad de proyectos universitarios." },
  { id: 3, title: "Detección temprana de riesgo académico mediante ciencia de datos", authors: "Lucía Mendoza, Adrián Flores", year: "2024", area: "Ciencia de Datos", type: "Tesis", image: photos.data, summary: "Clasificación predictiva y visualización de indicadores para apoyar decisiones académicas." },
  { id: 4, title: "Marco de ciberseguridad para laboratorios universitarios", authors: "René Salvatierra, Sofía Paz", year: "2024", area: "Ciberseguridad", type: "Artículo", image: photos.lab, summary: "Protocolo replicable de auditoría, mitigación y formación en seguridad informática." },
  { id: 5, title: "Orquestación eficiente de servicios distribuidos en el borde", authors: "Alejandro Arce, Paula Céspedes", year: "2023", area: "Sistemas Distribuidos", type: "Proyecto", image: photos.ai, summary: "Arquitectura ligera para reducir latencia en servicios desplegados sobre dispositivos heterogéneos." },
  { id: 6, title: "Tutor conversacional para la enseñanza de algoritmos", authors: "María José Castro, Nicolás Peña", year: "2023", area: "Educación/EdTech", type: "Tesis", image: photos.group, summary: "Asistente que ofrece retroalimentación gradual sin revelar directamente la solución." },
];

const events = [
  { type: "Hackathon", date: "18 OCT 2024", title: "HackCochabamba: Ciudades inteligentes", desc: "36 horas, 12 equipos y una misión: mejorar la movilidad urbana con datos abiertos.", result: "Ganador: equipo Wayra Data", image: photos.team },
  { type: "Torneo", date: "24 AGO 2024", title: "Torneo interno de programación", desc: "Problemas de algoritmos, estructuras de datos y estrategia por equipos.", result: "1.er lugar: Null Pointers", image: photos.code },
  { type: "Charla", date: "14 JUN 2024", title: "IA responsable en Bolivia", desc: "Conversatorio abierto sobre sesgos, privacidad y oportunidades de la IA local.", result: "Más de 120 asistentes", image: photos.lab },
  { type: "Taller", date: "27 ABR 2024", title: "Del dato al dashboard", desc: "Taller práctico de limpieza, análisis y narración visual de datos.", result: "28 proyectos publicados", image: photos.group },
];

const people = [
  { name: "Camila Rocha", role: "Presidenta", area: "IA aplicada y educación", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
  { name: "Diego Vargas", role: "Vicepresidente", area: "Arquitectura de software", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
  { name: "Valeria Rojas", role: "Coord. de Investigación", area: "Ciencia de datos", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
  { name: "Mateo Quiroga", role: "Secretario", area: "Ciberseguridad", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
];

function Logo({ light = false }: { light?: boolean }) {
  return <div className={`logo ${light ? "logo-light" : ""}`} aria-label="SCEIS UCB">
    <span className="logo-brace">{"{"}</span><span className="logo-screen"><b>S</b><i /></span><span className="logo-brace">{"}"}</span>
    <span className="logo-copy"><strong>SCEIS</strong><small>UCB · San Pablo</small></span>
  </div>;
}

function BrandIcon({ brand }: { brand: "in" | "gh" | "f" }) {
  return <span className="brand-icon" aria-hidden="true">{brand}</span>;
}

function Btn({ children, onClick, variant = "primary", href, type = "button" }: { children: React.ReactNode; onClick?: () => void; variant?: string; href?: string; type?: "button" | "submit" }) {
  const className = `btn btn-${variant}`;
  if (href) return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>;
  return <button className={className} onClick={onClick} type={type}>{children}</button>;
}

function SectionHead({ eyebrow, title, text, action }: { eyebrow: string; title: string; text?: string; action?: React.ReactNode }) {
  return <div className="section-head"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>{action}</div>;
}

function Header({ page, go }: { page: Page; go: (p: Page) => void }) {
  const [open, setOpen] = useState(false);
  const links: [Page, string][] = [["inicio", "Inicio"], ["investigacion", "Investigación"], ["comunidad", "Comunidad"], ["equipo", "Equipo"], ["unete", "Únete"]];
  const navigate = (p: Page) => { go(p); setOpen(false); };
  return <header className="nav-wrap"><nav className="nav shell">
    <button className="logo-btn" onClick={() => navigate("inicio")}><Logo /></button>
    <div className="desktop-nav">{links.map(([p, label]) => <button key={p} className={page === p ? "active" : ""} onClick={() => navigate(p)}>{label}</button>)}</div>
    <div className="nav-actions"><Btn variant="gold" onClick={() => navigate("unete")}>Únete al reto <ArrowRight size={17} /></Btn><button className="menu-btn" onClick={() => setOpen(true)} aria-label="Abrir menú"><Menu /></button></div>
  </nav>
  {open && <div className="mobile-menu"><button className="menu-close" onClick={() => setOpen(false)} aria-label="Cerrar menú"><X /></button><Logo light /><div>{links.map(([p, label]) => <button key={p} className={page === p ? "active" : ""} onClick={() => navigate(p)}><span>0{links.findIndex(x => x[0] === p) + 1}</span>{label}<ArrowRight /></button>)}</div><Btn variant="gold" onClick={() => navigate("unete")}>Comenzar mi reto <Sparkles size={18} /></Btn></div>}
  </header>;
}

function Home({ go }: { go: (p: Page) => void }) {
  return <>
    <section className="hero grid-bg"><div className="orb orb-one" /><div className="orb orb-two" /><div className="shell hero-grid">
      <div className="hero-copy"><div className="hero-kicker"><span className="pulse" /> Sociedad científica · UCB Cochabamba</div>
        <h1>Investigamos.<br />Creamos. <span>Publicamos</span> ciencias de la computación.</h1>
        <p>Somos estudiantes que investigan IA, software y tecnología de alto impacto para transformar nuestro entorno.</p>
        <div className="hero-buttons"><Btn variant="gold" onClick={() => go("unete")}>Únete al reto <ArrowRight size={18} /></Btn><Btn variant="ghost" onClick={() => go("investigacion")}>Explora la investigación</Btn></div>
      </div>
      <div className="hero-mark" aria-hidden="true"><span>{"{"}</span><div className="monitor"><b>S</b><small>sceis@ucb:~$ _</small></div><span>{"}"}</span></div>
    </div></section>
    <section className="stats"><div className="shell">{[["28+", "publicaciones"], ["64", "miembros activos"], ["12", "hackathons y torneos"], ["9", "años de historia"]].map(([n,l]) => <div key={l}><strong>{n}</strong><span>{l}</span></div>)}</div></section>
    <section className="section shell"><SectionHead eyebrow="Lo que nos mueve" title="Ciencia que sale del aula" text="Conectamos curiosidad, método y comunidad para construir tecnología con propósito." />
      <div className="three-grid">{[
        [Microscope, "Investigamos", "Modelos, técnicas y herramientas para mejorar la calidad del software y resolver problemas reales.", "01"],
        [Share2, "Publicamos", "Difundimos conocimiento con acceso libre, rigor académico y una mirada local.", "02"],
        [Trophy, "Competimos y colaboramos", "Hackathons, torneos de programación y retos de IA para crecer juntos.", "03"]
      ].map(([Icon,t,d,n]: any) => <article className="feature-card" key={t}><span className="card-number">{n}</span><div className="icon-box"><Icon /></div><h3>{t}</h3><p>{d}</p><span className="text-link">Saber más <ArrowRight size={16} /></span></article>)}</div>
    </section>
    <section className="section tint"><div className="shell"><SectionHead eyebrow="Nuestros valores" title="Conocimiento que se comparte" />
      <div className="values-grid">{[[HeartHandshake,"Solidaridad","Compartimos nuestros trabajos con toda la comunidad universitaria."],[GraduationCap,"Formación científica","La investigación es fundamental en la producción universitaria."],[BrainCircuit,"Nuevos conocimientos","Educación científica y acceso libre al conocimiento colectivo."]].map(([Icon,t,d]:any)=><article className="value-card" key={t}><Icon /><div><h3>{t}</h3><p>{d}</p></div></article>)}</div>
    </div></section>
    <section className="section shell"><SectionHead eyebrow="Investigación abierta" title="Últimas publicaciones" text="Ideas nacidas en la UCB, listas para generar impacto." action={<button className="arrow-link" onClick={() => go("investigacion")}>Ver todas <ArrowRight /></button>} />
      <div className="research-grid">{research.slice(0,3).map(r => <ResearchCard key={r.id} item={r} onOpen={() => go("investigacion")} />)}</div>
    </section>
    <section className="section dark-section"><div className="shell"><SectionHead eyebrow="Comunidad en acción" title="Crecer también es hacerlo juntos" text="Aprendemos haciendo, compitiendo y compartiendo." action={<button className="arrow-link light" onClick={() => go("comunidad")}>Ver comunidad <ArrowRight /></button>} />
      <div className="photo-strip"><figure className="photo-large"><img src={photos.team} alt="Estudiantes colaborando frente a una computadora" /><figcaption>Hackathon 2024 <span>36 horas creando</span></figcaption></figure><img src={photos.lab} alt="Estudiantes en laboratorio de computación" /><img src={photos.group} alt="Equipo reunido en taller" /></div>
    </div></section>
    <section className="section shell collaborators"><span className="eyebrow">Con el apoyo de</span><div>{["UCB", "IEEE", "JALASOFT", "COGNOS"].map(x => <strong key={x}>{x}</strong>)}</div></section>
    <FinalCta go={go} />
  </>;
}

function ResearchCard({ item, onOpen }: { item: typeof research[0]; onOpen: () => void }) {
  return <article className="research-card"><div className="card-image"><img src={item.image} alt="" /><span>{item.area}</span></div><div className="card-body"><div className="meta"><span>{item.type}</span><i />{item.year}</div><h3>{item.title}</h3><p>{item.summary}</p><small>{item.authors}</small><button className="text-link" onClick={onOpen}>Leer investigación <ArrowRight size={16} /></button></div></article>;
}

function Research({ openArticle }: { openArticle: (id: number) => void }) {
  const [search, setSearch] = useState(""); const [year, setYear] = useState("Todos"); const [area, setArea] = useState("Todas"); const [type, setType] = useState("Todos");
  const filtered = useMemo(() => research.filter(r => (year === "Todos" || r.year === year) && (area === "Todas" || r.area === area) && (type === "Todos" || r.type === type) && r.title.toLowerCase().includes(search.toLowerCase())), [search,year,area,type]);
  return <><PageHero eyebrow="Biblioteca SCEIS" title="Investigación que se puede usar." text="Explora publicaciones, tesis y proyectos creados por estudiantes para estudiantes." icon={<Microscope />} />
    <main className="section shell research-page"><div className="searchbox"><Search /><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar por título, tema o palabra clave..." /></div>
      <div className="filter-row"><Filter label="Año" value={year} values={["Todos","2025","2024","2023","2022"]} set={setYear}/><Filter label="Área" value={area} values={["Todas","IA","Ingeniería de Software","Ciencia de Datos","Ciberseguridad","Sistemas Distribuidos","Educación/EdTech"]} set={setArea}/><Filter label="Tipo" value={type} values={["Todos","Artículo","Tesis","Proyecto"]} set={setType}/></div>
      <div className="result-count"><strong>{filtered.length} resultados</strong><span>Ordenados por más recientes</span></div>
      <div className="research-grid">{filtered.map(r=><ResearchCard key={r.id} item={r} onOpen={()=>openArticle(r.id)}/>)}</div>
      {!filtered.length && <div className="empty"><Search/><h3>No encontramos coincidencias</h3><p>Prueba con otros filtros o términos de búsqueda.</p></div>}
    </main></>;
}

function Filter({ label, value, values, set }: { label:string; value:string; values:string[]; set:(s:string)=>void }) {
  return <div className="filter-group"><b>{label}</b><div>{values.map(v=><button key={v} className={v===value?"selected":""} onClick={()=>set(v)}>{v}</button>)}</div></div>;
}

function Article({ back }: { back:()=>void }) {
  return <main className="article-page"><div className="article-top shell"><button className="back-link" onClick={back}><ChevronLeft/> Volver a investigación</button><div className="article-meta"><span>INTELIGENCIA ARTIFICIAL</span><i/>12 de mayo, 2025 <i/>8 min de lectura</div><h1>Modelo de aprendizaje adaptativo con IA para plataformas LMS</h1><p className="article-lead">Una arquitectura que aprende del ritmo de cada estudiante y adapta los contenidos sin perder de vista la agencia docente.</p><div className="author-row"><img src={people[0].image}/><img src={people[1].image}/><div><strong>Camila Rocha y Diego Vargas</strong><span>Laboratorio de IA · SCEIS UCB</span></div><Btn variant="outline"><Share2 size={17}/> Compartir</Btn><Btn><Download size={17}/> Descargar PDF</Btn></div></div>
    <div className="article-layout shell"><aside><b>EN ESTE ARTÍCULO</b>{["Resumen","El problema","Metodología","Resultados","Conclusiones"].map((x,i)=><a href={`#a${i}`} key={x} className={i===0?"active":""}>{x}</a>)}</aside><article className="article-content">
      <section id="a0" className="abstract"><span>ABSTRACT</span><p>Este trabajo presenta un modelo de recomendación que combina trazas de interacción, evaluación formativa y objetivos pedagógicos para construir rutas personalizadas en plataformas LMS.</p></section>
      <h2 id="a1">El problema que quisimos resolver</h2><p>En aulas con grupos numerosos, dos estudiantes rara vez aprenden al mismo ritmo. Sin embargo, muchas plataformas educativas siguen presentando una secuencia idéntica para todos. Esto genera frustración en quienes necesitan refuerzo y poca estimulación en quienes pueden avanzar más rápido.</p><p>Nos preguntamos si era posible adaptar la experiencia sin convertir al algoritmo en una caja negra. La respuesta debía ser útil para el estudiante y, al mismo tiempo, transparente para el docente.</p>
      <blockquote>“La personalización no reemplaza al docente; le entrega mejores señales para acompañar a cada estudiante.”</blockquote>
      <h2 id="a2">Metodología</h2><p>Construimos un prototipo sobre Moodle y trabajamos con datos anonimizados de 84 estudiantes. El modelo considera tiempo de lectura, intentos, nivel de dificultad y dominio previo. Cada recomendación incluye una explicación breve de por qué aparece.</p>
      <pre><code>{`ruta = modelo.recomendar(\n  dominio_actual,\n  objetivo_aprendizaje,\n  ritmo_estudiante\n)`}</code></pre>
      <h2 id="a3">Resultados principales</h2><p>El grupo piloto mejoró en un 18% la finalización de actividades y redujo el abandono temprano. El hallazgo más valioso fue cualitativo: los estudiantes declararon comprender mejor su propio progreso.</p>
      <h2 id="a4">Conclusiones y próximos pasos</h2><p>Los resultados justifican ampliar el estudio a más materias y evaluar su impacto durante un semestre completo. El código del prototipo será publicado bajo una licencia abierta.</p>
    </article></div>
    <section className="section tint"><div className="shell"><SectionHead eyebrow="Sigue explorando" title="Investigaciones relacionadas"/><div className="research-grid">{research.slice(1,4).map(r=><ResearchCard key={r.id} item={r} onOpen={()=>window.scrollTo(0,0)}/>)}</div></div></section></main>;
}

function PageHero({ eyebrow, title, text, icon }: { eyebrow:string;title:string;text:string;icon:React.ReactNode }) {
  return <section className="page-hero grid-bg"><div className="shell"><div><span className="eyebrow light">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div><div className="page-icon">{icon}<span>{"{ explore(); }"}</span></div></div></section>;
}

function Community() {
  const [filter,setFilter]=useState("Todos"); const [lightbox,setLightbox]=useState<string|null>(null);
  const filtered=events.filter(e=>filter==="Todos"||e.type===filter);
  return <><PageHero eyebrow="Comunidad activa" title="Las mejores ideas se construyen en equipo." text="Eventos, retos y momentos que convierten compañeros en comunidad." icon={<Users/>}/>
    <section className="section shell"><article className="next-event"><div><span className="live"><i/> PRÓXIMO EVENTO</span><h2>Reto IA: Soluciones para una UCB sostenible</h2><p>Forma un equipo, elige un problema del campus y construye un prototipo funcional en 24 horas.</p><div className="event-info"><span><CalendarDays/> 23 de agosto</span><span><MapPin/> Campus Tupuraya</span></div><Btn variant="gold">Quiero participar <ArrowRight size={17}/></Btn></div><div className="countdown">{[["12","días"],["08","hrs"],["34","min"]].map(([n,l])=><span key={l}><b>{n}</b>{l}</span>)}</div></article>
    </section>
    <section className="section tint"><div className="shell"><SectionHead eyebrow="Nuestra historia" title="Eventos que dejaron huella"/><div className="chips">{["Todos","Hackathon","Torneo","Charla","Taller"].map(x=><button className={x===filter?"selected":""} onClick={()=>setFilter(x)} key={x}>{x}</button>)}</div>
      <div className="timeline">{filtered.map((e,i)=><article key={e.title}><div className="timeline-date">{e.date}</div><div className="timeline-dot">{i+1}</div><img src={e.image} alt={e.title}/><div className="timeline-copy"><span>{e.type}</span><h3>{e.title}</h3><p>{e.desc}</p><strong><Trophy size={16}/>{e.result}</strong></div></article>)}</div>
    </div></section>
    <section className="section shell"><SectionHead eyebrow="Desde adentro" title="Momentos SCEIS"/><div className="mosaic">{[photos.team,photos.lab,photos.group,photos.code,photos.campus].map((p,i)=><button onClick={()=>setLightbox(p)} key={p}><img src={p} alt={`Actividad de la comunidad SCEIS ${i+1}`}/><span><Search/> Ver foto</span></button>)}</div></section>
    <section className="section dark-section"><div className="shell"><SectionHead eyebrow="Voces de la comunidad" title="Lo que dicen nuestros miembros"/><div className="testimonial-grid">{[
      ["“Aquí descubrí que investigar no es trabajar sola: es hacer mejores preguntas juntos.”","Lucía Mendoza","7.º semestre",people[2].image],
      ["“Mi primer hackathon cambió la forma en la que entiendo la ingeniería.”","Nicolás Peña","5.º semestre",people[1].image],
      ["“Pasé de tener curiosidad por IA a publicar mi primer artículo.”","Sofía Paz","9.º semestre",people[0].image],
    ].map(([q,n,s,img])=><article key={n}><Quote/><p>{q}</p><div><img src={img}/><span><b>{n}</b><small>{s}</small></span></div></article>)}</div></div></section>
    {lightbox&&<div className="lightbox" onClick={()=>setLightbox(null)}><button aria-label="Cerrar"><X/></button><img src={lightbox} alt="Actividad ampliada"/></div>}
  </>;
}

function Team() {
  const [filter,setFilter]=useState("Todos");
  const members=[
    ["Andrea Céspedes","Voluntario","Desarrollo web"],["René Salvatierra","Auxiliar","Ciberseguridad"],["María Castro","Tesista+","EdTech"],["Adrián Flores","Auxiliar","Ciencia de Datos"],["Paula Arce","Voluntario","IA"],["Luis Pardo","Tesista+","Sistemas Distribuidos"]
  ];
  return <><PageHero eyebrow="Personas SCEIS" title="Curiosos por naturaleza. Científicos por elección." text="Conoce a quienes convierten preguntas difíciles en proyectos que importan." icon={<Atom/>}/>
    <section className="section shell"><SectionHead eyebrow="Gestión 2025" title="Directiva actual" text="Un equipo multidisciplinario al servicio de la comunidad."/><div className="leadership-grid">{people.map(p=><article key={p.name}><div className="portrait-wrap"><img src={p.image} alt={p.name}/><span/></div><span className="role">{p.role}</span><h3>{p.name}</h3><p>{p.area}</p><div><a href="#" aria-label="LinkedIn"><BrandIcon brand="in"/></a><a href="#" aria-label="GitHub"><BrandIcon brand="gh"/></a></div></article>)}</div></section>
    <section className="section tint"><div className="shell"><SectionHead eyebrow="El laboratorio humano" title="Miembros"/><div className="chips">{["Todos","Voluntario","Auxiliar","Tesista+"].map(x=><button key={x} className={filter===x?"selected":""} onClick={()=>setFilter(x)}>{x}</button>)}</div><div className="members-grid">{members.filter(m=>filter==="Todos"||m[1]===filter).map((m)=><article key={m[0]}><div className="avatar-initial">{m[0].split(" ").map(x=>x[0]).join("")}</div><div><h3>{m[0]}</h3><span className={`member-type type-${m[1]}`}>{m[1]}</span><p>{m[2]}</p></div><a href="#" aria-label={`LinkedIn de ${m[0]}`}><BrandIcon brand="in"/></a></article>)}</div></div></section>
    <section className="section shell"><SectionHead eyebrow="Alumni" title="El vínculo continúa"/><div className="alumni-row">{[["Daniela Torrico","2019","Data Scientist · Jala"],["Mauricio López","2020","Software Engineer · Assuresoft"],["Fernanda Rivero","2021","ML Engineer · Mojix"]].map(([n,y,w])=><article key={n}><span>{y}</span><h3>{n}</h3><p>{w}</p><ExternalLink/></article>)}</div></section>
  </>;
}

function Join() {
  const [step,setStep]=useState(1); const [answers,setAnswers]=useState<Record<string,string>>({}); const [hint,setHint]=useState(false); const [challenge,setChallenge]=useState(""); const [success,setSuccess]=useState(false);
  const choose=(k:string,v:string)=>setAnswers(a=>({...a,[k]:v}));
  if(success) return <div className="success-screen grid-bg">{Array.from({length:18}).map((_,i)=><i className="confetti" style={{left:`${(i*37)%100}%`,animationDelay:`${(i%5)*.2}s`}} key={i}/>)}<div className="success-badge"><span>{"{"}</span><Check/><span>{"}"}</span></div><span className="eyebrow light">CANDIDATURA RECIBIDA</span><h1>¡Bienvenido al siguiente nivel!</h1><p>Revisa tu correo UCB. Te enviamos los próximos pasos para completar tu primer commit con la SCEIS.</p><Btn variant="gold"><Download/> Descargar mi insignia</Btn></div>;
  return <><section className="join-hero grid-bg"><div className="shell"><span className="eyebrow light">Convocatoria 2025 · abierta</span><h1>Tu primer commit en la SCEIS empieza aquí.</h1><p>No buscamos currículums perfectos. Buscamos curiosidad, ganas de aprender y personas con quienes dé gusto crear.</p><div className="terminal-box"><div><i/><i/><i/><span>sceis — terminal</span></div><code><b>➜</b> git clone sceis/tu-futuro<span className="cursor"/></code><small>Cloning into 'una-comunidad-increíble'...</small></div></div></section>
    <section className="section shell join-flow"><div className="progress"><div style={{width:`${step*33.33}%`}}/><span>PASO {step} DE 3</span></div>
      {step===1&&<div className="step-card"><span className="step-icon"><BrainCircuit/></span><h2>Descubre tu perfil</h2><p>Cuéntanos un poco de ti. No hay respuestas incorrectas.</p>
        <Quiz label="¿Qué te apasiona?" options={["Inteligencia artificial","Desarrollo web","Datos","Ciberseguridad"]} value={answers.passion} onChange={v=>choose("passion",v)}/>
        <Quiz label="¿En qué semestre estás?" options={["1.º–4.º","5.º–8.º","9.º","Ya egresé"]} value={answers.semester} onChange={v=>choose("semester",v)}/>
        <Quiz label="¿Cuánto tiempo puedes dedicar por semana?" options={["2–3 horas","4–6 horas","7+ horas"]} value={answers.time} onChange={v=>choose("time",v)}/>
        {Object.keys(answers).length>=3&&<div className="recommend"><Sparkles/><div><b>Tu perfil recomendado: {answers.semester==="9.º"?"Tesista+":answers.semester==="5.º–8.º"?"Auxiliar":"Voluntario"}</b><span>Tu curiosidad encaja muy bien con nuestra comunidad.</span></div></div>}
        <Btn onClick={()=>setStep(2)}>Continuar al mini reto <ArrowRight/></Btn>
      </div>}
      {step===2&&<div className="step-card challenge-card"><span className="step-icon"><Code2/></span><h2>Resuelve el mini reto</h2><p>Solo queremos ver cómo piensas. Puedes pedir una pista.</p><div className="code-challenge"><span>// ¿Qué valor imprime este código?</span><code>let x = [1, 2, 3, 4];<br/>x.filter(n ={">"} n % 2 === 0)<br/> .reduce((a, b) ={">"} a + b, 0);</code></div><label className="input-label">Tu respuesta<input value={challenge} onChange={e=>setChallenge(e.target.value)} placeholder="Escribe el resultado..."/></label><button className="hint" onClick={()=>setHint(!hint)}><Zap/> {hint?"Los números pares son 2 y 4.":"Necesito una pista"}</button><div className="step-actions"><Btn variant="outline" onClick={()=>setStep(1)}><ChevronLeft/> Atrás</Btn><Btn onClick={()=>setStep(3)}>Continuar <ArrowRight/></Btn></div></div>}
      {step===3&&<form className="step-card" onSubmit={e=>{e.preventDefault();setSuccess(true)}}><span className="step-icon"><Send/></span><h2>Déjanos tus datos</h2><p>Lo esencial para poder contactarte. Sin papeleo.</p><div className="form-grid"><label className="input-label">Nombre completo<input required placeholder="Ej. Alejandra Pérez"/></label><label className="input-label">Correo UCB<input type="email" required placeholder="nombre@ucb.edu.bo"/></label><label className="input-label">Semestre<select required><option>Selecciona una opción</option><option>1.º–4.º</option><option>5.º–8.º</option><option>9.º</option></select></label><label className="input-label">Área de interés<select required><option>{answers.passion||"Selecciona un área"}</option><option>IA</option><option>Desarrollo web</option><option>Datos</option></select></label><label className="input-label full">¿Qué te gustaría crear con nosotros?<textarea required placeholder="Una idea en una línea es suficiente..."/></label></div><div className="step-actions"><Btn variant="outline" onClick={()=>setStep(2)}><ChevronLeft/> Atrás</Btn><Btn variant="gold" type="submit">Enviar mi candidatura <Send/></Btn></div></form>}
    </section>
    <Memberships/>
    <Faq/>
  </>;
}

function Quiz({label,options,value,onChange}:{label:string;options:string[];value:string;onChange:(v:string)=>void}) { return <div className="quiz"><b>{label}</b><div>{options.map((o,i)=><button key={o} className={value===o?"selected":""} onClick={()=>onChange(o)}><span>0{i+1}</span>{o}{value===o&&<Check/>}</button>)}</div></div> }

function Memberships(){
  const rows=[["Voluntario","1.º–4.º","Apoya logística, eventos y a tesistas.","1 falta con aviso","Horas reconocidas + apoyo en Metodología."],["Auxiliar","5.º–8.º","Asiste en eventos y apoya Metodología.","2 faltas con aviso","Horas reconocidas + ayuda con tema de tesis."],["Tesista+","9.º","Proyecto o tesis inscrito en Seminario.","3 faltas justificadas","Apoyo SCEIS en toda su investigación."],["Ex-miembro","Egresado","Organiza y expone investigaciones.","Flexible","Certificado curricular como expositor."]];
  return <section className="section tint"><div className="shell"><SectionHead eyebrow="Un lugar para cada etapa" title="¿Cómo puedes participar?" text="Elige el nivel que acompaña tu momento académico."/><div className="membership-grid">{rows.map((r,i)=><article className={i===1?"featured":""} key={r[0]}>{i===1&&<span className="popular">MÁS ELEGIDO</span>}<div className="membership-icon">{[HeartHandshake,Code2,Microscope,GraduationCap].map((I,j)=>j===i&&<I key={j}/>)}</div><h3>{r[0]}</h3><span className="semester">{r[1]}</span><p>{r[2]}</p><ul><li><Clock3/>{r[3]}</li><li><Check/>{r[4]}</li></ul></article>)}</div></div></section>
}

function Faq(){const [open,setOpen]=useState(0); const items=[["¿Necesito experiencia previa?","No. Valoramos más tu curiosidad, constancia y ganas de aprender. Encontraremos un proyecto acorde a tu nivel."],["¿Cuánto tiempo toma participar?","Entre 2 y 6 horas semanales, según tu tipo de miembro y el proyecto en el que participes."],["¿Cuándo es la próxima convocatoria?","La convocatoria 2025 está abierta. Las entrevistas breves se realizan cada dos semanas."]];return <section className="section shell faq"><SectionHead eyebrow="Preguntas frecuentes" title="Antes de hacer commit"/><div>{items.map(([q,a],i)=><article className={open===i?"open":""} key={q}><button onClick={()=>setOpen(open===i?-1:i)}><span>{q}</span><ChevronDown/></button><p>{a}</p></article>)}</div></section>}

function FinalCta({go}:{go:(p:Page)=>void}) { return <section className="final-cta grid-bg"><div className="shell"><div><span className="eyebrow light">Tu siguiente desafío</span><h2>¿Listo para el reto de admisión?</h2><p>Tu experiencia no define tu potencial. Tu curiosidad sí.</p></div><Btn variant="gold" onClick={()=>go("unete")}>Aceptar el reto <ArrowRight/></Btn></div></section> }

function Footer({go}:{go:(p:Page)=>void}) {return <footer><div className="shell footer-grid"><div><Logo light/><p>Sociedad Científica de Estudiantes de Ingeniería de Sistemas. Investigamos, creamos y compartimos conocimiento desde la UCB.</p></div><div><h3>Síguenos</h3><div className="social"><a aria-label="LinkedIn de SCEIS" href="https://www.linkedin.com/company/sceis-ucb/" target="_blank"><BrandIcon brand="in"/></a><a aria-label="GitHub de SCEIS" href="https://github.com/SCEIS-UCB" target="_blank"><BrandIcon brand="gh"/></a><a aria-label="Facebook de SCEIS" href="https://www.facebook.com/sceis.ucb?locale=es_LA" target="_blank"><BrandIcon brand="f"/></a></div><button onClick={()=>go("investigacion")}>Investigación</button><button onClick={()=>go("comunidad")}>Comunidad</button></div><div><h3>Encuéntranos</h3><div className="location"><MapPin/><p><b>Campus Tupuraya</b><br/>Bloque A, 5.º piso<br/>Laboratorio de Sistemas</p></div><a href="mailto:sceis@ucb.edu.bo"><Mail/> sceis@ucb.edu.bo</a></div></div><div className="footer-bottom shell"><span>© 2025 SCEIS · Universidad Católica Boliviana “San Pablo”</span><span className="mono">Hecho con {"{ ciencia + comunidad }"}</span></div></footer>}

export default function App() {
  const [page,setPage]=useState<Page>("inicio"); const [article,setArticle]=useState<number|null>(null); const [showTop,setShowTop]=useState(false);
  useEffect(()=>{const fn=()=>setShowTop(window.scrollY>500);window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn)},[]);
  const go=(p:Page)=>{setPage(p);setArticle(null);window.scrollTo({top:0,behavior:"smooth"})};
  let content:React.ReactNode;
  if(article) content=<Article back={()=>{setArticle(null);window.scrollTo(0,0)}}/>; else if(page==="inicio") content=<Home go={go}/>; else if(page==="investigacion") content=<Research openArticle={setArticle}/>; else if(page==="comunidad") content=<Community/>; else if(page==="equipo") content=<Team/>; else content=<Join/>;
  return <><Header page={page} go={go}/>{content}<Footer go={go}/>{showTop&&<button className="to-top" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} aria-label="Volver arriba"><ArrowUp/></button>}</>;
}
