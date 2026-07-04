/**
 * PokeAPI 缓存层
 *
 * 用 Next.js fetch 的 `next: { revalidate }` 选项实现 24h TTL。
 * - 仅在服务端（RSC / Route Handlers / Server Actions）可用
 * - 同一 URL 的请求会被 Next.js 自动去重 + 缓存
 * - TTL 到期后下一次请求触发 ISR 重新生成（旧数据先返回，新数据后台更新）
 */

/** 24 小时（单位：秒） */
export const CACHE_TTL_SECONDS = 24 * 60 * 60; // 86400

/** PokeAPI 根地址 */
export const POKEAPI_BASE = "https://pokeapi.co/api/v2";

/** Pokemon 总数（Gen 1-9，截至 2024 年 PokeAPI 数据） */
export const TOTAL_POKEMON_COUNT = 1025;

/** 批量 fetch 单批大小（控制并发，避免触发 PokeAPI 300/min 限流） */
export const FETCH_BATCH_SIZE = 50;

/**
 * 带 24h 缓存的 fetch 封装
 *
 * @param url 完整 URL
 * @returns 解析后的 JSON
 * @throws 当 PokeAPI 返回 non-2xx 时抛出
 */
export async function cachedFetch<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    next: { revalidate: CACHE_TTL_SECONDS },
  });

  if (!res.ok) {
    throw new Error(
      `PokeAPI fetch failed: ${res.status} ${res.statusText} — ${url}`,
    );
  }

  return (await res.json()) as T;
}
