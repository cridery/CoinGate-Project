import React, { useEffect, useState } from "react"
import { getOrders, getCurrencies } from "../Services/orderServices"
import { Link } from "react-router-dom"

const OrdersList = ({ setOrderId, refreshKey }) => {
    const [loading, setLoading] = useState(true)

    const [orders, setOrders] = useState([])
    const handleClick = (order) => {
        setOrderId(order?.id)
    }

    useEffect(() => {
        getOrders().then((orders) => {
            if (orders) {
                setOrders(orders.orders)
                setLoading(false)
            }
        })
    }, [refreshKey])
    
    
    useEffect(() => {
        getCurrencies().then((currencies) => {
            if (currencies) {
                // console.log(currencies)
            }
        })
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }


    return (
        <>
            <h1 className="text-3xl font-bold underline">Orders List</h1>
            <div className="grid p-2">
                {orders?.map((order, key) => (
                    <Link to={`/orders/${order?.id}`} key={key}
                        
                        className="border-b p-4 "
                        onClick={() => handleClick(order)}
                    >
                        <p className="cursor-pointer">
                            Order ID: {order?.order_id}
                        </p>
                        <div>
                            <p>Status: {order?.status}</p>
                        </div>
                    </Link>
                ))}
                <Link to="/orders/create">
                <button
                    className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    // onClick={() => setCreateOrder(true)}
                >
                    Create New Order
                    </button>
                </Link>
            </div>
        </>
    )
}

export default OrdersList
