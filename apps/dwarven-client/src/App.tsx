import MainLayout from './components/MainLayout'
import PreferencesList from './components/PreferencesList'
import { usePreferences } from './state/preferencesContext'
import './App.css'

const HammerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="currentColor" color="currentColor">
    <path d="M45 85 L45 35" strokeWidth="3" />
    <path d="M25 25 L65 25 L65 45 L25 45 Z" strokeWidth="3" />
    <path d="M30 25 L30 45" strokeWidth="1" />
    <path d="M45 25 L45 45" strokeWidth="1" />
    <path d="M60 25 L60 45" strokeWidth="1" />
    <path d="M25 35 L65 35" strokeWidth="1" />
  </svg>
)

const Loader = () => (
  <div className="flex items-center justify-center text-white">
    <div className="animate-spin display-inline-block h-10 w-10">
      <HammerIcon />
    </div>
  </div>
)

function App() {
  const { loading, error } = usePreferences();

  return (
    <MainLayout>
      <div className="bg-[#2F4858] p-6 rounded shadow-lg border border-[#B87D4B]">
        <p className="leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:text-[#FFB74D] first-letter:float-left first-letter:mr-2">
          Deep in the heart of Misty Mountains lie the ancient halls of Khazad-dûm.
          Here, the echoes of hammers ring through halls of stone, and the fires of
          countless forges burn eternal, a testament to the mastery of the Dwarven smiths.
        </p>
      </div>
      <div className="bg-[#2F4858] mt-6 rounded shadow-lg border border-[#B87D4B] p-6">
        {loading && <Loader />}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <>
            <h2 className="text-2xl font-normal text-[#FFB74D]">Hammer out Your Settings</h2>
            <PreferencesList />
          </>
        )}
      </div>
    </MainLayout>
  )
}

export default App
