// src/views/User/cart/components/Modal.js
import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Box
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const Modal = ({
    open,
    onClose,
    title,
    content,
    actions,
    showCloseButton = true,
    maxWidth = 'sm',
    fullWidth = true
}) => (
    <Dialog
        open={open}
        onClose={onClose}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        slotProps={{
            paper: {
              sx: { borderRadius: 2 }
            }
        }}
    >
        <DialogTitle sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: 1
        }}>
            <Box sx={{ flex: 1 }}>
                {title}
            </Box>
            {showCloseButton && (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            )}
        </DialogTitle>

        <DialogContent sx={{ pt: 0 }}>
            {content}
        </DialogContent>

        {actions && (
            <DialogActions sx={{ px: 3, pb: 3 }}>
                {actions}
            </DialogActions>
        )}
    </Dialog>
);

export default Modal;
