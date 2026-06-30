import { useState, useEffect, useRef } from "react";
import {
  Home, LayoutDashboard, Wallet, Package, Boxes, Tag, Percent,
  TrendingUp, Compass, Megaphone, Plus, Trash2, Check, Loader2,
  Waves, ShoppingBag
} from "lucide-react";
import { SHOPIFY_ORDERS, SHOPIFY_PRODUCTS, DEFAULT_MANUAL_DATA } from "./data.js";

const STORAGE_KEY = "areia-erp-v1";

const NAV_SECTIONS = [
  {
    label: "Principal",
    items: [
      { id: "inicio", label: "Inicio", icon: Home },
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "ventas", label: "Ventas Online", icon: ShoppingBag, live: true },
      { id: "bazares", label: "Bazares", icon: Compass, badge: "NUEVO" },
    ],
  },
  {
    label: "Operaciones",
    items: [
      { id: "inventario", label: "Inventario", icon: Boxes, live: true },
      { id: "productos", label: "Productos", icon: Package, live: true },
    ],
  },
  {
    label: "Finanzas",
    items: [
      { id: "finanzas", label: "EERR & Finanzas", icon: Wallet },
      { id: "precios", label: "Precios", icon: Tag },
      { id: "descuentos", label: "Descuentos", icon: Percent },
      { id: "proyecciones", label: "Proyecciones", icon: TrendingUp },
    ],
  },
  {
    label: "Estrategia",
    items: [
      { id: "objetivos", label: "Objetivos", icon: Compass },
      { id: "marketing", label: "Marketing", icon: Megaphone },
    ],
  },
];

const PLATAFORMAS = ["Instagram", "TikTok", "Newsletter", "Web", "Otro"];
const ESTADOS_CONTENIDO = ["Idea", "En producción", "En revisión", "Listo", "Publicado"];
const ESTADOS_BAZAR = ["Por confirmar", "Confirmado", "Realizado"];
const ESTADOS_DESCUENTO = ["Activo", "Programado", "Vencido"];

const RECORDATORIOS_MENSUALES = [
  { dia: 5,  emoji: "📦", label: "CIERRE AREIA CONCEPTS", color: "#E8A45A" },
  { dia: 10, emoji: "🏦", label: "PAGO PREVIRED",         color: "#6B8FBF" },
  { dia: 29, emoji: "💸", label: "PAGO CAMI ADS",         color: "#C17A5B" },
];

function fmtCLP(n) {
  return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n || 0);
}
function uid() { return Math.random().toString(36).slice(2, 9); }
function byMonth(orders) {
  const map = {};
  orders.forEach(o => {
    if (o.estado === "DEVUELTO") return;
    const mes = o.fecha.slice(0, 7);
    map[mes] = (map[mes] || 0) + o.monto;
  });
  return Object.entries(map).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 6);
}

const TAB_TITLES = {
  inicio: ["Hola, Camila 🤎", "Centro de mando"],
  dashboard: ["Resumen general", "Dashboard"],
  ventas: ["Shopify · datos reales", "Ventas Online"],
  bazares: ["Eventos presenciales", "Bazares & Ferias"],
  inventario: ["Shopify · datos reales", "Inventario"],
  productos: ["Shopify · datos reales", "Productos"],
  finanzas: ["Resultado del periodo", "EERR & Finanzas"],
  precios: ["Lista de precios", "Precios"],
  descuentos: ["Cupones activos", "Descuentos"],
  proyecciones: ["A futuro", "Proyecciones"],
  objetivos: ["Hoja de ruta", "Objetivos"],
  marketing: ["Marca & contenido", "Marketing"],
};

