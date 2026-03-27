import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { PokedexPage } from './pages/PokedexPage';
import { PokemonDetailPage } from './pages/PokemonDetailPage';
import { ComparePage } from './pages/ComparePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true,              element: <PokedexPage /> },
      { path: 'pokemon/:nameOrId', element: <PokemonDetailPage /> },
      { path: 'compare',          element: <ComparePage /> },
    ],
  },
]);
