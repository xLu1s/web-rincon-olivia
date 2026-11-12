import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

type Item = { q: string; a: string };

/** Acordeón de FAQ. El texto va en el HTML (forceMount) y, sin JS, el CSS lo deja visible. */
export default function FaqAccordion({ items }: { items: Item[] }) {
  return (
    <Accordion type="multiple" className="faq">
      {items.map((item) => (
        <AccordionItem key={item.q} value={item.q}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