export default function App() {
  const [manualData, setManualData] = useState(DEFAULT_MANUAL_DATA);
  const [activeTab, setActiveTab] = useState("inicio");
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const saveTimer = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setManualData(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    setSaving(true);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(manualData)); }
      catch (e) { console.error(e); }
      finally { setSaving(false); }
    }, 600);
    return () => clearTimeout(saveTimer.current);
  }, [manualData, loaded]);

  if (!loaded) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#F7F1E8" }}>
      <style>{GLOBAL_STYLES}</style>
      <Loader2 size={28} style={{ color: "#C17A5B", animation: "spin 1s linear infinite" }} />
    </div>
  );

  const props = { manualData, setManualData, orders: SHOPIFY_ORDERS, products: SHOPIFY_PRODUCTS };
  const [eyebrow, title] = TAB_TITLES[activeTab] || ["", ""];

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#F7F1E8", fontFamily: "'Inter', sans-serif", color: "#3A2E25" }}>
      <style>{GLOBAL_STYLES}</style>

      {/* Sidebar */}
      <nav className="erp-sidebar">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
          <Waves size={18} color="#C17A5B" />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 600, color: "#F2A98A" }}>AREIA</span>
        </div>
        <div style={{ fontSize: "0.62rem", color: "#9C8A78", marginBottom: "1rem", paddingLeft: "1.6rem" }}>
          areiaconcepts.com · CLP
        </div>

        {NAV_SECTIONS.map(s => (
          <div key={s.label}>
            <div className="erp-section-label">{s.label}</div>
            {s.items.map(item => {
              const Icon = item.icon;
              return (
                <button key={item.id} className={`erp-nav-item ${activeTab === item.id ? "active" : ""}`} onClick={() => setActiveTab(item.id)}>
                  <Icon size={15} />
                  <span>{item.label}</span>
                  {item.badge && <span className="erp-badge">{item.badge}</span>}
                  {item.live && <span className="erp-live">LIVE</span>}
                </button>
              );
            })}
          </div>
        ))}

        <div style={{ marginTop: "1.5rem", paddingLeft: "0.5rem" }}>
          <div style={{ fontSize: "0.6rem", color: "#7C6A58", marginBottom: "0.2rem" }}>Última sincronización</div>
          <div style={{ fontSize: "0.62rem", color: "#9C8A78" }}>22 jun 2026 · 540 pedidos</div>
          <div style={{ fontSize: "0.6rem", color: "#7C6A58", marginTop: "0.75rem" }}>{saving ? "Guardando…" : "✓ Datos guardados"}</div>
        </div>
      </nav>

      {/* Main */}
      <main style={{ flex: 1, minWidth: 0, overflowY: "auto", padding: "1.75rem 1.75rem 3rem" }}>
        <div style={{ marginBottom: "0.75rem" }}>
          <p style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "#C17A5B", marginBottom: "0.2rem" }}>{eyebrow}</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, lineHeight: 1.1 }}>{title}</h1>
        </div>
        <div className="erp-tide" />

        {activeTab === "inicio" && <InicioTab {...props} />}
        {activeTab === "dashboard" && <DashboardTab {...props} />}
        {activeTab === "ventas" && <VentasTab {...props} />}
        {activeTab === "bazares" && <BazaresTab {...props} />}
        {activeTab === "inventario" && <InventarioTab {...props} />}
        {activeTab === "productos" && <ProductosTab {...props} />}
        {activeTab === "finanzas" && <FinanzasTab {...props} />}
        {activeTab === "precios" && <PreciosTab {...props} />}
        {activeTab === "descuentos" && <DescuentosTab {...props} />}
        {activeTab === "proyecciones" && <ProyeccionesTab {...props} />}
        {activeTab === "objetivos" && <ObjetivosTab {...props} />}
        {activeTab === "marketing" && <MarketingTab {...props} />}
      </main>
    </div>
  );
}

// ─── Recordatorios Widget ────────────────────────────────────
function RecordatoriosWidget() {
  const hoy = new Date().getDate();
  const mes = new Date().toLocaleString("es-CL", { month: "long", year: "numeric" });

  const items = [...RECORDATORIOS_MENSUALES]
    .map(r => {
      const diff = r.dia - hoy;
      let badge, bg, borderColor;
      if (diff === 0)                 { badge = "🔴 HOY";           bg = "#FEE9E1"; borderColor = "#C17A5B"; }
      else if (diff === 1)            { badge = "🟡 Mañana";        bg = "#FEF6E4"; borderColor = "#E8A45A"; }
      else if (diff > 1 && diff <= 5) { badge = `🟡 En ${diff} días`; bg = "#FEF6E4"; borderColor = "#E8DDD0"; }
      else if (diff > 5)              { badge = `📅 Día ${r.dia}`;  bg = "#FBF7F0"; borderColor = "#E8DDD0"; }
      else                            { badge = "✅ Listo";          bg = "#F0F4EC"; borderColor = "#D8E4D0"; }
      return { ...r, diff, badge, bg, borderColor };
    })
    .sort((a, b) => {
      if (a.diff === 0) return -1;
      if (b.diff === 0) return 1;
      if (a.diff > 0 && b.diff <= 0) return -1;
      if (a.diff <= 0 && b.diff > 0) return 1;
      return a.diff - b.diff;
    });

  return (
    <div className="erp-card" style={{ gridColumn: "1 / -1", borderColor: "#E8DDD0" }}>
      <p style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "#C17A5B", marginBottom: "0.2rem" }}>
        Compromisos · {mes}
      </p>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem", fontWeight: 600, marginBottom: "0.75rem" }}>
        Recordatorios del mes
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "0.65rem" }}>
        {items.map(r => (
          <div key={r.dia} style={{
            background: r.bg,
            border: `1.5px solid ${r.borderColor}`,
            borderRadius: "0.75rem",
            padding: "0.85rem 1rem",
          }}>
            <div style={{ fontSize: "0.65rem", fontWeight: 700, color: r.color, marginBottom: "0.3rem", letterSpacing: "0.06em" }}>{r.badge}</div>
            <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#3A2E25" }}>{r.emoji} {r.label}</div>
            <div style={{ fontSize: "0.7rem", color: "#9C8A78", marginTop: "0.15rem" }}>Cada día {r.dia}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Helpers ────────────────────────────────────────────────
function Card({ eyebrow, title, children, span = 1, err = false, full = false }) {
  return (
    <div className="erp-card" style={{ gridColumn: full ? "1 / -1" : `span ${span}`, borderColor: err ? "#C17A5B" : "#E8DDD0" }}>
      {eyebrow && <p style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "#C17A5B", marginBottom: "0.2rem" }}>{eyebrow}</p>}
      {title && <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem", fontWeight: 600, marginBottom: "0.65rem" }}>{title}</h2>}
      {children}
    </div>
  );
}
function Grid({ children, cols = 3 }) {
  return <div className="erp-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>{children}</div>;
}
function Stat({ label, value, sub, accent = false }) {
  return (
    <div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 600, color: accent ? "#C17A5B" : "#3A2E25" }}>{value}</div>
      <div style={{ fontSize: "0.75rem", color: "#8A7866", marginTop: "0.15rem" }}>{label}</div>
      {sub && <div style={{ fontSize: "0.7rem", color: "#C17A5B", marginTop: "0.1rem" }}>{sub}</div>}
    </div>
  );
}

