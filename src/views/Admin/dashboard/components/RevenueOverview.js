import React, { useEffect, useState, useMemo } from 'react';
import { getOrders } from '../../../../Api/API';
import OrderOverview from './OrderOverview';
import { FormControl, InputLabel, Select, MenuItem, Box, Typography, Grid, Paper } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function getWeeksInMonth(year, month) {
    // month: 1-12
    const weeks = [];
    const firstDay = new Date(year, month - 1, 1);
    let currentMonday = new Date(firstDay);
    // Đưa về thứ 2 đầu tiên trong tháng
    while (currentMonday.getDay() !== 1) {
        currentMonday.setDate(currentMonday.getDate() - 1);
    }
    let weekIdx = 1;
    while (true) {
        const weekStart = new Date(currentMonday);
        const weekEnd = new Date(currentMonday);
        weekEnd.setDate(weekEnd.getDate() + 6);
        if (weekStart.getMonth() + 1 > month || (weekStart.getMonth() + 1 === month && weekStart.getDate() > new Date(year, month, 0).getDate())) break;
        weeks.push({
            label: `Tuần ${weekIdx}: ${weekStart.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })} - ${weekEnd.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}`,
            start: new Date(weekStart),
            end: new Date(weekEnd),
        });
        currentMonday.setDate(currentMonday.getDate() + 7);
        weekIdx++;
        if (weekStart.getMonth() + 1 > month && weekEnd.getMonth() + 1 > month) break;
    }
    return weeks;
}

function getWeekLabels(week) {
    const labels = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(week.start);
        d.setDate(week.start.getDate() + i);
        labels.push(d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }));
    }
    return labels;
}

function getDateLabels(range, selectedMonth, selectedWeek, selectedYear) {
    if (range === 'week' && selectedWeek) {
        return getWeekLabels(selectedWeek);
    } else if (range === 'month') {
        return Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    }
    return [];
}

function aggregateRevenue(orders, range, labels, week, year) {
    if (range === 'week' && week) {
        const revenueMap = {};
        labels.forEach(label => { revenueMap[label] = 0; });
        orders.forEach(order => {
            if (order.status !== 'completed') return;
            const d = new Date(order.createdAt || order.created_at);
            if (d < week.start || d > week.end) return;
            const label = d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
            if (revenueMap[label] !== undefined) {
                revenueMap[label] += parseFloat(order.total_price);
            }
        });
        return labels.map(label => revenueMap[label]);
    } else if (range === 'month') {
        const labelsMonth = getDateLabels('month');
        const revenueMap = {};
        labelsMonth.forEach(label => { revenueMap[label] = 0; });
        orders.forEach(order => {
            if (order.status !== 'completed') return;
            const d = new Date(order.createdAt || order.created_at);
            if (d.getFullYear() !== year) return;
            const month = (d.getMonth() + 1).toString().padStart(2, '0');
            if (revenueMap[month] !== undefined) {
                revenueMap[month] += parseFloat(order.total_price);
            }
        });
        return labelsMonth.map(label => revenueMap[label]);
    }
    return [];
}

