import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';

/** Pieza de acordeón al estilo shadcn/ui, con los tokens de la floristería en vez del tema genérico. */
export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = forwardRef<
  ElementRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={['acc-item', className].filter(Boolean).join(' ')} {...props} />
));
AccordionItem.displayName = 'AccordionItem';

export const AccordionTrigger = forwardRef<
  ElementRef<typeof AccordionPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="acc-header">
    <AccordionPrimitive.Trigger ref={ref} className={['acc-trigger', className].filter(Boolean).join(' ')} {...props}>
      <span>{children}</span>
      <svg className="acc-chevron" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = 'AccordionTrigger';

export const AccordionContent = forwardRef<
  ElementRef<typeof AccordionPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content ref={ref} forceMount className={['faq-content', className].filter(Boolean).join(' ')} {...props}>
    <div className="faq-body">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = 'AccordionContent';
