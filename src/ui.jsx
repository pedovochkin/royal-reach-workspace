import React, { useEffect, useRef } from 'react';
const paths = {
  home: 'M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z',
  chat: 'M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-2 2v-9.5A8.5 8.5 0 0 1 10.5 4H13a8 8 0 0 1 8 7.5ZM7 10h9M7 14h6',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 4a4 4 0 0 1 0 8M22 21v-2a4 4 0 0 0-3-3.87M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  book: 'm2 4 10 3 10-3v15l-10 3-10-3ZM12 7v15M6 10l3 1M15 11l3-1',
  chart: 'M4 3v18h18M8 15l4-5 4 2 5-7',
  layers: 'm12 2 10 5-10 5L2 7Zm-10 10 10 5 10-5M2 17l10 5 10-5',
  plug: 'm8 3 3 3M17 3l-3 3M6 7l11 11M4 13l7-7 7 7-7 7H7l-3-3ZM3 22l4-4',
  arrow: 'M5 12h14m-5-5 5 5-5 5',
  down: 'm6 9 6 6 6-6',
  check: 'm5 12 4 4L19 6',
  plus: 'M12 5v14M5 12h14',
  search: 'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4',
  spark: 'm12 2 2.7 7.3L22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7ZM20 2v4M18 4h4',
  clock: 'M12 7v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  fire: 'M12 2c2 4 1 6-1 8 3 0 5-2 5-4 6 6 6 10 3 13-4 5-13 3-15-3-2-6 3-8 4-12 1 3 2 4 4 5 2-2 2-4 0-7Z',
  target: 'M22 12a10 10 0 1 1-10-10M18 12a6 6 0 1 1-6-6M12 12 22 2m-5 0h5v5',
  diamond: 'm12 3 9 9-9 9-9-9ZM3 12h18M12 3l4 9-4 9-4-9Z',
  growth: 'M12 21v-9M12 15C4 15 3 10 3 7c6 0 9 3 9 8ZM12 11c0-6 4-9 9-9 0 5-3 9-9 9Z',
  lock: 'M6 10h12v11H6ZM8 10V6a4 4 0 0 1 8 0v4M12 14v3',
  close: 'm6 6 12 12M6 18 18 6',
  send: 'm22 2-7 20-4-9-9-4Zm0 0L11 13',
  more: 'M5 12h.01M12 12h.01M19 12h.01',
  external: 'M14 3h7v7M10 14 21 3M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6',
  help: 'M9 9a3 3 0 1 1 5 2c-2 1-2 2-2 3M12 18h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  settings: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M9 2h6l1 4 4 1 2 5-3 3 1 4-5 3-3-2-4 1-3-5 2-3-1-4 3-1Z',
  shield: 'm12 2 9 4v6c0 6-9 10-9 10S3 18 3 12V6Zm-4 10 3 3 5-6',
  file: 'M14 2H5v20h14V7Zm0 0v6h5M8 12h8M8 16h6',
  download: 'M12 3v12m-5-5 5 5 5-5M4 15v6h16v-6',
  medal: 'M8 14 6 22l6-3 6 3-2-8M19 8a7 7 0 1 1-14 0 7 7 0 0 1 14 0',
  smile: 'M8 14c2 3 6 3 8 0M8 8h.01M16 8h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  menu: 'M4 6h16M4 12h16M4 18h16',
  mail: 'M3 5h18v14H3Zm0 0 9 8 9-8',
  calendar: 'M3 5h18v16H3ZM7 2v6M17 2v6M3 11h18',
  refresh: 'M21 3v6h-6M3 21v-6h6M20 9A8 8 0 0 0 6 5L3 9m18 6-3 4a8 8 0 0 1-14-4',
  bolt: 'm13 2-9 12h7l-1 8 10-12h-8Z',
};
export function Icon({ name, size = 20, className = '', ...props }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}><path d={paths[name] || paths.spark} /></svg>; }
export function Avatar({ person, size = '', online = false }) { return <span className={`avatar ${person.color || 'sage'} ${size}`} aria-hidden="true">{person.initials || person.name?.slice(0, 2)}{online && <i />}</span>; }
export function Badge({ children, tone = 'green', dot = false }) { return <span className={`badge ${tone}`}>{dot && <i />}{children}</span>; }
export function Button({ children, icon, variant = 'primary', className = '', ...props }) { return <button className={`btn ${variant} ${className}`} {...props}>{icon && <Icon name={icon} size={17} />}{children}</button>; }
export function AIFlag({ children = 'ИИ-помощник' }) { return <span className="ai-flag"><Icon name="spark" size={14} />{children}<span className="demo-dot" title="Демонстрационный сценарий" /></span>; }
export function Modal({ title, eyebrow, onClose, children, wide = false }) {
  const ref = useRef();
  useEffect(() => { const prev = document.activeElement; const key = e => { if (e.key === 'Escape') onClose(); if (e.key === 'Tab') { const els = [...ref.current.querySelectorAll('button, input, textarea, select, a[href]')].filter(x => !x.disabled); if (!els.length) return; if (e.shiftKey && document.activeElement === els[0]) { e.preventDefault(); els.at(-1).focus(); } else if (!e.shiftKey && document.activeElement === els.at(-1)) { e.preventDefault(); els[0].focus(); } } }; document.addEventListener('keydown', key); const bodyOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden'; ref.current?.querySelector('input, textarea, button')?.focus(); return () => { document.removeEventListener('keydown', key); document.body.style.overflow = bodyOverflow; prev?.focus?.(); }; }, []);
  return <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}><section ref={ref} role="dialog" aria-modal="true" aria-labelledby="modal-title" className={`modal ${wide ? 'wide' : ''}`}><header>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2 id="modal-title">{title}</h2><button className="icon-btn modal-close" aria-label="Закрыть окно" onClick={onClose}><Icon name="close" /></button></header>{children}</section></div>;
}
export function PageTitle({ eyebrow, title, subtitle, children }) { return <div className="page-title"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{subtitle}</p></div><div className="page-actions">{children}</div></div>; }
export function Empty({ icon = 'search', title = 'Ничего не найдено', text = 'Попробуйте другой запрос или измените фильтры.' }) { return <div className="empty"><Icon name={icon} size={32} /><h3>{title}</h3><p>{text}</p></div>; }
export function Sparkline({ color = '#54836a', variant = 0 }) { return <svg viewBox="0 0 150 45" className="sparkline" aria-hidden="true"><path d={variant ? 'M0 36 15 32 27 35 41 22 54 27 69 19 82 22 96 10 111 15 126 6 150 8' : 'M0 36 15 29 28 32 42 21 55 27 68 15 82 18 96 8 112 14 129 5 150 2'} stroke={color} strokeWidth="2.2" fill="none" /></svg>; }

