'use client';
import { Box, Typography } from "@mui/material";
import { Link } from "react-router";

const Footer = () => {
    return (
        <Box sx={{ pt: 6, textAlign: "center" }}>
            <Typography>
                © {new Date().getFullYear()} All rights reserved by{" "}
                <Link to="https://mitacorp.vn/">
                    <Typography color='primary.main' component='span'>
                        mitacorp.vn</Typography>
                </Link>{" "}
            </Typography>
        </Box>
    );
};

export default Footer;
