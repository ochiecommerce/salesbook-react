import { apiClient } from "./auth";
import { parseParams } from "./core";

export const createOrder = data=>apiClient.post('/api/orders/orders/',data)
export const createOrderItem = data=>apiClient.post('/api/orders/orderitems/',data)

export  const createOrderWithItems = async data=>{
    let order = await createOrder(data.order)
    for (let item of data.items){
        item.order = order
        await createOrderItem(item)
    }
}

export const getOrders = (filters)=>apiClient.get('/api/orders/orders/'+parseParams(filters))