import Header from './Components/Header'
import Hero from './Components/Hero'
import Featurs from './Components/Featurs'
import Footer from './Components/Footer'

const Landingpage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-slate-100 to-gray-200 text-gray-900">
      <Header />
      <Hero />
      <Featurs />
      <Footer />
    </div>
  )
}

export default Landingpage
