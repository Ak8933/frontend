import React, { useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import TransactionStatistics from './components/TransactionStatistics';
import BarChartComponent from './components/BarChartComponent';
import './App.css'; // Import the CSS file

const App = () => {
    const [selectedMonth, setSelectedMonth] = useState('March');

    return (
        <div className="app-container">
            <h1>Transaction Dashboard</h1>
            <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="month-selector"
            >
                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
                    <option key={month} value={month}>{month}</option>
                ))}
            </select>

            <TransactionStatistics selectedMonth={selectedMonth} />
            <BarChartComponent selectedMonth={selectedMonth} />
            <TransactionsTable selectedMonth={selectedMonth} />
        </div>
    );
};

export default App;
