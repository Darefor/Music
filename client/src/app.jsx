import { Routes, Route } from "react-router"
import Navbar from "./components/Navbar"
import HomePage from "./pages/Homepage"
import AddBiograf from "./pages/AddBiograf"
import AddMusic from "./pages/AddMusic"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import Footer from "./components/Footer"
import {Toaster} from "react-hot-toast"
import { useAuthStore } from "./store/authStore"
import { useEffect } from "react"
import RedirectAuthenticatedUsers from "./providers/RedirectAuthenticatedUsers"
import RedirectUnAuthenticatedUsers from "./providers/RedirectUnAuthenticatedUsers"
import BiografDetail from "./pages/Biograf"


function App() {
  const { fetchUser, fetchingUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (fetchingUser) {
    return <p>Loading...</p>;
  }


  return ( 
    <>
       
       <Toaster />
        <Navbar />

        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/add-music"} element={
            <RedirectUnAuthenticatedUsers> 
              <AddMusic />
            </RedirectUnAuthenticatedUsers>
          } />
          <Route path={"/add-biograf"} element={
            <RedirectUnAuthenticatedUsers> 
              <AddBiograf />
            </RedirectUnAuthenticatedUsers>
          } />
          
          <Route path={"/login"} element={
            <RedirectAuthenticatedUsers>
              <LoginPage />
            </RedirectAuthenticatedUsers>
          } />
          <Route path={"/signup"} element={
            <RedirectAuthenticatedUsers>
              <SignupPage />
            </RedirectAuthenticatedUsers>
          } />
          <Route path={"/logout"} element={
            <RedirectAuthenticatedUsers> 
              <HomePage />
            </RedirectAuthenticatedUsers>
          } />
          <Route path={"/biograf/:id"} element={<BiografDetail />
          } />

        </Routes>

        <Footer />
    </>
  )
}

export default App
