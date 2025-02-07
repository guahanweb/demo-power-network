import MainLayout from './components/MainLayout'
import './App.css'

function App() {
  return (
    <MainLayout>
      <div className="bg-[#2F4858] p-6 rounded shadow-lg border border-[#B87D4B]">
        <p className="leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:text-[#FFB74D] first-letter:float-left first-letter:mr-2">
          Deep in the heart of Misty Mountains lie the ancient halls of Khazad-dûm. 
          Here, the echoes of hammers ring through halls of stone, and the fires of 
          countless forges burn eternal, a testament to the mastery of the Dwarven smiths.
        </p>
      </div>
    </MainLayout>
  )
}

export default App
