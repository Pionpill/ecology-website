import { FC } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router'
import View from './app/view'
import Wiki from './app/wiki'
import Biome from './app/wiki/biome'
import BiomeDashboard from './app/wiki/biome/dashboard'

const AppRoute: FC = () => (
  <BrowserRouter basename="/ecology">
    <Routes>
      <Route path="/" element={<View />}>
        <Route index element={<Navigate to="wiki" />} />
        <Route path="wiki/*" element={<Wiki />}>
          <Route index element={<Navigate to="biome" />} />
          <Route path="biome" element={<Biome />} >
            <Route path=":biomeId" element={<BiomeDashboard />} />
            <Route path="dashboard" element={<BiomeDashboard />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
)

export default AppRoute
