"use client";

import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import type { SelectorItem } from "./TeamBuilderClient";
import { TYPE_MAP } from "@/lib/pokeapi/data";

interface PokemonSelectorProps {
  pokemonList: SelectorItem[];
  onSelect: (item: SelectorItem) => void;
  onClose: () => void;
  isMobile: boolean;
}

const ITEM_HEIGHT = 100; // px per row
const COLUMNS_DESKTOP = 8;
const COLUMNS_MOBILE = 3;
const BUFFER_ROWS = 3;

const GENERATIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

function spriteUrl(id: number): string {
  return `https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export default function PokemonSelector({
  pokemonList,
  onSelect,
  isMobile,
}: PokemonSelectorProps) {
  const [search, setSearch] = useState("");
  const [genFilter, setGenFilter] = useState<number | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(400);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Update container height on mount / resize
  useEffect(() => {
    const updateHeight = () => {
      if (scrollRef.current) {
        setContainerHeight(scrollRef.current.clientHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Filter the list
  const filtered = useMemo(() => {
    let list = pokemonList;
    if (genFilter !== null) {
      list = list.filter((p) => p.generation === genFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    return list;
  }, [pokemonList, search, genFilter]);

  const columns = isMobile ? COLUMNS_MOBILE : COLUMNS_DESKTOP;
  const totalRows = Math.ceil(filtered.length / columns);
  const totalHeight = totalRows * ITEM_HEIGHT;

  // Calculate visible range
  const firstVisibleRow = Math.max(
    0,
    Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER_ROWS,
  );
  const visibleRowCount =
    Math.ceil(containerHeight / ITEM_HEIGHT) + BUFFER_ROWS * 2;
  const lastVisibleRow = Math.min(
    totalRows,
    firstVisibleRow + visibleRowCount,
  );

  const startIndex = firstVisibleRow * columns;
  const endIndex = Math.min(filtered.length, lastVisibleRow * columns);
  const visibleItems = filtered.slice(startIndex, endIndex);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      setScrollTop(scrollRef.current.scrollTop);
    }
  }, []);

  // Reset scroll when filter changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
      setScrollTop(0);
    }
  }, [search, genFilter]);

  return (
    <div className="flex h-full flex-col">
      {/* Search + Filter (sticky) */}
      <div className="sticky top-0 z-10 border-b border-zinc-100 bg-surface px-3 py-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Pokemon by name..."
          className="h-11 w-full rounded-lg border border-zinc-200 px-4 text-sm outline-none focus:border-brand"
        />
        <div className="mt-2 flex flex-wrap gap-1.5">
          <button
            onClick={() => setGenFilter(null)}
            className={`h-8 rounded-full px-3 text-xs font-semibold transition-colors ${
              genFilter === null
                ? "bg-brand text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            All
          </button>
          {GENERATIONS.map((g) => (
            <button
              key={g}
              onClick={() => setGenFilter(genFilter === g ? null : g)}
              className={`h-8 rounded-full px-3 text-xs font-semibold transition-colors ${
                genFilter === g
                  ? "bg-brand text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              Gen {g}
            </button>
          ))}
        </div>
      </div>

      {/* Virtual Scroll Grid */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="relative flex-1 overflow-y-auto"
        style={{ minHeight: isMobile ? "300px" : "400px" }}
      >
        {filtered.length === 0 ? (
          <div className="flex h-full items-center justify-center py-12">
            <p className="text-sm text-zinc-400">No Pokemon found.</p>
          </div>
        ) : (
          <div style={{ height: totalHeight, position: "relative" }}>
            <div
              className="grid gap-1 px-2"
              style={{
                position: "absolute",
                top: firstVisibleRow * ITEM_HEIGHT,
                left: 0,
                right: 0,
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              }}
            >
              {visibleItems.map((p) => (
                <PokemonGridItem
                  key={p.id}
                  item={p}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Result count */}
      <div className="border-t border-zinc-100 px-3 py-2 text-center text-xs text-zinc-400">
        {filtered.length} Pokemon
      </div>
    </div>
  );
}

function PokemonGridItem({
  item,
  onSelect,
}: {
  item: SelectorItem;
  onSelect: (item: SelectorItem) => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      onClick={() => onSelect(item)}
      className="flex flex-col items-center rounded-lg border border-zinc-100 bg-surface p-1.5 transition-all hover:border-brand hover:shadow-sm"
      style={{ height: ITEM_HEIGHT - 8 }}
    >
      {imgError ? (
        <div className="flex h-12 w-12 items-center justify-center text-xs text-zinc-400">
          ?
        </div>
      ) : (
        <img
          src={spriteUrl(item.id)}
          alt={item.name}
          className="h-12 w-12 object-contain"
          loading="lazy"
          onError={() => setImgError(true)}
          width={48}
          height={48}
        />
      )}
      <span className="mt-0.5 line-clamp-1 text-center text-[10px] font-medium text-foreground">
        {item.name}
      </span>
      <div className="mt-0.5 flex gap-0.5">
        {item.types.slice(0, 2).map((t) => {
          const meta = TYPE_MAP[t as keyof typeof TYPE_MAP];
          return meta ? (
            <span
              key={t}
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: meta.color }}
              title={meta.displayNameEn}
            />
          ) : null;
        })}
      </div>
    </button>
  );
}
