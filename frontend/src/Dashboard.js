import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);
    const [balance, setBalance] = useState(0);
    const [monthlyBudget, setMonthlyBudget] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [savings, setSavings] = useState(0);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('/api/transactions');
                const data = await response.json();
                setTransactions(data);

                // Calculate total balance
                const balance = data.reduce((acc, transaction) => acc + transaction.amount, 0);
                setTotalBalance(balance);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className="dashboard p-4">
            <h1 className="text-2xl font-bold mb-4">MoneyWise Dashboard</h1>

            {/* Total Balance */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold">Total Balance</h2>
                <p className="text-xl">৳{totalBalance}</p>
            </div>

            {/* Monthly Budget Progress */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold">Monthly Budget</h2>
                <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                        className="bg-green-500 h-4 rounded-full"
                        style={{ width: `${(expenses / monthlyBudget) * 100}%` }}
                    ></div>
                </div>
                <p className="text-sm mt-1">৳{expenses} spent of ৳{monthlyBudget}</p>
            </div>

            {/* Spending Stats */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold">Spending Stats</h2>
                <p>Expenses: ৳{expenses}</p>
                <p>Savings: ৳{savings}</p>
            </div>

            {/* Transactions */}
            <div className="mt-4">
                <h2 className="text-lg font-semibold">Transactions</h2>
                <ul className="mt-4">
                    {transactions.map((transaction) => (
                        <li key={transaction._id} className="border-b py-2">
                            <span>{transaction.category}</span>: ৳{transaction.amount} ({new Date(transaction.date).toLocaleDateString()})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;