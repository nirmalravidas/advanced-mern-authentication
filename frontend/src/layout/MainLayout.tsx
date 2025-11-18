import Navbar from "@/components/landing/Navbar/navbar"
import { Outlet } from "react-router-dom"


const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen m-2 md:m-0">
      <header>
        <Navbar/>
      </header>

      <div>
        <Outlet/>
      </div>

      <footer>
        
      </footer>
    </div>
  )
}

export default MainLayout
