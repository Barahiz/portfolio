"use client";

import React, { useState } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  MapPin,
  Code2,
  Terminal,
  Cpu,
  Layers,
  Globe,
  Award,
  Maximize2,
  X,
  CheckCircle2,
  Database,
  Cloud,
  Workflow,
  Smartphone,
  Layout,
  GitPullRequest,
  Flag,
  Moon
} from 'lucide-react';

// DND Kit Imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// --- Sortable Item Component ---
function SortableItem(props: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${props.className} cursor-grab active:cursor-grabbing touch-none outline-none focus:ring-2 focus:ring-indigo-500/50 rounded-3xl`}
    >
      {props.children}
    </div>
  );
}

// --- Main Component ---
export default function Portfolio() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Grid Layout State (Total 12 cells for 4-col layout)
  const [items, setItems] = useState([
    { id: 'identity', className: 'md:col-span-2 md:row-span-2' },
    { id: 'location', className: 'md:col-span-1' },
    { id: 'education', className: 'md:col-span-2 lg:col-span-1' },
    { id: 'experience', className: 'md:col-span-2' },
    { id: 'uni-projects', className: 'md:col-span-2' }, // Expanded to 2 cols
    { id: 'certs', className: 'md:col-span-1' },
    { id: 'stack', className: 'md:col-span-1' },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  // --- Render Block Content ---
  const renderBlockContent = (id: string) => {
    switch (id) {
      case 'identity':
        return (
          <div className="h-full bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between hover:border-zinc-700 transition-colors group">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Available for hire</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                Bara Zalat
              </h1>
              <p className="text-lg text-zinc-400 leading-relaxed max-w-md">
                Software Engineer specializing in scalable systems. Currently bridging the gap between <span className="text-indigo-400">Software Engineering</span> and <span className="text-indigo-400">AI</span>.
              </p>
            </div>

            <div className="mt-8 flex gap-4">
              <SocialButton icon={<Github size={20} />} href="https://github.com/Barahiz" label="GitHub" />
              <SocialButton icon={<Linkedin size={20} />} href="https://linkedin.com/in/bara-zalat" label="LinkedIn" />
              <SocialButton icon={<Mail size={20} />} href="mailto:zalatbaraa@gmail.com" label="Email" />
            </div>
          </div>
        );
      case 'location':
        return (
          <div className="h-full bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <MapPin className="text-zinc-500" />
                <span className="text-xs font-mono text-zinc-500">LOC</span>
              </div>
              <h3 className="text-xl font-medium text-white">Darmstadt, DE</h3>
              <p className="text-sm text-zinc-500 mt-1">Tu Darmstadt (M.Sc.)</p>
            </div>
            <div className="mt-8 w-full h-16 bg-zinc-800/50 rounded-lg flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
            </div>
          </div>
        );
      case 'education':
        return (
          <div className="h-full bg-zinc-100 text-zinc-900 border border-zinc-200 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <Globe className="text-zinc-600" />
                <span className="text-xs font-bold font-mono text-zinc-500">EDU</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold tracking-tighter leading-tight">M.Sc. AI & ML</h3>
              <p className="text-zinc-600 font-medium mt-1">TU Darmstadt</p>
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-300">
              <p className="text-xs font-mono uppercase text-zinc-500 mb-1">Previously</p>
              <p className="text-sm font-semibold">B.S. Software Engineering</p>
              <p className="text-xs text-zinc-600">University Malaya (3.44 GPA)</p>
            </div>
          </div>
        );
      case 'experience':
        return (
          <div
            onClick={() => setSelectedItem('experience')}
            className="h-full bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 hover:border-zinc-500 transition-all cursor-pointer group relative"
          >
            {/* Expand icon moved to bottom right */}
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400 bg-zinc-900/80 p-2 rounded-full border border-zinc-700 backdrop-blur-sm z-10">
              <Maximize2 size={16} />
            </div>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Experience</h2>
              <Layers className="text-zinc-500" size={20} />
            </div>

            <div className="space-y-6">
              <ExperienceItem
                role="Lead Full Stack Engineer"
                company="Watches-House"
                date="2025 — Present"
                desc="Supabase, Cloudflare & Automations."
                highlight={true}
              />
              <ExperienceItem
                role="Software Eng. Intern"
                company="UMCH TECH"
                date="2024 — 2025"
                desc="Vue.js & Flutter Development."
              />
            </div>
          </div>
        );
      case 'uni-projects':
        return (
          <div
            onClick={() => setSelectedItem('uni-projects')}
            className="h-full bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 flex flex-col hover:border-zinc-500 transition-all cursor-pointer group relative"
          >
            {/* Expand icon */}
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400 bg-zinc-900/80 p-2 rounded-full border border-zinc-700 backdrop-blur-sm z-10">
              <Maximize2 size={16} />
            </div>

            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">Engineering Portfolio</h3>
                <p className="text-sm text-zinc-500 mt-1">A collection of personal ventures and academic milestones.</p>
              </div>
              <Terminal className="text-zinc-500" size={24} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 flex-1">
              {/* --- BUG CATCHER (FYP) --- */}
              <div className="group/item">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-indigo-400 font-medium text-xs tracking-wider uppercase">Final Year Project</span>
                </div>
                <h4 className="text-zinc-200 font-semibold mb-1 group-hover/item:text-indigo-400 transition-colors">BugCatcher</h4>
                <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                  Gamified mobile platform for infrastructure reporting using React Native.
                </p>
              </div>

              {/* --- BR-TODO (PERSONAL) --- */}
              <div className="group/item">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-emerald-400 font-medium text-xs tracking-wider uppercase">Personal Project</span>
                </div>
                <h4 className="text-zinc-200 font-semibold mb-1 group-hover/item:text-emerald-400 transition-colors">br-todo</h4>
                <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                  Real-time Flutter task manager featuring Firebase sync and subtask hierarchy.
                </p>
              </div>

              {/* --- PLN (AWARD) --- */}
              <div className="group/item">
                <div className="flex items-center gap-2 mb-2">
                  <Award size={14} className="text-amber-400" />
                  <span className="text-amber-400 font-medium text-xs tracking-wider uppercase">1st Place</span>
                </div>
                <h4 className="text-zinc-200 font-semibold mb-1 group-hover/item:text-amber-400 transition-colors">PLN Competition</h4>
                <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                  National Level Programming League - Open Round Winner & Finalist.
                </p>
              </div>

              {/* --- UNIVERSITY PROJECTS (ARCHIVE) --- */}
              <div className="group/item">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-zinc-500 font-medium text-xs tracking-wider uppercase">University Projects</span>
                </div>
                <h4 className="text-zinc-200 font-semibold mb-1 group-hover/item:text-zinc-400 transition-colors">Extended Portfolio</h4>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  <span className="text-xs text-zinc-500 flex items-center gap-1">
                    <span className="text-indigo-500/50">▹</span> Journey Junkies
                  </span>
                  <span className="text-xs text-zinc-500 flex items-center gap-1">
                    <span className="text-indigo-500/50">▹</span> Rajamark OCR
                  </span>
                  <span className="text-xs text-zinc-500 flex items-center gap-1">
                    <span className="text-indigo-500/50">▹</span> Book Lending App
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'certs':
        return (
          <div className="h-full bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors">
            <div>
              <div className="flex justify-between items-start mb-6">
                <Award className="text-zinc-500" />
                <span className="text-xs font-mono text-zinc-500">CERTS</span>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-white leading-tight">AWS Certified Cloud Practitioner</h4>
                  <p className="text-xs font-mono text-zinc-500 mt-1">2025</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white leading-tight">Cisco CCNA: Introduction to Networks</h4>
                  <p className="text-xs font-mono text-zinc-500 mt-1">2022</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'stack':
        return (
          <div className="h-full bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 transition-colors">
            <div className="flex justify-between items-start mb-6">
              <Code2 className="text-zinc-500" />
              <span className="text-xs font-mono text-zinc-500">STACK</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['TypeScript', 'Rust', 'Next.js', 'Supabase', 'Flutter', 'Python'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-zinc-800 rounded-full text-xs font-medium text-zinc-300 border border-zinc-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 font-sans selection:bg-indigo-500/30">

      {/* Background Noise Texture */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      <main className="relative z-10 max-w-[1200px] mx-auto p-4 md:p-8 lg:p-12">

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items}
            strategy={rectSortingStrategy}
          >
            {/* THE BENTO GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
              {items.map((item) => (
                <SortableItem key={item.id} id={item.id} className={item.className}>
                  {renderBlockContent(item.id)}
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <footer className="mt-12 flex justify-between items-center text-zinc-600 text-sm font-mono">
          <p>© 2026 Bara Zalat</p>
          <p>Designed in Darmstadt</p>
        </footer>

      </main>

      {/* --- MODAL OVERLAY --- */}
      {selectedItem && (
        <ModalOverlay id={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}

// --- SUB-COMPONENTS ---

function SocialButton({ icon, href, label }: { icon: React.ReactNode, href: string, label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onPointerDown={(e) => e.stopPropagation()}
      className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-800 hover:bg-white hover:text-black transition-all duration-300 border border-zinc-700 z-20 relative"
      aria-label={label}
    >
      {icon}
    </a>
  );
}

function ExperienceItem({ role, company, date, desc, highlight }: { role: string, company: string, date: string, desc: string, highlight?: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between group/item">
      <div className="sm:w-1/3 mb-1 sm:mb-0">
        <h4 className={`font-medium transition-colors ${highlight ? 'text-indigo-400' : 'text-white'}`}>{company}</h4>
        <span className="text-xs font-mono text-zinc-500">{date}</span>
      </div>
      <div className="sm:w-2/3">
        <h5 className="text-sm font-medium text-zinc-300 mb-1">{role}</h5>
        <p className="text-sm text-zinc-500 leading-snug">{desc}</p>
      </div>
    </div>
  );
}

// --- MODAL COMPONENT ---
function ModalOverlay({ id, onClose }: { id: string, onClose: () => void }) {
  const handleContentClick = (e: React.MouseEvent) => e.stopPropagation();

  let content;
  if (id === 'experience') {
    content = (
      <div className="space-y-12">

        {/* --- WATCHES HOUSE --- */}
        <div className="space-y-6">
          <div className="border-b border-zinc-800 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Watches-House</h2>
                <p className="text-xl text-indigo-400 font-medium">Lead Full Stack Engineer</p>
              </div>
              <span className="hidden sm:block px-3 py-1 bg-zinc-800 rounded-full text-xs font-mono text-zinc-400 border border-zinc-700">2025 — Present</span>
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              {['Supabase', 'Cloudflare', 'Next.js', 'FIB SDK', 'GitHub Actions'].map(t => (
                <span key={t} className="text-xs text-zinc-400 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">{t}</span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-mono uppercase text-zinc-500 tracking-wider">Architecture</h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-zinc-300 text-sm">
                  <Database className="w-5 h-5 text-indigo-500 shrink-0" />
                  <span>Migrated backend from Firebase to <strong>Supabase</strong> for scalability.</span>
                </li>
                <li className="flex gap-3 text-zinc-300 text-sm">
                  <Cloud className="w-5 h-5 text-indigo-500 shrink-0" />
                  <span>Hosting migration to <strong>Cloudflare</strong> (Pages & Images).</span>
                </li>
                <li className="flex gap-3 text-zinc-300 text-sm">
                  <Workflow className="w-5 h-5 text-indigo-500 shrink-0" />
                  <span>Automated data workflows via <strong>GitHub Actions</strong>.</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-mono uppercase text-zinc-500 tracking-wider">Features</h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-zinc-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span><strong>FIB Integration</strong>: SSO & Payment via Edge Functions.</span>
                </li>
                <li className="flex gap-3 text-zinc-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Developing custom Admin Dashboard to replace legacy system relying on spreadsheets.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* --- DIVIDER --- */}
        <div className="w-full h-px bg-zinc-800"></div>

        {/* --- UMCH TECH --- */}
        <div className="space-y-6">
          <div className="border-b border-zinc-800 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">UMCH TECH</h2>
                <p className="text-xl text-indigo-400 font-medium">Software Engineering Intern</p>
              </div>
              <span className="hidden sm:block px-3 py-1 bg-zinc-800 rounded-full text-xs font-mono text-zinc-400 border border-zinc-700">2024 — 2025</span>
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              {['Vue.js', 'Composition API', 'Flutter', 'Integration Testing'].map(t => (
                <span key={t} className="text-xs text-zinc-400 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">{t}</span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-mono uppercase text-zinc-500 tracking-wider">Frontend Web</h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-zinc-300 text-sm">
                  <Layout className="w-5 h-5 text-indigo-500 shrink-0" />
                  <span>Developed responsive modules using <strong>Vue.js</strong> and <strong>Composition API</strong>.</span>
                </li>
                <li className="flex gap-3 text-zinc-300 text-sm">
                  <GitPullRequest className="w-5 h-5 text-indigo-500 shrink-0" />
                  <span>Implemented API integrations for managing patient data efficiently.</span>
                </li>
                <li className="flex gap-3 text-zinc-300 text-sm">
                  <Terminal className="w-5 h-5 text-indigo-500 shrink-0" />
                  <span>Debugged and resolved complex routing issues in the portal.</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-mono uppercase text-zinc-500 tracking-wider">Mobile</h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-zinc-300 text-sm">
                  <Smartphone className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Conducted functional and integration testing for <strong>Flutter</strong> applications.</span>
                </li>
                <li className="flex gap-3 text-zinc-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Ensured application stability across different device form factors.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (id === 'uni-projects') {
    content = (
  <div className="space-y-16">
    {/* --- SECTION: PERSONAL PROJECTS --- */}
    <section className="space-y-8">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-bold tracking-[0.2em] text-emerald-500 uppercase">Personal Projects</h2>
        <div className="h-[1px] flex-1 bg-zinc-800"></div>
      </div>

      <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800/50 relative overflow-hidden group">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-3">
              <h3 className="text-3xl font-bold text-white">br-todo</h3>
              <span className="px-3 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-medium">Flutter + Firebase</span>
            </div>
            <p className="text-zinc-300 leading-relaxed max-w-2xl">
              A high-performance task management application featuring real-time data synchronization and a robust hierarchical task architecture.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Database size={14} className="text-emerald-500" /> Real-time DB
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Layers size={14} className="text-emerald-500" /> Subtasks
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Flag size={14} className="text-emerald-500" /> Priority Flags
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Moon size={14} className="text-emerald-500" /> Dark Mode
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* --- SECTION: UNIVERSITY ACHIEVEMENTS --- */}
    <section className="space-y-12">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-bold tracking-[0.2em] text-indigo-500 uppercase">University Achievements</h2>
        <div className="h-[1px] flex-1 bg-zinc-800"></div>
      </div>

      {/* --- BUG CATCHER --- */}
      <div className="space-y-6">
        <div className="border-b border-zinc-800 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-white">BugCatcher</h2>
                <span className="px-3 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-medium uppercase tracking-wide">Final Year Project</span>
              </div>
              <p className="text-lg text-zinc-400 leading-relaxed">Community-driven bug reporting platform.</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            {['React Native', 'Expo', 'TypeScript', 'Gamification', 'Citizen Science'].map(t => (
              <span key={t} className="text-xs text-zinc-400 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">{t}</span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-zinc-300 leading-relaxed">
            Led the development of a bug reporting mobile app with citizen science and gamification elements.
            The project aimed to incentivize community members to report local infrastructure issues through a game-like interface.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/50">
              <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                <Database size={16} className="text-indigo-400" />
                Technical Leadership
              </h4>
              <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-zinc-400">
                <li>Gathered requirements, conducted research, and designed the scalable database schema.</li>
                <li>Designed the entire application architecture using React Native & TypeScript.</li>
              </ul>
            </div>
            <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/50">
              <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                <Smartphone size={16} className="text-indigo-400" />
                Implementation
              </h4>
              <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-zinc-400">
                <li>Utilized Expo Go for rapid iteration and testing.</li>
                <li>Implemented a waterfall methodology with structured feedback loops.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* --- AWARD --- */}
      <div className="w-full p-1 bg-gradient-to-r from-amber-500/20 via-transparent to-transparent rounded-2xl">
        <div className="bg-zinc-900/80 border border-amber-900/30 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Award size={100} className="text-amber-500" />
          </div>
          <div className="relative z-10">
            <h3 className="text-amber-400 font-bold tracking-widest text-xs uppercase mb-2">Achievement Unlocked</h3>
            <h2 className="text-2xl font-bold text-white mb-2">Programming League National (PLN)</h2>
            <p className="text-zinc-400 text-sm mb-4">May 2024 • Team-Based Competitive Programming</p>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 font-bold text-sm">1st</span>
                <p className="text-zinc-300 text-sm"><strong>Secured 1st Place</strong> in the Open Round (Top 20 qualified).</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold text-sm">3rd</span>
                <p className="text-zinc-300 text-sm"><strong>2nd Runner-Up</strong> in the Final Round.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- OTHER UNIVERSITY PROJECTS --- */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Journey Junkies */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            Journey Junkies
            <span className="text-xs font-normal text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-full">React & Node</span>
          </h3>
          <ul className="space-y-2">
            <li className="flex gap-2 text-sm text-zinc-400">
              <span className="text-indigo-500 mt-1">▹</span>
              <span>Developed front-end components and back-end comment module.</span>
            </li>
            <li className="flex gap-2 text-sm text-zinc-400">
              <span className="text-indigo-500 mt-1">▹</span>
              <span>Participated in end-to-end testing efforts.</span>
            </li>
          </ul>
        </div>

        {/* Rajamark */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            Rajamark
            <span className="text-xs font-normal text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-full">Flutter & OCR</span>
          </h3>
          <ul className="space-y-2">
            <li className="flex gap-2 text-sm text-zinc-400">
              <span className="text-emerald-500 mt-1">▹</span>
              <span>Built OCR module for handwritten exam papers using <strong>Google Vision</strong>.</span>
            </li>
            <li className="flex gap-2 text-sm text-zinc-400">
              <span className="text-emerald-500 mt-1">▹</span>
              <span>Created large-scale Flutter app for student mark collection and management.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
);
  } else {
    content = (
      <div className="text-center py-12">
        <h3 className="text-xl text-zinc-400">Detailed view coming soon.</h3>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-zinc-950 border border-zinc-800 w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl relative animate-in zoom-in-95 duration-200 no-scrollbar"
        onClick={handleContentClick}
      >
        {/* Sticky Close Button */}
        <div className="sticky top-0 right-0 z-20 flex justify-end p-4 bg-gradient-to-b from-zinc-950 to-transparent">
          <button
            onClick={onClose}
            className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors border border-zinc-800 shadow-lg"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 md:px-8 pb-10 mt-[-60px]"> {/* Negative margin to pull content up behind sticky header area */}
          <div className="mt-16">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}