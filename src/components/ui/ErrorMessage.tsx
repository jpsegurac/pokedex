interface Props {
  message?: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message = 'Something went wrong.', onRetry }: Props) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '2rem',
      color: '#ef4444',
      fontFamily: 'var(--font-main)',
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>
      <p style={{ marginBottom: '1rem' }}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            background: 'var(--accent)',
            color: '#000',
            border: 'none',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            fontFamily: 'var(--font-main)',
            fontSize: 'inherit',
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
}
