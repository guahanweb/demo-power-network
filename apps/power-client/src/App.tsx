import MainLayout from './components/MainLayout'
// import PreferencesList from './components/PreferencesList'
import { usePreferences } from './state/preferencesContext'
import './App.css'

const PowerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="currentColor">
    <path d="M20 80 L50 10 L80 80" strokeWidth="2" />
    <path d="M40 40 L60 40" strokeWidth="2" />
    <path d="M45 40 L50 60 L55 40" strokeWidth="1.5" />
    <path d="M35 80 L50 70 L65 80" strokeWidth="1.5" />
  </svg>
)

const Loader = () => (
  <div className="flex items-center justify-center text-[#FF4500]">
    <div className="animate-spin display-inline-block h-10 w-10">
      <PowerIcon />
    </div>
  </div>
)

function App() {
  const { loading, error, preferences } = usePreferences();

  return (
    <MainLayout>
      <div className="flex flex-col gap-4">
        <div className="bg-[#2D2D2D] p-6 rounded border border-[#FF4500]/20">
          <p className="leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:text-[#FF4500] first-letter:float-left first-letter:mr-2">
            In the land of Mordor, in the fires of Mount Doom, the Dark Lord Sauron forged in secret a master Ring.
            Here amidst the shadows and flame rises Barad-dûr, the fortress of the Dark Lord,
            its foundation laid with sorcery and its walls built with malice.
          </p>
        </div>
        <div className="bg-[#2D2D2D] p-6 rounded border border-[#FF4500]/20">
          {loading && <Loader />}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <>
              <h2 className="text-2xl font-normal text-[#FF4500]">The Eye That Sees All</h2>
              <h3 className="text-lg font-normal text-[#959595]">
                No setting is hidden. The will of Mordor watches every choice, every change.
              </h3>
              <pre>{JSON.stringify(preferences, null, 2)}</pre>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default App
