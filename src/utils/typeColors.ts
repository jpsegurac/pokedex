export interface TypeStyle {
  bg: string;
  text: string;
  border: string;
}

export const TYPE_COLORS: Record<string, TypeStyle> = {
  fire:     { bg: '#ef4444', text: '#fff', border: '#dc2626' },
  water:    { bg: '#3b82f6', text: '#fff', border: '#2563eb' },
  grass:    { bg: '#22c55e', text: '#fff', border: '#16a34a' },
  electric: { bg: '#eab308', text: '#000', border: '#ca8a04' },
  psychic:  { bg: '#ec4899', text: '#fff', border: '#db2777' },
  ice:      { bg: '#06b6d4', text: '#000', border: '#0891b2' },
  dragon:   { bg: '#6366f1', text: '#fff', border: '#4f46e5' },
  dark:     { bg: '#374151', text: '#fff', border: '#1f2937' },
  fairy:    { bg: '#f9a8d4', text: '#000', border: '#f472b6' },
  fighting: { bg: '#b91c1c', text: '#fff', border: '#991b1b' },
  poison:   { bg: '#a855f7', text: '#fff', border: '#9333ea' },
  ground:   { bg: '#d97706', text: '#fff', border: '#b45309' },
  rock:     { bg: '#92400e', text: '#fff', border: '#78350f' },
  ghost:    { bg: '#4c1d95', text: '#fff', border: '#3b0764' },
  steel:    { bg: '#9ca3af', text: '#000', border: '#6b7280' },
  bug:      { bg: '#65a30d', text: '#fff', border: '#4d7c0f' },
  flying:   { bg: '#7dd3fc', text: '#000', border: '#38bdf8' },
  normal:   { bg: '#d1d5db', text: '#000', border: '#9ca3af' },
};

export function getTypeStyle(typeName: string): TypeStyle {
  return TYPE_COLORS[typeName] ?? { bg: '#6b7280', text: '#fff', border: '#4b5563' };
}