function RevenueOverview() {
    const now = new Date();
    const [range, setRange] = useState('week');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());
    const weeks = useMemo(() => getWeeksInMonth(selectedYear, selectedMonth), [selectedMonth, selectedYear]);
    const [selectedWeekIdx, setSelectedWeekIdx] = useState(0);
    const selectedWeek = weeks[selectedWeekIdx] || weeks[0];

    useEffect(() => {
        async function fetchOrders() {
            setLoading(true);
            try {
                const res = await getOrders();
                setOrders(res.data || []);
            } catch (e) {
                setOrders([]);
            }
            setLoading(false);
        }
        fetchOrders();
    }, []);

    // Reset tuần về tuần 1 khi đổi tháng/năm
    useEffect(() => {
        setSelectedWeekIdx(0);
    }, [selectedMonth, selectedYear]);

    const handleRangeChange = (e) => {
        setRange(e.target.value);
    };
    const handleMonthChange = (e) => {
        setSelectedMonth(Number(e.target.value));
    };
    const handleYearChange = (e) => {
        setSelectedYear(Number(e.target.value));
    };
    const handleWeekChange = (e) => {
        setSelectedWeekIdx(Number(e.target.value));
    };

    const labels = useMemo(() => getDateLabels(range, selectedMonth, selectedWeek, selectedYear), [range, selectedMonth, selectedWeek, selectedYear]);
    const revenueData = useMemo(() => aggregateRevenue(orders, range, labels, selectedWeek, selectedYear), [orders, range, labels, selectedWeek, selectedYear]);

    const chartData = {
        labels: range === 'week' ? labels : labels.map(m => `Tháng ${m}`),
        datasets: [
            {
                label: 'Doanh thu ',
                data: revenueData,
                borderColor: '#FFA500',
                backgroundColor: 'rgba(255,165,0,0.2)',
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#FFA500',
                fill: true,
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
            bodyColor: '#FFA500',
            borderColor: '#ffd580',
            borderWidth: 1,
            titleFont: { weight: 'bold' },
            padding: 10,
            usePointStyle: true,
            displayColors: false,
            callbacks: {
              title: (tooltipItems) => tooltipItems[0].label,
            },
          },
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        elements: {
          point: {
            radius: 5,
            backgroundColor: '#FFA500',
            borderColor: '#fff',
            borderWidth: 2,
            hoverRadius: 7,
            hoverBorderColor: '#FFA500',
            hoverBorderWidth: 3,
            hoverBackgroundColor: '#fff',
          },
          line: {
            borderWidth: 3,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { borderDash: [10, 5] },
          },
          x: {
            grid: { display: false },
          },
        },
      };
      

    return (
        <Box>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2, minWidth: 480, minHeight: 350 }}>
                <FormControl sx={{ minWidth: 120, mb: 2, mr: 2 }} size="small">
                    <InputLabel id="range-select-label" sx={{ fontWeight: 'bold' }}>Thời gian</InputLabel>
                    <Select
                        labelId="range-select-label"
                        value={range}
                        label="Thời gian"
                        onChange={handleRangeChange}
                    >
                        <MenuItem value="week">Theo tuần</MenuItem>
                        <MenuItem value="month">Theo tháng</MenuItem>
                    </Select>
                </FormControl>
                {range === 'week' && (
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item>
                            <FormControl size="small" sx={{ minWidth: 100 }}>
                                <InputLabel id="month-select-label" sx={{ fontWeight: 'bold' }}>Tháng</InputLabel>
                                <Select
                                    labelId="month-select-label"
                                    value={selectedMonth}
                                    label="Tháng"
                                    onChange={handleMonthChange}
                                >
                                    {[...Array(12)].map((_, i) => (
                                        <MenuItem key={i + 1} value={i + 1}>{`Tháng ${(i + 1).toString().padStart(2, '0')}`}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl size="small" sx={{ minWidth: 100 }}>
                                <InputLabel id="week-select-label" sx={{ fontWeight: 'bold' }}>Tuần</InputLabel>
                                <Select
                                    labelId="week-select-label"
                                    value={selectedWeekIdx}
                                    label="Tuần"
                                    onChange={handleWeekChange}
                                >
                                    {weeks.map((w, idx) => (
                                        <MenuItem key={idx} value={idx}>{w.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl size="small" sx={{ minWidth: 100 }}>
                                <InputLabel id="year-select-label"sx={{ fontWeight: 'bold' }}>Năm</InputLabel>
                                <Select
                                    labelId="year-select-label"
                                    value={selectedYear}
                                    label="Năm"
                                    onChange={handleYearChange}
                                >
                                    {[...Array(5)].map((_, i) => (
                                        <MenuItem key={i} value={now.getFullYear() - 2 + i}>{now.getFullYear() - 2 + i}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                )}
                <Box sx={{ background: '#fff', borderRadius: 2, p: 2, mb: 4, width: '100%', overflowX: 'auto', minHeight: 320 }}>
                    <Box sx={{ width: '100%', minWidth: 400, height: 300 }}>
                        <Line data={chartData} options={chartOptions} />
                    </Box>

                    <Typography
                        variant="subtitle1"
                        textAlign="center"
                        fontWeight="600"
                        fontStyle="italic"
                        sx={{ mt: 2 }}
                        >
                        {range === 'week'
                            ? `Doanh thu ${selectedWeek ? selectedWeek.label : ''}`
                            : `Doanh thu năm ${selectedYear}`}
                    </Typography>
                </Box>
                <OrderOverview orders={orders} range={range} loading={loading} labels={labels} week={selectedWeek} year={selectedYear} />
            </Paper>
        </Box>
    );
}

export default RevenueOverview;