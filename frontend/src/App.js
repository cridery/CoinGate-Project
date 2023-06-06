import { useState } from "react"
import "./App.css"
import OrderForm from "./Components/OrderForm"
import OrdersList from "./Components/OrdersList"
import OrderInformation from "./Components/OrderInformation"

function App() {
    const [createOrder, setCreateOrder] = useState(true)
    const [orderId, setOrderId] = useState()
    const [refreshKey, setRefreshKey] = useState(0)

    const refreshOrders = () => {
        setRefreshKey((refreshKey) => refreshKey + 1)
    }
    return (
        <div className="App">
            <div className="flex ">
                <div className="w-1/5 border-r h-screen">
            <OrdersList
                        refreshKey={refreshKey}
                        setCreateOrder={setCreateOrder}
                        setOrderId={setOrderId}
                    />
                </div>
                <div className="w-full">
                    {createOrder && <OrderForm refreshOrders={refreshOrders} />}
                    {!createOrder && (
                        <div className="p-4">
                            <OrderInformation orderId={orderId} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default App
