import { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import View from './app/view'
import Biome from './app/wiki/biome'
import BiomeDashboard from './app/wiki/biome/dashboard'
import BiomeInfo from './app/wiki/biome/info'

const AppRoute: FC = () => (
  <BrowserRouter basename="/ecology-website">
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
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
)

export default AppRoute
