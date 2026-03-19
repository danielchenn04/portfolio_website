type RectProvider = () => DOMRect;

const registry = new Set<RectProvider>();

export function registerShield(provider: RectProvider): () => void {
  registry.add(provider);
  return () => registry.delete(provider);
}

export function getShieldRects(): DOMRect[] {
  return Array.from(registry, fn => fn());
}
