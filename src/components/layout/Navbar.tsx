import { NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export function Navbar() {
  const { label, nextTheme, theme } = useTheme();

  const linkStyle = (isActive: boolean): React.CSSProperties => ({
    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
    textDecoration: 'none',
    fontFamily: 'var(--font-main)',
    fontSize: '0.8em',
    padding: '0.3rem 0.6rem',
    borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
    transition: 'color 0.15s',
  });

  return (
    <nav style={{
      background: 'var(--bg-secondary)',
      borderBottom: '3px solid var(--border-color)',
      padding: '0.75rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <NavLink
        to="/"
        style={{ textDecoration: 'none', marginRight: '1rem' }}
      >
        <span style={{
          fontFamily: 'var(--font-pixel, var(--font-main))',
          color: 'var(--accent)',
          fontSize: theme === 'retro' ? '0.85em' : '1.1rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
        }}>
          POKÉDEX
        </span>
      </NavLink>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: '0.25rem', flex: 1 }}>
        <NavLink
          to="/"
          end
          style={({ isActive }) => linkStyle(isActive)}
        >
          Pokédex
        </NavLink>
        <NavLink
          to="/compare"
          style={({ isActive }) => linkStyle(isActive)}
        >
          VS Compare
        </NavLink>
      </div>

      {/* Theme toggle */}
      <button
        onClick={nextTheme}
        title="Switch theme"
        style={{
          background: 'var(--bg-card)',
          border: '2px solid var(--border-color)',
          color: 'var(--text-primary)',
          padding: '0.3rem 0.7rem',
          cursor: 'pointer',
          fontFamily: 'var(--font-main)',
          fontSize: '0.7em',
          transition: 'border-color 0.15s',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-color)')}
      >
        {label}
      </button>
    </nav>
  );
}
