import { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from '@/context/LanguageContext'
import { LenisProvider } from '@/context/LenisContext'
import { NoiseOverlay } from '@/components/NoiseOverlay'
import { CustomCursor } from '@/components/CustomCursor'
import { Nav } from '@/components/Nav'
import Home from '@/pages/Home'
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'))

export default function App() {
  const [navVisible, setNavVisible] = useState(false)

  return (
    <LanguageProvider>
      <BrowserRouter>
        <LenisProvider>
          <CustomCursor />
          <NoiseOverlay />
          {navVisible && <Nav />}
          <Routes>
            <Route path="/" element={<Home onPreloaderDone={() => setNavVisible(true)} />} />
            <Route path="/work/:slug" element={<Suspense fallback={null}><ProjectDetail /></Suspense>} />
          </Routes>
        </LenisProvider>
      </BrowserRouter>
    </LanguageProvider>
  )
}
