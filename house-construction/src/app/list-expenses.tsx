'use client'
import axios from "axios";
import _ from "lodash";
import { useEffect, useState } from "react";


export default function ListExpenses() {
  const [expenses, setExpenses] = useState<any[]>();
  const [expensesByYear, setExpensesByYear] = useState<any[]>();
  const [expensesByMonth, setExpensesByMonth] = useState<any>();

  const listItem = async () => {
    try {
      const response = await axios.get('https://ucn9prowa5.execute-api.us-east-1.amazonaws.com/dev/items');
      console.log('Response:', response.data);
      setExpenses(response.data.items);
      setExpensesByYear(_.uniq(response.data.items.map((item: Record<string, any>) => item.year)));
    } catch (error) {
      console.error('Error getting items:', error);
    }
  };

  const loadItemsByMonth = (year: string) => {
    const byYear = expenses?.filter((item) => item.year === year);
    const byMonth = _.groupBy(byYear, 'month');
    setExpensesByMonth(byMonth);
  }

  const getMonthName = (monthNumber: number) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('default', { month: 'long' });
  };

  const calculateTotalExpense = (expenses: Record<string, any>[]) => {
    const sumTotal = expenses.reduce((total, item) => total + Number(item.expenseValue), 0);
    return formatCurrency(sumTotal);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('default', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  useEffect(() => {
    listItem();
  }, []);

  return (
    <>
      {expensesByYear && (
        <div className="flex gap-4">
          {expensesByYear.map((year) => (
            <button key={year} onClick={() => loadItemsByMonth(year)}>{year}</button>
          ))}
        </div>
      )}

      {expensesByMonth && (
        <>
          {Object.keys(expensesByMonth).map((month) => (
            <div className="mb-4" key={month}>
              <h2 className="font-bold text-lg">{getMonthName(Number(month))}</h2>
              <hr />
              <table className="table-auto">
                <thead>
                  <tr>
                    <th className="text-center px-2">Who Paid</th>
                    <th className="text-center px-2">Description</th>
                    <th className="text-center px-2">Category</th>
                    <th className="text-center px-2">Date</th>
                    <th className="text-center px-2">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {expensesByMonth[month].map((item: Record<string, any>) => (
                    <tr key={item.id}>
                      <td className="text-center px-2">{item.whoPaid}</td>
                      <td className="text-center px-2">{item.description}</td>
                      <td className="text-center px-2">{item.expenseCategory}</td>
                      <td className="text-center px-2">{formatDate(item.expenseDate)}</td>
                      <td className="text-center px-2">{formatCurrency(Number(item.expenseValue))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h2 className="font-bold">Total Month: {calculateTotalExpense(expensesByMonth[month])}</h2>
            </div>
          ))}
        </>
      )}

      <button onClick={() => listItem()} className="btn mt4">Show items</button>
    </>
  );
}
