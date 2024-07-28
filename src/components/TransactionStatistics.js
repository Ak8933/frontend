import './TransactionStatistics.css';
import React, { useState, useEffect } from 'react';

const TransactionStatistics = ({ selectedMonth }) => {
    const [statistics, setStatistics] = useState({
        totalAmount: 0,
        totalSoldItems: 0,
        totalNotSoldItems: 0
    });

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/statistics?month=${selectedMonth}`);
                const data = await response.json();
                setStatistics({
                    totalAmount: data.totalAmount,
                    totalSoldItems: data.totalSoldItems,
                    totalNotSoldItems: data.totalNotSoldItems
                });
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        fetchStatistics();
    }, [selectedMonth]);

    return (
        <div className="statistics-container">
            <div className="stat-box">
                <h2>Total Amount of Sales</h2>
                <p>{statistics.totalAmount}</p>
            </div>
            <div className="stat-box">
                <h3>Total Sold Items</h3>
                <p>{statistics.totalSoldItems}</p>
            </div>
            <div className="stat-box">
                <h3>Total Not Sold Items</h3>
                <p>{statistics.totalNotSoldItems}</p>
            </div>
        </div>
    );
};

export default TransactionStatistics;
