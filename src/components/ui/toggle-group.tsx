import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';

/** Grupo de chips accesible (shadcn/ui + Radix), dibujado como los filtros del diseño. */
export const ToggleGroup = forwardRef<
  ElementRef<typeof ToggleGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Root ref={ref} className={['toggle', className].filter(Boolean).join(' ')} {...props} />
));
ToggleGroup.displayName = 'ToggleGroup';

export const ToggleGroupItem = forwardRef<
  ElementRef<typeof ToggleGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Item ref={ref} className={className} {...props} />
));
ToggleGroupItem.displayName = 'ToggleGroupItem';
