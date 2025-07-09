import React from 'react';
import { Box, Typography} from '@mui/material';

const QR = ({amount}) => {
    
    const vietQRInfo = {
        bankName: 'HDBank',
        accountNumber: '007704070028898',
        accountName: 'QUANG DONG HA THANH',
        amount: amount,
        qrCode: `https://img.vietqr.io/image/HDB-007704070028898-compact.png?amount=${amount}`
    };

    return (
        <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Thanh toán qua VietQR
            </Typography>

            <Box sx={{ my: 3 }}>
                <img
                    src={vietQRInfo.qrCode}
                    alt="VietQR Code"
                    style={{
                        width: '200px',
                        height: '200px',
                        border: '1px solid #ddd',
                        borderRadius: '8px'
                    }}
                />
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Quét mã QR bằng ứng dụng ngân hàng để thanh toán
            </Typography>

            
        </Box>
    );
};

export default QR;
