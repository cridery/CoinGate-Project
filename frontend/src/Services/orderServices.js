import axios from 'axios';

const API_ENDPOINT = "http://localhost:3001"

export const getCurrencies = async () => {
    try {
        const response = await axios.get(API_ENDPOINT + "/orders/currencies")
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}

export const createOrder = async (orderData) => {
    try {
        const response = await axios.post(API_ENDPOINT + "/orders", orderData)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}

export const getOrders = async () => {
    try {
        const response = await axios.get(API_ENDPOINT + "/orders")
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}

export const getOrder = async (orderId) => { 
    try {
        const response = await axios.get(API_ENDPOINT + "/orders/" + orderId)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}

export const cancelOrder = async (orderId) => { 
    try {
        const response = await axios.post(API_ENDPOINT + "/orders/" + orderId + "/binance/cancel")
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}