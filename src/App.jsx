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

// Logo (keep as-is)
import logo from "./assets/RENT-62.png";
const LOGO_SRC = logo;

// Areas
const AREAS = [
  "Noida Sector 62",
  "Noida Sector 61",
  "Noida Sector 59",
  "Noida Sector 76",
  "Noida Sector 75",
  "Noida Sector 71",
  "Indirapuram",
  "Noida Extension",
  "Noida Sec 37",
  "Noida Sec 126",
  "Noida Sec 135",
  "Noida Sec 143",
  "Siddharth Vihar",
  "Vaishali",
  "Vasundhara",
  "Noida Sector 70",
  "Noida Sector 66",
  "Noida Sector 50",
  "Noida Sector 49",
  "Noida Sector 52",
  "Crossings Republik",
  "Mayur Vihar",
];

/**
 * ✅ LISTINGS: Easy upload flow
 * Put photos in: /public/listings/<ID>/
 * Example:
 * public/listings/R1/1.jpg
 * public/listings/R1/2.jpg
 * Then reference as "/listings/R1/1.jpg"
 */
const LISTINGS = [
  {
    id: "R1",
    title: "1 RK Fully Furnished at Noida Sec 66",
    type: "1 RK",
    locality: "Noida Sector 66",
    price: "₹15,000/mo",
    perks: [
      "Walking distance to Noida sec 62 metro",
      "Fully-furnished",
      "Owner verified",
      "Washing machine",
      "RO",
      "Wifi",
    ],
    photos: [
      "/listings/R1/sec66_room.jpeg",
      "/listings/R1/sec66_room2.jpeg",
      "/listings/R1/sec66_table.jpeg",
      "/listings/R1/sec66_gym1.jpeg",
      "/listings/R1/sec66_shoeracl.jpeg",
      "/listings/R1/sec66_almirah.jpeg",
    ],
  },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
      {children}
    </span>
  );
}

function Section({ id, eyebrow, title, desc, children, className }) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-4 py-10 sm:px-6",
        className
      )}
    >
      <div className="mb-8">
        {eyebrow ? (
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-widest text-slate-500">
            <span className="h-[1px] w-10 bg-slate-200" />
            <span>{eyebrow}</span>
          </div>
        ) : null}
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h2>
        {desc ? <p className="mt-3 max-w-2xl text-slate-600">{desc}</p> : null}
      </div>
      {children}
    </section>
  );
}

function PrimaryButton({ href, onClick, children, className }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 md:px-5";
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

function GhostButton({ href, children, className, target, rel }) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50",
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
      className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
    >
      {children}
    </a>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <Icon className="h-5 w-5 text-slate-900" />
        </div>
        <div>
          <div className="text-lg font-semibold text-slate-900">{value}</div>
          <div className="text-sm text-slate-600">{label}</div>
        </div>
      </div>
    </div>
  );
}

