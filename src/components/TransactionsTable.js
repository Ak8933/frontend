import React, { useState, useEffect } from 'react';
import './TransactionsTable.css'; // Import the CSS file

const TransactionsTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [month, setMonth] = useState('March');
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(10);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const url = month === 'Fetch All' ? 'http://localhost:5000/api/transactions' : `http://localhost:5000/api/transactions?month=${month}`;
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data = await response.json();
                setTransactions(data.transactions);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, [month]);

    useEffect(() => {
        const filtered = transactions.filter(transaction =>
            transaction.title.toLowerCase().includes(search.toLowerCase()) ||
            transaction.description.toLowerCase().includes(search.toLowerCase()) ||
            transaction.price.toString().includes(search)
        );
        setFilteredTransactions(filtered);
    }, [search, transactions]);

    const indexOfLastTransaction = currentPage * perPage;
    const indexOfFirstTransaction = indexOfLastTransaction - perPage;
    const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="transactions-container">
            <h2>Transactions Table</h2>
            <div className="controls">
                <select value={month} onChange={handleMonthChange}>
                    <option value="Fetch All">Fetch All</option>
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Search transactions..."
                    value={search}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>

            <table className="transactions-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Date of Sale</th>
                        <th>Sold</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTransactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.title}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.price}</td>
                            <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                            <td>{transaction.sold ? 'Yes' : 'No'}</td>
                            <td>{transaction.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                {Array.from({ length: Math.ceil(filteredTransactions.length / perPage) }, (_, i) => (
                    <button key={i} onClick={() => paginate(i + 1)} className={`page-button ${currentPage === i + 1 ? 'active' : ''}`}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TransactionsTable;
