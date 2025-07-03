const API_BASE = "http://localhost:8000/api";

export const getMenu = async () => fetch(`${API_BASE}/menu`).then(res => res.json());

export const getDrinkDetail = async id => fetch(`${API_BASE}/menu/${id}`).then(res => res.json());

export const createOrder = async order => fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order)
}).then(res => res.json());

export const getOrders = async () => fetch(`${API_BASE}/orders`).then(res => res.json());

export const updateOrderStatus = async (orderId, status) => fetch(`${API_BASE}/orders/${orderId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
}).then(res => res.json());