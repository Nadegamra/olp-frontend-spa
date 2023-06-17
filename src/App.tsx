import AppRoutes from './components/routing/AppRoutes'
import Footer from './components/ui/Footer'
import Header from './components/ui/Header'

function App() {
    return (
        <div className="h-screen flex flex-col text-t-primary bg-bg-primary">
            <Header />
            <main className="flex-1" id="main-content">
                <AppRoutes />
            </main>
            <Footer />
        </div>
    )
}

export default App
