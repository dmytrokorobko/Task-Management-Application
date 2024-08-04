import { Outlet } from "react-router-dom"
import { Footer } from "../components/Footer"
import '../App.css';

export const BaseLayout = ({HeaderComponent}) => {
   return (
      <div className="App">
         <header>
            <HeaderComponent />
         </header>
         <section>
            <Outlet />
         </section>
         <footer>
            <Footer />
         </footer>
      </div>
   )
}