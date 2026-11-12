/** Enlaces con la base de GitHub Pages (`/web-rincon-olivia/`). */
export function url(path = '/'): string {
  const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');
  const [pathname, search = ''] = path.split('?');
  let clean = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (clean !== '/' && !clean.endsWith('/')) clean += '/';
  if (clean === '/') return `${base}/${search ? `?${search}` : ''}`;
  return `${base}${clean}${search ? `?${search}` : ''}`;
}

export function absoluteUrl(path = '/'): string {
  const site = (import.meta.env.SITE ?? 'https://xlu1s.github.io').replace(/\/$/, '');
  return `${site}${url(path)}`;
}
