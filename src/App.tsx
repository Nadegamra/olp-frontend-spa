import AppRoutes from './components/routing/AppRoutes'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
function App() {
    return (
        <div className="min-h-screen flex flex-col text-clr-text1 bg-clr-bg3">
            <Header />
            <main className="flex-1" id="main-content">
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    closeOnClick
                    pauseOnHover
                    theme={localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'}
                />
                <AppRoutes />
            </main>
            <Footer />
        </div>
    )
}

export default App
