import React, { useState } from "react";
import {
  BookOpen, Home, Users, ShieldCheck, Clock, DollarSign, MessageSquare, GraduationCap,
  Target, Gift, BarChart3, Workflow, Receipt, Settings, ChevronDown, ChevronRight, ChevronLeft,
  Search, Plus, Bell, Check, CheckCircle2, ArrowRight, ArrowLeft, X, Download, AlertTriangle,
  Landmark, Plug, Send, Sparkles, Building2, Layers, CalendarDays, FileText, TrendingUp,
  Lock, MoreHorizontal, UserPlus, FilePlus, ClipboardCheck, Award, ListChecks, Inbox, HelpCircle,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell,
} from "recharts";

/* ============================= palette (matched to the recruitment prototype — plum/charcoal + gold, Manrope) ============================= */
const C = {
  primary: "#9c7e3c", primaryDark: "#7d642f", primaryBg: "#F4EBD6", primarySoft: "#FAF5E9",
  gold: "#c6a35a", goldSoft: "#d9bd80", goldGrad: "linear-gradient(135deg,#c6a35a,#9c7e3c)",
  plum: "#171320", plumHov: "#1f1a2b", plumPanel: "#1b1626", plumLine: "#2c2638", plumGrad: "linear-gradient(135deg,#241d33,#141019)",
  ink: "#1e1e28", body: "#3a3a46", slate: "#8b8b97", muted: "#b6b6bf",
  line: "#e9e9ec", line2: "#f0f0f2", page: "#f5f5f6", white: "#ffffff",
  green: "#2fae6a", greenBg: "#e8f6ef", amber: "#d99a2b", amberBg: "#fbf2e0",
  red: "#df4444", redBg: "#fbeaea", blue: "#4a7fd1", blueBg: "#eaf1fb",
  goldBg: "#F4EBD6", navy: "#171320",
};
const money = (n) => "$" + Math.round(n).toLocaleString("en-AU");
const card = { background: C.white, border: `1px solid ${C.line}`, borderRadius: 14, boxShadow: "0 1px 2px rgba(23,19,32,.04), 0 6px 18px rgba(23,19,32,.05)" };

/* ============================= tenants (multi-tenancy) ============================= */
const TENANTS = {
  platform:  { id: "platform",  name: "All Schools",        short: "★",  accent: C.gold, kind: "platform" },
  alsiraat:  { id: "alsiraat",  name: "Al Siraat College",  short: "AS", accent: "#9c7e3c", kind: "school", staff: 142, location: "Epping, VIC" },
  greenvale: { id: "greenvale", name: "Green Vale Grammar", short: "GV", accent: "#2fae6a", kind: "school", staff: 98,  location: "Truganina, VIC" },
  horizon:   { id: "horizon",   name: "Horizon College",    short: "HC", accent: "#4a7fd1", kind: "school", staff: 210, location: "Officer, VIC" },
};

const DATA = {
  alsiraat: {
    stats: { staff: 142, nextRun: "12 Jul 2026", grossMonth: 562300, superDue: 67476, leave: 5 },
    chart: [{ m: "Feb", v: 548 }, { m: "Mar", v: 551 }, { m: "Apr", v: 559 }, { m: "May", v: 557 }, { m: "Jun", v: 560 }, { m: "Jul", v: 562 }],
    employees: [
      { name: "Layla Ahmed", role: "Deputy Principal", type: "Full-time", award: "Leadership EA", rate: "$142,000 / yr", fund: "AustralianSuper", status: "Active" },
      { name: "Aisha Rahman", role: "Primary Teacher", type: "Full-time", award: "Teachers EA", rate: "$98,400 / yr", fund: "Aware Super", status: "Active" },
      { name: "Yusuf Ali", role: "Secondary Teacher — Maths", type: "Full-time", award: "Teachers EA", rate: "$101,200 / yr", fund: "HESTA", status: "Active" },
      { name: "Sarah Thompson", role: "Teaching Aide", type: "Part-time", award: "Support Staff Award", rate: "$38.20 / hr", fund: "Aware Super", status: "Active" },
      { name: "Mohammed Hassan", role: "IT Coordinator", type: "Full-time", award: "Support Staff Award", rate: "$86,000 / yr", fund: "AustralianSuper", status: "Active" },
      { name: "Fatima Sheikh", role: "Admin Officer", type: "Full-time", award: "Support Staff Award", rate: "$72,500 / yr", fund: "REST", status: "Active" },
      { name: "David Nguyen", role: "Groundskeeper", type: "Casual", award: "Support Staff Award", rate: "$34.10 / hr", fund: "Hostplus", status: "Active" },
      { name: "Grace O'Brien", role: "Librarian", type: "Part-time", award: "Support Staff Award", rate: "$41.60 / hr", fund: "Aware Super", status: "On leave" },
    ],
    payruns: [
      { period: "Fortnight ending 12 Jul 2026", pay: "14 Jul 2026", status: "Draft", emps: 142, gross: 284500 },
      { period: "Fortnight ending 28 Jun 2026", pay: "30 Jun 2026", status: "STP Lodged", emps: 141, gross: 283900 },
      { period: "Fortnight ending 14 Jun 2026", pay: "16 Jun 2026", status: "STP Lodged", emps: 140, gross: 281200 },
      { period: "Fortnight ending 31 May 2026", pay: "02 Jun 2026", status: "STP Lodged", emps: 140, gross: 279800 },
    ],
    leave: [
      { name: "Grace O'Brien", type: "Annual leave", dates: "8–19 Jul", days: 10, status: "Pending" },
      { name: "David Nguyen", type: "Personal / carer's leave", dates: "3 Jul", days: 1, status: "Pending" },
      { name: "Yusuf Ali", type: "Long service leave", dates: "1–12 Sep", days: 10, status: "Pending" },
      { name: "Aisha Rahman", type: "Annual leave", dates: "22–26 Jul", days: 5, status: "Approved" },
      { name: "Fatima Sheikh", type: "Personal / carer's leave", dates: "26 Jun", days: 1, status: "Approved" },
    ],
  },
  greenvale: {
    stats: { staff: 98, nextRun: "11 Jul 2026", grossMonth: 388400, superDue: 46608, leave: 3 },
    chart: [{ m: "Feb", v: 372 }, { m: "Mar", v: 378 }, { m: "Apr", v: 381 }, { m: "May", v: 384 }, { m: "Jun", v: 386 }, { m: "Jul", v: 388 }],
    employees: [
      { name: "Emma Wilson", role: "Head of Junior School", type: "Full-time", award: "Leadership EA", rate: "$138,000 / yr", fund: "AustralianSuper", status: "Active" },
      { name: "Omar Farah", role: "Science Teacher", type: "Full-time", award: "Teachers EA", rate: "$96,800 / yr", fund: "HESTA", status: "Active" },
      { name: "Priya Patel", role: "Wellbeing Coordinator", type: "Part-time", award: "Teachers EA", rate: "$54.10 / hr", fund: "Aware Super", status: "Active" },
      { name: "Jack Miller", role: "Facilities Officer", type: "Full-time", award: "Support Staff Award", rate: "$68,000 / yr", fund: "Hostplus", status: "Active" },
      { name: "Hannah Lee", role: "Finance Assistant", type: "Part-time", award: "Support Staff Award", rate: "$39.80 / hr", fund: "REST", status: "Active" },
    ],
    payruns: [
      { period: "Fortnight ending 11 Jul 2026", pay: "13 Jul 2026", status: "Draft", emps: 98, gross: 196200 },
      { period: "Fortnight ending 27 Jun 2026", pay: "29 Jun 2026", status: "STP Lodged", emps: 97, gross: 195400 },
      { period: "Fortnight ending 13 Jun 2026", pay: "15 Jun 2026", status: "STP Lodged", emps: 97, gross: 194100 },
    ],
    leave: [
      { name: "Priya Patel", type: "Annual leave", dates: "14–18 Jul", days: 5, status: "Pending" },
      { name: "Jack Miller", type: "Personal / carer's leave", dates: "4 Jul", days: 1, status: "Pending" },
      { name: "Omar Farah", type: "Annual leave", dates: "21–25 Jul", days: 5, status: "Pending" },
    ],
  },
  horizon: {
    stats: { staff: 210, nextRun: "12 Jul 2026", grossMonth: 831900, superDue: 99828, leave: 8 },
    chart: [{ m: "Feb", v: 802 }, { m: "Mar", v: 811 }, { m: "Apr", v: 818 }, { m: "May", v: 824 }, { m: "Jun", v: 829 }, { m: "Jul", v: 832 }],
    employees: [
      { name: "Robert Chen", role: "Principal", type: "Full-time", award: "Leadership EA", rate: "$186,000 / yr", fund: "UniSuper", status: "Active" },
      { name: "Amina Yusuf", role: "English Teacher", type: "Full-time", award: "Teachers EA", rate: "$99,600 / yr", fund: "Aware Super", status: "Active" },
      { name: "Tom Baker", role: "PE Teacher", type: "Full-time", award: "Teachers EA", rate: "$94,200 / yr", fund: "HESTA", status: "Active" },
      { name: "Sofia Rossi", role: "Enrolments Officer", type: "Full-time", award: "Support Staff Award", rate: "$74,000 / yr", fund: "AustralianSuper", status: "Active" },
      { name: "Daniel Kim", role: "Lab Technician", type: "Part-time", award: "Support Staff Award", rate: "$43.90 / hr", fund: "Hostplus", status: "Active" },
      { name: "Chloe Adams", role: "Canteen Supervisor", type: "Casual", award: "Support Staff Award", rate: "$33.70 / hr", fund: "REST", status: "Active" },
    ],
    payruns: [
      { period: "Fortnight ending 12 Jul 2026", pay: "14 Jul 2026", status: "Draft", emps: 210, gross: 421000 },
      { period: "Fortnight ending 28 Jun 2026", pay: "30 Jun 2026", status: "STP Lodged", emps: 209, gross: 419800 },
      { period: "Fortnight ending 14 Jun 2026", pay: "16 Jun 2026", status: "STP Lodged", emps: 208, gross: 417500 },
    ],
    leave: [
      { name: "Tom Baker", type: "Annual leave", dates: "7–18 Jul", days: 10, status: "Pending" },
      { name: "Daniel Kim", type: "Personal / carer's leave", dates: "2 Jul", days: 1, status: "Pending" },
      { name: "Sofia Rossi", type: "Annual leave", dates: "21–30 Jul", days: 8, status: "Pending" },
    ],
  },
};

/* ============================= navigation config (mirrors EH) ============================= */
const MENUS = [
  { id: "start-guide", label: "Start Guide", icon: BookOpen },
  { id: "home", label: "Home", icon: Home },
  { id: "people", label: "People", icon: Users, groups: [
    { heading: "Personnel", items: [
      { id: "people-list", label: "People List" }, { id: "profile", label: "Profile" },
      { id: "org-chart", label: "Organisation Chart" }, { id: "calendar", label: "Calendar" },
      { id: "contractors", label: "Contractor Employees" }, { id: "file-approvals", label: "Employee File Approvals" },
      { id: "vacancies", label: "Vacancies & Requisitions" }, { id: "offers", label: "Offers" },
    ]},
  ]},
  { id: "compliance", label: "Compliance", icon: ShieldCheck, groups: [
    { heading: "Documents", items: [
      { id: "asset-register", label: "Asset Register" }, { id: "bulk-issue", label: "Bulk Issue Documents" },
      { id: "certifications", label: "Certifications" }, { id: "company-policies", label: "Company Policies" },
      { id: "document-management", label: "Document Management" }, { id: "document-review", label: "Document Review" },
      { id: "forms", label: "Forms" }, { id: "induction-content", label: "Induction Content" }, { id: "template-library", label: "Template Library" },
    ]},
    { heading: "Safety", items: [{ id: "incidents", label: "Incidents" }, { id: "my-incidents", label: "My Incidents" }] },
  ]},
  { id: "time", label: "Time", icon: Clock, groups: [
    { heading: "Leave", items: [{ id: "my-leave", label: "My Leave" }, { id: "leave-management", label: "Leave Management" }] },
    { heading: "Rosters", items: [{ id: "rostering", label: "Rostering Management" }] },
    { heading: "Timesheets", items: [{ id: "timesheets", label: "Timesheets Management" }] },
  ]},
  { id: "pay", label: "Pay", icon: DollarSign, groups: [
    { heading: "Payroll", items: [{ id: "pay-runs", label: "Pay Runs" }, { id: "stp", label: "Single Touch Payroll" }, { id: "super", label: "Super Payments" }] },
    { heading: "My Pay", items: [{ id: "pay-slips", label: "Pay Slips" }] },
    { heading: "Expenses", items: [{ id: "expense-claims", label: "Expense Claims" }, { id: "expenses-management", label: "Expenses Management" }] },
    { heading: "Compensation", items: [{ id: "compensation", label: "Compensation Management" }] },
  ]},
  { id: "engagement", label: "Engagement", icon: MessageSquare, groups: [
    { heading: "Engage", items: [
      { id: "connect", label: "Connect" }, { id: "company-values", label: "Company Values" },
      { id: "employee-engagement", label: "Employee Engagement" }, { id: "happiness-surveys", label: "Happiness Surveys" },
      { id: "custom-surveys", label: "Custom Surveys" }, { id: "exit-interviews", label: "Exit Interviews" },
    ]},
  ]},
  { id: "development", label: "Development", icon: GraduationCap, groups: [
    { heading: "Coaching", items: [{ id: "one-on-ones", label: "1:1s" }, { id: "feedback", label: "Feedback" }] },
  ]},
  { id: "performance", label: "Performance", icon: Target, groups: [
    { heading: "Manage", items: [
      { id: "goals", label: "Goals" }, { id: "reviews-360", label: "360 Reviews" },
      { id: "performance-reviews", label: "Performance Reviews" }, { id: "nine-box", label: "9-Box Talent Grid" },
    ]},
  ]},
  { id: "benefits", label: "Benefits & Perks", icon: Gift, groups: [
    { heading: "Benefits", items: [{ id: "benefits-management", label: "Benefits Management" }] },
    { heading: "Reward Points", items: [{ id: "purchase-points", label: "Purchase Points" }, { id: "send-points", label: "Send Points" }, { id: "points-management", label: "Points Management" }] },
    { heading: "Perks", items: [{ id: "perks-overview", label: "Perks Overview" }, { id: "perks-store", label: "Perks Store" }, { id: "order-history", label: "Order History" }, { id: "my-points", label: "My Points" }] },
  ]},
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "workflows", label: "Workflows", icon: Workflow },
  { id: "billing", label: "Billing", icon: Receipt, groups: [
    { heading: "Billing", items: [{ id: "subscriptions", label: "Subscriptions" }, { id: "invoices", label: "Invoices" }] },
  ]},
  { id: "settings", label: "Settings", icon: Settings },
];
const firstItem = (m) => (m.groups ? m.groups[0].items[0].id : null);

