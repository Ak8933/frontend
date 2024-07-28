import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './BarChartComponent.css'; // Import the CSS file

const BarChartComponent = ({ selectedMonth }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchBarChartData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/bar-chart?month=${selectedMonth}`);
                const result = await response.json();

                // Transform the response data into the format expected by Recharts
                const formattedData = Object.keys(result).map(key => ({
                    priceRange: key,
                    itemCount: result[key]
                }));

                setData(formattedData);
            } catch (error) {
                console.error('Error fetching bar chart data:', error);
            }
        };

        fetchBarChartData();
    }, [selectedMonth]);

    return (
        <div className="bar-chart-container">
            <h2>Bar Chart</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={data}
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="priceRange" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="itemCount" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChartComponent;
