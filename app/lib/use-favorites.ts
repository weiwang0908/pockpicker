"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Pokemon } from "@/app/lib/type-data";

const STORAGE_KEY = "pokepicker:favorites";
const MAX_FAVORITES = 64;

function readFromStorage(): Pokemon[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function writeToStorage(list: Pokemon[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent("pokepicker:favorites-change"));
  } catch {
    /* localStorage 不可用时静默失败 */
  }
}

// 空快照缓存：避免 useSyncExternalStore 在数据未变时无限重渲染
let cachedSnapshot: Pokemon[] = [];
let cachedRaw = "";

function getSnapshot(): Pokemon[] {
  const raw = typeof window !== "undefined"
    ? window.localStorage.getItem(STORAGE_KEY) ?? ""
    : "";
  if (raw === cachedRaw) return cachedSnapshot;
  cachedRaw = raw;
  cachedSnapshot = readFromStorage();
  return cachedSnapshot;
}

// 服务端快照必须稳定引用，避免 hydration mismatch + infinite loop
const SERVER_SNAPSHOT: Pokemon[] = [];

function getServerSnapshot(): Pokemon[] {
  return SERVER_SNAPSHOT;
}

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("pokepicker:favorites-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("pokepicker:favorites-change", callback);
    window.removeEventListener("storage", callback);
  };
}

export function useFavorites() {
  const favorites = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const hydrated = typeof window !== "undefined";

  const isFavorite = useCallback(
    (id: number) => favorites.some((f) => f.id === id),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (pokemon: Pokemon) => {
      const current = getSnapshot();
      const exists = current.some((f) => f.id === pokemon.id);
      let next: Pokemon[];
      if (exists) {
        next = current.filter((f) => f.id !== pokemon.id);
      } else {
        next = [...current, pokemon];
        if (next.length > MAX_FAVORITES) next = next.slice(-MAX_FAVORITES);
      }
      writeToStorage(next);
    },
    [],
  );

  const removeFavorite = useCallback((id: number) => {
    const next = getSnapshot().filter((f) => f.id !== id);
    writeToStorage(next);
  }, []);

  const clearFavorites = useCallback(() => {
    writeToStorage([]);
  }, []);

  return {
    favorites,
    hydrated,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    clearFavorites,
  };
}
