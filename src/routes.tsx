import { FC, lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import View from './app/view'
import NotFound from './app/not-found'

const Biome = lazy(() => import('./app/wiki/biome'))
const BiomeDashboard = lazy(() => import('./app/wiki/biome/dashboard'))
const BiomeInfo = lazy(() => import('./app/wiki/biome/info'))
const Plant = lazy(() => import('./app/wiki/plant'))
const PlantDashboard = lazy(() => import('./app/wiki/plant/dashboard'))

const LoadingFallback: FC = () => (
  <div className="flex flex-1 items-center justify-center">
    <span className="text-muted-foreground animate-pulse">Loading…</span>
  </div>
)

const AppRoute: FC = () => (
  <BrowserRouter basename="/ecology-website">
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<View />}>
          <Route index element={<Navigate to="wiki" />} />
          <Route path="wiki/*">
            <Route index element={<Navigate to="biome" />} />
            <Route path="biome" element={<Biome />}>
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<BiomeDashboard />} />
              <Route path=":biomeId" element={<BiomeInfo />} />
            </Route>
            <Route path="plant" element={<Plant />}>
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<PlantDashboard />} />
              {/* <Route path=":biomeId" element={<BiomeInfo />} /> */}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
)

export default AppRoute

