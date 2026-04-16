import { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { LanguageProvider } from '@/context/LanguageContext'
import { LenisProvider } from '@/context/LenisContext'
import { NoiseOverlay } from '@/components/NoiseOverlay'
import { CustomCursor } from '@/components/CustomCursor'
import { Nav } from '@/components/Nav'
import Home from '@/pages/Home'
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'))

function AnimatedRoutes({ onPreloaderDone }: { onPreloaderDone: () => void }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home onPreloaderDone={onPreloaderDone} />} />
        <Route path="/work/:slug" element={<Suspense fallback={null}><ProjectDetail /></Suspense>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [navVisible, setNavVisible] = useState(false)

  return (
    <LanguageProvider>
      <BrowserRouter>
        <LenisProvider>
          <CustomCursor />
          <NoiseOverlay />
          {navVisible && <Nav />}
          <AnimatedRoutes onPreloaderDone={() => setNavVisible(true)} />
        </LenisProvider>
      </BrowserRouter>
    </LanguageProvider>
  )
}
