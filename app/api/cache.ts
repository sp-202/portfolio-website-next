export interface CacheEntry<T = any> { // Made it generic
  value: T;
  timestamp: number;
}

const cache: Map<string, CacheEntry<any>> = new Map(); // Use CacheEntry<any>
const CACHE_TTL = 600000; // 10 minutes

export function getCache<T = any>(key: string): T | undefined { // Return type T | undefined
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.value as T; // Return the value property
  }
  if (entry) {
    // Cache expired
    cache.delete(key);
  }
  return undefined;
}

export function setCache<T = any>(key: string, value: T): void { // Value type T
  const timestamp = Date.now();
  cache.set(key, { value, timestamp });
}
