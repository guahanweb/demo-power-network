import MainLayout from './components/MainLayout'
import PreferencesList from './components/PreferencesList'
import { usePreferences } from './state/preferencesContext'
import './App.css'

const CrownIcon = () => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="currentColor">
  <path d="M20 60 L35 30 L50 50 L65 30 L80 60 L20 60" strokeWidth="2"/>
  <path d="M25 65 L75 65" strokeWidth="2"/>
</svg>
)

const Loader = () => (
  <div className="flex items-center justify-center text-orange-700">
    <div className="animate-spin display-inline-block h-10 w-10">
      <CrownIcon />
    </div>
  </div>
)

function App() {
  const { loading, error } = usePreferences();

  return (
    <MainLayout>
      <div className="bg-white/80 p-6 rounded-lg shadow-md border border-[#8B7355]/20">
        <p className="leading-relaxed first-letter:text-4xl first-letter:font-semibold first-letter:text-[#4A4238] first-letter:mr-2">
          Standing proud against the mountain, the White City rises through seven circles
          of ancient stone. Here, the legacy of Númenor endures in the halls of kings
          and the hearts of those who keep watch over the realm of Gondor.
        </p>
      </div>
      <div className="mt-6 rounded-2xl shadow-lg border border-color-jade p-6">
        {loading && <Loader />}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <>
            <h2 className="text-2xl font-normal text-[#8B7355]/80">Shape Your Path of Preferences</h2>
            <PreferencesList
              submitButtonText="Set the Course"
              submitButtonClass="bg-blue-800 text-white hover:bg-blue-700 transition-colors duration-100"
            />
          </>
        )}
      </div>
    </MainLayout>
  )
}

export default App
