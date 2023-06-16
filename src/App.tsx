import AppRoutes from './components/routing/AppRoutes'
import Footer from './components/ui/Footer'
import Header from './components/ui/Header'

function App() {
    return (
        <div className="h-screen flex flex-col">
            <div>
                <Header />
            </div>
            <div className="flex-1 bg-bg-primary text-t-primary">
                <AppRoutes />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default App
