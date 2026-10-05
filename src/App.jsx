import Nav from './components/Nav'
import SiteFooter from './components/SiteFooter'
import Acceleration from './sections/Acceleration'
import CallToAction from './sections/CallToAction'
import Gallery from './sections/Gallery'
import Hero from './sections/Hero'
import Torque from './sections/Torque'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#top">
        Skip to content
      </a>
      <Nav />
      <main id="top">
        <Hero />
        <Gallery />
        <Torque />
        <Acceleration />
        <CallToAction />
      </main>
      <SiteFooter />
    </>
  )
}