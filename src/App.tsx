import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { LanguageProvider } from '@/context/LanguageContext'
import { LenisProvider } from '@/context/LenisContext'
import { NoiseOverlay } from '@/components/NoiseOverlay'
import { CustomCursor } from '@/components/CustomCursor'
import { Nav } from '@/components/Nav'
import Home from '@/pages/Home'
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'))

const SITE_URL = 'https://www.sabajanelidze.com'

// Tells Google the real address of each page, so old hosts (saba-janelidze.vercel.app) don't count as duplicates.
function Canonical() {
  const { pathname } = useLocation()
  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = SITE_URL + pathname
  }, [pathname])
  return null
}

export default function App() {
  const [navVisible, setNavVisible] = useState(false)

  return (
    <LanguageProvider>
      <BrowserRouter>
        <Canonical />
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
