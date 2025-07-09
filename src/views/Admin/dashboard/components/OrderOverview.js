import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Box, Paper, Typography } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function aggregateOrderCount(orders, labels, range, week, year) {
    const countMap = {};
    labels.forEach(label => { countMap[label] = 0; });

    orders.forEach(order => {
        if (order.status !== 'completed') return;
        const d = new Date(order.createdAt || order.created_at);

        if (range === 'week' && week) {
            if (d < week.start || d > week.end) return;
            const label = d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
            if (countMap[label] !== undefined) countMap[label] += 1;
        } else if (range === 'month') {
            if (d.getFullYear() !== year) return;
            const month = (d.getMonth() + 1).toString().padStart(2, '0');
            if (countMap[month] !== undefined) countMap[month] += 1;
        }
    });

    return labels.map(label => countMap[label]);
}

function OrderOverview({ orders = [], range = 'week', loading = false, labels = [], week, year }) {
    const chartLabels = range === 'week' ? labels : labels.map(m => `Tháng ${m}`);
    const orderCounts = useMemo(() => aggregateOrderCount(orders, labels, range, week, year), [orders, labels, range, week, year]);

    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Số đơn hàng',
                data: orderCounts,
                backgroundColor: function (context) {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, '#42a5f5');
                    gradient.addColorStop(1, '#1e88e5');
                    return gradient;
                },
                borderRadius: 8,
                barThickness: 60,
                hoverBackgroundColor: '#1565c0',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: { display: false },
            tooltip: {
                backgroundColor: '#fff',
                titleColor: '#000',
                bodyColor: '#1565c0',
                borderColor: '#ccc',
                borderWidth: 1,
                padding: 12,
                displayColors: false,
                callbacks: {
                    title: (tooltipItems) => tooltipItems[0].label,
                    label: (tooltipItem) => `🛒 Đơn hàng: ${tooltipItem.raw}`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    precision: 0,
                    color: '#333',
                },
                grid: { drawBorder: false, display: false },
            },
            x: {
                ticks: { color: '#333' },
                grid: { display: false },
            },
        },
    };

    return (
        <Box sx={{ width: '100%', overflowX: 'auto', py: 2 }}>
                
                <Box sx={{ width: '100%', height: 300, marginBottom: 2 }}>
                    <Bar data={chartData} options={chartOptions} />
                </Box>

                <Typography
                    variant="subtitle1"
                    fontWeight="600"
                    fontStyle="italic"
                    gutterBottom
                    textAlign="center"
                >
                    {range === 'week'
                        ? `Số đơn hàng ${week ? week.label : ''}`
                        : `Số đơn hàng năm ${year}`}
                </Typography>

        </Box>
    );
}

export default OrderOverview;
