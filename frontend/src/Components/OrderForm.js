import React, { useState, useEffect } from "react"
import { createOrder, getCurrencies } from "../Services/orderServices"
import Notification from "./Notification"


const OrderForm = ({refreshOrders }) => {
    const [order, setOrder] = useState({
        order_id: "",
        price_amount: "",
        price_currency: "",
        receive_currency: "",
        title: "",
        description: "",
        purchaser_email: "",
    })

    const [currencies, setCurrencies] = useState([])

    const [notification, setNotification] = useState({
        type: "",
        message: "",
        visible: false,
    })

    const handleChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await createOrder(order)
            if (response) {
                refreshOrders()
                setNotification({
                    type: "success",
                    message: "Order created successfully!",
                    visible: true,
                })
                hideNotificationAfterDelay()
            } else {
                throw new Error("Failed to create order")
            }
        } catch (error) {
            setNotification({
                type: "error",
                message: error.message || "Failed to create order",
                visible: true,
            })
            hideNotificationAfterDelay()
        }
    }

    const hideNotificationAfterDelay = () => {
        // Hide notification after 3 seconds
        setTimeout(() => {
            setNotification((prevNotification) => ({
                ...prevNotification,
                visible: false,
            }))
        }, 3000)
    }

    useEffect(() => {
        getCurrencies().then((currencies) => {
            if (currencies) {
                setCurrencies(currencies)
            }
        })
    }, [])

    return (
        <>
            {notification.visible && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                />
            )}
            <div>
                <h1 className="text-3xl font-bold underline">Order Form</h1>
            </div>
            <form
                onSubmit={handleSubmit}
                className="grid space-y-4 p-4 w-full justify-center"
            >
                <input
                    name="order_id"
                    value={order.order_id}
                    onChange={handleChange}
                    placeholder="Order ID"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <input
                    name="price_amount"
                    value={order.price_amount}
                    onChange={handleChange}
                    placeholder="Price Amount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <select
                    name="price_currency"
                    value={order.price_currency}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="">Select Currency</option>
                    {currencies?.map((currency, key) => (
                        <option key={key} value={currency?.symbol}>
                            {currency?.title} ({currency?.symbol})
                        </option>
                    ))}
                </select>
                {/* <input
                    name="receive_currency"
                    value={order.receive_currency}
                    onChange={handleChange}
                    placeholder="Receive Currency"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                /> */}
                <select
                    name="receive_currency"
                    value={order.receive_currency}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="">Select Currency</option>
                    {currencies?.map((currency, key) => (
                        <option key={key} value={currency?.symbol}>
                            {currency?.title} ({currency?.symbol})
                        </option>
                    ))}
                </select>
                <input
                    name="title"
                    value={order.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <input
                    name="description"
                    value={order.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <input
                    name="purchaser_email"
                    value={order.purchaser_email}
                    onChange={handleChange}
                    placeholder="Purchaser Email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    type="submit"
                >
                    Create Order
                </button>
            </form>
        </>
    )
}

export default OrderForm
