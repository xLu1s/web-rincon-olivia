/**
 * Idiomas preparados. En v1 solo hay castellano.
 * El valenciano (`va`) se añadirá como otro diccionario, sin cambiar las claves.
 * hreflang `ca-ES` se activará cuando `vaReady` sea true.
 */
export const locales = ['es', 'va'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'es';
export const vaReady = false;

export const localeLabels: Record<Locale, { short: string; name: string }> = {
  es: { short: 'ES', name: 'Español' },
  va: { short: 'VA', name: 'Valencià' },
};

export function resolveLocale(requested: Locale = defaultLocale): Locale {
  if (requested === 'va' && !vaReady) return 'es';
  return requested;
}