/* ============================= primitives ============================= */
function Pill({ children, bg, fg, icon: Icon }) {
  return <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold" style={{ background: bg, color: fg }}>{Icon && <Icon size={12} />}{children}</span>;
}
function statusPill(s) {
  const G = [C.greenBg, "#1e8b50"], A = [C.amberBg, "#a9760f"], R = [C.redBg, "#c33"], B = [C.blueBg, "#3766b0"], N = [C.line2, C.slate];
  const map = { Active: G, Valid: G, Accepted: G, Approved: G, Completed: G, Paid: G, Acknowledged: G, Enrolled: G, "STP Lodged": G, Published: G,
    Pending: A, "In review": A, "In progress": A, Expiring: A, "On leave": A,
    Expired: R, Overdue: R, Declined: R, Rejected: R,
    Sent: B, Scheduled: B, Open: B, Redeemed: B, Draft: N };
  const [bg, fg] = map[s] || N;
  return <Pill bg={bg} fg={fg}>{s}</Pill>;
}
function Avatar({ name, accent, size = 34 }) {
  const i = name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return <div className="flex items-center justify-center rounded-full font-semibold text-white shrink-0" style={{ width: size, height: size, background: C.goldGrad, fontSize: size * 0.4 }}>{i}</div>;
}
function PageTitle({ title, sub, action }) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div><h1 className="text-2xl font-bold" style={{ color: C.ink }}>{title}</h1>{sub && <p className="mt-1 text-sm" style={{ color: C.slate }}>{sub}</p>}</div>
      {action}
    </div>
  );
}
function PrimaryBtn({ children, onClick, icon: Icon }) {
  return <button onClick={onClick} className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-transform active:scale-95" style={{ background: C.goldGrad }}>{Icon && <Icon size={16} />}{children}</button>;
}
function Empty({ icon: Icon = Inbox, title, text, cta }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="flex items-center justify-center rounded-2xl mb-4" style={{ width: 60, height: 60, background: C.primaryBg }}><Icon size={26} style={{ color: C.primary }} /></div>
      <div className="text-base font-bold" style={{ color: C.ink }}>{title}</div>
      <div className="mt-1 text-sm max-w-md" style={{ color: C.slate }}>{text}</div>
      {cta && <div className="mt-4"><PrimaryBtn icon={Plus}>{cta}</PrimaryBtn></div>}
    </div>
  );
}
function Section({ children, className = "" }) { return <div style={card} className={className}>{children}</div>; }