// ─── Tabs ────────────────────────────────────────────────────
function InicioTab({ orders, products, manualData }) {
  const ahora = new Date();
  const diaNum = ahora.getDate();
  const fechaStr = ahora.toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const hora = ahora.getHours();
  const saludo = hora < 12 ? "Buenos días" : hora < 19 ? "Buenas tardes" : "Buenas noches";

  const total = orders.filter(o => o.estado !== "DEVUELTO").reduce((s, o) => s + o.monto, 0);
  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const sinStock = products.filter(p => p.stock === 0).length;
  const allGoals = [...manualData.goals.corto, ...manualData.goals.mediano, ...manualData.goals.largo];

  const proxBazares = manualData.bazares
    .filter(b => b.estado !== "Realizado" && b.fecha)
    .sort((a, b) => a.fecha.localeCompare(b.fecha));
  const prox = proxBazares[0];

  let diasBazar = null;
  if (prox?.fecha) {
    const fechaBazar = new Date(prox.fecha + "T12:00:00");
    diasBazar = Math.ceil((fechaBazar - ahora) / (1000 * 60 * 60 * 24));
  }

  const alertaHoy = RECORDATORIOS_MENSUALES.find(r => r.dia === diaNum);
  const bazarUrgente = diasBazar !== null && diasBazar <= 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

      {/* Alertas del día */}
      {(alertaHoy || bazarUrgente) && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {alertaHoy && (
            <div style={{ background: "#FEE9E1", border: "1.5px solid #C17A5B", borderRadius: "0.75rem", padding: "0.85rem 1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "1.25rem" }}>{alertaHoy.emoji}</span>
              <div>
                <div style={{ fontWeight: 700, color: "#C17A5B", fontSize: "0.72rem", letterSpacing: "0.08em" }}>🔴 RECORDATORIO DE HOY</div>
                <div style={{ fontWeight: 600, color: "#3A2E25", fontSize: "0.95rem" }}>{alertaHoy.label}</div>
              </div>
            </div>
          )}
          {bazarUrgente && (
            <div style={{ background: "#FEF6E4", border: "1.5px solid #E8A45A", borderRadius: "0.75rem", padding: "0.85rem 1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "1.25rem" }}>🛍</span>
              <div>
                <div style={{ fontWeight: 700, color: "#E8A45A", fontSize: "0.72rem", letterSpacing: "0.08em" }}>
                  {diasBazar === 0 ? "🟡 BAZAR HOY" : "🟡 BAZAR MAÑANA"}
                </div>
                <div style={{ fontWeight: 600, color: "#3A2E25", fontSize: "0.95rem" }}>{prox.nombre} · {prox.ciudad}</div>
              </div>
            </div>
          )}
        </div>
      )}

      <Grid cols={3}>
        {/* Saludo */}
        <Card eyebrow={fechaStr} title={`${saludo}, Camila 🤎`} span={3}>
          <p style={{ fontSize: "0.88rem", lineHeight: 1.65, color: "#5A4A3D" }}>
            Tu centro de mando Areia. Shopify en tiempo real · ventas, inventario y eventos desde un solo lugar.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.85rem" }}>
            <span className="erp-pill live">✦ Shopify conectado</span>
            <span className="erp-pill">540 pedidos históricos</span>
            <span className="erp-pill">Plan Basic · CLP</span>
            {diasBazar !== null && diasBazar <= 7 && (
              <span className="erp-pill" style={{ background: diasBazar <= 1 ? "#FEE9E1" : "#FEF6E4", color: "#A85F40", fontWeight: 700 }}>
                {diasBazar === 0 ? `🚨 ${prox.nombre} HOY` : diasBazar === 1 ? `🟡 ${prox.nombre} MAÑANA` : `📅 ${prox.nombre} en ${diasBazar} días`}
              </span>
            )}
          </div>
        </Card>

        {/* Recordatorios mensuales */}
        <RecordatoriosWidget />

        {/* Stats rápidos */}
        <Card eyebrow="Ventas Shopify" span={1}><Stat value={fmtCLP(total)} label="Ingresos online" /></Card>
        <Card eyebrow="Inventario" span={1}><Stat value={totalStock} label="Unidades en stock" sub={sinStock > 0 ? `${sinStock} sin stock` : undefined} /></Card>
        <Card eyebrow="Próximo evento" span={1}>
          <Stat
            value={prox ? prox.nombre : "Sin eventos"}
            label={prox
              ? `${prox.ciudad} · ${prox.fecha}${diasBazar !== null ? ` · ${diasBazar === 0 ? "HOY 🚨" : diasBazar === 1 ? "MAÑANA" : `en ${diasBazar} días`}` : ""}`
              : "Agrega en Bazares"}
            accent={diasBazar !== null && diasBazar <= 3}
          />
        </Card>
        <Card eyebrow="Objetivos" span={1}><Stat value={`${allGoals.filter(g => g.done).length}/${allGoals.length}`} label="Completados" /></Card>
        <Card eyebrow="Próximo shooting" span={2}><Stat value="2 julio 2026" label="Areia Wanted Girls · Santiago" /></Card>
      </Grid>
    </div>
  );
}

function DashboardTab({ orders, products, manualData }) {
  const pagados = orders.filter(o => o.estado !== "DEVUELTO");
  const shopify = pagados.reduce((s, o) => s + o.monto, 0);
  const presencial = manualData.bazares.reduce((s, b) => s + Number(b.ventasPresenciales || 0), 0);
  const gastos = manualData.financeEntries.filter(f => f.tipo === "Gasto").reduce((s, f) => s + Number(f.monto || 0), 0);
  const activos = products.filter(p => p.status === "ACTIVE");
  const valorInv = activos.reduce((s, p) => s + p.stock * p.precio, 0);
  const meses = byMonth(orders);
  const maxMes = Math.max(...meses.map(([, v]) => v), 1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Grid cols={3}>
        <Card eyebrow="Online · Shopify" span={1}><Stat value={fmtCLP(shopify)} label="Ingresos online" /></Card>
        <Card eyebrow="Presencial" span={1}><Stat value={fmtCLP(presencial)} label="Bazares/ferias" /></Card>
        <Card eyebrow="Total facturado" span={1}><Stat value={fmtCLP(shopify + presencial)} label="Online + presencial" accent /></Card>
        <Card eyebrow="Gastos" span={1} err={gastos > 0}><Stat value={fmtCLP(gastos)} label="Egresos manuales" /></Card>
        <Card eyebrow="Inventario activo" span={1}><Stat value={fmtCLP(valorInv)} label={`${activos.reduce((s, p) => s + p.stock, 0)} unidades`} /></Card>
        <Card eyebrow="Pedidos" span={1}><Stat value={pagados.length} label="Órdenes pagadas (muestra)" /></Card>
      </Grid>
      <Card eyebrow="Ventas por mes · Shopify" title="Últimos 6 meses" full>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "0.25rem" }}>
          {meses.map(([mes, val]) => (
            <div key={mes} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "0.75rem", color: "#8A7866", width: "5.5rem", flexShrink: 0 }}>{mes}</span>
              <div style={{ flex: 1, background: "#E8DDD0", borderRadius: "999px", height: "6px" }}>
                <div style={{ width: `${Math.round((val / maxMes) * 100)}%`, background: "#C17A5B", borderRadius: "999px", height: "6px" }} />
              </div>
              <span style={{ fontSize: "0.78rem", color: "#5A4A3D", width: "6.5rem", textAlign: "right", flexShrink: 0 }}>{fmtCLP(val)}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function VentasTab({ orders }) {
  const pagados = orders.filter(o => o.estado !== "DEVUELTO");
  const total = pagados.reduce((s, o) => s + o.monto, 0);
  const ticket = pagados.length > 0 ? Math.round(total / pagados.length) : 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Grid cols={3}>
        <Card eyebrow="Ingresos" span={1}><Stat value={fmtCLP(total)} label={`${pagados.length} pedidos pagados`} /></Card>
        <Card eyebrow="Ticket promedio" span={1}><Stat value={fmtCLP(ticket)} label="Por pedido" /></Card>
        <Card eyebrow="Devoluciones" span={1}><Stat value={orders.filter(o => o.estado === "DEVUELTO").length} label="Pedidos devueltos" /></Card>
      </Grid>
      <Card eyebrow="Pedidos recientes · Shopify" title="Últimas órdenes" full>
        <div style={{ overflowX: "auto" }}>
          <table className="erp-table">
            <thead><tr><th>Pedido</th><th>Cliente</th><th>Monto</th><th>Fecha</th><th>Estado</th></tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td style={{ fontWeight: 600 }}>{o.id}</td>
                  <td>{o.cliente}</td>
                  <td>{fmtCLP(o.monto)}</td>
                  <td style={{ color: "#8A7866" }}>{o.fecha}</td>
                  <td><span style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem", borderRadius: "999px", fontWeight: 600, background: o.estado === "PAGADO" ? "#E4E9DC" : "#F4E6DA", color: o.estado === "PAGADO" ? "#5C6B4D" : "#A85F40" }}>{o.estado}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.72rem", color: "#B8A894", marginTop: "0.75rem" }}>Mostrando últimos 21 pedidos. Total histórico: 540 en Shopify.</p>
      </Card>
    </div>
  );
}

function BazaresTab({ manualData, setManualData }) {
  const add = () => setManualData(d => ({ ...d, bazares: [...d.bazares, { id: uid(), nombre: "", fecha: "", ciudad: "", estado: "Por confirmar", ventasPresenciales: 0 }] }));
  const upd = (id, f, v) => setManualData(d => ({ ...d, bazares: d.bazares.map(b => b.id === id ? { ...b, [f]: v } : b) }));
  const del = (id) => setManualData(d => ({ ...d, bazares: d.bazares.filter(b => b.id !== id) }));
  const total = manualData.bazares.reduce((s, b) => s + Number(b.ventasPresenciales || 0), 0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Grid cols={2}>
        <Card eyebrow="Ventas presenciales" span={1}><Stat value={fmtCLP(total)} label="Total ingresado manualmente" /></Card>
        <Card eyebrow="Eventos" span={1}><Stat value={manualData.bazares.length} label="Registrados" /></Card>
      </Grid>
      <Card eyebrow="Registro" title="Bazares & ferias" full>
        <div style={{ overflowX: "auto" }}>
          <table className="erp-table">
            <thead><tr><th>Evento</th><th>Fecha</th><th>Ciudad</th><th>Ventas (CLP)</th><th>Estado</th><th></th></tr></thead>
            <tbody>
              {manualData.bazares.map(b => (
                <tr key={b.id}>
                  <td><input className="erp-input" value={b.nombre} placeholder="Nombre" onChange={e => upd(b.id, "nombre", e.target.value)} style={{ minWidth: 140 }} /></td>
                  <td><input className="erp-input" type="date" value={b.fecha} onChange={e => upd(b.id, "fecha", e.target.value)} /></td>
                  <td><input className="erp-input" value={b.ciudad} placeholder="Ciudad" onChange={e => upd(b.id, "ciudad", e.target.value)} style={{ width: 90 }} /></td>
                  <td><input className="erp-input" type="number" value={b.ventasPresenciales} onChange={e => upd(b.id, "ventasPresenciales", e.target.value)} style={{ width: 100 }} /></td>
                  <td><select className="erp-select" value={b.estado} onChange={e => upd(b.id, "estado", e.target.value)}>{ESTADOS_BAZAR.map(s => <option key={s}>{s}</option>)}</select></td>
                  <td><button className="erp-icon-btn" onClick={() => del(b.id)}><Trash2 size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="erp-link" style={{ marginTop: "0.75rem" }} onClick={add}><Plus size={14} /> Agregar evento</button>
        <p style={{ fontSize: "0.72rem", color: "#B8A894", marginTop: "0.5rem" }}>Ingresa las ventas en efectivo o Mercado Pago de cada evento. Se suman al total en Dashboard.</p>
      </Card>
    </div>
  );
}

function InventarioTab({ products }) {
  const activos = products.filter(p => p.status === "ACTIVE");
  const total = activos.reduce((s, p) => s + p.stock, 0);
  const valor = activos.reduce((s, p) => s + p.stock * p.precio, 0);
  const sinStock = activos.filter(p => p.stock === 0).length;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Grid cols={3}>
        <Card eyebrow="Productos activos" span={1}><Stat value={activos.length} label="Visibles en tienda" /></Card>
        <Card eyebrow="Stock total" span={1}><Stat value={total} label={sinStock > 0 ? `${sinStock} sin stock` : "Todo con stock"} /></Card>
        <Card eyebrow="Valor inventario" span={1}><Stat value={fmtCLP(valor)} label="Al precio de venta" /></Card>
      </Grid>
      <Card eyebrow="Stock por producto · Shopify" title="Inventario activo" full>
        <div style={{ overflowX: "auto" }}>
          <table className="erp-table">
            <thead><tr><th>Producto</th><th>Categoría</th><th>Stock</th><th>Precio</th></tr></thead>
            <tbody>
              {activos.map(p => (
                <tr key={p.id}>
                  <td style={{ color: p.stock === 0 ? "#C17A5B" : undefined, fontWeight: p.stock === 0 ? 600 : 400 }}>{p.nombre}</td>
                  <td style={{ color: "#8A7866" }}>{p.categoria}</td>
                  <td style={{ fontWeight: 600, color: p.stock === 0 ? "#C17A5B" : "#7C8A6B" }}>{p.stock}</td>
                  <td>{fmtCLP(p.precio)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.72rem", color: "#B8A894", marginTop: "0.75rem" }}>Datos desde Shopify. Productos archivados no aparecen aquí.</p>
      </Card>
    </div>
  );
}

function ProductosTab({ products }) {
  const activos = products.filter(p => p.status === "ACTIVE");
  const archivados = products.filter(p => p.status === "ARCHIVED");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Grid cols={3}>
        <Card eyebrow="Activos" span={1}><Stat value={activos.length} label="Visibles en tienda" /></Card>
        <Card eyebrow="Archivados" span={1}><Stat value={archivados.length} label="Ocultos / sin stock" /></Card>
        <Card eyebrow="Total SKUs" span={1}><Stat value={products.length} label="En Shopify" /></Card>
      </Grid>
      <Card eyebrow="Catálogo · Shopify" title="Todos los productos" full>
        <div style={{ overflowX: "auto" }}>
          <table className="erp-table">
            <thead><tr><th>Producto</th><th>Categoría</th><th>Stock</th><th>Precio</th><th>Estado</th></tr></thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td style={{ color: "#8A7866" }}>{p.categoria}</td>
                  <td style={{ fontWeight: 600, color: p.stock === 0 ? "#C17A5B" : "#7C8A6B" }}>{p.stock}</td>
                  <td>{fmtCLP(p.precio)}</td>
                  <td><span style={{ fontSize: "0.68rem", padding: "0.12rem 0.45rem", borderRadius: "999px", fontWeight: 600, background: p.status === "ACTIVE" ? "#E4E9DC" : "#E8DDD0", color: p.status === "ACTIVE" ? "#5C6B4D" : "#8A7866" }}>{p.status === "ACTIVE" ? "Activo" : "Archivado"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function FinanzasTab({ orders, manualData, setManualData }) {
  const add = () => setManualData(d => ({ ...d, financeEntries: [...d.financeEntries, { id: uid(), mes: "", tipo: "Gasto", categoria: "", monto: 0 }] }));
  const upd = (id, f, v) => setManualData(d => ({ ...d, financeEntries: d.financeEntries.map(x => x.id === id ? { ...x, [f]: v } : x) }));
  const del = (id) => setManualData(d => ({ ...d, financeEntries: d.financeEntries.filter(x => x.id !== id) }));
  const shopify = orders.filter(o => o.estado !== "DEVUELTO").reduce((s, o) => s + o.monto, 0);
  const presencial = manualData.bazares.reduce((s, b) => s + Number(b.ventasPresenciales || 0), 0);
  const otrosIngresos = manualData.financeEntries.filter(f => f.tipo === "Ingreso").reduce((s, f) => s + Number(f.monto || 0), 0);
  const gastos = manualData.financeEntries.filter(f => f.tipo === "Gasto").reduce((s, f) => s + Number(f.monto || 0), 0);
  const totalIngresos = shopify + presencial + otrosIngresos;
  const margen = totalIngresos - gastos;
  const pct = totalIngresos > 0 ? Math.round((margen / totalIngresos) * 100) : 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Grid cols={3}>
        <Card eyebrow="Online · Shopify" span={1}><Stat value={fmtCLP(shopify)} label="Automático" /></Card>
        <Card eyebrow="Presencial" span={1}><Stat value={fmtCLP(presencial)} label="Desde Bazares" /></Card>
        <Card eyebrow="Gastos manuales" span={1}><Stat value={fmtCLP(gastos)} label="Registrados" /></Card>
        <Card eyebrow="Total ingresos" span={1}><Stat value={fmtCLP(totalIngresos)} label="Online + presencial" accent /></Card>
        <Card eyebrow="Margen bruto" span={2} err={margen < 0}><Stat value={`${fmtCLP(margen)} (${pct}%)`} label="Estimado" accent={margen > 0} /></Card>
      </Grid>
      <Card eyebrow="Egresos y otros ingresos" title="Movimientos manuales" full>
        <div style={{ overflowX: "auto" }}>
          <table className="erp-table">
            <thead><tr><th>Mes</th><th>Tipo</th><th>Categoría</th><th>Monto</th><th></th></tr></thead>
            <tbody>
              {manualData.financeEntries.map(f => (
                <tr key={f.id}>
                  <td><input className="erp-input" value={f.mes} placeholder="Ej: Junio 2026" onChange={e => upd(f.id, "mes", e.target.value)} style={{ width: 110 }} /></td>
                  <td><select className="erp-select" value={f.tipo} onChange={e => upd(f.id, "tipo", e.target.value)} style={{ color: f.tipo === "Ingreso" ? "#7C8A6B" : "#C17A5B" }}><option>Ingreso</option><option>Gasto</option></select></td>
                  <td><input className="erp-input" value={f.categoria} placeholder="Categoría" onChange={e => upd(f.id, "categoria", e.target.value)} style={{ minWidth: 140 }} /></td>
                  <td><input className="erp-input" type="number" value={f.monto} onChange={e => upd(f.id, "monto", e.target.value)} style={{ width: 110 }} /></td>
                  <td><button className="erp-icon-btn" onClick={() => del(f.id)}><Trash2 size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="erp-link" style={{ marginTop: "0.75rem" }} onClick={add}><Plus size={14} /> Agregar movimiento</button>
      </Card>
    </div>
  );
}

function PreciosTab({ products }) {
  return (
    <Card eyebrow="Lista de precios · Shopify" title="Precios actuales" full>
      <div style={{ overflowX: "auto" }}>
        <table className="erp-table">
          <thead><tr><th>Producto</th><th>Categoría</th><th>Precio</th><th>Estado</th></tr></thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td style={{ color: "#8A7866" }}>{p.categoria}</td>
                <td style={{ fontWeight: 600 }}>{fmtCLP(p.precio)}</td>
                <td><span style={{ fontSize: "0.68rem", padding: "0.12rem 0.45rem", borderRadius: "999px", fontWeight: 600, background: p.status === "ACTIVE" ? "#E4E9DC" : "#E8DDD0", color: p.status === "ACTIVE" ? "#5C6B4D" : "#8A7866" }}>{p.status === "ACTIVE" ? "Activo" : "Archivado"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: "0.72rem", color: "#B8A894", marginTop: "0.75rem" }}>Para modificar precios, hazlo directamente en Shopify admin.</p>
    </Card>
  );
}

function DescuentosTab({ manualData, setManualData }) {
  const add = () => setManualData(d => ({ ...d, discounts: [...d.discounts, { id: uid(), codigo: "", porcentaje: 0, vigencia: "", descripcion: "", estado: "Activo" }] }));
  const upd = (id, f, v) => setManualData(d => ({ ...d, discounts: d.discounts.map(x => x.id === id ? { ...x, [f]: v } : x) }));
  const del = (id) => setManualData(d => ({ ...d, discounts: d.discounts.filter(x => x.id !== id) }));
  return (
    <Card eyebrow="Cupones" title="Descuentos activos" full>
      <div style={{ overflowX: "auto" }}>
        <table className="erp-table">
          <thead><tr><th>Código</th><th>%</th><th>Descripción</th><th>Vigencia</th><th>Estado</th><th></th></tr></thead>
          <tbody>
            {manualData.discounts.map(x => (
              <tr key={x.id}>
                <td style={{ fontWeight: 600 }}><input className="erp-input" value={x.codigo} placeholder="CÓDIGO" onChange={e => upd(x.id, "codigo", e.target.value)} style={{ width: 110 }} /></td>
                <td><input className="erp-input" type="number" value={x.porcentaje} onChange={e => upd(x.id, "porcentaje", e.target.value)} style={{ width: 50 }} /></td>
                <td><input className="erp-input" value={x.descripcion} placeholder="Descripción" onChange={e => upd(x.id, "descripcion", e.target.value)} style={{ minWidth: 130 }} /></td>
                <td><input className="erp-input" value={x.vigencia} placeholder="Hasta..." onChange={e => upd(x.id, "vigencia", e.target.value)} style={{ width: 90 }} /></td>
                <td><select className="erp-select" value={x.estado} onChange={e => upd(x.id, "estado", e.target.value)}>{ESTADOS_DESCUENTO.map(s => <option key={s}>{s}</option>)}</select></td>
                <td><button className="erp-icon-btn" onClick={() => del(x.id)}><Trash2 size={14} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="erp-link" style={{ marginTop: "0.75rem" }} onClick={add}><Plus size={14} /> Agregar descuento</button>
    </Card>
  );
}

function ProyeccionesTab({ orders, manualData }) {
  const meses = byMonth(orders);
  const prom = meses.length > 0 ? Math.round(meses.reduce((s, [, v]) => s + v, 0) / meses.length) : 0;
  const presencial = manualData.bazares.reduce((s, b) => s + Number(b.ventasPresenciales || 0), 0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Grid cols={3}>
        <Card eyebrow="Promedio mensual" span={1}><Stat value={fmtCLP(prom)} label="Ventas Shopify" /></Card>
        <Card eyebrow="Proyección 3 meses" span={1}><Stat value={fmtCLP(prom * 3)} label="Sin crecimiento" /></Card>
        <Card eyebrow="Proyección +10%" span={1}><Stat value={fmtCLP(Math.round(prom * 3 * 1.1))} label="Crecimiento estimado" accent /></Card>
      </Grid>
      <Card eyebrow="Contexto" full>
        <p style={{ fontSize: "0.88rem", lineHeight: 1.65, color: "#5A4A3D" }}>
          Proyección basada en el promedio de los últimos {meses.length} meses de Shopify. Ventas presenciales registradas: {fmtCLP(presencial)}.
          El lanzamiento de Elevated Essentials y campañas Meta Ads deberían impactar positivamente en Q3 2026.
        </p>
      </Card>
    </div>
  );
}

function ObjetivosTab({ manualData, setManualData }) {
  const toggle = (h, id) => setManualData(d => ({ ...d, goals: { ...d.goals, [h]: d.goals[h].map(g => g.id === id ? { ...g, done: !g.done } : g) } }));
  const add = (h) => setManualData(d => ({ ...d, goals: { ...d.goals, [h]: [...d.goals[h], { id: uid(), texto: "", done: false }] } }));
  const upd = (h, id, v) => setManualData(d => ({ ...d, goals: { ...d.goals, [h]: d.goals[h].map(g => g.id === id ? { ...g, texto: v } : g) } }));
  const del = (h, id) => setManualData(d => ({ ...d, goals: { ...d.goals, [h]: d.goals[h].filter(g => g.id !== id) } }));
  const blocks = [
    { key: "corto", title: "Corto plazo", sub: "6 – 12 meses" },
    { key: "mediano", title: "Mediano plazo", sub: "1 – 3 años" },
    { key: "largo", title: "Largo plazo", sub: "5 – 10 años" },
  ];
  return (
    <Grid cols={3}>
      {blocks.map(b => {
        const items = manualData.goals[b.key];
        const done = items.filter(i => i.done).length;
        return (
          <Card key={b.key} eyebrow={b.sub} title={b.title} span={1}>
            <p style={{ fontSize: "0.72rem", color: "#B8A894", marginBottom: "0.65rem" }}>{done}/{items.length} completados</p>
            <ul style={{ fontSize: "0.85rem", display: "flex", flexDirection: "column", gap: "0.45rem", paddingLeft: 0, listStyle: "none" }}>
              {items.map(g => (
                <li key={g.id} style={{ display: "flex", alignItems: "flex-start", gap: "0.45rem" }}>
                  <button className={`erp-checkbox ${g.done ? "done" : ""}`} onClick={() => toggle(b.key, g.id)}>
                    {g.done && <Check size={10} color="#FBF7F0" />}
                  </button>
                  <input className="erp-input" style={{ flex: 1, textDecoration: g.done ? "line-through" : "none", color: g.done ? "#B8A894" : "#5A4A3D" }} value={g.texto} onChange={e => upd(b.key, g.id, e.target.value)} />
                  <button className="erp-icon-btn faint" onClick={() => del(b.key, g.id)}><Trash2 size={12} /></button>
                </li>
              ))}
            </ul>
            <button className="erp-link" style={{ marginTop: "0.65rem" }} onClick={() => add(b.key)}><Plus size={14} /> Agregar</button>
          </Card>
        );
      })}
    </Grid>
  );
}

function MarketingTab({ manualData, setManualData }) {
  const add = () => setManualData(d => ({ ...d, contentCalendar: [...d.contentCalendar, { id: uid(), fecha: "", plataforma: "Instagram", tipo: "", estado: "Idea" }] }));
  const upd = (id, f, v) => setManualData(d => ({ ...d, contentCalendar: d.contentCalendar.map(c => c.id === id ? { ...c, [f]: v } : c) }));
  const del = (id) => setManualData(d => ({ ...d, contentCalendar: d.contentCalendar.filter(c => c.id !== id) }));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Grid cols={2}>
        <Card eyebrow="Identidad" title="Pilares de marca" span={1}>
          <ul style={{ fontSize: "0.85rem", display: "flex", flexDirection: "column", gap: "0.45rem", paddingLeft: 0, listStyle: "none", color: "#5A4A3D" }}>
            {manualData.pilares.map((p, i) => (
              <li key={i} style={{ display: "flex", gap: "0.45rem" }}><span style={{ color: "#C17A5B" }}>·</span><span>{p}</span></li>
            ))}
          </ul>
        </Card>
        <Card eyebrow="Tono" title="Voz de marca" span={1}>
          <p style={{ fontSize: "0.85rem", lineHeight: 1.65, color: "#5A4A3D" }}>
            Effortless, cool, femenina pero moderna. Premium pero cercana. Nunca promocional ni de catálogo: cada pieza de contenido se siente como una postal de un verano que es una forma de vivir.
          </p>
          <div style={{ marginTop: "0.75rem", display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
            <span className="erp-pill">From coast to city</span>
            <span className="erp-pill">Cormorant Garamond</span>
            <span className="erp-pill">Tonos cremas / arena</span>
          </div>
        </Card>
      </Grid>
      <Card eyebrow="Planificación" title="Calendario de contenido" full>
        <div style={{ overflowX: "auto" }}>
          <table className="erp-table">
            <thead><tr><th>Fecha</th><th>Plataforma</th><th>Contenido</th><th>Estado</th><th></th></tr></thead>
            <tbody>
              {manualData.contentCalendar.map(c => (
                <tr key={c.id}>
                  <td><input className="erp-input" type="date" value={c.fecha} onChange={e => upd(c.id, "fecha", e.target.value)} style={{ width: 130 }} /></td>
                  <td><select className="erp-select" value={c.plataforma} onChange={e => upd(c.id, "plataforma", e.target.value)}>{PLATAFORMAS.map(p => <option key={p}>{p}</option>)}</select></td>
                  <td><input className="erp-input" value={c.tipo} placeholder="Ej: Carrusel embajadoras" onChange={e => upd(c.id, "tipo", e.target.value)} style={{ minWidth: 160 }} /></td>
                  <td><select className="erp-select" value={c.estado} onChange={e => upd(c.id, "estado", e.target.value)}>{ESTADOS_CONTENIDO.map(e => <option key={e}>{e}</option>)}</select></td>
                  <td><button className="erp-icon-btn" onClick={() => del(c.id)}><Trash2 size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="erp-link" style={{ marginTop: "0.75rem" }} onClick={add}><Plus size={14} /> Agregar contenido</button>
      </Card>
    </div>
  );
}

// ─── Estilos globales ────────────────────────────────────────
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #F7F1E8; }
  .erp-sidebar { background:#2C2118; color:#E8DDD0; width:220px; flex-shrink:0; padding:1.25rem 0.75rem; overflow-y:auto; height:100vh; position:sticky; top:0; }
  .erp-section-label { font-size:0.6rem; letter-spacing:0.14em; text-transform:uppercase; color:#7C6A58; margin:1rem 0 0.35rem 0.5rem; }
  .erp-nav-item { display:flex; align-items:center; gap:0.55rem; padding:0.45rem 0.5rem; border-radius:0.5rem; font-size:0.82rem; color:#C9BBA8; cursor:pointer; border:none; background:none; width:100%; text-align:left; border-left:3px solid transparent; }
  .erp-nav-item:hover { background:#382B1F; color:#F0E7D8; }
  .erp-nav-item.active { background:#382B1F; color:#F2A98A; border-left:3px solid #C17A5B; }
  .erp-badge { font-size:0.55rem; padding:0.1rem 0.4rem; border-radius:999px; background:#C17A5B; color:#2C2118; font-weight:700; margin-left:auto; }
  .erp-live { font-size:0.55rem; padding:0.1rem 0.4rem; border-radius:999px; background:#4A6B3A; color:#C8E6B0; font-weight:700; margin-left:auto; }
  .erp-card { background:#FBF7F0; border:1px solid #E8DDD0; border-radius:1rem; padding:1.25rem; }
  .erp-pill { padding:0.2rem 0.65rem; border-radius:999px; font-size:0.72rem; background:#E8DDD0; color:#5A4A3D; }
  .erp-pill.live { background:#E4E9DC; color:#5C6B4D; }
  .erp-link { display:inline-flex; align-items:center; gap:0.25rem; font-size:0.875rem; color:#C17A5B; background:none; border:none; cursor:pointer; font-family:inherit; }
  .erp-link:hover { color:#A85F40; }
  .erp-icon-btn { color:#C17A5B; background:none; border:none; cursor:pointer; }
  .erp-icon-btn:hover { color:#A85F40; }
  .erp-icon-btn.faint { color:#D9CBB8; }
  .erp-icon-btn.faint:hover { color:#C17A5B; }
  .erp-input, .erp-select { background:transparent; border:none; outline:none; font-family:inherit; color:#5A4A3D; font-size:0.85rem; }
  .erp-checkbox { margin-top:0.125rem; flex-shrink:0; width:1rem; height:1rem; border-radius:999px; display:flex; align-items:center; justify-content:center; border:1px solid #C9B8A4; background:transparent; cursor:pointer; padding:0; }
  .erp-checkbox.done { background:#7C8A6B; border-color:#7C8A6B; }
  table.erp-table { width:100%; font-size:0.85rem; border-collapse:collapse; }
  table.erp-table th { text-align:left; color:#B8A894; font-size:0.68rem; text-transform:uppercase; letter-spacing:0.05em; padding-bottom:0.5rem; padding-right:0.75rem; }
  table.erp-table td { padding:0.45rem 0.75rem 0.45rem 0; border-top:1px solid #E8DDD0; }
  .erp-tide { height:4px; border-radius:999px; margin-bottom:1.5rem; background:linear-gradient(90deg,#C17A5B 0%,#D9CBB8 35%,#8A9A7B 70%,#C17A5B 100%); background-size:200% 100%; animation:erp-tide-move 8s ease-in-out infinite; }
  @keyframes erp-tide-move { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
  @media (prefers-reduced-motion:reduce) { .erp-tide{animation:none} }
  .erp-grid { display:grid; gap:1rem; }
  @media (max-width:768px) {
    .erp-sidebar { width:100%; height:auto; position:static; }
    .erp-grid { grid-template-columns:1fr !important; }
    .erp-grid > div { grid-column:span 1 !important; }
  }
`;
