import AppRoutes from './components/routing/AppRoutes'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'

function App() {
    return (
        <div className="min-h-screen flex flex-col text-clr-text1 bg-clr-bg3">
            <Header />
            <main className="flex-1" id="main-content">
                <AppRoutes />
            </main>
            <Footer />
        </div>
    )
}

export default App