/* ============================= icon rail + submenu ============================= */
function IconRail({ active, wide, onPick }) {
  return (
    <nav className="flex flex-col shrink-0 py-3" style={{ width: wide ? 176 : 68, background: C.plum, transition: "width .15s" }}>
      <div className="flex items-center gap-2.5 px-4 mb-3" style={{ height: 34 }}>
        <div className="flex items-center justify-center shrink-0 font-bold" style={{ width: 34, height: 34, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%,#e7cd8f,#bf9a4d 60%,#8c6f30)", color: "#1a1422", fontSize: 14 }}>N</div>
        {wide && <span className="font-bold text-sm text-white">Nuclieos</span>}
      </div>
      <div className="flex-1 px-2.5 space-y-0.5 overflow-y-auto">
        {MENUS.map((m) => {
          const on = active === m.id;
          return (
            <button key={m.id} onClick={() => onPick(m)} title={m.label}
              className="w-full flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors"
              style={{ background: on ? "rgba(198,163,90,.16)" : "transparent", color: on ? C.goldSoft : "#a19bad" }}>
              <m.icon size={18} style={{ color: on ? C.gold : "#8b8598" }} className="shrink-0" />
              {wide && <span className="truncate">{m.label}</span>}
            </button>
          );
        })}
      </div>
      {wide && <div className="mx-4 mt-2 pt-3" style={{ borderTop: `1px solid ${C.plumLine}`, fontSize: 10.5, color: "#6c6779" }}>Nuclieos Payroll · v1.0</div>}
    </nav>
  );
}
function SubMenu({ menu, activeItem, onPick }) {
  return (
    <div className="flex flex-col shrink-0 py-4 overflow-y-auto" style={{ width: 236, background: C.plumPanel, borderLeft: `1px solid ${C.plumLine}` }}>
      <div className="flex items-center gap-2 px-4 mb-3">
        <ChevronLeft size={16} style={{ color: "#8b8598" }} />
        <span className="font-bold text-white">{menu.label}</span>
      </div>
      <div className="px-3 space-y-4">
        {menu.groups.map((g) => (
          <div key={g.heading}>
            <div className="px-2 mb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: "#6c6779", letterSpacing: 0.6 }}>{g.heading}</div>
            <div className="space-y-0.5">
              {g.items.map((it) => {
                const on = activeItem === it.id;
                return (
                  <button key={it.id} onClick={() => onPick(it.id)}
                    className="w-full text-left rounded-lg px-3 py-2 text-sm transition-colors"
                    style={{ background: on ? "rgba(198,163,90,.16)" : "transparent", color: on ? C.goldSoft : "#c9c5d2", fontWeight: on ? 600 : 400 }}>
                    {it.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================= top bar ============================= */
function TopBar({ tenant, setTenant }) {
  const [open, setOpen] = useState(false);
  const t = TENANTS[tenant];
  return (
    <header className="flex items-center justify-between px-5 shrink-0 relative z-20" style={{ height: 56, background: C.white, borderBottom: `1px solid ${C.line}` }}>
      <div className="flex items-center gap-3">
        <span className="font-bold" style={{ color: C.ink }}>Nuclieos Payroll</span>
        <span className="rounded-md px-2 py-0.5 text-xs font-semibold" style={{ background: C.goldBg, color: "#8A6A1E" }}>Trial</span>
        <div className="mx-1 h-5 w-px" style={{ background: C.line }} />
        {/* tenant switcher (multi-tenancy) */}
        <div className="relative">
          <button onClick={() => setOpen((o) => !o)} className="flex items-center gap-2 rounded-lg pl-1.5 pr-2.5 py-1" style={{ background: C.page, border: `1px solid ${C.line}` }}>
            <div className="flex items-center justify-center rounded-md text-white font-bold" style={{ width: 22, height: 22, background: t.accent, fontSize: 10 }}>{t.short}</div>
            <span className="text-xs font-semibold" style={{ color: C.ink }}>{t.name}</span>
            <ChevronDown size={14} style={{ color: C.slate }} />
          </button>
          {open && (
            <div className="absolute left-0 mt-2 rounded-xl overflow-hidden" style={{ width: 264, background: C.white, border: `1px solid ${C.line}`, boxShadow: "0 12px 30px rgba(16,24,40,.16)" }}>
              <div className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: C.muted }}>Switch workspace</div>
              {Object.values(TENANTS).map((x) => (
                <button key={x.id} onClick={() => { setTenant(x.id); setOpen(false); }} className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-slate-50" style={{ background: x.id === tenant ? C.primarySoft : "transparent" }}>
                  <div className="flex items-center justify-center rounded-md text-white font-bold" style={{ width: 24, height: 24, background: x.accent, fontSize: 10 }}>{x.short}</div>
                  <div className="text-left flex-1 leading-tight">
                    <div className="text-sm font-medium" style={{ color: C.ink }}>{x.name}</div>
                    <div style={{ fontSize: 10.5, color: C.muted }}>{x.kind === "platform" ? "All schools · cross-tenant" : `${x.staff} staff · ${x.location}`}</div>
                  </div>
                  {x.id === tenant && <Check size={15} style={{ color: C.green }} />}
                </button>
              ))}
              <div className="px-3 py-2 text-center" style={{ borderTop: `1px solid ${C.line}`, fontSize: 10.5, color: C.muted }}>Each school is an isolated, secure tenant</div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center justify-center rounded-lg" style={{ width: 34, height: 34, background: C.page }}><Search size={16} style={{ color: C.slate }} /></button>
        <button className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold" style={{ background: C.primaryBg, color: C.primary }}><Sparkles size={14} /> Ask AI</button>
        <button className="relative flex items-center justify-center rounded-lg" style={{ width: 34, height: 34, background: C.page }}>
          <Bell size={16} style={{ color: C.slate }} /><span className="absolute rounded-full" style={{ top: 8, right: 9, width: 6, height: 6, background: C.red }} />
        </button>
        <div className="flex items-center gap-2 pl-1">
          <Avatar name="Bilal N" size={30} />
          <span className="text-sm font-medium hidden md:inline" style={{ color: C.ink }}>Bilal N</span>
        </div>
      </div>
    </header>
  );
}

/* ============================= HOME (widget dashboard) ============================= */
function Widget({ title, icon: Icon, children, action, tint = C.slate }) {
  return (
    <Section className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2"><Icon size={16} style={{ color: tint }} /><span className="text-sm font-bold" style={{ color: C.ink }}>{title}</span></div>
        {action}
      </div>
      {children}
    </Section>
  );
}
function HomeScreen({ tenant, go }) {
  const d = DATA[tenant];
  return (
    <div>
      <PageTitle title="Welcome, Bilal" sub={`${TENANTS[tenant].name} · payroll workspace`}
        action={<button className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: C.primary }}><Plus size={15} /> Add widgets</button>} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* AI */}
        <Widget title="Ask AI" icon={Sparkles} tint={C.primary}>
          <div className="text-sm font-semibold mb-1" style={{ color: C.primary }}>Good work starts here</div>
          <div className="text-xs mb-3" style={{ color: C.slate }}>Ask anything and I'll do the heavy lifting.</div>
          {[["What can I edit?", "Find which fields you control"], ["Stay on top of things", "Your priority actions for today"], ["Review leave", "See pending requests at a glance"]].map(([a, b]) => (
            <button key={a} className="w-full flex items-center justify-between rounded-lg px-3 py-2 mb-1.5 text-left hover:bg-slate-50" style={{ border: `1px solid ${C.line}` }}>
              <div><div className="text-sm font-medium" style={{ color: C.ink }}>{a}</div><div style={{ fontSize: 11, color: C.muted }}>{b}</div></div>
              <ChevronRight size={14} style={{ color: C.muted }} />
            </button>
          ))}
        </Widget>
        {/* To Do */}
        <Widget title="To do" icon={ListChecks} action={<Pill bg={C.amberBg} fg="#8A6A1E">3</Pill>}>
          <div className="space-y-2">
            {[[`Finalise pay run — ${d.stats.nextRun}`, "Pay"], [`${d.stats.leave} leave requests to review`, "Time"], ["Complete STP declaration", "Pay"]].map(([t, tag]) => (
              <div key={t} className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: C.page }}>
                <div className="rounded-full shrink-0" style={{ width: 7, height: 7, background: C.primary }} />
                <span className="text-sm flex-1" style={{ color: C.body }}>{t}</span>
                <span style={{ fontSize: 10.5, color: C.muted }}>{tag}</span>
              </div>
            ))}
          </div>
        </Widget>
        {/* Metrics */}
        <Widget title="Metrics" icon={TrendingUp} action={<button className="text-xs font-semibold" style={{ color: C.primary }}>View report</button>}>
          <div className="flex gap-4 mb-2 text-xs" style={{ color: C.muted }}>
            <span style={{ color: C.primary, fontWeight: 600, borderBottom: `2px solid ${C.primary}` }} className="pb-1">Headcount</span>
            <span className="pb-1">Turnover</span><span className="pb-1">Salary</span>
          </div>
          <div style={{ height: 120 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={d.chart} margin={{ top: 6, right: 4, left: -22, bottom: 0 }}>
                <defs><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.primary} stopOpacity={0.25} /><stop offset="100%" stopColor={C.primary} stopOpacity={0.02} /></linearGradient></defs>
                <XAxis dataKey="m" tick={{ fontSize: 10, fill: C.muted }} axisLine={false} tickLine={false} />
                <YAxis hide /><Tooltip contentStyle={{ borderRadius: 8, border: `1px solid ${C.line}`, fontSize: 11 }} />
                <Area type="monotone" dataKey="v" stroke={C.primary} strokeWidth={2} fill="url(#hg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Widget>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {/* Getting started */}
        <div className="lg:col-span-2">
          <Widget title="Getting started" icon={ClipboardCheck}>
            <div className="space-y-1">
              {[["Set up school details", "Completed", true], ["Connect the payroll engine", "Completed", true], ["Import employees from Synergetic", "Set up", false], ["Configure awards & pay schedule", "Set up", false], ["Run your first pay run", "Start", false]].map(([t, a, done], i) => (
                <div key={t} className="flex items-center gap-3 rounded-lg px-3 py-2.5" style={{ border: `1px solid ${C.line}` }}>
                  <div className="flex items-center justify-center rounded-full text-xs font-bold shrink-0" style={{ width: 22, height: 22, background: done ? C.greenBg : C.primaryBg, color: done ? C.green : C.primary }}>{done ? <Check size={13} /> : i + 1}</div>
                  <span className="text-sm flex-1" style={{ color: C.body }}>{t}</span>
                  {done ? <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: C.green }}><CheckCircle2 size={13} /> Completed</span>
                    : <button className="text-xs font-semibold" style={{ color: C.primary }} onClick={() => go("pay", "pay-runs")}>{a} ›</button>}
                </div>
              ))}
            </div>
          </Widget>
        </div>
        {/* Launchpad */}
        <Widget title="Launchpad" icon={Plus}>
          <div className="grid grid-cols-3 gap-2">
            {[[UserPlus, "Add employee"], [FilePlus, "Add policy"], [ClipboardCheck, "Add induction"], [FileText, "Add doc"], [Award, "Certification"], [BarChart3, "Report"]].map(([Icon, l]) => (
              <button key={l} className="flex flex-col items-center gap-1.5 rounded-xl py-3 hover:bg-slate-50" style={{ border: `1px solid ${C.line}` }}>
                <div className="flex items-center justify-center rounded-lg" style={{ width: 34, height: 34, background: C.primaryBg }}><Icon size={17} style={{ color: C.primary }} /></div>
                <span className="text-xs text-center" style={{ color: C.body }}>{l}</span>
              </button>
            ))}
          </div>
        </Widget>
      </div>
    </div>
  );
}

/* ============================= START GUIDE ============================= */
function StartGuide() {
  const [tab, setTab] = useState("payroll");
  const feats = [["Time & attendance", CalendarDays], ["Rostering", Users], ["Running a pay run", DollarSign], ["Payroll reporting", BarChart3]];
  const demos = [
    ["Calculate payroll", "Automate everything from tax and super to award rates — we flag hiccups so staff get paid accurately, on time.", false],
    ["Payroll reporting", "Click-friendly reporting from leave and pay runs to super and Single Touch Payroll.", false],
    ["Effortless payroll, start to finish", "From onboarding new hires to final pays, streamline the whole process with automated calculations and built-in compliance.", true],
    ["Time and attendance", "Clean data in, clean data out — thanks to time tracking with built-in tools.", true],
  ];
  return (
    <div>
      <div className="flex gap-6 mb-5" style={{ borderBottom: `1px solid ${C.line}` }}>
        {[["hr", "HR start guide"], ["payroll", "Payroll start guide"]].map(([id, l]) => (
          <button key={id} onClick={() => setTab(id)} className="pb-3 text-sm font-semibold" style={{ color: tab === id ? C.primary : C.slate, borderBottom: tab === id ? `2px solid ${C.primary}` : "2px solid transparent" }}>{l}</button>
        ))}
      </div>
      <h2 className="text-lg font-bold mb-5" style={{ color: C.ink }}>Explore payroll features and see what we offer</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {feats.map(([l, Icon]) => (
          <div key={l} className="text-center">
            <div className="mx-auto flex items-center justify-center rounded-full mb-2" style={{ width: 46, height: 46, background: C.primaryBg }}><Icon size={20} style={{ color: C.primary }} /></div>
            <div className="text-sm font-semibold" style={{ color: C.ink }}>{l}</div>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {demos.map(([t, s, done]) => (
          <Section key={t} className="p-4 flex items-center gap-4">
            <div className="rounded-xl shrink-0 flex items-center justify-center" style={{ width: 128, height: 76, background: C.plumGrad }}>
              <DollarSign size={26} className="text-white" style={{ opacity: 0.9 }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2"><span className="font-bold" style={{ color: C.ink }}>{t}</span>{done && <Pill bg={C.greenBg} fg={C.green} icon={Check}>Completed</Pill>}</div>
              <p className="mt-1 text-sm" style={{ color: C.slate }}>{s}</p>
            </div>
            <PrimaryBtn>Watch demo</PrimaryBtn>
          </Section>
        ))}
      </div>
    </div>
  );
}

/* ============================= PEOPLE LIST ============================= */
function PeopleList({ tenant, onSelect }) {
  const d = DATA[tenant]; const [q, setQ] = useState("");
  const rows = d.employees.filter((e) => (e.name + e.role).toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <PageTitle title="People list" sub={`${d.stats.staff} employees`} action={<PrimaryBtn icon={Plus}>Add employee</PrimaryBtn>} />
      <div className="flex items-center gap-2 rounded-lg px-3 py-2 mb-4 max-w-sm" style={{ background: C.white, border: `1px solid ${C.line}` }}>
        <Search size={16} style={{ color: C.slate }} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search employees" className="flex-1 text-sm outline-none" style={{ color: C.ink }} />
      </div>
      <Section className="overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr style={{ background: C.page, color: C.slate }} className="text-left">
            {["Employee", "Award / agreement", "Type", "Base rate", "Status", ""].map((h) => <th key={h} className="font-semibold px-4 py-3">{h}</th>)}
          </tr></thead>
          <tbody>
            {rows.map((e, i) => (
              <tr key={i} onClick={() => onSelect(e)} className="cursor-pointer hover:bg-slate-50" style={{ borderTop: `1px solid ${C.line}` }}>
                <td className="px-4 py-3"><div className="flex items-center gap-3"><Avatar name={e.name} accent={TENANTS[tenant].accent} size={32} /><div className="leading-tight"><div className="font-semibold" style={{ color: C.ink }}>{e.name}</div><div style={{ fontSize: 11.5, color: C.muted }}>{e.role}</div></div></div></td>
                <td className="px-4 py-3" style={{ color: C.slate }}>{e.award}</td>
                <td className="px-4 py-3" style={{ color: C.slate }}>{e.type}</td>
                <td className="px-4 py-3 font-medium" style={{ color: C.ink }}>{e.rate}</td>
                <td className="px-4 py-3">{statusPill(e.status)}</td>
                <td className="px-4 py-3 text-right"><ChevronRight size={16} style={{ color: C.slate }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}
function EmployeeDrawer({ emp, tenant, onClose }) {
  if (!emp) return null;
  return (
    <div className="fixed inset-0 z-40 flex justify-end" style={{ background: "rgba(16,24,40,.35)" }} onClick={onClose}>
      <div className="h-full w-full max-w-md overflow-y-auto" style={{ background: C.white }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5" style={{ height: 58, borderBottom: `1px solid ${C.line}` }}>
          <div className="font-bold" style={{ color: C.ink }}>Employee profile</div>
          <button onClick={onClose} className="flex items-center justify-center rounded-lg" style={{ width: 32, height: 32, background: C.page }}><X size={17} style={{ color: C.slate }} /></button>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3"><Avatar name={emp.name} accent={TENANTS[tenant].accent} size={52} /><div><div className="text-lg font-bold" style={{ color: C.ink }}>{emp.name}</div><div style={{ fontSize: 13, color: C.muted }}>{emp.role}</div></div></div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[["Employment", emp.type], ["Award / EA", emp.award], ["Base rate", emp.rate], ["Super fund", emp.fund], ["Status", emp.status], ["Tax", "TFN declared"]].map(([k, v]) => (
              <div key={k} className="p-3 rounded-xl" style={{ background: C.page }}><div style={{ fontSize: 11, color: C.muted }}>{k}</div><div className="mt-0.5 text-sm font-semibold" style={{ color: C.ink }}>{v}</div></div>
            ))}
          </div>
          <div className="mt-5 text-sm font-bold mb-2" style={{ color: C.ink }}>Leave balances</div>
          <div className="space-y-2">
            {[["Annual leave", "14.2 days", 0.7], ["Personal / carer's", "8.6 days", 0.5], ["Long service", "31.0 days", 0.4]].map(([k, v, p]) => (
              <div key={k} className="p-3 rounded-xl" style={{ border: `1px solid ${C.line}` }}>
                <div className="flex items-center justify-between text-sm"><span style={{ color: C.slate }}>{k}</span><span className="font-semibold" style={{ color: C.ink }}>{v}</span></div>
                <div className="mt-2 h-1.5 rounded-full" style={{ background: C.line2 }}><div className="h-1.5 rounded-full" style={{ width: `${p * 100}%`, background: TENANTS[tenant].accent }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================= TIME: leave + timesheets ============================= */
function LeaveMgmt({ tenant }) {
  const d = DATA[tenant];
  return (
    <div>
      <PageTitle title="Leave management" sub="Approve requests and track balances" />
      <div className="grid grid-cols-3 gap-4 mb-4">
        {[["Pending", d.leave.filter((l) => l.status === "Pending").length, C.amber, C.amberBg], ["Approved", d.leave.filter((l) => l.status === "Approved").length, C.green, C.greenBg], ["On leave today", 2, C.primary, C.primaryBg]].map(([k, v, col, bg]) => (
          <Section key={k} className="p-4 flex items-center gap-3"><div className="flex items-center justify-center rounded-xl" style={{ width: 42, height: 42, background: bg }}><CalendarDays size={20} style={{ color: col }} /></div><div><div className="text-2xl font-bold" style={{ color: C.ink }}>{v}</div><div style={{ fontSize: 11.5, color: C.muted }}>{k}</div></div></Section>
        ))}
      </div>
      <Section className="overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr style={{ background: C.page, color: C.slate }} className="text-left">{["Employee", "Type", "Dates", "Days", "Status", ""].map((h) => <th key={h} className="font-semibold px-4 py-2.5">{h}</th>)}</tr></thead>
          <tbody>
            {d.leave.map((l, i) => (
              <tr key={i} style={{ borderTop: `1px solid ${C.line}` }}>
                <td className="px-4 py-3 font-medium" style={{ color: C.ink }}>{l.name}</td>
                <td className="px-4 py-3" style={{ color: C.slate }}>{l.type}</td><td className="px-4 py-3" style={{ color: C.slate }}>{l.dates}</td><td className="px-4 py-3" style={{ color: C.slate }}>{l.days}</td>
                <td className="px-4 py-3">{statusPill(l.status)}</td>
                <td className="px-4 py-3 text-right">{l.status === "Pending" && <div className="inline-flex gap-2"><button className="rounded-lg px-2.5 py-1 text-xs font-semibold text-white" style={{ background: C.green }}>Approve</button><button className="rounded-lg px-2.5 py-1 text-xs font-semibold" style={{ background: C.page, color: C.slate }}>Decline</button></div>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}
function TimesheetsMgmt({ tenant }) {
  const d = DATA[tenant];
  const rows = d.employees.filter((e) => e.type !== "Full-time").slice(0, 5);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  return (
    <div>
      <PageTitle title="Timesheets" sub="Week of 6 Jul 2026" action={<Pill bg={C.amberBg} fg="#8A6A1E" icon={Clock}>3 awaiting approval</Pill>} />
      <Section className="overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr style={{ background: C.page, color: C.slate }} className="text-left"><th className="font-semibold px-4 py-2.5">Employee</th>{days.map((dd) => <th key={dd} className="font-semibold px-3 py-2.5 text-center">{dd}</th>)}<th className="font-semibold px-4 py-2.5 text-right">Total</th></tr></thead>
          <tbody>
            {rows.map((e, i) => {
              const hrs = [7.6, 7.6, i % 2 ? 4 : 7.6, 7.6, i % 3 ? 6 : 7.6]; const total = hrs.reduce((a, b) => a + b, 0);
              return (<tr key={i} style={{ borderTop: `1px solid ${C.line}` }}><td className="px-4 py-3"><div className="font-medium" style={{ color: C.ink }}>{e.name}</div><div style={{ fontSize: 11, color: C.muted }}>{e.role}</div></td>{hrs.map((h, j) => <td key={j} className="px-3 py-3 text-center" style={{ color: C.slate }}>{h.toFixed(1)}</td>)}<td className="px-4 py-3 text-right font-bold" style={{ color: C.ink }}>{total.toFixed(1)}</td></tr>);
            })}
          </tbody>
        </table>
      </Section>
    </div>
  );
}

/* ============================= PAY: pay runs + wizard + STP + super + payslips ============================= */
function PayRunTable({ rows, onOpen }) {
  return (
    <div className="overflow-hidden rounded-xl" style={{ border: `1px solid ${C.line}` }}>
      <table className="w-full text-sm">
        <thead><tr style={{ background: C.page, color: C.slate }} className="text-left">{["Pay period", "Payment date", "Employees", "Gross", "Status"].map((h) => <th key={h} className="font-semibold px-4 py-2.5">{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderTop: `1px solid ${C.line}` }} className={onOpen && r.status === "Draft" ? "cursor-pointer hover:bg-slate-50" : ""} onClick={onOpen && r.status === "Draft" ? onOpen : undefined}>
              <td className="px-4 py-3 font-medium" style={{ color: C.ink }}>{r.period}</td><td className="px-4 py-3" style={{ color: C.slate }}>{r.pay}</td>
              <td className="px-4 py-3" style={{ color: C.slate }}>{r.emps}</td><td className="px-4 py-3 font-semibold" style={{ color: C.ink }}>{money(r.gross)}</td><td className="px-4 py-3">{statusPill(r.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function PayRuns({ tenant, onNewRun }) {
  const d = DATA[tenant];
  return (
    <div>
      <PageTitle title="Pay runs" sub={`Fortnightly schedule · next payment ${d.payruns[0].pay}`} action={<PrimaryBtn icon={Plus} onClick={onNewRun}>New pay run</PrimaryBtn>} />
      <div className="p-4 rounded-2xl flex items-center gap-3 mb-4" style={{ background: C.plumGrad }}>
        <div className="flex items-center justify-center rounded-xl" style={{ width: 44, height: 44, background: "rgba(255,255,255,.15)" }}><Banknote /></div>
        <div className="flex-1"><div className="text-white font-bold">{d.payruns[0].period}</div><div style={{ fontSize: 12, color: "rgba(255,255,255,.8)" }}>{d.payruns[0].emps} employees · est. {money(d.payruns[0].gross)} gross</div></div>
        <button onClick={onNewRun} className="rounded-lg px-4 py-2 text-sm font-semibold" style={{ background: C.white, color: C.primary }}>Continue draft →</button>
      </div>
      <Section className="p-2"><PayRunTable rows={d.payruns} onOpen={onNewRun} /></Section>
    </div>
  );
}
function Banknote() { return <DollarSign className="text-white" size={22} />; }

function Stepper({ step, steps }) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((label, i) => {
        const n = i + 1, done = n < step, active = n === step;
        return (
          <React.Fragment key={i}>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center rounded-full font-semibold text-xs" style={{ width: 26, height: 26, background: done ? C.green : active ? C.primary : C.line2, color: done || active ? "#fff" : C.slate }}>{done ? <Check size={14} /> : n}</div>
              <span className="text-xs font-medium hidden md:inline" style={{ color: active ? C.ink : C.muted }}>{label}</span>
            </div>
            {i < steps.length - 1 && <div className="flex-1 h-px" style={{ background: C.line, minWidth: 14 }} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}
function PayRunWizard({ tenant, onClose }) {
  const d = DATA[tenant], run = d.payruns[0];
  const [step, setStep] = useState(1), [declared, setDeclared] = useState(false);
  const steps = ["Period", "Earnings", "Tax & super", "Review", "Done"];
  const gross = run.gross, payg = Math.round(gross * 0.25), deductions = Math.round(gross * 0.006), superAmt = Math.round(gross * 0.12), net = gross - payg - deductions;
  const preview = d.employees.slice(0, 6).map((e, i) => ({ name: e.name, role: e.role, hours: e.type === "Casual" ? "38.0" : "—", gross: Math.round((gross / run.emps) * (0.8 + (i % 3) * 0.2)), warn: i === 3 }));
  return (
    <div className="fixed inset-0 z-40 flex flex-col" style={{ background: C.page }}>
      <div className="flex items-center justify-between px-6 shrink-0" style={{ height: 58, background: C.white, borderBottom: `1px solid ${C.line}` }}>
        <div className="flex items-center gap-3"><div className="flex items-center justify-center rounded-lg text-white font-bold" style={{ width: 30, height: 30, background: TENANTS[tenant].accent, fontSize: 12 }}>{TENANTS[tenant].short}</div><div className="leading-tight"><div className="font-bold text-sm" style={{ color: C.ink }}>New pay run — {TENANTS[tenant].name}</div><div style={{ fontSize: 11, color: C.muted }}>{run.period}</div></div></div>
        <button onClick={onClose} className="flex items-center justify-center rounded-lg" style={{ width: 34, height: 34, background: C.page }}><X size={18} style={{ color: C.slate }} /></button>
      </div>
      <div className="px-6 py-4 shrink-0" style={{ background: C.white, borderBottom: `1px solid ${C.line}` }}><div className="max-w-3xl mx-auto"><Stepper step={step} steps={steps} /></div></div>
      <div className="flex-1 overflow-y-auto px-6 py-6"><div className="max-w-3xl mx-auto">
        {step === 1 && (
          <Section className="p-6">
            <h3 className="text-lg font-bold mb-1" style={{ color: C.ink }}>Confirm the pay period</h3>
            <p className="text-sm mb-5" style={{ color: C.slate }}>We'll pull earnings from timesheets and apply award rates automatically.</p>
            <div className="grid grid-cols-2 gap-3">{[["Pay schedule", "Fortnightly"], ["Period", "29 Jun – 12 Jul 2026"], ["Payment date", run.pay], ["Employees", `${run.emps} active`]].map(([k, v]) => <div key={k} className="p-4 rounded-xl" style={{ background: C.page }}><div style={{ fontSize: 11, color: C.muted }}>{k}</div><div className="mt-1 font-semibold" style={{ color: C.ink }}>{v}</div></div>)}</div>
            <div className="mt-4 flex items-center gap-2 rounded-xl p-3" style={{ background: C.greenBg }}><ShieldCheck size={16} style={{ color: C.green }} /><span className="text-sm" style={{ color: C.green }}>Award & enterprise-agreement rates applied automatically by the engine.</span></div>
          </Section>
        )}
        {step === 2 && (
          <Section className="overflow-hidden">
            <div className="p-5 pb-3"><h3 className="text-lg font-bold" style={{ color: C.ink }}>Review earnings</h3><p className="text-sm" style={{ color: C.slate }}>From timesheets and contracted hours. One item needs attention.</p></div>
            <table className="w-full text-sm"><thead><tr style={{ background: C.page, color: C.slate }} className="text-left"><th className="font-semibold px-5 py-2.5">Employee</th><th className="font-semibold px-5 py-2.5">Hours</th><th className="font-semibold px-5 py-2.5 text-right">Gross</th></tr></thead>
              <tbody>{preview.map((r, i) => (<tr key={i} style={{ borderTop: `1px solid ${C.line}`, background: r.warn ? C.amberBg : "transparent" }}><td className="px-5 py-2.5"><div className="font-medium" style={{ color: C.ink }}>{r.name}</div><div style={{ fontSize: 11, color: C.muted }}>{r.role}</div></td><td className="px-5 py-2.5" style={{ color: C.slate }}>{r.hours}</td><td className="px-5 py-2.5 text-right font-semibold" style={{ color: C.ink }}>{r.warn ? <span className="inline-flex items-center gap-1" style={{ color: "#8A6A1E" }}><AlertTriangle size={13} /> timesheet pending</span> : money(r.gross)}</td></tr>))}
                <tr style={{ borderTop: `1px solid ${C.line}`, background: C.page }}><td className="px-5 py-2.5 font-semibold" style={{ color: C.ink }}>+ {run.emps - 6} more employees</td><td></td><td className="px-5 py-2.5 text-right font-bold" style={{ color: C.ink }}>{money(gross)} total</td></tr></tbody></table>
          </Section>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <Section className="p-6"><h3 className="text-lg font-bold mb-4" style={{ color: C.ink }}>Tax, super & deductions</h3>
              <div className="space-y-3">{[["Gross earnings", gross, C.ink], ["PAYG withholding", -payg, C.red], ["Pre-tax deductions", -deductions, C.red]].map(([k, v, col]) => <div key={k} className="flex items-center justify-between text-sm"><span style={{ color: C.slate }}>{k}</span><span className="font-semibold" style={{ color: col }}>{v < 0 ? "– " + money(-v) : money(v)}</span></div>)}
                <div className="flex items-center justify-between pt-3" style={{ borderTop: `1px solid ${C.line}` }}><span className="font-bold" style={{ color: C.ink }}>Net pay</span><span className="text-lg font-bold" style={{ color: C.green }}>{money(net)}</span></div></div>
            </Section>
            <div className="p-4 rounded-2xl flex items-center gap-3" style={{ background: C.primaryBg }}><div className="flex items-center justify-center rounded-xl" style={{ width: 40, height: 40, background: C.white }}><Landmark size={19} style={{ color: C.primary }} /></div><div className="flex-1"><div className="text-sm font-semibold" style={{ color: C.ink }}>Superannuation guarantee (12%)</div><div style={{ fontSize: 12, color: C.slate }}>Paid to each fund on pay day under Payday Super.</div></div><div className="text-lg font-bold" style={{ color: C.primary }}>{money(superAmt)}</div></div>
          </div>
        )}
        {step === 4 && (
          <Section className="p-6"><h3 className="text-lg font-bold mb-4" style={{ color: C.ink }}>Review & finalise</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">{[["Gross", money(gross), C.ink], ["PAYG", money(payg), C.red], ["Net pay", money(net), C.green], ["Super", money(superAmt), C.primary]].map(([k, v, col]) => <div key={k} className="p-4 rounded-xl text-center" style={{ background: C.page }}><div style={{ fontSize: 11, color: C.muted }}>{k}</div><div className="mt-1 text-lg font-bold" style={{ color: col }}>{v}</div></div>)}</div>
            <label className="flex items-start gap-3 p-4 rounded-xl cursor-pointer" style={{ background: declared ? C.greenBg : C.page, border: `1px solid ${declared ? C.green : C.line}` }}><input type="checkbox" checked={declared} onChange={(e) => setDeclared(e.target.checked)} className="mt-0.5" style={{ accentColor: C.green, width: 16, height: 16 }} /><span className="text-sm" style={{ color: C.ink }}>I declare this pay event is true and correct, and authorise its lodgement to the ATO as an <b>STP Phase 2</b> pay event.</span></label>
          </Section>
        )}
        {step === 5 && (
          <Section className="p-8 text-center">
            <div className="mx-auto flex items-center justify-center rounded-full mb-4" style={{ width: 64, height: 64, background: C.greenBg }}><CheckCircle2 size={34} style={{ color: C.green }} /></div>
            <h3 className="text-xl font-bold" style={{ color: C.ink }}>Pay run finalised</h3>
            <p className="text-sm mt-1 mb-5" style={{ color: C.slate }}>{run.period} · {money(net)} paid to {run.emps} employees</p>
            <div className="max-w-md mx-auto space-y-2 text-left">{[[Send, "STP Phase 2 pay event lodged to the ATO", C.green], [Landmark, `Super ${money(superAmt)} scheduled — reaches funds within 7 days`, C.primary], [FileText, `Payslips issued to ${run.emps} staff`, C.amber], [Download, "General-ledger journal exported to finance", C.slate]].map(([Icon, txt, col], i) => <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: C.page }}><Icon size={17} style={{ color: col }} /><span className="text-sm" style={{ color: C.ink }}>{txt}</span></div>)}</div>
          </Section>
        )}
      </div></div>
      <div className="flex items-center justify-between px-6 shrink-0" style={{ height: 66, background: C.white, borderTop: `1px solid ${C.line}` }}>
        <button onClick={() => (step === 1 ? onClose() : setStep(step - 1))} className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold" style={{ color: C.slate, background: C.page }}>{step === 1 ? "Cancel" : <><ArrowLeft size={16} /> Back</>}</button>
        <div className="text-xs hidden md:block" style={{ color: C.muted }}>Step {step} of {steps.length}</div>
        {step < 4 && <PrimaryBtn icon={ArrowRight} onClick={() => setStep(step + 1)}>Continue</PrimaryBtn>}
        {step === 4 && <button disabled={!declared} onClick={() => setStep(5)} className="inline-flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold text-white transition-transform active:scale-95" style={{ background: declared ? C.green : C.muted, opacity: declared ? 1 : 0.6, cursor: declared ? "pointer" : "not-allowed" }}><ShieldCheck size={16} /> Finalise & lodge</button>}
        {step === 5 && <PrimaryBtn onClick={onClose}>Done</PrimaryBtn>}
      </div>
    </div>
  );
}
function STP({ tenant }) {
  const d = DATA[tenant];
  const rows = d.payruns.filter((r) => r.status === "STP Lodged");
  return (
    <div>
      <PageTitle title="Single Touch Payroll" sub="Every pay event reported to the ATO (STP Phase 2)" action={<Pill bg={C.greenBg} fg={C.green} icon={ShieldCheck}>Connected to ATO</Pill>} />
      <Section className="overflow-hidden">
        <table className="w-full text-sm"><thead><tr style={{ background: C.page, color: C.slate }} className="text-left">{["Pay event", "Lodged", "Employees", "Gross", "Status"].map((h) => <th key={h} className="font-semibold px-4 py-2.5">{h}</th>)}</tr></thead>
          <tbody>{rows.map((r, i) => (<tr key={i} style={{ borderTop: `1px solid ${C.line}` }}><td className="px-4 py-3 font-medium" style={{ color: C.ink }}>{r.period}</td><td className="px-4 py-3" style={{ color: C.slate }}>{r.pay}</td><td className="px-4 py-3" style={{ color: C.slate }}>{r.emps}</td><td className="px-4 py-3 font-semibold" style={{ color: C.ink }}>{money(r.gross)}</td><td className="px-4 py-3"><Pill bg={C.greenBg} fg={C.green} icon={Check}>Accepted</Pill></td></tr>))}</tbody></table>
      </Section>
    </div>
  );
}
function Super({ tenant }) {
  const d = DATA[tenant];
  return (
    <div>
      <PageTitle title="Super payments" sub="Payday Super — contributions paid every pay day" action={<PrimaryBtn icon={Send}>Pay super batch</PrimaryBtn>} />
      <div className="grid grid-cols-3 gap-4 mb-4">
        {[["Due this cycle", money(d.stats.superDue), C.primary], ["Rate", "12% SG", C.green], ["Funds", "6 super funds", C.amber]].map(([k, v, col]) => (
          <Section key={k} className="p-4"><div style={{ fontSize: 11, color: C.muted }}>{k}</div><div className="mt-1 text-xl font-bold" style={{ color: col }}>{v}</div></Section>
        ))}
      </div>
      <Section className="overflow-hidden">
        <table className="w-full text-sm"><thead><tr style={{ background: C.page, color: C.slate }} className="text-left">{["Fund", "Employees", "Amount", "Status"].map((h) => <th key={h} className="font-semibold px-4 py-2.5">{h}</th>)}</tr></thead>
          <tbody>{[["AustralianSuper", 41, 19640], ["Aware Super", 38, 18210], ["HESTA", 29, 13890], ["Hostplus", 18, 8620], ["REST", 16, 7116]].map(([f, e, a], i) => (<tr key={i} style={{ borderTop: `1px solid ${C.line}` }}><td className="px-4 py-3 font-medium" style={{ color: C.ink }}>{f}</td><td className="px-4 py-3" style={{ color: C.slate }}>{e}</td><td className="px-4 py-3 font-semibold" style={{ color: C.ink }}>{money(a)}</td><td className="px-4 py-3"><Pill bg={C.blueBg} fg={C.blue}>Scheduled</Pill></td></tr>))}</tbody></table>
      </Section>
    </div>
  );
}
function PaySlips({ tenant }) {
  const d = DATA[tenant]; const emp = d.employees[1]; const [open, setOpen] = useState(0);
  const slips = [{ period: "29 Jun – 12 Jul 2026", pay: "14 Jul 2026", gross: 3785, net: 2842 }, { period: "15 – 28 Jun 2026", pay: "30 Jun 2026", gross: 3785, net: 2842 }, { period: "1 – 14 Jun 2026", pay: "16 Jun 2026", gross: 3785, net: 2842 }];
  return (
    <div>
      <PageTitle title="Pay slips" sub="Employee self-service view" />
      <Section className="p-4 flex items-center gap-3 mb-4"><Avatar name={emp.name} accent={TENANTS[tenant].accent} size={44} /><div className="flex-1"><div className="font-bold" style={{ color: C.ink }}>{emp.name}</div><div style={{ fontSize: 12, color: C.muted }}>{emp.role}</div></div><Pill bg={C.primaryBg} fg={C.primary}>YTD gross $52,990</Pill></Section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Section className="overflow-hidden">
          <table className="w-full text-sm"><thead><tr style={{ background: C.page, color: C.slate }} className="text-left">{["Pay period", "Paid", "Net", ""].map((h) => <th key={h} className="font-semibold px-4 py-3">{h}</th>)}</tr></thead>
            <tbody>{slips.map((s, i) => (<tr key={i} className="cursor-pointer hover:bg-slate-50" style={{ borderTop: `1px solid ${C.line}`, background: open === i ? C.primarySoft : "transparent" }} onClick={() => setOpen(i)}><td className="px-4 py-3 font-medium" style={{ color: C.ink }}>{s.period}</td><td className="px-4 py-3" style={{ color: C.slate }}>{s.pay}</td><td className="px-4 py-3 font-semibold" style={{ color: C.green }}>{money(s.net)}</td><td className="px-4 py-3 text-right"><Download size={15} style={{ color: C.primary }} /></td></tr>))}</tbody></table>
        </Section>
        <Section className="p-6">
          <div className="flex items-center justify-between mb-4"><div className="font-bold" style={{ color: C.ink }}>Payslip · {slips[open].period}</div><Pill bg={C.greenBg} fg={C.green} icon={Check}>Paid</Pill></div>
          <div className="space-y-2 text-sm">{[["Ordinary hours (76.0)", "$3,650.00"], ["Leave loading", "$135.00"], ["PAYG withholding", "– $792.00"], ["Salary sacrifice super", "– $151.00"]].map(([k, v]) => <div key={k} className="flex justify-between"><span style={{ color: C.slate }}>{k}</span><span style={{ color: C.ink }}>{v}</span></div>)}
            <div className="flex justify-between pt-2 font-bold" style={{ borderTop: `1px solid ${C.line}`, color: C.ink }}><span>Net pay</span><span style={{ color: C.green }}>$2,842.00</span></div>
            <div className="flex justify-between pt-1" style={{ color: C.muted, fontSize: 12 }}><span>Employer super (12%)</span><span>$454.20 → AustralianSuper</span></div></div>
        </Section>
      </div>
    </div>
  );
}

/* ============================= REPORTS ============================= */
function Reports() {
  const tabs = ["My reports", "All", "Compliance", "People", "Payroll", "Time", "Compensation"];
  const [tab, setTab] = useState("My reports");
  const items = [["Payroll activity summary", "Payroll"], ["Superannuation report", "Payroll"], ["STP lodgement history", "Payroll"], ["Headcount report", "People"], ["Leave liability", "Time"], ["Award reconciliation", "Compliance"]];
  return (
    <div>
      <PageTitle title="Reports" action={<PrimaryBtn icon={Plus}>Create new</PrimaryBtn>} />
      <div className="flex gap-5 mb-4 overflow-x-auto" style={{ borderBottom: `1px solid ${C.line}` }}>
        {tabs.map((t) => <button key={t} onClick={() => setTab(t)} className="pb-3 text-sm font-semibold whitespace-nowrap" style={{ color: tab === t ? C.primary : C.slate, borderBottom: tab === t ? `2px solid ${C.primary}` : "2px solid transparent" }}>{t}</button>)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(([t, cat]) => (
          <Section key={t} className="p-4">
            <div className="flex items-center justify-between mb-3"><div className="flex items-center gap-2"><span className="font-bold" style={{ color: C.ink }}>{t}</span><Pill bg={C.primaryBg} fg={C.primary}>{cat}</Pill></div><MoreHorizontal size={16} style={{ color: C.muted }} /></div>
            <div className="rounded-xl flex items-end justify-center gap-1.5 px-6 py-4" style={{ background: C.page, height: 110 }}>
              {[0.5, 0.8, 0.4, 1, 0.6, 0.75].map((h, i) => <div key={i} className="rounded-t" style={{ width: 16, height: `${h * 70}px`, background: i === 3 ? C.primary : C.primaryBg }} />)}
            </div>
            <div className="mt-3 flex items-center justify-between"><span style={{ fontSize: 12, color: C.muted }}>Updated in real time</span><button className="text-xs font-semibold inline-flex items-center gap-1" style={{ color: C.primary }}>Run report <ArrowRight size={12} /></button></div>
          </Section>
        ))}
      </div>
    </div>
  );
}

/* ============================= WORKFLOWS ============================= */
function Workflows() {
  const filters = ["All workflows", "Expenses", "Leave", "Onboarding", "Offboarding", "Forms", "Reviews", "Recruitment"];
  const [f, setF] = useState("All workflows");
  const cards = [
    ["Leave", "Leave approvals workflow", "Processes leave request approvals."],
    ["Payroll", "Pay run approval workflow", "Routes each pay run for sign-off before lodgement."],
    ["Expenses", "Expense approvals workflow", "Processes expense request approvals."],
    ["Onboarding", "New employee onboarding", "Guides a new hire from offer to first pay."],
  ];
  return (
    <div>
      <PageTitle title="Workflow template hub" sub="Discover, adopt and set up workflows to automate your processes" action={<PrimaryBtn icon={Plus}>Create new</PrimaryBtn>} />
      <div className="flex gap-6 mb-5" style={{ borderBottom: `1px solid ${C.line}` }}>
        <button className="pb-3 text-sm font-semibold" style={{ color: C.primary, borderBottom: `2px solid ${C.primary}` }}>Manage workflows</button>
        <button className="pb-3 text-sm font-semibold" style={{ color: C.slate }}>Browse templates</button>
      </div>
      <div className="flex gap-5">
        <div className="shrink-0" style={{ width: 190 }}>
          {filters.map((x) => <button key={x} onClick={() => setF(x)} className="w-full text-left rounded-lg px-3 py-2 text-sm mb-0.5" style={{ background: f === x ? C.primaryBg : "transparent", color: f === x ? C.primary : C.body, fontWeight: f === x ? 600 : 400 }}>{x}</button>)}
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {cards.map(([tag, title, desc]) => (
            <Section key={title} className="p-4">
              <div className="flex items-center justify-between mb-3"><div className="flex items-center gap-2"><div className="flex items-center justify-center rounded-lg" style={{ width: 30, height: 30, background: C.primaryBg }}><Workflow size={15} style={{ color: C.primary }} /></div><span className="text-xs font-semibold" style={{ color: C.slate }}>{tag}</span></div><MoreHorizontal size={15} style={{ color: C.muted }} /></div>
              <div className="font-bold text-sm mb-0.5" style={{ color: C.ink }}>{title}</div>
              <div style={{ fontSize: 11, color: C.muted }} className="mb-3">Default</div>
              <p className="text-sm mb-3" style={{ color: C.slate }}>{desc}</p>
              <div className="flex items-center justify-between"><span className="inline-flex items-center gap-1" style={{ fontSize: 11, color: C.muted }}><Lock size={11} /> Locked default</span><Pill bg={C.greenBg} fg={C.green}>Active</Pill></div>
            </Section>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================= BILLING ============================= */
function Subscriptions() {
  return (
    <div>
      <PageTitle title="Subscriptions" sub="Your Nuclieos Payroll plan" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Section className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4"><div><div className="text-lg font-bold" style={{ color: C.ink }}>Payroll — Standard</div><div className="text-sm" style={{ color: C.slate }}>Billed monthly · per active employee</div></div><Pill bg={C.greenBg} fg={C.green}>Active</Pill></div>
          <div className="grid grid-cols-3 gap-3">{[["Active employees", "142"], ["Engine licence", "Per-employee"], ["Next invoice", "1 Aug 2026"]].map(([k, v]) => <div key={k} className="p-3 rounded-xl" style={{ background: C.page }}><div style={{ fontSize: 11, color: C.muted }}>{k}</div><div className="mt-0.5 font-semibold" style={{ color: C.ink }}>{v}</div></div>)}</div>
        </Section>
        <Section className="p-5"><div className="text-sm font-bold mb-2" style={{ color: C.ink }}>Included</div><div className="space-y-2">{["Unlimited pay runs", "STP Phase 2 lodgement", "Payday Super", "Award & EA interpretation", "Self-service payslips"].map((x) => <div key={x} className="flex items-center gap-2 text-sm" style={{ color: C.body }}><CheckCircle2 size={15} style={{ color: C.green }} /> {x}</div>)}</div></Section>
      </div>
    </div>
  );
}
function Invoices() {
  const rows = [["INV-2026-07", "1 Jul 2026", "$1,988.00", "Paid"], ["INV-2026-06", "1 Jun 2026", "$1,974.00", "Paid"], ["INV-2026-05", "1 May 2026", "$1,960.00", "Paid"]];
  return (
    <div>
      <PageTitle title="Invoices" sub="Billing history" />
      <Section className="overflow-hidden">
        <table className="w-full text-sm"><thead><tr style={{ background: C.page, color: C.slate }} className="text-left">{["Invoice", "Date", "Amount", "Status", ""].map((h) => <th key={h} className="font-semibold px-4 py-3">{h}</th>)}</tr></thead>
          <tbody>{rows.map((r, i) => (<tr key={i} style={{ borderTop: `1px solid ${C.line}` }}><td className="px-4 py-3 font-medium" style={{ color: C.ink }}>{r[0]}</td><td className="px-4 py-3" style={{ color: C.slate }}>{r[1]}</td><td className="px-4 py-3 font-semibold" style={{ color: C.ink }}>{r[2]}</td><td className="px-4 py-3"><Pill bg={C.greenBg} fg={C.green}>{r[3]}</Pill></td><td className="px-4 py-3 text-right"><button className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: C.primary }}><Download size={13} /> PDF</button></td></tr>))}</tbody></table>
      </Section>
    </div>
  );
}

/* ============================= SETTINGS ============================= */
function SettingsScreen() {
  const groups = [
    ["Company", Building2, ["Company Details", "Employing Entities", "Locations", "Primary Contacts", "Branding", "Employment Details"]],
    ["Payroll", DollarSign, ["Cost Centres", "Tax Declaration", "Company Default Super Fund", "ATO Integration", "Expense Categories & Policies"]],
    ["People", Users, ["People Controls", "Employee Profile Fields", "Additional Information", "Groups", "File Approvals", "Mandatory Fields"]],
    ["Time & Attendance", Clock, ["Leave Categories", "Blackout Periods", "Public Holidays", "Work Sites & Positions", "Timesheets", "Clock In & Out", "Kiosk (Time Clock)"]],
    ["Security & Access", Lock, ["System Setup", "Permissions", "Authorising Signatory", "Single Sign-On (SSO)", "Two-Factor Authentication", "Subscriptions & Billing"]],
    ["Notifications", Bell, ["Organisation Emails", "My Notifications"]],
    ["Integrations", Plug, ["Payroll Engine", "Synergetic", "Super Clearing House", "General Ledger Export"]],
    ["Multi-tenant", Layers, ["Tenants (3 schools)", "Tenant Isolation", "School Onboarding", "Per-school Branding"]],
  ];
  return (
    <div>
      <PageTitle title="Settings" />
      <div className="flex items-center gap-2 rounded-lg px-3 py-2 mb-5 max-w-sm" style={{ background: C.white, border: `1px solid ${C.line}` }}><Search size={16} style={{ color: C.slate }} /><input placeholder="Search settings" className="flex-1 text-sm outline-none" /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {groups.map(([title, Icon, links]) => (
          <Section key={title} className="p-4">
            <div className="flex items-center gap-2 mb-3"><div className="flex items-center justify-center rounded-lg" style={{ width: 30, height: 30, background: C.primaryBg }}><Icon size={16} style={{ color: C.primary }} /></div><span className="font-bold text-sm" style={{ color: C.ink }}>{title}</span></div>
            <div className="space-y-1.5">{links.map((l) => <div key={l} className="text-sm cursor-pointer hover:underline" style={{ color: C.primary }}>{l}</div>)}</div>
          </Section>
        ))}
      </div>
    </div>
  );
}

/* ============================= platform (cross-tenant) ============================= */
function PlatformDashboard({ setTenant }) {
  const schools = ["alsiraat", "greenvale", "horizon"];
  const totalStaff = schools.reduce((a, id) => a + DATA[id].stats.staff, 0);
  const totalGross = schools.reduce((a, id) => a + DATA[id].stats.grossMonth, 0);
  const bar = schools.map((id) => ({ name: TENANTS[id].short, v: Math.round(DATA[id].stats.grossMonth / 1000), full: TENANTS[id].name, accent: TENANTS[id].accent }));
  return (
    <div>
      <PageTitle title="Platform overview" sub="One codebase, many isolated school tenants" />
      <div className="p-4 rounded-2xl flex items-center gap-3 mb-5" style={{ background: C.primaryBg }}>
        <Layers size={20} style={{ color: C.primary }} />
        <div><div className="text-sm font-bold" style={{ color: C.primaryDark }}>Multi-school platform</div><div style={{ fontSize: 12, color: C.primary }}>Pick a school to manage its payroll, or onboard a new one in ~1 day.</div></div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {[["Schools live", "3", Building2], ["Total employees", totalStaff, Users], ["Monthly payroll", money(totalGross), DollarSign], ["Compliance", "All OK", ShieldCheck]].map(([k, v, Icon]) => (
          <Section key={k} className="p-4"><div className="flex items-center justify-between"><div><div className="text-xs font-medium" style={{ color: C.slate }}>{k}</div><div className="mt-1 text-2xl font-bold" style={{ color: C.ink }}>{v}</div></div><div className="flex items-center justify-center rounded-xl" style={{ width: 40, height: 40, background: C.primaryBg }}><Icon size={19} style={{ color: C.primary }} /></div></div></Section>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-3">
          {schools.map((id) => { const t = TENANTS[id], s = DATA[id].stats; return (
            <button key={id} onClick={() => setTenant(id)} className="w-full p-4 flex items-center gap-4 text-left transition-transform active:scale-95" style={card}>
              <div className="flex items-center justify-center rounded-xl text-white font-bold" style={{ width: 46, height: 46, background: t.accent }}>{t.short}</div>
              <div className="flex-1"><div className="font-semibold" style={{ color: C.ink }}>{t.name}</div><div style={{ fontSize: 12, color: C.muted }}>{t.location} · {s.staff} staff</div></div>
              <div className="text-right mr-2"><div className="text-sm font-bold" style={{ color: C.ink }}>{money(s.grossMonth)}</div><div style={{ fontSize: 11, color: C.muted }}>monthly gross</div></div>
              <Pill bg={C.greenBg} fg={C.green} icon={ShieldCheck}>STP OK</Pill><ChevronRight size={18} style={{ color: C.slate }} />
            </button>
          ); })}
        </div>
        <Section className="p-5"><div className="text-sm font-bold mb-3" style={{ color: C.ink }}>Payroll by school</div>
          <div style={{ height: 240 }}><ResponsiveContainer width="100%" height="100%"><BarChart data={bar} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" stroke={C.line} vertical={false} /><XAxis dataKey="name" tick={{ fontSize: 11, fill: C.slate }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 11, fill: C.slate }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}k`} /><Tooltip formatter={(v, n, p) => [`$${v}k`, p.payload.full]} contentStyle={{ borderRadius: 10, border: `1px solid ${C.line}`, fontSize: 12 }} /><Bar dataKey="v" radius={[6, 6, 0, 0]}>{bar.map((e, i) => <Cell key={i} fill={e.accent} />)}</Bar></BarChart></ResponsiveContainer></div>
        </Section>
      </div>
    </div>
  );
}

/* ============================= generic screen templates ============================= */
function TCell({ v, bold, accent = C.primary }) {
  if (v === null || v === undefined) return <span style={{ color: C.muted }}>—</span>;
  if (typeof v === "object") {
    if ("p" in v) return statusPill(v.p);
    if ("money" in v) return <span className="font-semibold" style={{ color: C.ink }}>{money(v.money)}</span>;
    if ("bar" in v) { const p = v.bar, col = p > 0.66 ? C.green : p > 0.33 ? C.amber : C.red; return (
      <div className="flex items-center gap-2" style={{ minWidth: 130 }}><div className="h-1.5 rounded-full flex-1" style={{ background: C.line2 }}><div className="h-1.5 rounded-full" style={{ width: `${p * 100}%`, background: col }} /></div><span className="text-xs shrink-0" style={{ color: C.slate }}>{v.label || Math.round(p * 100) + "%"}</span></div>); }
    if ("av" in v) return (<div className="flex items-center gap-2.5"><Avatar name={v.av} accent={accent} size={30} /><div className="leading-tight"><div className="font-medium" style={{ color: C.ink }}>{v.av}</div>{v.sub && <div style={{ fontSize: 11, color: C.muted }}>{v.sub}</div>}</div></div>);
    if ("act" in v) return (<div className="inline-flex gap-2">{v.act.map((a, i) => <button key={i} className="rounded-lg px-2.5 py-1 text-xs font-semibold" style={i === 0 ? { background: C.green, color: "#fff" } : { background: C.page, color: C.slate }}>{a}</button>)}</div>);
    if ("tag" in v) return <Pill bg={C.primaryBg} fg={C.primary}>{v.tag}</Pill>;
  }
  return <span style={{ color: bold ? C.ink : C.slate, fontWeight: bold ? 600 : 400 }}>{v}</span>;
}
function DataTable({ cols, rows, accent }) {
  return (<Section className="overflow-hidden"><table className="w-full text-sm"><thead><tr style={{ background: C.page, color: C.slate }} className="text-left">{cols.map((h, i) => <th key={i} className="font-semibold px-4 py-3">{h}</th>)}</tr></thead><tbody>{rows.map((r, i) => <tr key={i} style={{ borderTop: `1px solid ${C.line}` }}>{r.map((cell, j) => <td key={j} className="px-4 py-3"><TCell v={cell} bold={j === 0} accent={accent} /></td>)}</tr>)}</tbody></table></Section>);
}
function Chips({ chips }) {
  return (<div className="flex flex-wrap gap-3 mb-4">{chips.map((c, i) => <Section key={i} className="px-4 py-3 flex items-center gap-3"><div className="flex items-center justify-center rounded-lg" style={{ width: 36, height: 36, background: c.bg || C.primaryBg }}>{c.icon && <c.icon size={17} style={{ color: c.fg || C.primary }} />}</div><div><div className="text-xl font-bold" style={{ color: C.ink }}>{c.value}</div><div style={{ fontSize: 11, color: C.muted }}>{c.label}</div></div></Section>)}</div>);
}
function TableScreen({ title, sub, action, chips, cols, rows, tenant }) {
  const act = action === undefined ? <PrimaryBtn icon={Plus}>New</PrimaryBtn> : action;
  return (<div><PageTitle title={title} sub={sub} action={act} />{chips && <Chips chips={chips} />}<DataTable cols={cols} rows={rows} accent={tenant ? TENANTS[tenant].accent : C.primary} /></div>);
}
function CardGridScreen({ title, sub, action, cards, cols = 3 }) {
  const gc = cols === 2 ? "md:grid-cols-2" : cols === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3";
  return (<div><PageTitle title={title} sub={sub} action={action} /><div className={`grid grid-cols-1 ${gc} gap-4`}>{cards.map((c, i) => (
    <Section key={i} className="p-4">
      <div className="flex items-start justify-between mb-2"><div className="flex items-center justify-center rounded-xl" style={{ width: 40, height: 40, background: C.primaryBg }}>{React.createElement(c.icon || FileText, { size: 19, style: { color: C.primary } })}</div>{c.pill && statusPill(c.pill)}</div>
      <div className="font-bold" style={{ color: C.ink }}>{c.title}</div>
      {c.desc && <div className="mt-0.5 text-sm" style={{ color: C.slate }}>{c.desc}</div>}
      {c.bar != null && (<div className="mt-3"><div className="h-1.5 rounded-full" style={{ background: C.line2 }}><div className="h-1.5 rounded-full" style={{ width: `${c.bar * 100}%`, background: C.primary }} /></div><div className="mt-1 text-xs" style={{ color: C.muted }}>{Math.round(c.bar * 100)}% complete</div></div>)}
      {(c.meta || c.action) && <div className="mt-3 flex items-center justify-between"><span style={{ fontSize: 12, color: C.muted }}>{c.meta}</span>{c.action && <button className="text-xs font-semibold inline-flex items-center gap-1" style={{ color: C.primary }}>{c.action}<ArrowRight size={12} /></button>}</div>}
    </Section>))}</div></div>);
}
function StatDashboard({ title, sub, action, stats, chart, chartLabel, table, tenant }) {
  return (<div><PageTitle title={title} sub={sub} action={action} />
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">{stats.map((s, i) => <Section key={i} className="p-4"><div className="flex items-center justify-between"><div><div className="text-xs font-medium" style={{ color: C.slate }}>{s.label}</div><div className="mt-1 text-2xl font-bold" style={{ color: C.ink }}>{s.value}</div>{s.sub && <div style={{ fontSize: 11, color: C.muted }}>{s.sub}</div>}</div>{s.icon && <div className="flex items-center justify-center rounded-xl" style={{ width: 40, height: 40, background: C.primaryBg }}><s.icon size={19} style={{ color: C.primary }} /></div>}</div></Section>)}</div>
    {chart && <Section className="p-5 mb-5"><div className="text-sm font-bold mb-3" style={{ color: C.ink }}>{chartLabel}</div><div style={{ height: 210 }}><ResponsiveContainer width="100%" height="100%"><AreaChart data={chart} margin={{ top: 6, right: 6, left: -14, bottom: 0 }}><defs><linearGradient id="sdg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.primary} stopOpacity={0.22} /><stop offset="100%" stopColor={C.primary} stopOpacity={0.02} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke={C.line} vertical={false} /><XAxis dataKey="m" tick={{ fontSize: 11, fill: C.slate }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 11, fill: C.slate }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${C.line}`, fontSize: 12 }} /><Area type="monotone" dataKey="v" stroke={C.primary} strokeWidth={2.5} fill="url(#sdg)" /></AreaChart></ResponsiveContainer></div></Section>}
    {table && <DataTable cols={table.cols} rows={table.rows} accent={tenant ? TENANTS[tenant].accent : C.primary} />}
  </div>);
}

/* ============================= custom screens ============================= */
function ProfileScreen({ tenant }) {
  const e = DATA[tenant].employees[0];
  const box = (k, v) => <div className="p-3 rounded-xl" style={{ background: C.page }}><div style={{ fontSize: 11, color: C.muted }}>{k}</div><div className="mt-0.5 text-sm font-semibold" style={{ color: C.ink }}>{v}</div></div>;
  return (<div>
    <Section className="p-5 flex items-center gap-4 mb-4"><Avatar name={e.name} accent={TENANTS[tenant].accent} size={60} /><div className="flex-1"><div className="text-xl font-bold" style={{ color: C.ink }}>{e.name}</div><div className="text-sm" style={{ color: C.slate }}>{e.role} · {TENANTS[tenant].name}</div></div>{statusPill(e.status)}</Section>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Section className="p-5"><div className="text-sm font-bold mb-3" style={{ color: C.ink }}>Personal details</div><div className="grid grid-cols-2 gap-3">{box("Email", e.name.split(" ")[0].toLowerCase() + "@alsiraat.vic.edu.au")}{box("Phone", "04•• ••• •••")}{box("Date of birth", "•• ••• 19••")}{box("Address", "Epping VIC 3076")}{box("Emergency contact", "On file")}{box("Start date", "28 Jan 2019")}</div></Section>
      <Section className="p-5"><div className="text-sm font-bold mb-3" style={{ color: C.ink }}>Employment & pay</div><div className="grid grid-cols-2 gap-3">{box("Employment", e.type)}{box("Award / EA", e.award)}{box("Base rate", e.rate)}{box("Super fund", e.fund)}{box("Tax", "TFN declared")}{box("Pay schedule", "Fortnightly")}</div></Section>
    </div>
    <Section className="p-5 mt-4"><div className="text-sm font-bold mb-3" style={{ color: C.ink }}>Leave balances</div><div className="grid grid-cols-3 gap-3">{[["Annual", "14.2 days", 0.7], ["Personal / carer's", "8.6 days", 0.5], ["Long service", "31.0 days", 0.4]].map(([k, v, p]) => <div key={k} className="p-3 rounded-xl" style={{ border: `1px solid ${C.line}` }}><div className="flex justify-between text-sm"><span style={{ color: C.slate }}>{k}</span><span className="font-semibold" style={{ color: C.ink }}>{v}</span></div><div className="mt-2 h-1.5 rounded-full" style={{ background: C.line2 }}><div className="h-1.5 rounded-full" style={{ width: `${p * 100}%`, background: TENANTS[tenant].accent }} /></div></div>)}</div></Section>
  </div>);
}
function OrgChartScreen({ tenant }) {
  const E = DATA[tenant].employees;
  const node = (e, lead) => <div className="rounded-xl px-3 py-2 text-center" style={{ background: lead ? C.primary : C.white, border: `1px solid ${lead ? C.primary : C.line}`, minWidth: 150 }}><div className="text-sm font-semibold" style={{ color: lead ? "#fff" : C.ink }}>{e.name}</div><div style={{ fontSize: 11, color: lead ? "rgba(255,255,255,.8)" : C.muted }}>{e.role}</div></div>;
  return (<div><PageTitle title="Organisation chart" sub={TENANTS[tenant].name} />
    <Section className="p-8"><div className="flex flex-col items-center gap-5">
      {node(E[0], true)}<div style={{ width: 1, height: 16, background: C.line }} />
      <div className="flex flex-wrap justify-center gap-4">{E.slice(1, 4).map((e, i) => <div key={i}>{node(e)}</div>)}</div>
      <div style={{ width: 1, height: 16, background: C.line }} />
      <div className="flex flex-wrap justify-center gap-3">{E.slice(4, 8).map((e, i) => <div key={i}>{node(e)}</div>)}</div>
    </div></Section></div>);
}
function CalendarScreen({ tenant }) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const marks = { 3: ["Leave", C.amber], 8: ["Leave", C.amber], 9: ["Leave", C.amber], 10: ["Leave", C.amber], 20: ["PD day", C.primary], 24: ["Leave", C.green] };
  return (<div><PageTitle title="Team calendar" sub="July 2026" action={<div className="flex gap-3 text-xs items-center" style={{ color: C.slate }}><span className="inline-flex items-center gap-1"><span className="rounded-full" style={{ width: 8, height: 8, background: C.amber }} />Leave</span><span className="inline-flex items-center gap-1"><span className="rounded-full" style={{ width: 8, height: 8, background: C.primary }} />PD / event</span></div>} />
    <Section className="p-4"><div className="grid grid-cols-7 gap-1 mb-1">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <div key={d} className="text-center text-xs font-semibold py-1" style={{ color: C.muted }}>{d}</div>)}</div>
      <div className="grid grid-cols-7 gap-1">{[0, 1].map((i) => <div key={"b" + i} />)}{days.map((d) => { const m = marks[d]; const col = (d + 1) % 7; const we = col === 5 || col === 6; return (<div key={d} className="rounded-lg p-2" style={{ height: 66, background: we ? C.page : C.white, border: `1px solid ${C.line}` }}><div className="text-xs font-semibold" style={{ color: C.slate }}>{d}</div>{m && <div className="mt-1 rounded px-1 py-0.5 text-xs truncate" style={{ background: m[1] + "22", color: m[1] }}>{m[0]}</div>}</div>); })}</div></Section></div>);
}
function NineBox({ tenant }) {
  const E = DATA[tenant].employees;
  const place = { "1-2": [E[1]], "2-2": [E[0]], "2-1": [E[2]], "0-1": [E[6]], "1-1": [E[3], E[4]], "2-0": [E[5]] };
  const cell = (x, y) => { const k = `${x}-${y}`, list = place[k] || [], hot = x === 2 && y === 2; return (<div key={k} className="rounded-lg p-2" style={{ background: hot ? C.greenBg : C.white, border: `1px solid ${C.line}`, minHeight: 84 }}>{list.map((e, i) => <div key={i} className="rounded-md px-2 py-1 mb-1 text-xs truncate" style={{ background: C.primaryBg, color: C.primary }}>{e.name.split(" ")[0]}</div>)}</div>); };
  return (<div><PageTitle title="9-box talent grid" sub="Performance vs potential" />
    <Section className="p-5"><div className="flex gap-3">
      <div className="flex items-center" style={{ width: 20 }}><span className="text-xs whitespace-nowrap" style={{ color: C.muted, transform: "rotate(-90deg)" }}>Potential →</span></div>
      <div className="flex-1"><div className="grid grid-cols-3 gap-2">{[2, 1, 0].map((y) => [0, 1, 2].map((x) => cell(x, y)))}</div>
        <div className="grid grid-cols-3 gap-2 mt-2 text-center text-xs" style={{ color: C.muted }}><span>Low performance</span><span>Solid</span><span>High performance</span></div></div>
    </div></Section></div>);
}
function Feed({ tenant }) {
  const E = DATA[tenant].employees;
  const posts = [[E[4].name, E[1].name, "huge help getting the new staff laptops imaged before term. Legend!", 12], [E[0].name, E[3].name, "thank you for covering yard duty at short notice today.", 8], [E[2].name, E[5].name, "the grounds looked fantastic for the open day. Thank you!", 15]];
  return (<div><PageTitle title="Connect" sub="Shout-outs and recognition across the school" action={<PrimaryBtn icon={Plus}>New shout-out</PrimaryBtn>} />
    <div className="space-y-3 max-w-2xl">{posts.map((p, i) => <Section key={i} className="p-4"><div className="flex items-center gap-2.5 mb-2"><Avatar name={p[0]} accent={TENANTS[tenant].accent} size={34} /><div className="text-sm"><span className="font-semibold" style={{ color: C.ink }}>{p[0]}</span><span style={{ color: C.slate }}> recognised </span><span className="font-semibold" style={{ color: C.ink }}>{p[1]}</span></div></div><p className="text-sm mb-2" style={{ color: C.body }}>{p[2]}</p><div className="flex items-center gap-4 text-xs"><span className="inline-flex items-center gap-1 font-semibold" style={{ color: C.gold }}>♥ {p[3]}</span><span style={{ color: C.slate }}>Add kudos</span></div></Section>)}</div></div>);
}
function Recognition({ tenant }) {
  const E = DATA[tenant].employees; const [sel, setSel] = useState(E[1].name); const [pts, setPts] = useState(50);
  return (<div><PageTitle title="Send reward points" sub="Recognise a colleague's great work" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
      <Section className="p-5"><div className="text-sm font-bold mb-3" style={{ color: C.ink }}>Who are you recognising?</div>
        <div className="space-y-1 mb-4">{E.slice(0, 6).map((e, i) => <button key={i} onClick={() => setSel(e.name)} className="w-full flex items-center gap-2.5 rounded-lg px-2 py-1.5" style={{ background: sel === e.name ? C.primaryBg : "transparent" }}><Avatar name={e.name} accent={TENANTS[tenant].accent} size={28} /><span className="text-sm" style={{ color: sel === e.name ? C.primary : C.body, fontWeight: sel === e.name ? 600 : 400 }}>{e.name}</span></button>)}</div>
        <div className="text-sm font-bold mb-2" style={{ color: C.ink }}>Points</div>
        <div className="flex gap-2">{[25, 50, 100].map((v) => <button key={v} onClick={() => setPts(v)} className="rounded-lg px-4 py-1.5 text-sm font-semibold" style={pts === v ? { background: C.primary, color: "#fff" } : { background: C.page, color: C.slate }}>{v}</button>)}</div>
      </Section>
      <Section className="p-5 flex flex-col"><div className="text-sm font-bold mb-3" style={{ color: C.ink }}>Preview</div>
        <div className="rounded-xl p-4 flex-1" style={{ background: C.primaryBg }}><div className="flex items-center gap-2 mb-2"><Avatar name={sel} accent={TENANTS[tenant].accent} size={34} /><div className="text-sm font-semibold" style={{ color: C.ink }}>{sel}</div></div><div className="text-sm" style={{ color: C.body }}>You're awarding <b style={{ color: C.primary }}>{pts} points</b> for going above and beyond. 🎉</div></div>
        <div className="mt-3"><PrimaryBtn icon={Send}>Send points</PrimaryBtn></div>
      </Section>
    </div></div>);
}
function Roster({ tenant }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]; const pos = [["Front office", "8:00–4:00"], ["Library", "9:00–3:00"], ["Grounds", "7:00–3:00"], ["Canteen", "10:00–2:00"], ["Bus supervision", "3:00–4:00"]]; const E = DATA[tenant].employees;
  return (<div><PageTitle title="Rostering" sub="Week of 6 Jul 2026" action={<PrimaryBtn icon={Plus}>Publish roster</PrimaryBtn>} />
    <Section className="overflow-hidden"><table className="w-full text-sm"><thead><tr style={{ background: C.page, color: C.slate }} className="text-left"><th className="font-semibold px-4 py-2.5">Position</th>{days.map((d) => <th key={d} className="font-semibold px-3 py-2.5 text-center">{d}</th>)}</tr></thead><tbody>{pos.map(([p, t], i) => <tr key={i} style={{ borderTop: `1px solid ${C.line}` }}><td className="px-4 py-3"><div className="font-medium" style={{ color: C.ink }}>{p}</div><div style={{ fontSize: 11, color: C.muted }}>{t}</div></td>{days.map((d, j) => <td key={j} className="px-3 py-3 text-center">{(i + j) % 4 !== 3 ? <span className="inline-block rounded-md px-2 py-1 text-xs" style={{ background: C.primaryBg, color: C.primary }}>{E[(i + j) % E.length].name.split(" ")[0]}</span> : <span style={{ color: C.muted }}>—</span>}</td>)}</tr>)}</tbody></table></Section></div>);
}
function MyLeave({ tenant }) {
  return (<div><PageTitle title="My leave" sub="Request leave and track your balances" action={<PrimaryBtn icon={Plus}>Request leave</PrimaryBtn>} />
    <div className="grid grid-cols-3 gap-4 mb-4">{[["Annual leave", "14.2 days", 0.7], ["Personal / carer's", "8.6 days", 0.5], ["Long service", "31.0 days", 0.4]].map(([k, v, p]) => <Section key={k} className="p-4"><div style={{ fontSize: 12, color: C.slate }}>{k}</div><div className="mt-1 text-xl font-bold" style={{ color: C.ink }}>{v}</div><div className="mt-2 h-1.5 rounded-full" style={{ background: C.line2 }}><div className="h-1.5 rounded-full" style={{ width: `${p * 100}%`, background: TENANTS[tenant].accent }} /></div></Section>)}</div>
    <DataTable cols={["Type", "Dates", "Days", "Status"]} rows={[["Annual leave", "22–26 Sep 2026", 5, { p: "Approved" }], ["Personal / carer's", "3 Aug 2026", 1, { p: "Pending" }], ["Annual leave", "2–6 Jun 2026", 5, { p: "Approved" }]]} /></div>);
}

/* ============================= configured screens (content for every menu item) ============================= */
function ConfiguredScreen({ mkey, tenant }) {
  const E = DATA[tenant].employees; const nm = (i) => E[i % E.length].name;
  switch (mkey) {
    /* PEOPLE */
    case "people:profile": return <ProfileScreen tenant={tenant} />;
    case "people:org-chart": return <OrgChartScreen tenant={tenant} />;
    case "people:calendar": return <CalendarScreen tenant={tenant} />;
    case "people:contractors": return <TableScreen tenant={tenant} title="Contractor employees" sub="Contractors and employer-of-record staff" action={<PrimaryBtn icon={Plus}>Add contractor</PrimaryBtn>}
      cols={["Contractor", "Engagement", "ABN", "Rate", "Status"]} rows={[[{ av: "Relief Teaching Pool", sub: "Casual relief" }, "Labour hire", "•• ••• ••• •••", "$62 / hr", { p: "Active" }], [{ av: "CleanCo Services", sub: "Contract cleaning" }, "Service contract", "•• ••• ••• •••", "$1,200 / wk", { p: "Active" }], [{ av: "Mark Lee", sub: "ICT consultant" }, "Independent contractor", "•• ••• ••• •••", "$95 / hr", { p: "Active" }]]} />;
    case "people:file-approvals": return <TableScreen tenant={tenant} title="Employee file approvals" sub="Review changes to employee records" action={null}
      cols={["Employee", "Change requested", "Requested", "Action"]} rows={[[{ av: nm(3) }, "Bank account update", "2 Jul 2026", { act: ["Approve", "Decline"] }], [{ av: nm(5) }, "Address change", "1 Jul 2026", { act: ["Approve", "Decline"] }], [{ av: nm(2) }, "Tax file declaration", "30 Jun 2026", { act: ["Approve", "Decline"] }]]} />;
    case "people:vacancies": return <TableScreen tenant={tenant} title="Vacancies & requisitions" sub="Open roles and hiring requests" action={<PrimaryBtn icon={Plus}>New requisition</PrimaryBtn>}
      cols={["Role", "Department", "Type", "Applicants", "Status"]} rows={[["Secondary Teacher — Science", "Secondary", "Full-time", 12, { p: "Open" }], ["Teacher Aide", "Primary", "Part-time", 5, { p: "Open" }], ["Bus Driver", "Operations", "Casual", 3, { p: "In review" }]]} />;
    case "people:offers": return <TableScreen tenant={tenant} title="Offers" sub="Employment offers" cols={["Candidate", "Role", "Package", "Status"]} rows={[[{ av: "Nadia Osman" }, "Primary Teacher", { money: 97000 }, { p: "Sent" }], [{ av: "Ben Carter" }, "Lab Technician", { money: 74000 }, { p: "Accepted" }], [{ av: "Sara Ali" }, "Admin Officer", { money: 71000 }, { p: "Draft" }]]} />;
    /* COMPLIANCE */
    case "compliance:certifications": return <TableScreen tenant={tenant} title="Certifications" sub="Staff clearances and mandatory training" action={<PrimaryBtn icon={Plus}>Add certification</PrimaryBtn>}
      chips={[{ value: "128", label: "Valid", icon: ShieldCheck, bg: C.greenBg, fg: C.green }, { value: "9", label: "Expiring soon", icon: AlertTriangle, bg: C.amberBg, fg: C.amber }, { value: "3", label: "Expired", icon: X, bg: C.redBg, fg: C.red }]}
      cols={["Employee", "Certification", "Expiry", "Status"]} rows={[[{ av: nm(1) }, "Working with Children Check", "14 Mar 2028", { p: "Valid" }], [{ av: nm(3) }, "First Aid (HLTAID011)", "2 Aug 2026", { p: "Expiring" }], [{ av: nm(2) }, "VIT Registration", "30 Nov 2027", { p: "Valid" }], [{ av: nm(6) }, "Anaphylaxis Management", "18 Jun 2026", { p: "Expired" }], [{ av: nm(0) }, "Child Safe Standards Training", "5 Feb 2028", { p: "Valid" }]]} />;
    case "compliance:company-policies": return <TableScreen tenant={tenant} title="Company policies" sub="Policies issued to staff for acknowledgement" action={<PrimaryBtn icon={Plus}>New policy</PrimaryBtn>}
      cols={["Policy", "Version", "Acknowledged", "Updated"]} rows={[["Child Safety & Wellbeing Policy", "v4.1", { bar: 0.98 }, "Jun 2026"], ["Staff Code of Conduct", "v3.0", { bar: 0.95 }, "May 2026"], ["WHS Policy", "v2.2", { bar: 0.9 }, "Apr 2026"], ["ICT Acceptable Use", "v1.4", { bar: 0.86 }, "Mar 2026"]]} />;
    case "compliance:asset-register": return <TableScreen tenant={tenant} title="Asset register" sub="Equipment issued to staff" action={<PrimaryBtn icon={Plus}>Add asset</PrimaryBtn>}
      cols={["Asset", "Serial", "Assigned to", "Status"]} rows={[["MacBook Air 13\"", "C02X…9JHG", { av: nm(4) }, { p: "Active" }], ["iPad (10th gen)", "DMPX…21K", { av: nm(1) }, { p: "Active" }], ["Access card #A-142", "—", { av: nm(5) }, { p: "Active" }], ["Two-way radio", "RDO-08", { av: nm(6) }, { p: "Active" }]]} />;
    case "compliance:document-management": return <TableScreen tenant={tenant} title="Document management" sub="Shared HR and compliance documents" action={<PrimaryBtn icon={Plus}>Upload</PrimaryBtn>}
      cols={["Document", "Type", "Owner", "Updated"]} rows={[["Staff Handbook 2026", "PDF", { av: nm(0) }, "Jan 2026"], ["Emergency Management Plan", "PDF", { av: nm(4) }, "Feb 2026"], ["Enterprise Agreement", "PDF", "HR", "2025"], ["Excursion Procedures", "DOCX", { av: nm(2) }, "Mar 2026"]]} />;
    case "compliance:document-review": return <TableScreen tenant={tenant} title="Document review" sub="Documents due for periodic review" action={null}
      cols={["Document", "Reviewer", "Due", "Status"]} rows={[["Child Safety Policy", { av: nm(0) }, "31 Aug 2026", { p: "In review" }], ["WHS Policy", { av: nm(4) }, "15 Jul 2026", { p: "Overdue" }], ["Privacy Policy", { av: nm(5) }, "30 Sep 2026", { p: "Scheduled" }]]} />;
    case "compliance:bulk-issue": return <CardGridScreen title="Bulk issue documents" sub="Send documents to groups of staff for acknowledgement" cards={[{ icon: FileText, title: "Policy pack 2026", desc: "Child safety, conduct, WHS", meta: "142 recipients", action: "Issue" }, { icon: FileText, title: "Updated EA summary", desc: "Enterprise agreement changes", meta: "98 teachers", action: "Issue" }, { icon: FileText, title: "Term 3 handbook", desc: "Staff handbook update", meta: "All staff", action: "Issue" }]} />;
    case "compliance:forms": return <CardGridScreen title="Forms" sub="Reusable forms for staff" cards={[{ icon: CalendarDays, title: "Leave request" }, { icon: Receipt, title: "Expense claim" }, { icon: AlertTriangle, title: "Incident report" }, { icon: ClipboardCheck, title: "Excursion consent" }, { icon: Clock, title: "Timesheet" }, { icon: FileText, title: "Reimbursement" }]} />;
    case "compliance:induction-content": return <CardGridScreen title="Induction content" sub="Onboarding modules for new staff" cards={[{ icon: BookOpen, title: "Welcome to Al Siraat", bar: 1 }, { icon: ShieldCheck, title: "Child Safety essentials", bar: 0.8 }, { icon: AlertTriangle, title: "WHS essentials", bar: 0.6 }, { icon: Plug, title: "IT & systems setup", bar: 0.4 }, { icon: DollarSign, title: "Payroll & pay slips", bar: 0.2 }]} />;
    case "compliance:template-library": return <CardGridScreen title="Template library" sub="Reusable document templates" cards={[{ icon: FileText, title: "Employment contract" }, { icon: FileText, title: "Offer letter" }, { icon: FileText, title: "Position description" }, { icon: FileText, title: "Warning letter" }, { icon: FileText, title: "Reference letter" }, { icon: FileText, title: "Probation review" }]} />;
    case "compliance:incidents": return <TableScreen tenant={tenant} title="Incidents" sub="Workplace health & safety incidents" cols={["Date", "Type", "Location", "Severity", "Status"]} rows={[["1 Jul 2026", "Slip / trip", "Playground", "Minor", { p: "In review" }], ["24 Jun 2026", "Near miss", "Car park", "Low", { p: "Completed" }], ["12 Jun 2026", "Manual handling", "Gym", "Minor", { p: "Completed" }]]} />;
    case "compliance:my-incidents": return <TableScreen tenant={tenant} title="My incidents" sub="Incidents you've reported" action={<PrimaryBtn icon={Plus}>Report incident</PrimaryBtn>} cols={["Date", "Type", "Status"]} rows={[["24 Jun 2026", "Near miss", { p: "Completed" }]]} />;
    /* TIME */
    case "time:my-leave": return <MyLeave tenant={tenant} />;
    case "time:rostering": return <Roster tenant={tenant} />;
    /* PAY */
    case "pay:expense-claims": return <TableScreen tenant={tenant} title="Expense claims" sub="Your reimbursement claims" action={<PrimaryBtn icon={Plus}>New claim</PrimaryBtn>} cols={["Date", "Category", "Description", "Amount", "Status"]} rows={[["1 Jul 2026", "Travel", "Excursion transport", { money: 120 }, { p: "Pending" }], ["24 Jun 2026", "Resources", "Classroom supplies", { money: 86 }, { p: "Approved" }], ["12 Jun 2026", "PD", "Conference registration", { money: 450 }, { p: "Approved" }]]} />;
    case "pay:expenses-management": return <TableScreen tenant={tenant} title="Expenses management" sub="Claims awaiting approval" action={null} cols={["Employee", "Category", "Amount", "Action"]} rows={[[{ av: nm(3) }, "Travel", { money: 120 }, { act: ["Approve", "Decline"] }], [{ av: nm(5) }, "Resources", { money: 64 }, { act: ["Approve", "Decline"] }]]} />;
    case "pay:compensation": return <TableScreen tenant={tenant} title="Compensation management" sub="Remuneration reviews" action={null} cols={["Employee", "Current", "Proposed", "Change", "Status"]} rows={[[{ av: nm(1) }, { money: 98400 }, { money: 101400 }, "+3.0%", { p: "In review" }], [{ av: nm(4) }, { money: 86000 }, { money: 88600 }, "+3.0%", { p: "In review" }], [{ av: nm(0) }, { money: 142000 }, { money: 146260 }, "+3.0%", { p: "Approved" }]]} />;
    /* ENGAGEMENT */
    case "engagement:connect": return <Feed tenant={tenant} />;
    case "engagement:company-values": return <CardGridScreen title="Company values" sub="What we stand for" cards={[{ icon: ShieldCheck, title: "Respect", desc: "We honour every person, culture and belief in our community." }, { icon: Award, title: "Excellence", desc: "We strive to be our best in learning and in character." }, { icon: CheckCircle2, title: "Integrity", desc: "We do the right thing, especially when no one is watching." }, { icon: Users, title: "Community", desc: "We grow together and care for one another." }, { icon: Gift, title: "Compassion", desc: "We lead with kindness and empathy." }]} />;
    case "engagement:employee-engagement": return <StatDashboard tenant={tenant} title="Employee engagement" sub="How your team is feeling" stats={[{ label: "Engagement score", value: "78%", icon: TrendingUp }, { label: "Participation", value: "84%", icon: Users }, { label: "eNPS", value: "+32", icon: Sparkles }, { label: "Responses", value: "119", icon: MessageSquare }]} chart={[{ m: "Q1", v: 72 }, { m: "Q2", v: 75 }, { m: "Q3", v: 78 }]} chartLabel="Engagement trend" table={{ cols: ["Driver", "Score", "Trend"], rows: [["Leadership", { bar: 0.82 }, "↑ improving"], ["Wellbeing", { bar: 0.74 }, "↑ improving"], ["Workload", { bar: 0.61 }, "↓ watch"], ["Recognition", { bar: 0.7 }, "→ steady"]] }} />;
    case "engagement:happiness-surveys": return <StatDashboard tenant={tenant} title="Happiness surveys" sub="Weekly pulse check-ins" stats={[{ label: "Happiness", value: "4.2/5", icon: Sparkles }, { label: "This week", value: "+0.2", icon: TrendingUp }, { label: "Responses", value: "96", icon: MessageSquare }]} table={{ cols: ["Survey", "Sent", "Responses", "Score"], rows: [["Weekly pulse — 6 Jul", 142, 96, "4.2"], ["Weekly pulse — 29 Jun", 141, 101, "4.0"], ["Term check-in", 140, 112, "4.1"]] }} />;
    case "engagement:custom-surveys": return <TableScreen tenant={tenant} title="Custom surveys" sub="Build and run your own surveys" action={<PrimaryBtn icon={Plus}>Create survey</PrimaryBtn>} cols={["Survey", "Audience", "Responses", "Status"]} rows={[["Staff wellbeing 2026", "All staff", 88, { p: "Active" }], ["ICT satisfaction", "Teachers", 0, { p: "Draft" }], ["Facilities feedback", "All staff", 64, { p: "Completed" }]]} />;
    case "engagement:exit-interviews": return <TableScreen tenant={tenant} title="Exit interviews" sub="Feedback from departing staff" action={null} cols={["Employee", "Date", "Reason", "Status"]} rows={[[{ av: "Peter Shaw" }, "20 Jun 2026", "Relocation", { p: "Completed" }], [{ av: "Rita Cohen" }, "5 Jun 2026", "Career change", { p: "Completed" }]]} />;
    /* DEVELOPMENT */
    case "development:one-on-ones": return <TableScreen tenant={tenant} title="1:1s" sub="Coaching conversations" action={<PrimaryBtn icon={Plus}>Schedule 1:1</PrimaryBtn>} cols={["With", "Date", "Focus", "Status"]} rows={[[{ av: nm(1) }, "9 Jul 2026", "Term goals", { p: "Scheduled" }], [{ av: nm(3) }, "2 Jul 2026", "Wellbeing", { p: "Completed" }], [{ av: nm(4) }, "25 Jun 2026", "Career growth", { p: "Completed" }]]} />;
    case "development:feedback": return <TableScreen tenant={tenant} title="Feedback" sub="Feedback shared across the team" action={<PrimaryBtn icon={Plus}>Give feedback</PrimaryBtn>} cols={["From", "To", "Type", "Date"]} rows={[[{ av: nm(0) }, nm(2), { tag: "Praise" }, "1 Jul 2026"], [{ av: nm(4) }, nm(1), { tag: "Praise" }, "28 Jun 2026"], [{ av: nm(2) }, nm(5), { tag: "Coaching" }, "20 Jun 2026"]]} />;
    /* PERFORMANCE */
    case "performance:goals": return <TableScreen tenant={tenant} title="Goals" sub="Individual and team goals" action={<PrimaryBtn icon={Plus}>Add goal</PrimaryBtn>} cols={["Goal", "Owner", "Progress", "Status"]} rows={[["Improve NAPLAN numeracy results", { av: nm(1) }, { bar: 0.65 }, { p: "In progress" }], ["Complete VIT renewal", { av: nm(2) }, { bar: 1 }, { p: "Completed" }], ["Launch student wellbeing program", { av: nm(0) }, { bar: 0.4 }, { p: "In progress" }]]} />;
    case "performance:reviews-360": return <TableScreen tenant={tenant} title="360 reviews" sub="Multi-rater feedback cycles" action={null} cols={["Employee", "Reviewers", "Cycle", "Status"]} rows={[[{ av: nm(1) }, "4", "Mid-year 2026", { p: "In progress" }], [{ av: nm(3) }, "3", "Mid-year 2026", { p: "Completed" }]]} />;
    case "performance:performance-reviews": return <TableScreen tenant={tenant} title="Performance reviews" sub="Review cycle progress" action={null} cols={["Employee", "Reviewer", "Rating", "Status"]} rows={[[{ av: nm(2) }, nm(0), "Exceeds", { p: "Completed" }], [{ av: nm(4) }, nm(0), "Meets", { p: "In progress" }], [{ av: nm(5) }, nm(0), "—", { p: "Scheduled" }]]} />;
    case "performance:nine-box": return <NineBox tenant={tenant} />;
    /* BENEFITS */
    case "benefits:benefits-management": return <CardGridScreen title="Benefits management" sub="Benefits offered to staff" cards={[{ icon: DollarSign, title: "Salary packaging", desc: "Novated leases & FBT-exempt items", meta: "38 enrolled" }, { icon: ShieldCheck, title: "Employee Assistance Program", desc: "Free confidential counselling", meta: "All staff" }, { icon: Award, title: "Professional development fund", desc: "$1,000 per teacher / yr", meta: "92 eligible" }, { icon: Gift, title: "Health insurance discount", desc: "Corporate rate with partners", meta: "24 enrolled" }]} />;
    case "benefits:purchase-points": return <CardGridScreen title="Purchase points" sub="Top up reward points for recognition" cards={[{ icon: Gift, title: "500 points", desc: "$50", action: "Buy" }, { icon: Gift, title: "1,000 points", desc: "$95", action: "Buy" }, { icon: Gift, title: "2,500 points", desc: "$220", action: "Buy" }]} />;
    case "benefits:send-points": return <Recognition tenant={tenant} />;
    case "benefits:points-management": return <StatDashboard tenant={tenant} title="Points management" sub="Reward points across the school" stats={[{ label: "Org balance", value: "4,250", icon: Gift }, { label: "Issued this month", value: "1,100", icon: Send }, { label: "Redeemed", value: "820", icon: CheckCircle2 }]} table={{ cols: ["From", "To", "Points", "Reason"], rows: [[{ av: nm(4) }, nm(1), "50", "Above & beyond"], [{ av: nm(0) }, nm(3), "25", "Yard duty cover"], [{ av: nm(2) }, nm(5), "50", "Open day"]] }} />;
    case "benefits:perks-overview": return <StatDashboard tenant={tenant} title="Perks overview" sub="Discounts and savings for staff" stats={[{ label: "Perks available", value: "120+", icon: Gift }, { label: "Redeemed", value: "38", icon: CheckCircle2 }, { label: "Est. savings", value: "$2,140", icon: DollarSign }]} table={{ cols: ["Perk", "Category", "Discount"], rows: [["Woolworths", "Groceries", "5%"], ["JB Hi-Fi", "Electronics", "10%"], ["Fitness First", "Health", "20%"], ["Event Cinemas", "Entertainment", "30%"]] }} />;
    case "benefits:perks-store": return <CardGridScreen title="Perks store" sub="Redeem discounts with partners" cards={[{ icon: Gift, title: "Woolworths", desc: "5% off gift cards", meta: "Groceries", action: "Redeem" }, { icon: Gift, title: "JB Hi-Fi", desc: "10% off", meta: "Electronics", action: "Redeem" }, { icon: Gift, title: "Fitness First", desc: "20% off membership", meta: "Health", action: "Redeem" }, { icon: Gift, title: "Event Cinemas", desc: "30% off tickets", meta: "Entertainment", action: "Redeem" }, { icon: Gift, title: "Kmart", desc: "5% off", meta: "Retail", action: "Redeem" }, { icon: Gift, title: "BP", desc: "4c/L off fuel", meta: "Fuel", action: "Redeem" }]} />;
    case "benefits:order-history": return <TableScreen tenant={tenant} title="Order history" sub="Perks you've redeemed" action={null} cols={["Item", "Date", "Points", "Status"]} rows={[["JB Hi-Fi gift card", "2 Jul 2026", "500", { p: "Redeemed" }], ["Woolworths gift card", "18 Jun 2026", "250", { p: "Redeemed" }]]} />;
    case "benefits:my-points": return <StatDashboard tenant={tenant} title="My points" sub="Your reward points" stats={[{ label: "My balance", value: "350", icon: Gift }, { label: "Earned", value: "600", icon: TrendingUp }, { label: "Redeemed", value: "250", icon: CheckCircle2 }]} table={{ cols: ["Activity", "Date", "Points"], rows: [["Recognition from " + nm(0), "1 Jul 2026", "+50"], ["Redeemed — Woolworths", "18 Jun 2026", "−250"], ["Recognition from " + nm(2), "10 Jun 2026", "+50"]] }} />;
    default: {
      const [mid, iid] = mkey.split(":");
      const menu = MENUS.find((m) => m.id === mid);
      const label = (menu && menu.groups && menu.groups.flatMap((g) => g.items).find((it) => it.id === iid)?.label) || (menu && menu.label) || "Screen";
      return <div><PageTitle title={label} /><Section><Empty title={label} text="This area is part of the full platform." cta="Get started" /></Section></div>;
    }
  }
}

/* ============================= empty-state copy for stubbed items ============================= */
const EMPTY_COPY = {
  "people:profile": [Users, "Your profile", "Personal details, emergency contacts and documents live here."],
  "people:org-chart": [Users, "Organisation chart", "Visualise reporting lines across the school."],
  "people:calendar": [CalendarDays, "Team calendar", "Leave, public holidays and key dates in one view."],
  "people:contractors": [Users, "Contractor employees", "Manage contractors and employer-of-record staff."],
  "people:file-approvals": [ClipboardCheck, "File approvals", "Review and approve changes to employee files."],
  "people:vacancies": [Inbox, "Vacancies & requisitions", "Open roles and hiring requests appear here."],
  "people:offers": [FileText, "Offers", "Draft and send employment offers."],
  "time:my-leave": [CalendarDays, "My leave", "Request leave and track your balances."],
  "time:rostering": [Clock, "Rostering", "Build and publish staff rosters."],
  "pay:expense-claims": [Receipt, "Expense claims", "Submit and track reimbursements."],
  "pay:expenses-management": [Receipt, "Expenses management", "Review and approve expense claims."],
  "pay:compensation": [DollarSign, "Compensation", "Manage remuneration reviews and bands."],
};

/* ============================= root ============================= */
export default function PayrollApp() {
  const [tenant, setTenant] = useState("alsiraat");
  const [moduleId, setModuleId] = useState("home");
  const [itemId, setItemId] = useState(null);
  const [emp, setEmp] = useState(null);
  const [wizard, setWizard] = useState(false);
  const [banner, setBanner] = useState(true);
  const isPlatform = tenant === "platform";

  const menu = MENUS.find((m) => m.id === moduleId);
  const hasSub = !!menu.groups && !isPlatform;

  const pick = (m) => { setModuleId(m.id); setItemId(firstItem(m)); };
  const go = (mid, iid) => { setModuleId(mid); setItemId(iid); };

  const key = itemId ? `${moduleId}:${itemId}` : moduleId;
  const openWizard = () => setWizard(true);

  function renderScreen() {
    if (isPlatform) {
      if (moduleId === "settings") return <SettingsScreen />;
      if (moduleId === "home" || !menu.groups) return <PlatformDashboard setTenant={(t) => { setTenant(t); go("home", null); }} />;
      return <div className="py-16 text-center"><Empty icon={Layers} title="Select a school" text="Platform view shows cross-tenant summaries. Switch to a school to manage its payroll." /></div>;
    }
    switch (key) {
      case "home": return <HomeScreen tenant={tenant} go={go} />;
      case "start-guide": return <StartGuide />;
      case "reports": return <Reports />;
      case "workflows": return <Workflows />;
      case "settings": return <SettingsScreen />;
      case "people:people-list": return <PeopleList tenant={tenant} onSelect={setEmp} />;
      case "time:leave-management": return <LeaveMgmt tenant={tenant} />;
      case "time:timesheets": return <TimesheetsMgmt tenant={tenant} />;
      case "pay:pay-runs": return <PayRuns tenant={tenant} onNewRun={openWizard} />;
      case "pay:stp": return <STP tenant={tenant} />;
      case "pay:super": return <Super tenant={tenant} />;
      case "pay:pay-slips": return <PaySlips tenant={tenant} />;
      case "billing:subscriptions": return <Subscriptions />;
      case "billing:invoices": return <Invoices />;
      default: return <ConfiguredScreen mkey={key} tenant={tenant} />;
    }
  }

  return (
    <div className="flex flex-col" style={{ height: "100vh", background: C.page, fontFamily: "'Manrope', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');`}</style>
      <TopBar tenant={tenant} setTenant={(t) => { setTenant(t); go("home", null); }} />
      {banner && (
        <div className="flex items-center gap-2 px-5 py-2 shrink-0" style={{ background: C.blueBg, borderBottom: `1px solid ${C.line}` }}>
          <HelpCircle size={14} style={{ color: C.blue }} />
          <span className="text-xs flex-1" style={{ color: C.body }}>Your organisation is in setup mode — emails to employees are paused. Manage this under Settings.</span>
          <button onClick={() => setBanner(false)}><X size={14} style={{ color: C.slate }} /></button>
        </div>
      )}
      <div className="flex flex-1 min-h-0">
        <IconRail active={moduleId} wide={!hasSub} onPick={pick} />
        {hasSub && <SubMenu menu={menu} activeItem={itemId} onPick={setItemId} />}
        <main className="flex-1 overflow-y-auto p-6 min-w-0">
          <div className="max-w-6xl mx-auto">{renderScreen()}</div>
        </main>
      </div>
      {emp && <EmployeeDrawer emp={emp} tenant={tenant} onClose={() => setEmp(null)} />}
      {wizard && <PayRunWizard tenant={tenant} onClose={() => setWizard(false)} />}
    </div>
  );
}
