import React, { useEffect, useState } from "react"
import { cancelOrder, getOrder } from "../Services/orderServices"

const OrderInformation = ({ orderId }) => {
    const [order, setOrder] = useState(null)

    useEffect(() => {
        getOrder(orderId).then((response) => {
            if (response) {
                setOrder(response)
            } else {
                console.log(response)
            }
        })
    }, [orderId])

    if (!order) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h1 className="text-3xl font-bold underline">Order Information</h1>
            <div className="grid">
                <div className=" p-4">
                    <p>Order ID: {order?.order_id}</p>
                    <p>Price Amount: {order?.price_amount}</p>
                    <p>Price Currency: {order?.price_currency}</p>
                    <p>Receive Currency: {order?.receive_currency}</p>
                    <p>Status: {order?.status}</p>
                    {order?.title && <p>Title: {order?.title}</p>}
                    {order?.description && (
                        <p>Description: {order?.description}</p>
                    )}
                </div>
                {order?.status === "new" && <div>
                    <button className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        <a
                            href={order?.payment_url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Pay
                        </a>
                    </button>
                </div>}
                {/* Works only for binance orders */}
                {/* <button
                    onClick={() => {
                        cancelOrder(order?.id)
                    }}
                >
                    Cancel Order
                </button> */}
            </div>
        </div>
    )
}

export default OrderInformation
