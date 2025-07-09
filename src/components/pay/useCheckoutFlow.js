import { useState } from 'react';
import { createOrder } from '../../Api/API';

export default function useCheckoutFlow({ items, onSuccess }) {
 
    const [showCustomerForm, setShowCustomerForm] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCheckout = () => {
        if (!items || items.length === 0) {
            alert('Không có sản phẩm để thanh toán!');
            return;
        }
        setShowCustomerForm(true);
    };

    
    const handleCustomerInfoSubmit = async (customerInfo) => {
        try {
            
            const orderData = {
                customer_name: customerInfo.customer_name,
                customer_phone: customerInfo.customer_phone,
                customer_address: customerInfo.customer_address,
                details: items.map(item => ({
                    product_id: item.productId,
                    variant_id: item.variant_id,
                    product_name: item.productName,
                    variant_name: item.sizeName || null,
                    price: item.price,
                    quantity: item.quantity
                }))
            };

            const response = await createOrder(orderData);

            if (
                (response.ok && response.data) ||
                (response.data && (response.data.id || response.data.message?.includes('thành công')))
            ) {
                
                let orderId = null;
                if (response.data) {
                    if (response.data.id) {
                        orderId = response.data.id;
                    } else if (response.data.data && response.data.data.id) {
                        orderId = response.data.data.id;
                    }
                }
                if (orderId) {
                    
                    localStorage.setItem('userOrderId', orderId.toString());

                    const orderDetails = items.map(item => ({
                        product_id: item.productId,
                        product_name: item.productName,
                        sugar: item.sugar || null,
                        ice: item.ice || null,
                        notes: item.notes || null
                    }));

                    localStorage.setItem(`orderDetails_${orderId}`, JSON.stringify(orderDetails));
                }
                setShowQR(true);
            } else {
                alert('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.');
        }
    };

    const handleConfirmPayment = () => {
        setShowQR(false);
        setShowSuccess(true);
        if (onSuccess) onSuccess(orderId);
    };

    const handleCloseSuccessModal = () => {
        setShowSuccess(false);
    };

    return {
        showCustomerForm,
        setShowCustomerForm,
        showQR,
        setShowQR,
        showSuccess,
        setShowSuccess,
        orderId,
        loading,
        handleCheckout,
        handleCustomerInfoSubmit,
        handleConfirmPayment,
        handleCloseSuccessModal,
    };
} 