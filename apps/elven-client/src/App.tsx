import MainLayout from './components/MainLayout'
import PreferencesList from './components/PreferencesList'
import { usePreferences } from './state/preferencesContext'
import './App.css'

const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="currentColor">
    <path d="M50 10 C80 40, 80 60, 50 90 C20 60, 20 40, 50 10 Z" strokeWidth="2" />
    <path d="M50 10 L50 90 M30 40 Q50 50 70 40" strokeWidth="1" />
  </svg>
)

const Loader = () => (
  <div className="flex items-center justify-center text-green-900">
    <div className="animate-spin display-inline-block h-10 w-10">
      <LeafIcon />
    </div>
  </div>
)

function App() {
  const { loading, error } = usePreferences();

  return (
    <MainLayout>
      <div className="prose prose-lg">
        <p className="text-gray-700 leading-relaxed first-letter:text-3xl first-letter:font-serif first-letter:mr-1">
          Here in the Valley of Imladris, time flows like the gentle waters of the Bruinen.
          The halls of Elrond Half-elven stand as a testament to the timeless beauty of the Firstborn,
          where wisdom and artistry intertwine like branches reaching toward the stars.
        </p>
      </div>
      <div className="mt-6 rounded-2xl shadow-lg border border-color-jade p-6">
        {loading && <Loader />}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <>
            <h2 className="text-2xl font-normal text-green-900">Weave the Threads of Your Preferences</h2>
            <PreferencesList
              submitButtonText="Seal with Grace"
              submitButtonClass="bg-green-800 text-white hover:bg-green-700 transition-colors duration-100"
            />
          </>
        )}
      </div>
    </MainLayout>
  )
}

export default App
