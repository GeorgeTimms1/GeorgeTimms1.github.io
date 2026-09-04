// Each project has a `links` array. Each link = { platform, href }.
// Platforms are free-form strings — add "iOS", "Android", "Steam", "Web", "macOS", etc.
// The first link in the array is the primary one used when the whole card is clicked.
const projects = [
  // 2027
  { year: 2027, name: "I Buried Steve", desc: "Chaotic beach party game for up to 8. Build the obstacle course, then race your friends through it.", icon: "assets/i-buried-steve.jpg",
    group: "In dev", status: "Coming soon",
    links: [
      { platform: "Steam",       href: "https://store.steampowered.com/app/5031430/I_Buried_Steve/" },
    ] },

  // 2026
  { year: 2026, name: "Vantage",      desc: "Net worth dashboard — cash, investments and property, kept private.", icon: "assets/vantage.jpg",
    group: "In dev",
    links: [{ platform: "iOS",   href: "https://apps.apple.com/us/app/vantage-portfolio-dashboard/id6801780511" }] },

  { year: 2026, name: "Graze",        desc: "Digital detox — gentle nudges to put your phone down.", icon: "assets/graze.jpg",
    links: [{ platform: "iOS",   href: "https://apps.apple.com/us/app/graze-digital-detox/id6768238322" }] },

  { year: 2026, name: "Showup",       desc: "Passive habit tracker that runs in the background.",    icon: "assets/showup.jpg",
    links: [{ platform: "iOS",   href: "https://apps.apple.com/us/app/showup-passive-habit-tracker/id6770475338" }] },

  { year: 2026, name: "Payroll",      desc: "Roguelike dice deckbuilder. Pay the loan shark.",       icon: "assets/payroll-dice.jpg",
    featured: true,
    links: [
      { platform: "Steam",       href: "https://store.steampowered.com/app/4270940/Payroll/" },
      { platform: "iOS",         href: "https://apps.apple.com/us/app/payroll-dice/id6760189922" },
      { platform: "Google Play", href: "https://play.google.com/store/apps/details?id=com.Thyme.Payroll&hl=en_GB" },
    ] },

  // 2025
  { year: 2025, name: "Cooperative Multi-Agent RL", desc: "Unity drone-swarm sim comparing QMIX, MADDPG, and A* across packet-loss conditions.", icon: "assets/github.svg",
    links: [
      { platform: "GitHub",      href: "https://github.com/GeorgeTimms1/cooperative-multi-agent-rl" },
    ] },

  { year: 2025, name: "Pungo TD",     desc: "Tower defense — strategic waves of chaos.",             icon: "assets/pungo.jpg",
    links: [
      { platform: "iOS",         href: "https://apps.apple.com/us/app/pungo-td/id6740081302" },
      { platform: "Google Play", href: "#" }, // TODO
    ] },

  // 2024
  { year: 2024, name: "Castle Run",   desc: "Sword Master — fast-paced runner action game.",         icon: "assets/castle-run.jpg",
    links: [
      { platform: "iOS",         href: "https://apps.apple.com/us/app/castle-run-sword-master/id6499447306" },
      { platform: "Google Play", href: "#" }, // TODO
    ] },

  { year: 2024, name: "ColorSum",     desc: "Minimal colour-matching number puzzle.",                icon: "assets/colorsum.jpg",
    links: [
      { platform: "iOS",         href: "https://apps.apple.com/us/app/colorsum-puzzle/id6476049080" },
      { platform: "Google Play", href: "#" }, // TODO
    ] },

  // 2023
  { year: 2023, name: "AquaRush",     desc: "Sea Survival — raft survival arcade.",                  icon: "assets/aquarush.jpg",
    links: [
      { platform: "iOS",         href: "https://apps.apple.com/us/app/aquarush-sea-survival/id6473044436" },
      { platform: "Google Play", href: "#" }, // TODO
    ] },

  { year: 2023, name: "Coco's Adventure", desc: "Retro pixel-art platformer.",                       icon: "assets/cocos.jpg",
    links: [
      { platform: "iOS",         href: "https://apps.apple.com/us/app/cocos-adventure/id6464393605" },
      { platform: "Google Play", href: "#" }, // TODO
    ] },
];

const work = document.getElementById("work");

// Build a single project card (<li> with the clickable row inside).
function buildProjectCard(p) {
  const platformList = (p.links || []).map(l => l.platform).join(", ");
  const li = document.createElement("li");
  const row = document.createElement("div");
  row.className = "proj";
  if (p.featured) row.classList.add("featured");
  row.setAttribute("aria-label", `${p.name}${p.status ? ", " + p.status : ""} — ${p.desc} (${platformList})`);

  const ic = document.createElement("div"); ic.className = "proj-icon";
  const img = document.createElement("img"); img.src = p.icon; img.alt = ""; img.loading = "lazy"; img.decoding = "async";
  ic.append(img);

  const body = document.createElement("div"); body.className = "proj-body";
  const name = document.createElement("div"); name.className = "proj-name"; name.textContent = p.name;
  if (p.status) {
    const badge = document.createElement("span");
    badge.className = "status"; badge.textContent = p.status;
    name.append(badge);
  }
  const desc = document.createElement("div"); desc.className = "proj-desc"; desc.textContent = p.desc;
  body.append(name, desc);

  const meta = document.createElement("div"); meta.className = "proj-meta";
  for (const l of (p.links || [])) {
    const pill = document.createElement("a");
    pill.className = `platform plat-${l.platform.toLowerCase().replace(/[^a-z0-9]+/g, "")}`;
    pill.href = l.href; pill.target = "_blank"; pill.rel = "noopener";
    pill.textContent = l.platform;
    pill.setAttribute("aria-label", `${p.name} on ${l.platform}`);
    meta.append(pill);
  }

  row.append(ic, body, meta);

  // Clicking the row (outside a pill) opens the primary link.
  const primary = p.links?.[0]?.href;
  if (primary) {
    row.classList.add("clickable");
    row.tabIndex = 0;
    row.addEventListener("click", e => {
      if (e.target.closest("a")) return;
      window.open(primary, "_blank", "noopener");
    });
    row.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); window.open(primary, "_blank", "noopener"); }
    });
  }

  li.append(row);
  return li;
}

// One labelled section — gutter label on the left, a stack of cards on the right.
function buildSection(label, items, extraClass) {
  const sec = document.createElement("section");
  sec.className = extraClass ? `year ${extraClass}` : "year";

  const tag = document.createElement("div");
  tag.className = "year-label";
  tag.textContent = label;

  const list = document.createElement("ul");
  list.className = "row";
  for (const p of items) list.append(buildProjectCard(p));

  sec.append(tag, list);
  return sec;
}

// Group projects by a key, preserving the order they appear in `projects`.
function groupBy(items, key) {
  const map = new Map();
  for (const p of items) {
    const k = key(p);
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(p);
  }
  return map;
}

const frag = document.createDocumentFragment();

// Flagship first, then any named `group`, then the year timeline.
const featured = projects.filter(p => p.featured);
if (featured.length) frag.append(buildSection("Flagship", featured, "featured-section"));

const grouped = groupBy(projects.filter(p => !p.featured && p.group), p => p.group);
for (const [label, items] of grouped) frag.append(buildSection(label, items, "group-section"));

const byYear = groupBy(projects.filter(p => !p.featured && !p.group), p => p.year);
for (const y of [...byYear.keys()].sort((a, b) => b - a)) frag.append(buildSection(y, byYear.get(y)));

work.append(frag);

document.getElementById("year").textContent = new Date().getFullYear();
