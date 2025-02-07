import MainLayout from './components/MainLayout'
import './App.css'

function App() {
  return (
    <MainLayout>
      <div className="prose prose-lg">
        <p className="text-gray-700 leading-relaxed first-letter:text-3xl first-letter:font-serif first-letter:mr-1">
          Here in the Valley of Imladris, time flows like the gentle waters of the Bruinen. 
          The halls of Elrond Half-elven stand as a testament to the timeless beauty of the Firstborn, 
          where wisdom and artistry intertwine like branches reaching toward the stars.
        </p>
      </div>
    </MainLayout>
  )
}

export default App
