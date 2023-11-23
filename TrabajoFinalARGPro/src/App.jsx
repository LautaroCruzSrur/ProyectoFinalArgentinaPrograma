import Inicio from "./pages/Inicio"
import TaskProvider from "./context/TaskContext"

function App() {
  

  return (
    <>
    <TaskProvider>
     <Inicio/>
     </TaskProvider>
    </>
  )
}

export default App
