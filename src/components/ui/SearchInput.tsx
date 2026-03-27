import { useEffect, useRef, useState } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = 'Search Pokémon...' }: Props) {
  const [local, setLocal] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLocal(e.target.value);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onChange(e.target.value.toLowerCase().trim());
    }, 300);
  }

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 360 }}>
      <span style={{
        position: 'absolute',
        left: 12,
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'var(--text-muted)',
        pointerEvents: 'none',
      }}>🔍</span>
      <input
        type="text"
        value={local}
        onChange={handleChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.6rem 0.75rem 0.6rem 2.2rem',
          background: 'var(--bg-card)',
          border: '2px solid var(--border-color)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-main)',
          fontSize: 'inherit',
          outline: 'none',
          transition: 'border-color 0.2s',
        }}
        onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
        onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-color)')}
      />
    </div>
  );
}
