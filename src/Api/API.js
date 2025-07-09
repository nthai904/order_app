const API_BASE = process.env.REACT_APP_API_BASE_URL;
console.log('API_BASE:', process.env.REACT_APP_API_BASE_URL);

// Product
export const getProducts = async () => {
    try {
        const response = await fetch(`${API_BASE}${process.env.REACT_APP_PRODUCT_API}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("❌ Lỗi lấy danh sách sản phẩm:", error);
        throw error;
    }
};

export const getProductsData = async () => {
    try {
        const response = await getProducts();
        return response.data || [];
    } catch (error) {
        console.error('Error getting products data:', error);
        return [];
    }
};

export const deleteProduct = async (productId) => {
    try {
        console.log('Deleting product with ID:', productId);
        const url = `${API_BASE}${process.env.REACT_APP_PRODUCT_API}/${productId}`;
        console.log('Delete URL:', url);

        const response = await fetch(url, {
            method: "DELETE"
        });

        console.log('Delete response status:', response.status);
        console.log('Delete response ok:', response.ok);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Delete error response:', errorText);
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        console.log('Delete success result:', result);
        return result;
    } catch (error) {
        console.error("❌ Lỗi xóa sản phẩm:", error);
        throw error;
    }
};

export const deleteAllProducts = async () => {
    try {
        const response = await fetch(`${API_BASE}${process.env.REACT_APP_PRODUCT_API}/deleted/list`, {
            method: "DELETE"
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Lỗi xóa tất cả sản phẩm:", error);
        throw error;
    }
};

export const createProduct = async (formData) => {
    try {
        const response = await fetch(`${API_BASE}${process.env.REACT_APP_PRODUCT_API}`, {
            method: "POST",
            body: formData
        });

        const contentType = response.headers.get("content-type") || "";

        let data;
        if (contentType.includes("application/json")) {
            data = await response.json();
        } else {
            data = await response.text(); // fallback nếu là HTML
        }

        return {
            ok: response.ok,
            status: response.status,
            data
        };
    } catch (error) {
        console.error("❌ Lỗi fetch:", error);
        return {
            ok: false,
            status: 0,
            data: { message: error.message }
        };
    }
};

export const updateProduct = async (productId, formData) => {
    try {
        const response = await fetch(`${API_BASE}${process.env.REACT_APP_PRODUCT_API}/${productId}`, {
            method: "PUT",
            body: formData
        });

        const contentType = response.headers.get("content-type") || "";

        let data;
        if (contentType.includes("application/json")) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        return {
            ok: response.ok,
            status: response.status,
            data
        };
    } catch (error) {
        console.error("❌ Lỗi cập nhật sản phẩm:", error);
        return {
            ok: false,
            status: 0,
            data: { message: error.message }
        };
    }
};

export const getProductDetail = async (productId) => {
    try {
        const response = await fetch(`${API_BASE}${process.env.REACT_APP_PRODUCT_API}/${productId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Lỗi lấy chi tiết sản phẩm:", error);
        throw error;
    }
};

// Category
export const getCategories = async () => {
    const url = `${API_BASE}${process.env.REACT_APP_CATEGORY_API}`;
    console.log('Fetching categories from:', url);
    const res = await fetch(url);

    if (!res.ok) {
        const errText = await res.text();
        console.error('🔥 API trả về lỗi:', res.status, errText);
        throw new Error('API lỗi hoặc không tồn tại');
    }

    const json = await res.json();
    console.log("📦 Dữ liệu categories:", json);

    return json;
};

export const getCategoriesData = async () => {
    try {
        const response = await getCategories();
        return response.data || [];
    } catch (error) {
        console.error('Error getting categories data:', error);
        return [];
    }
};

export const createCategory = async (categoryData) => {
    try {
        const response = await fetch(`${API_BASE}${process.env.REACT_APP_CATEGORY_API}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categoryData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Lỗi tạo danh mục:", error);
        throw error;
    }
};

export const updateCategory = async (categoryId, categoryData) => {
    try {
        const response = await fetch(`${API_BASE}${process.env.REACT_APP_CATEGORY_API}/${categoryId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categoryData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Lỗi cập nhật danh mục:", error);
        throw error;
    }
};

export const deleteCategory = async (categoryId) => {
    try {
        const response = await fetch(`${API_BASE}${process.env.REACT_APP_CATEGORY_API}/${categoryId}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Lỗi xóa danh mục:", error);
        throw error;
    }
};

// Attribute
export const getAttributes = async () => {
    const url = `${API_BASE}${process.env.REACT_APP_ATTRIBUTE_API}`;

    const res = await fetch(url);

    if (!res.ok) {
        const errText = await res.text();
        console.error('🔥 API trả về lỗi:', res.status, errText);
        throw new Error('API lỗi hoặc không tồn tại');
    }
    return res.json();
};

export const createAttribute = async (attributeData) => {
    try {
        const response = await fetch(`${API_BASE}${process.env.REACT_APP_ATTRIBUTE_API}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(attributeData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Lỗi tạo thuộc tính:", error);
        throw error;
    }
};

export const updateAttribute = async (attributeId, attributeData) => {
    try {
        const response = await fetch(`${API_BASE}${process.env.REACT_APP_ATTRIBUTE_API}/${attributeId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(attributeData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Lỗi cập nhật thuộc tính:", error);
        throw error;
    }
};

export const deleteAttribute = async (attributeId) => {
    try {
        const response = await fetch(`${API_BASE}${process.env.REACT_APP_ATTRIBUTE_API}/${attributeId}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Lỗi xóa thuộc tính:", error);
        throw error;
    }
};

// Order
export const createOrder = async (order) => {
    try {
        const response = await fetch(`${API_BASE}${process.env.REACT_APP_ORDER_API}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order),
        });

        let data;
        try {
            data = await response.json();
        } catch {
            data = null;
        }

        return {
            ok: response.ok,
            status: response.status,
            data,
        };
    } catch (error) {
        console.error("❌ Lỗi tạo đơn hàng:", error);
        return {
            ok: false,
            status: 0,
            data: { message: error.message }
        };
    }
};

export const getOrders = async () => {
    try {
        const response = await fetch(`${API_BASE}${process.env.REACT_APP_ORDER_API}`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Lỗi lấy danh sách đơn hàng:", error);
        throw error;
    }
};

export const getOrderById = async (id) => {
    try {
        const response = await fetch(`${API_BASE}${process.env.REACT_APP_ORDER_API}/${id}`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Lỗi lấy chi tiết đơn hàng:", error);
        throw error;
    }
};

export const deleteOrder = async (id) => {
    try {
        const response = await fetch(`${API_BASE}${process.env.REACT_APP_ORDER_API}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Lỗi xóa đơn hàng:", error);
        throw error;
    }
};

export const updateOrderStatus = async (id, status) => {
    try {
        const response = await fetch(`${API_BASE}${process.env.REACT_APP_ORDER_API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Lỗi cập nhật trạng thái đơn hàng:", error);
        throw error;
    }
};