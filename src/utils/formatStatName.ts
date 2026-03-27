const STAT_MAP: Record<string, string> = {
  hp:               'HP',
  attack:           'Atk',
  defense:          'Def',
  'special-attack': 'Sp.Atk',
  'special-defense':'Sp.Def',
  speed:            'Speed',
};

export function formatStatName(name: string): string {
  return STAT_MAP[name] ?? name;
}
