import MainLayout from './components/MainLayout'
import './App.css'

function App() {
  return (
    <MainLayout>
      <div className="bg-[#2D2D2D] p-6 rounded border border-[#FF4500]/20">
          <p className="leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:text-[#FF4500] first-letter:float-left first-letter:mr-2">
            In the land of Mordor, in the fires of Mount Doom, the Dark Lord Sauron forged in secret a master Ring. 
            Here amidst the shadows and flame rises Barad-dûr, the fortress of the Dark Lord, 
            its foundation laid with sorcery and its walls built with malice.
          </p>
        </div>
    </MainLayout>
  )
}

export default App
