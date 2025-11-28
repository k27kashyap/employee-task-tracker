import React from 'react';

export default function Button({ children, variant='primary', size='normal', ...props }) {
  const cls = `btn ${variant==='ghost' ? 'ghost' : variant==='accent' ? 'accent' : 'primary'} ${size==='small' ? 'small' : ''}`;
  return <button className={cls} {...props}>{children}</button>;
}
