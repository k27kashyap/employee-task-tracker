import React, { useEffect, useRef } from 'react';

export default function Modal({ isOpen, onClose, title, children, initialFocusRef }) {
  const overlayRef = useRef();
  const panelRef = useRef();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const focusable = panelRef.current.querySelectorAll('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    (initialFocusRef?.current || panelRef.current.querySelector('input,select,textarea,button'))?.focus();
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="modal-overlay" ref={overlayRef} onMouseDown={(e)=> { if (e.target === overlayRef.current) onClose(); }}>
      <div className="modal-panel card" role="dialog" aria-modal="true" aria-labelledby="modal-title" ref={panelRef}>
        <div className="modal-header">
          <div className="modal-title" id="modal-title">{title}</div>
          <div><button className="btn small" onClick={onClose}>Close</button></div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
