"use client";

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import {
  darkenColor,
  formatPokedexNumber,
  generationToRoman,
  getTypeMeta,
  Pokemon,
} from "@/app/lib/type-data";
import { trackEvent } from "@/app/lib/analytics";

export interface ShareButtonProps {
  pokemon: Pokemon;
}

const SHARE_SIZE = 1080;
const SHARE_SCALE = 2;
const SITE_NAME = "PokePicker";
const SITE_URL = "www.pokepicker.app";

export function ShareButton({ pokemon }: ShareButtonProps) {
  const [generating, setGenerating] = useState(false);
  const [open, setOpen] = useState(false);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "ok" | "err">("idle");
  // Only mount the off-screen share card when capturing, so the initial HTML
  // doesn't contain 6 copies of "PokePicker www.pokepicker.app" hidden text
  // (which polluted keyword density and could be flagged as hidden text).
  const [cardMounted, setCardMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Capture the share card once it has been mounted into the DOM.
  useEffect(() => {
    if (!cardMounted) return;
    let cancelled = false;

    const capture = async () => {
      // Wait two frames so React has committed and the browser has painted.
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
      );
      if (cancelled || !cardRef.current) {
        setCardMounted(false);
        setGenerating(false);
        return;
      }
      try {
        // html2canvas on the off-screen 1080x1080 share card.
        // Share card uses ONLY inline hex/rgb styles (no Tailwind utilities)
        // to avoid html2canvas choking on Tailwind v4 oklch() colors.
        const canvas = await html2canvas(cardRef.current, {
          width: SHARE_SIZE,
          height: SHARE_SIZE,
          windowWidth: SHARE_SIZE,
          windowHeight: SHARE_SIZE,
          backgroundColor: null,
          useCORS: true,
          allowTaint: false,
          scale: SHARE_SCALE,
          logging: false,
        });
        if (cancelled) return;
        setDataUrl(canvas.toDataURL("image/png"));
        setCopyState("idle");
        setOpen(true);
      } catch (err) {
        console.error("Failed to generate share image:", err);
      } finally {
        if (!cancelled) {
          setGenerating(false);
          setCardMounted(false);
        }
      }
    };

    void capture();
    return () => {
      cancelled = true;
    };
  }, [cardMounted]);

  const handleShare = useCallback(() => {
    if (generating) return;
    setGenerating(true);
    trackEvent("share_click", { pokemon: pokemon.name, id: pokemon.id });
    setCardMounted(true);
  }, [generating, pokemon.name, pokemon.id]);

  const handleDownload = useCallback(() => {
    if (!dataUrl) return;
    trackEvent("share_download", { pokemon: pokemon.name, id: pokemon.id });
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${pokemon.name.toLowerCase()}-pokepicker.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [dataUrl, pokemon.name, pokemon.id]);

  const handleCopy = useCallback(async () => {
    if (!dataUrl) return;
    try {
      const blob = await (await fetch(dataUrl)).blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setCopyState("ok");
      trackEvent("share_copy", { pokemon: pokemon.name, id: pokemon.id });
    } catch (err) {
      console.error("Failed to copy image:", err);
      setCopyState("err");
    }
  }, [dataUrl, pokemon.name, pokemon.id]);

  return (
    <>
      {/* Off-screen 1080x1080 share card — only mounted during capture to
          avoid polluting initial HTML with hidden text (SEO density noise). */}
      {cardMounted && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            left: "-99999px",
            top: 0,
            width: SHARE_SIZE,
            height: SHARE_SIZE,
            pointerEvents: "none",
          }}
        >
          <ShareCardArt ref={cardRef} pokemon={pokemon} />
        </div>
      )}

      <button
        type="button"
        onClick={handleShare}
        disabled={generating}
        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-zinc-200 px-3.5 py-1.5 text-xs text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={`Share ${pokemon.name}`}
      >
        {generating ? <Spinner /> : <ShareIcon />}
        <span>{generating ? "Generating" : "Share"}</span>
      </button>

      {open && dataUrl ? (
        <ShareModal
          dataUrl={dataUrl}
          pokemonName={pokemon.name}
          copyState={copyState}
          onDownload={handleDownload}
          onCopy={handleCopy}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}

/* ---------- Decorated share card (1080x1080, inline styles only) ---------- */

const ShareCardArt = forwardRef<HTMLDivElement, { pokemon: Pokemon }>(
  function ShareCardArt({ pokemon }, ref) {
    const typeMeta = getTypeMeta(pokemon.types[0]);
    const dark = darkenColor(typeMeta.color, 0.35);
    const typeLabels = pokemon.types
      .map((t) => getTypeMeta(t).displayName)
      .join(" · ");

    return (
      <div
        ref={ref}
        style={{
          width: SHARE_SIZE,
          height: SHARE_SIZE,
          background: `linear-gradient(135deg, ${typeMeta.color} 0%, ${dark} 100%)`,
          padding: 60,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          color: "#171717",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        {/* White card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 40,
            border: `8px solid ${typeMeta.color}`,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 56,
            boxSizing: "border-box",
          }}
        >
          {/* Image — 65% of card height */}
          <div
            style={{
              flex: "0 0 65%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={pokemon.sprite}
              alt={pokemon.name}
              crossOrigin="anonymous"
              width={475}
              height={475}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Name + type + dex */}
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <div style={{ fontSize: 64, fontWeight: 700, color: "#171717" }}>
              <span style={{ color: typeMeta.color }}>{typeMeta.emoji}</span>{" "}
              {pokemon.name}
            </div>
            <div
              style={{
                fontSize: 42,
                color: typeMeta.color,
                fontWeight: 600,
                marginTop: 12,
              }}
            >
              {typeLabels}
            </div>
            <div
              style={{
                fontSize: 30,
                color: "#9ca3af",
                marginTop: 12,
              }}
            >
              #{formatPokedexNumber(pokemon.id)} · Gen{" "}
              {generationToRoman(pokemon.generation)}
            </div>
          </div>
        </div>

        {/* Watermark — placed on the colored background so it never sits on the white/orange edge */}
        <div style={{ marginTop: 28, textAlign: "center" }}>
          <div style={{ fontSize: 34, fontWeight: 700, color: "#ffffff" }}>
            {SITE_NAME}
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.92)",
              marginTop: 6,
            }}
          >
            {SITE_URL}
          </div>
        </div>
      </div>
    );
  }
);

/* ---------- Modal ---------- */

function ShareModal({
  dataUrl,
  pokemonName,
  copyState,
  onDownload,
  onCopy,
  onClose,
}: {
  dataUrl: string;
  pokemonName: string;
  copyState: "idle" | "ok" | "err";
  onDownload: () => void;
  onCopy: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Share ${pokemonName}`}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={dataUrl}
          alt={`${pokemonName} share card`}
          className="mb-4 w-full rounded-lg"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onDownload}
            className="min-h-[44px] flex-1 rounded-lg bg-zinc-900 px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
          >
            Download
          </button>
          <button
            type="button"
            onClick={onCopy}
            className="min-h-[44px] flex-1 rounded-lg border border-zinc-200 px-3 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            {copyState === "ok" ? "Copied!" : copyState === "err" ? "Failed" : "Copy"}
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="min-h-[44px] min-w-[44px] rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:text-zinc-700"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- tiny inline icons ---------- */

function ShareIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      className="animate-spin"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
