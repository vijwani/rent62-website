import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Instagram,
  MapPin,
  Home,
  Building2,
  Users,
  BadgeCheck,
  ShieldCheck,
  ArrowRight,
  Search,
  Sparkles,
  MessageCircle,
} from "lucide-react";

// Rent62 — Single-file marketing site
// Tech: React + Tailwind (works great in Next.js / Vite)
// Notes:
// - Replace the LOGO_SRC below with your real hosted logo (or import it).
// - The contact form is front-end only; wire it to WhatsApp, email, or your backend as needed.

const BRAND = {
  name: "Rent62",
  tagline: "Fair Rents. Honest Homes.",
  city: "Noida",
  phone: "+91 9211899030",
  phoneDigits: "9211899030",
  instagram: "https://www.instagram.com/rent_62/",
  maps: "https://maps.app.goo.gl/uW7bifousTUV7QFG9",
  email: "officialrent62@gmail.com",
};

// If you're in a bundler (Vite/Next), use: import logo from "./logo.png";
// and set LOGO_SRC = logo. For now it's a tasteful inline placeholder.
import logo from "./assets/logo.jpeg";
const LOGO_SRC = logo;


const AREAS = [
  "Sector 62",
  "Sector 61",
  "Sector 59",
  "Sector 71",
  "Sector 70",
  "Sector 66",
  "Sector 50",
  "Sector 51",
  "Sector 52",
  "Noida Extension",
  "Crossings Republik",
  "Siddharth Vihar",
  "Indirapuram",
  "Vaishali",
  "Mayur Vihar",
  "Vasundhara",
];

const LISTINGS = [
  {
    id: "L1",
    title: "Sunny 1 RK near Metro",
    type: "1 RK",
    locality: "Sector 62",
    price: "₹8,500/mo",
    perks: ["Walking distance to metro", "Semi-furnished", "Owner verified"],
  },
  {
    id: "L2",
    title: "Spacious 1 BHK for Professionals",
    type: "1 BHK",
    locality: "Sector 61",
    price: "₹16,000/mo",
    perks: ["Gated society", "Parking", "Power backup"],
  },
  {
    id: "L3",
    title: "Family-ready 2 BHK with Balcony",
    type: "2 BHK",
    locality: "Sector 50",
    price: "₹28,000/mo",
    perks: ["Park view", "Lift", "Security"],
  },
  {
    id: "L4",
    title: "Modern 3 BHK for Families",
    type: "3 BHK",
    locality: "Sector 71",
    price: "₹40,000/mo",
    perks: ["Large living area", "Gated", "Near market"],
  },
  {
    id: "L5",
    title: "PG / Shared Rooms (Flexible)",
    type: "PG",
    locality: "Sector 66",
    price: "From ₹6,500/mo",
    perks: ["Meals options", "Housekeeping", "Fast move-in"],
  },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/90">
      {children}
    </span>
  );
}

function Section({ id, eyebrow, title, desc, children }) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-screen-2xl px-4 py-14 sm:px-6">
      <div className="mb-8">
        {eyebrow ? (
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-widest text-white/60">
            <span className="h-[1px] w-10 bg-white/20" />
            <span>{eyebrow}</span>
          </div>
        ) : null}
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
        {desc ? <p className="mt-3 max-w-2xl text-white/70">{desc}</p> : null}
      </div>
      {children}
    </section>
  );
}

function PrimaryButton({ href, onClick, children, className }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:shadow md:px-5";
  if (href) {
    return (
      <a href={href} className={cn(base, className)}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cn(base, className)}>
      {children}
    </button>
  );
}

function GhostButton({ href, children, className }) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10",
        className
      )}
    >
      {children}
    </a>
  );
}

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-sm font-medium text-white/80 transition hover:text-white"
    >
      {children}
    </a>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <Icon className="h-5 w-5 text-white/90" />
        </div>
        <div>
          <div className="text-lg font-semibold text-white">{value}</div>
          <div className="text-sm text-white/60">{label}</div>
        </div>
      </div>
    </div>
  );
}

