import { siteConfig } from '../data/site';
import type { FaqItem } from '../data/faq';
import { absoluteUrl } from './paths';

export function floristJsonLd() {
  return {
    '@type': 'Florist',
    '@id': `${siteConfig.url}#florist`,
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phoneE164,
    image: `${siteConfig.url}og.jpg`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Alcoy',
      addressRegion: 'Alicante',
      postalCode: '03801',
      addressCountry: 'ES',
    },
    areaServed: { '@type': 'City', name: 'Alcoy' },
    sameAs: [siteConfig.instagram],
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function productJsonLd(input: { name: string; description: string; image: string; path: string }) {
  return {
    '@type': 'Product',
    name: input.name,
    description: input.description,
    image: input.image,
    url: absoluteUrl(input.path),
    brand: { '@type': 'Brand', name: siteConfig.name },
  };
}

export function serviceJsonLd() {
  return {
    '@type': 'Service',
    name: 'Decoración floral para bodas y eventos',
    serviceType: 'Floristería de bodas',
    areaServed: { '@type': 'City', name: 'Alcoy' },
    provider: { '@id': `${siteConfig.url}#florist` },
    url: absoluteUrl('/bodas-y-eventos'),
  };
}

export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