/* ✅ Fullscreen photo lightbox */
function PhotoLightbox({ open, onClose, photos, idx, setIdx, title }) {
  if (!open) return null;

  const hasPhotos = photos && photos.length > 0;
  const active = hasPhotos ? photos[Math.min(idx, photos.length - 1)] : null;

  const prev = () => setIdx((v) => (v - 1 + photos.length) % photos.length);
  const next = () => setIdx((v) => (v + 1) % photos.length);

  // Close on ESC + arrow navigation
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPhotos && photos.length > 1) prev();
      if (e.key === "ArrowRight" && hasPhotos && photos.length > 1) next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, hasPhotos, photos?.length]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="absolute inset-0 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 text-white">
          <div className="text-sm font-semibold">
            {title}{" "}
            {hasPhotos ? (
              <span className="text-white/70">
                • {idx + 1}/{photos.length}
              </span>
            ) : null}
          </div>
          <button
            onClick={onClose}
            className="rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20"
          >
            Close
          </button>
        </div>

        {/* Image area */}
        <div className="relative flex-1">
          {active ? (
            <img
              src={active}
              alt={`${title} fullscreen`}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-white/70">
              No photo
            </div>
          )}

          {/* Prev/Next */}
          {hasPhotos && photos.length > 1 ? (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-2xl text-white hover:bg-white/20"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-2xl text-white hover:bg-white/20"
                aria-label="Next"
              >
                ›
              </button>
            </>
          ) : null}
        </div>

        {/* Thumbnails */}
        {hasPhotos && photos.length > 1 ? (
          <div className="flex gap-2 overflow-x-auto border-t border-white/10 bg-black/40 p-3">
            {photos.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setIdx(i)}
                className={cn(
                  "h-14 w-20 shrink-0 overflow-hidden rounded-xl border",
                  i === idx ? "border-white" : "border-white/20 hover:border-white/50"
                )}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ListingCard({ item }) {
  const photos = Array.isArray(item.photos) ? item.photos : [];
  const [idx, setIdx] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const hasPhotos = photos.length > 0;
  const active = hasPhotos ? photos[Math.min(idx, photos.length - 1)] : null;

  const prev = () =>
    setIdx((v) => (hasPhotos ? (v - 1 + photos.length) % photos.length : 0));
  const next = () =>
    setIdx((v) => (hasPhotos ? (v + 1) % photos.length : 0));

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-sm">
      {/* Photos */}
      <div className="relative">
        <div className="aspect-[16/10] w-full bg-slate-100">
          {hasPhotos ? (
            <img
              src={active}
              alt={`${item.title} photo ${idx + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
              No photo uploaded
            </div>
          )}
        </div>

        {/* Fullscreen button */}
        {hasPhotos ? (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="absolute left-3 top-3 rounded-xl bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:bg-white"
          >
            Full screen
          </button>
        ) : null}

        {/* Carousel controls */}
        {hasPhotos && photos.length > 1 ? (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-lg leading-none shadow-sm backdrop-blur transition hover:bg-white"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-lg leading-none shadow-sm backdrop-blur transition hover:bg-white"
            >
              ›
            </button>

            <div className="absolute bottom-3 right-3 rounded-full bg-slate-900/80 px-2.5 py-1 text-xs font-semibold text-white">
              {idx + 1}/{photos.length}
            </div>
          </>
        ) : null}
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-semibold tracking-widest text-slate-500">
              {item.type} • {item.locality}
            </div>
            <div className="mt-1 text-lg font-semibold text-slate-900">
              {item.title}
            </div>
          </div>
          <div className="shrink-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-900">
            {item.price}
          </div>
        </div>

        {/* Thumbnails */}
        {hasPhotos && photos.length > 1 ? (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {photos.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setIdx(i)}
                className={cn(
                  "relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border transition",
                  i === idx
                    ? "border-slate-900"
                    : "border-slate-200 hover:border-slate-400"
                )}
                aria-label={`View photo ${i + 1}`}
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2">
          {(item.perks || []).map((p) => (
            <Pill key={p}>{p}</Pill>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="text-xs text-slate-500">Ref: {item.id}</div>
          <div className="flex items-center gap-2">
            <a
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              href={`tel:${BRAND.phoneDigits}`}
            >
              <Phone className="h-4 w-4" />
              Call
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              href={`https://wa.me/91${BRAND.phoneDigits}?text=${encodeURIComponent(
                `Hi Rent62, I'm interested in: ${item.title} (${item.type}, ${item.locality}). Ref: ${item.id}. Please share details.`
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ✅ Fullscreen modal */}
      <PhotoLightbox
        open={isOpen}
        onClose={() => setIsOpen(false)}
        photos={photos}
        idx={idx}
        setIdx={setIdx}
        title={item.title}
      />
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
        [l.title, l.type, l.locality, l.price, ...(l.perks || [])]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return matchType && matchQ;
    });
  }, [activeType, query]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-3">
            <img
              src={LOGO_SRC}
              alt="Rent62 logo"
              className="h-10 w-10 rounded-2xl border border-slate-200 bg-white"
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">
                {BRAND.name}
              </div>
              <div className="text-xs text-slate-500">
                Real Estate • {BRAND.city}
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink href="#listings">Listings</NavLink>
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#areas">Areas</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <GhostButton href={`tel:${BRAND.phoneDigits}`}>
              <Phone className="h-4 w-4" />
              Call
            </GhostButton>
            <PrimaryButton
              href={`https://wa.me/91${BRAND.phoneDigits}?text=${encodeURIComponent(
                "Hi Rent62, I want to rent a place in Noida/Ghaziabad. Please help me with options."
              )}`}
              className="hidden sm:inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </PrimaryButton>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ✅ Listings FIRST (Top of page content) */}
        <Section
          id="listings"
          eyebrow="LISTINGS"
          title="Browse available rentals"
          className="pt-8"
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
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-[360px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search: Sector 62, 1BHK, balcony…"
                className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {filtered.map((item) => (
              <ListingCard key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-6">
            <div>
              <div className="text-lg font-semibold">
                Want real-time availability?
              </div>
              <div className="mt-1 text-slate-600">
                Message us your requirement and we’ll share current options.
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <GhostButton href={BRAND.instagram} target="_blank" rel="noreferrer">
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

        {/* Hero (below listings) */}
        <div className="mx-auto w-full max-w-screen-2xl px-4 pb-10 pt-2 sm:px-6 sm:pt-6">
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
                Find the right home in Noida - Ghaziabad — fast.
              </h1>
              <p className="mt-4 max-w-xl text-slate-600">
                {BRAND.name} helps you rent with confidence. Clear options, honest
                guidance, and a smooth move-in — without the hassle.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <PrimaryButton href="#contact">
                  Get Options Now <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
                <GhostButton href={BRAND.maps} target="_blank" rel="noreferrer">
                  <MapPin className="h-4 w-4" />
                  Open on Maps
                </GhostButton>
                <GhostButton
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </GhostButton>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <Stat icon={BadgeCheck} label="Trusted support" value="Honest advice" />
                <Stat icon={ShieldCheck} label="Safer renting" value="Owner verified" />
                <Stat icon={Users} label="All needs" value="Bachelors → Families" />
              </div>

              <div className="mt-7 text-xs text-slate-500">
                Call/WhatsApp:{" "}
                <span className="text-slate-700">{BRAND.phone}</span> • Email:{" "}
                <span className="text-slate-700">{BRAND.email}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">{BRAND.tagline}</div>
                    <div className="mt-1 text-sm text-slate-600">
                      Your local rental partner in Noida.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <Home className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {["1 RK", "1 BHK", "2 BHK", "3 BHK"].map((t) => (
                    <div
                      key={t}
                      className="rounded-2xl border border-slate-200 bg-white p-4"
                    >
                      <div className="text-xs font-semibold tracking-widest text-slate-500">
                        Popular
                      </div>
                      <div className="mt-1 text-xl font-semibold">{t}</div>
                      <div className="mt-2 text-sm text-slate-600">
                        Great options near metro & markets.
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold">Need a shortlist?</div>
                      <div className="text-sm text-slate-600">
                        Tell us your budget + sector.
                      </div>
                    </div>
                    <PrimaryButton
                      href={`https://wa.me/91${BRAND.phoneDigits}?text=${encodeURIComponent(
                        "Hi Rent62, please share rental options. My budget is __ and preferred sector is __."
                      )}`}
                    >
                      WhatsApp <ArrowRight className="h-4 w-4" />
                    </PrimaryButton>
                  </div>
                </div>
              </div>
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
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <Building2 className="h-5 w-5 text-slate-900" />
              <div className="mt-3 text-lg font-semibold">Flats & Homes</div>
              <p className="mt-2 text-sm text-slate-600">
                1 RK to 3 BHK, plus independent homes across top Noida sectors.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <ShieldCheck className="h-5 w-5 text-slate-900" />
              <div className="mt-3 text-lg font-semibold">Verified Guidance</div>
              <p className="mt-2 text-sm text-slate-600">
                Clear expectations on rent, deposit, and move-in — no surprises.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <Users className="h-5 w-5 text-slate-900" />
              <div className="mt-3 text-lg font-semibold">PGs Available</div>
              <p className="mt-2 text-sm text-slate-600">
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
              target="_blank"
              rel="noreferrer"
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
          title="Noida + Ghaziabad + nearby hotspots"
          desc="We focus on high-demand sectors and connected neighborhoods for easier commutes."
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {AREAS.map((a) => (
              <div
                key={a}
                className="rounded-2xl border border-slate-200 bg-white p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="font-medium text-slate-900">{a}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-lg font-semibold">Want the best options today?</div>
                <div className="mt-1 text-slate-600">
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

        {/* Contact */}
        <Section
          id="contact"
          eyebrow="CONTACT"
          title="Let’s find your next home"
          desc="Call, WhatsApp, or share your requirement below. We’ll respond quickly."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
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
                <GhostButton href={BRAND.maps} target="_blank" rel="noreferrer">
                  <MapPin className="h-4 w-4" />
                  Directions
                </GhostButton>
              </div>

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs font-semibold tracking-widest text-slate-500">
                    Phone
                  </div>
                  <div className="mt-1 text-lg font-semibold">{BRAND.phone}</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs font-semibold tracking-widest text-slate-500">
                    Email
                  </div>
                  <div className="mt-1 text-lg font-semibold">{BRAND.email}</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs font-semibold tracking-widest text-slate-500">
                    Instagram
                  </div>
                  <a
                    className="mt-1 inline-flex items-center gap-2 text-lg font-semibold underline decoration-slate-200 underline-offset-4 hover:decoration-slate-400"
                    href={BRAND.instagram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    @rent_62 <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="mt-6 text-sm text-slate-600">
                <span className="font-semibold text-slate-900">Tip:</span> The
                fastest way is WhatsApp — send your budget + preferred sector.
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="text-lg font-semibold">Share your requirement</div>
              <p className="mt-2 text-sm text-slate-600">
                This form opens WhatsApp with a pre-filled message.
              </p>
              <RequirementForm />
            </div>
          </div>
        </Section>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4 px-4 py-10 text-sm text-slate-600 sm:px-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_SRC}
                alt="Rent62"
                className="h-9 w-9 rounded-2xl border border-slate-200 bg-white"
              />
              <div>
                <div className="font-semibold text-slate-900">{BRAND.name}</div>
                <div className="text-xs">{BRAND.tagline}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a className="hover:text-slate-900" href={`tel:${BRAND.phoneDigits}`}>
                {BRAND.phoneDigits}
              </a>
              <a
                className="hover:text-slate-900"
                href={BRAND.instagram}
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                className="hover:text-slate-900"
                href={BRAND.maps}
                target="_blank"
                rel="noreferrer"
              >
                Maps
              </a>
            </div>

            <div className="text-xs">
              © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
            </div>
          </div>
        </footer>

        {/* Mobile sticky CTA */}
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/90 p-3 backdrop-blur sm:hidden">
          <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-3 px-2">
            <a
              href={`tel:${BRAND.phoneDigits}`}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900"
            >
              <Phone className="h-4 w-4" />
              Call
            </a>
            <a
              href={`https://wa.me/91${BRAND.phoneDigits}?text=${encodeURIComponent(
                "Hi Rent62, I want to rent a place in Noida/Ghaziabad. Please help me with options."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Spacer for mobile sticky bar */}
        <div className="h-20 sm:hidden" />
      </main>
    </div>
  );
}

function RequirementForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("1 BHK");
  const [budget, setBudget] = useState("");
  const [area, setArea] = useState("Noida Sector 62");
  const [moveIn, setMoveIn] = useState("Within 1 week");
  const [notes, setNotes] = useState("");

  const waLink = useMemo(() => {
    const msg =
      `Hi Rent62, I’m looking for a rental in Noida/Ghaziabad.\n\n` +
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
            className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400"
            placeholder="e.g., Aman"
          />
        </Field>
        <Field label="Your phone">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400"
            placeholder="e.g., 98xxxxxx"
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Type">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
          >
            <option value="1 RK">1 RK</option>
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
            <option value="PG">PG</option>
            <option value="Independent House">Independent House</option>
          </select>
        </Field>

        <Field label="Budget (monthly)">
          <input
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400"
            placeholder="e.g., ₹18,000"
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Preferred area">
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
          >
            {AREAS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Move-in">
          <select
            value={moveIn}
            onChange={(e) => setMoveIn(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
          >
            {["Immediately", "Within 1 week", "Within 2 weeks", "This month", "Next month"].map(
              (m) => (
                <option key={m} value={m}>
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
          className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400"
          placeholder="e.g., near metro, furnished, balcony…"
        />
      </Field>

      <div className="flex flex-wrap items-center gap-3">
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
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
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
        >
          Email instead <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="text-xs text-slate-500">
        By sending, you agree to be contacted by {BRAND.name} for rental assistance.
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="grid gap-2">
      <div className="text-xs font-semibold tracking-widest text-slate-500">
        {label}
      </div>
      {children}
    </label>
  );
}