import { useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import OrderForm from "./Components/OrderForm"
import OrdersList from "./Components/OrdersList"
import OrderInformation from "./Components/OrderInformation"
import OrderSuccess from "./Components/OrderSuccess"
import OrderCanceled from "./Components/OrderCanceled"

function App() {
    const [orderId, setOrderId] = useState()
    const [refreshKey, setRefreshKey] = useState(0)

    const refreshOrders = () => {
        setRefreshKey((refreshKey) => refreshKey + 1)
    }
    return (
        <div className="App">
            <Router>
                <div className="flex ">
                    <div className="w-1/5 border-r h-screen">
                        <OrdersList
                            refreshKey={refreshKey}
                            setOrderId={setOrderId}
                        />
                    </div>
                    <div className="w-full">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    !orderId && (
                                        <div className="flex justify-center">
                                            <Link to="/orders/create">
                                                <button className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                    Create New Order
                                                </button>
                                            </Link>
                                        </div>
                                    )
                                }
                            />

                            <Route
                                path="/orders/success"
                                element={<OrderSuccess />}
                            />
                            <Route
                                path="/orders/cancel"
                                element={<OrderCanceled />}
                            />
                            <Route
                                path="/orders/:orderId"
                                element={<OrderInformation orderId={orderId} />}
                            />
                            <Route
                                path="/orders/create"
                                element={
                                    <OrderForm refreshOrders={refreshOrders} />
                                }
                            />
                        </Routes>
                    </div>
                </div>
            </Router>
        </div>
    )
}

export default App