function ListingCard({ item }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:bg-white/10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold tracking-widest text-white/60">
            {item.type} • {item.locality}
          </div>
          <div className="mt-1 text-lg font-semibold text-white">{item.title}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-white">
          {item.price}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {item.perks.map((p) => (
          <Pill key={p}>{p}</Pill>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div className="text-xs text-white/60">Ref: {item.id}</div>
        <a
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition group-hover:text-white"
          href={`https://wa.me/91${BRAND.phoneDigits}?text=${encodeURIComponent(
            `Hi Rent62, I'm interested in: ${item.title} (${item.type}, ${item.locality}). Please share details.`
          )}`}
          target="_blank"
          rel="noreferrer"
        >
          Enquire <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

export default function Rent62Landing() {
  const [activeType, setActiveType] = useState("All");
  const [query, setQuery] = useState("");

  const types = useMemo(() => {
    const t = new Set(LISTINGS.map((l) => l.type));
    return ["All", ...Array.from(t)];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return LISTINGS.filter((l) => {
      const matchType = activeType === "All" ? true : l.type === activeType;
      const matchQ =
        !q ||
        [l.title, l.type, l.locality, l.price, ...l.perks]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return matchType && matchQ;
    });
  }, [activeType, query]);

  return (
    <div className="min-h-screen bg-[#040b1b] text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-12rem] right-[-10rem] h-[30rem] w-[30rem] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-white/10 blur-3xl" />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#040b1b]/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-3">
            <img
              src={LOGO_SRC}
              alt="Rent62 logo"
              className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5"
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">{BRAND.name}</div>
              <div className="text-xs text-white/60">Real Estate • {BRAND.city}</div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#areas">Areas</NavLink>
            <NavLink href="#listings">Listings</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <GhostButton href={`tel:${BRAND.phoneDigits}`}>
              <Phone className="h-4 w-4" />
              Call
            </GhostButton>
            <PrimaryButton
              href={`https://wa.me/91${BRAND.phoneDigits}?text=${encodeURIComponent(
                "Hi Rent62, I want to rent a place in Noida. Please help me with options."
              )}`}
              className="hidden sm:inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </PrimaryButton>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main id="top">
        <div className="mx-auto w-full max-w-screen-2xl px-4 pb-10 pt-10 sm:px-6 sm:pt-14">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 flex flex-wrap gap-2">
                <Pill>
                  <Sparkles className="mr-2 h-3.5 w-3.5" />
                  Verified rentals in {BRAND.city}
                </Pill>
                <Pill>Flats • Individual Homes • PGs</Pill>
                <Pill>For Bachelors • Families • Students</Pill>
              </div>

              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Find the right home in Noida — fast.
              </h1>
              <p className="mt-4 max-w-xl text-white/70">
                {BRAND.name} helps you rent with confidence. Clear options, honest
                guidance, and a smooth move-in — without the hassle.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <PrimaryButton href="#contact">
                  Get Options Now <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
                <GhostButton href={BRAND.maps}>
                  <MapPin className="h-4 w-4" />
                  Open on Maps
                </GhostButton>
                <GhostButton href={BRAND.instagram}>
                  <Instagram className="h-4 w-4" />
                  Instagram
                </GhostButton>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <Stat icon={BadgeCheck} label="Trusted support" value="Honest advice" />
                <Stat icon={ShieldCheck} label="Safer renting" value="Owner verified" />
                <Stat icon={Users} label="All needs" value="Bachelors → Families" />
              </div>

              <div className="mt-7 text-xs text-white/50">
                Call/WhatsApp: <span className="text-white/70">{BRAND.phone}</span> •
                Email: <span className="text-white/70">{BRAND.email}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">{BRAND.tagline}</div>
                    <div className="mt-1 text-sm text-white/60">
                      Your local rental partner in Noida.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <Home className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {["1 RK", "1 BHK", "2 BHK", "3 BHK"].map((t) => (
                    <div
                      key={t}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="text-xs font-semibold tracking-widest text-white/60">
                        Popular
                      </div>
                      <div className="mt-1 text-xl font-semibold">{t}</div>
                      <div className="mt-2 text-sm text-white/60">
                        Great options near metro & markets.
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold">Need a shortlist?</div>
                      <div className="text-sm text-white/60">
                        Tell us your budget + sector.
                      </div>
                    </div>
                    <PrimaryButton
                      href={`https://wa.me/91${BRAND.phoneDigits}?text=${encodeURIComponent(
                        "Hi Rent62, please share rental options. My budget is __ and preferred sector is __."
                      )}`}
                    >
                      WhatsApp
                      <ArrowRight className="h-4 w-4" />
                    </PrimaryButton>
                  </div>
                </div>
              </div>

              {/* Decorative */}
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-white/5 blur-2xl" />
            </motion.div>
          </div>
        </div>

        {/* Services */}
        <Section
          id="services"
          eyebrow="WHAT WE DO"
          title="Renting made simple"
          desc="From first call to keys-in-hand — we handle the details so you can focus on moving in."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <Building2 className="h-5 w-5 text-white/90" />
              <div className="mt-3 text-lg font-semibold">Flats & Homes</div>
              <p className="mt-2 text-sm text-white/70">
                1 RK to 3 BHK, plus independent homes across top Noida sectors.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <ShieldCheck className="h-5 w-5 text-white/90" />
              <div className="mt-3 text-lg font-semibold">Verified Guidance</div>
              <p className="mt-2 text-sm text-white/70">
                Clear expectations on rent, deposit, and move-in — no surprises.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <Users className="h-5 w-5 text-white/90" />
              <div className="mt-3 text-lg font-semibold">PGs Available</div>
              <p className="mt-2 text-sm text-white/70">
                Student / working options with flexible move-in and support.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <GhostButton href={`tel:${BRAND.phoneDigits}`}>
              <Phone className="h-4 w-4" />
              Call {BRAND.phoneDigits}
            </GhostButton>
            <GhostButton
              href={`https://wa.me/91${BRAND.phoneDigits}?text=${encodeURIComponent(
                "Hi Rent62, I want to rent a 1RK/1BHK/2BHK/3BHK in Noida. Please share options."
              )}`}
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp for options
            </GhostButton>
          </div>
        </Section>

        {/* Areas */}
        <Section
          id="areas"
          eyebrow="AREAS WE COVER"
          title="Noida + nearby hotspots"
          desc="We focus on high-demand sectors and connected neighborhoods for easier commutes."
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {AREAS.map((a) => (
              <div
                key={a}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="font-medium text-white/90">{a}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-lg font-semibold">Want the best options today?</div>
                <div className="mt-1 text-white/70">
                  Share your preferred sector + budget and we’ll shortlist.
                </div>
              </div>
              <PrimaryButton
                href={`https://wa.me/91${BRAND.phoneDigits}?text=${encodeURIComponent(
                  "Hi Rent62, my preferred sector is __ and budget is __. Please share the best options." 
                )}`}
              >
                Get a Shortlist <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
            </div>
          </div>
        </Section>

        {/* Listings */}
        <Section
          id="listings"
          eyebrow="FEATURED"
          title="Sample listings (customize for your inventory)"
          desc="These are example cards. Replace with your real properties, photos, and prices."
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveType(t)}
                  className={cn(
                    "rounded-2xl border px-3 py-1.5 text-sm font-semibold transition",
                    activeType === t
                      ? "border-white/30 bg-white text-slate-900"
                      : "border-white/15 bg-white/5 text-white/80 hover:bg-white/10"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search: Sector 62, 1BHK, balcony…"
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/25"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {filtered.map((item) => (
              <ListingCard key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div>
              <div className="text-lg font-semibold">Want real-time availability?</div>
              <div className="mt-1 text-white/70">
                Message us your requirement and we’ll share current options.
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <GhostButton href={BRAND.instagram}>
                <Instagram className="h-4 w-4" />
                See updates
              </GhostButton>
              <PrimaryButton
                href={`https://wa.me/91${BRAND.phoneDigits}?text=${encodeURIComponent(
                  "Hi Rent62, please share current availability. My requirement: __ (type), budget __, preferred area __." 
                )}`}
              >
                WhatsApp Now <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
            </div>
          </div>
        </Section>

        {/* Contact */}
        <Section
          id="contact"
          eyebrow="CONTACT"
          title="Let’s find your next home"
          desc="Call, WhatsApp, or share your requirement below. We’ll respond quickly."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex flex-wrap items-center gap-3">
                <GhostButton href={`tel:${BRAND.phoneDigits}`}>
                  <Phone className="h-4 w-4" />
                  Call
                </GhostButton>
                <PrimaryButton
                  href={`https://wa.me/91${BRAND.phoneDigits}?text=${encodeURIComponent(
                    "Hi Rent62, I want to rent in Noida. My budget is __ and preferred area is __."
                  )}`}
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </PrimaryButton>
                <GhostButton href={BRAND.maps}>
                  <MapPin className="h-4 w-4" />
                  Directions
                </GhostButton>
              </div>

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-semibold tracking-widest text-white/60">
                    Phone
                  </div>
                  <div className="mt-1 text-lg font-semibold">{BRAND.phone}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-semibold tracking-widest text-white/60">
                    Email
                  </div>
                  <div className="mt-1 text-lg font-semibold">{BRAND.email}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-semibold tracking-widest text-white/60">
                    Instagram
                  </div>
                  <a
                    className="mt-1 inline-flex items-center gap-2 text-lg font-semibold underline decoration-white/20 underline-offset-4 hover:decoration-white/50"
                    href={BRAND.instagram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    @rent_62 <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="mt-6 text-sm text-white/60">
                <span className="font-semibold text-white/80">Tip:</span> The fastest way
                is WhatsApp — send your budget + preferred sector.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-lg font-semibold">Share your requirement</div>
              <p className="mt-2 text-sm text-white/70">
                This form opens WhatsApp with a pre-filled message.
              </p>

              <RequirementForm />
            </div>
          </div>
        </Section>

        {/* Footer */}
        <footer className="border-t border-white/10">
          <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4 px-4 py-10 text-sm text-white/60 sm:px-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_SRC}
                alt="Rent62"
                className="h-9 w-9 rounded-2xl border border-white/10 bg-white/5"
              />
              <div>
                <div className="font-semibold text-white/80">{BRAND.name}</div>
                <div className="text-xs">{BRAND.tagline}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a className="hover:text-white" href={`tel:${BRAND.phoneDigits}`}>
                {BRAND.phoneDigits}
              </a>
              <a className="hover:text-white" href={BRAND.instagram}>
                Instagram
              </a>
              <a className="hover:text-white" href={BRAND.maps}>
                Maps
              </a>
            </div>

            <div className="text-xs">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function RequirementForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("1 BHK");
  const [budget, setBudget] = useState("");
  const [area, setArea] = useState("Sector 62");
  const [moveIn, setMoveIn] = useState("Within 1 week");
  const [notes, setNotes] = useState("");

  const waLink = useMemo(() => {
    const msg =
      `Hi Rent62, I’m looking for a rental in Noida.\n\n` +
      `Name: ${name || "__"}\n` +
      `My phone: ${phone || "__"}\n` +
      `Type: ${type}\n` +
      `Budget: ${budget || "__"}\n` +
      `Preferred area: ${area}\n` +
      `Move-in: ${moveIn}\n` +
      `Notes: ${notes || "__"}`;
    return `https://wa.me/91${BRAND.phoneDigits}?text=${encodeURIComponent(msg)}`;
  }, [name, phone, type, budget, area, moveIn, notes]);

  return (
    <div className="mt-6 grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/25"
            placeholder="e.g., Aman"
          />
        </Field>
        <Field label="Your phone">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/25"
            placeholder="e.g., 98xxxxxx"
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Type">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition focus:border-white/25"
          >
            <option className="bg-[#040b1b]" value="1 RK">
              1 RK
            </option>
            <option className="bg-[#040b1b]" value="1 BHK">
              1 BHK
            </option>
            <option className="bg-[#040b1b]" value="2 BHK">
              2 BHK
            </option>
            <option className="bg-[#040b1b]" value="3 BHK">
              3 BHK
            </option>
            <option className="bg-[#040b1b]" value="PG">
              PG
            </option>
            <option className="bg-[#040b1b]" value="Independent House">
              Independent House
            </option>
          </select>
        </Field>

        <Field label="Budget (monthly)">
          <input
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/25"
            placeholder="e.g., ₹18,000"
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Preferred area">
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition focus:border-white/25"
          >
            {AREAS.map((a) => (
              <option key={a} className="bg-[#040b1b]" value={a}>
                {a}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Move-in">
          <select
            value={moveIn}
            onChange={(e) => setMoveIn(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition focus:border-white/25"
          >
            {["Immediately", "Within 1 week", "Within 2 weeks", "This month", "Next month"].map(
              (m) => (
                <option key={m} className="bg-[#040b1b]" value={m}>
                  {m}
                </option>
              )
            )}
          </select>
        </Field>
      </div>

      <Field label="Notes (optional)">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/25"
          placeholder="e.g., near metro, furnished, balcony…"
        />
      </Field>

      <div className="flex flex-wrap items-center gap-3">
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:shadow"
        >
          <MessageCircle className="h-4 w-4" />
          Send on WhatsApp
        </a>

        <a
          href={`mailto:${BRAND.email}?subject=${encodeURIComponent(
            "Rental requirement - Rent62"
          )}&body=${encodeURIComponent(
            `Hello Rent62,\n\nMy requirement:\n- Name: ${name || "__"}\n- Phone: ${phone || "__"}\n- Type: ${type}\n- Budget: ${budget || "__"}\n- Area: ${area}\n- Move-in: ${moveIn}\n- Notes: ${notes || "__"}\n\nThanks!`
          )}`}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
        >
          Email instead <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="text-xs text-white/50">
        By sending, you agree to be contacted by {BRAND.name} for rental assistance.
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="grid gap-2">
      <div className="text-xs font-semibold tracking-widest text-white/60">
        {label}
      </div>
      {children}
    </label>
  );
}

