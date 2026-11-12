import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';

/** Galería accesible (Dialog de Radix, la base de shadcn/ui). Las fotos ya están en la página sin JS. */
export default function Lightbox({ closeLabel }: { closeLabel: string }) {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target || target.closest('a')) return;
      const figure = target.closest<HTMLElement>('[data-lightbox]');
      if (!figure) return;
      const image = figure.querySelector('img');
      if (!image) return;
      setSrc(image.currentSrc || image.src);
      setAlt(image.alt);
      setOpen(true);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content" aria-describedby={undefined}>
          <Dialog.Title className="sr-only">{alt || closeLabel}</Dialog.Title>
          {src ? <img src={src} alt={alt} /> : null}
          <Dialog.Close className="btn bsd dialog-close">{closeLabel}</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
