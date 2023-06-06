import React, { useEffect, useState } from "react"
import { cancelOrder, getOrder } from "../Services/orderServices"

const OrderInformation = ({ orderId }) => {
    const [order, setOrder] = useState(null)

    useEffect(() => {
        getOrder(orderId).then((response) => {
            if (response?.status === "success") {
                setOrder(response.order)
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
                </div>
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
