import MainLayout from './components/MainLayout'
import './App.css'

function App() {
  return (
    <MainLayout>
      <div className="bg-white/80 p-6 rounded-lg shadow-md border border-[#8B7355]/20">
        <p className="leading-relaxed first-letter:text-4xl first-letter:font-semibold first-letter:text-[#4A4238] first-letter:mr-2">
          Standing proud against the mountain, the White City rises through seven circles
          of ancient stone. Here, the legacy of Númenor endures in the halls of kings
          and the hearts of those who keep watch over the realm of Gondor.
        </p>
      </div>
    </MainLayout>
  )
}

export default App
