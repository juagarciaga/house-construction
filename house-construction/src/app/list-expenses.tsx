'use client'
import axios from "axios";
import _ from "lodash";
import { useEffect, useState } from "react";
import Image from "next/image";


export default function ListExpenses() {
  const [expenses, setExpenses] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [expensesByYear, setExpensesByYear] = useState<any[]>();
  const [expensesByMonth, setExpensesByMonth] = useState<any>();
  const [totalYear, setTotalYear] = useState<any>(0);

  const listItem = async () => {
    try {
      const response = await axios.get('https://ucn9prowa5.execute-api.us-east-1.amazonaws.com/dev/items');
      console.log('Response:', response.data);
      setExpenses(response.data.items);

      let byYearItems = _.uniq(response.data.items.map((item: Record<string, any>) => item.year));
      byYearItems = _.orderBy(byYearItems);
      setExpensesByYear(byYearItems);
      setLoading(false);
    } catch (error) {
      console.error('Error getting items:', error);
    }
  };

  const loadItemsByMonth = (year: string) => {
    const byYear = expenses?.filter((item) => item.year === year) || [];
    const tYear = calculateTotalExpense(byYear);
    setTotalYear(tYear);
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

  const deleteExpense = async (id: string) => {
    try {
      await axios.delete(`https://ucn9prowa5.execute-api.us-east-1.amazonaws.com/dev/items/${id}`);
      listItem();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  useEffect(() => {
    listItem();
  }, []);

  return (

    <>
      {loading && <p>Loading...</p>}

      {expensesByYear && (
        <div className="flex gap-4 w-100">
          {expensesByYear.map((year) => (
            <button className="rounded-md " type="button" key={year} onClick={() => loadItemsByMonth(year)}>{year}</button>
          ))}
        </div>
      )}

      <h2 className="font-bold">Total Year: {totalYear}</h2>

      {expensesByMonth && (
        <>
          {Object.keys(expensesByMonth).map((month) => (
            <div className="mb-4" key={month}>
              <h2 className="font-bold text-lg">{getMonthName(Number(month))}</h2>
              <hr />
              <table className="table-auto border-collapse w-full">
                <thead>
                  <tr>
                    <th className="text-center px-1">Who Paid</th>
                    <th className="text-center px-1">Category</th>
                    <th className="text-center px-1">Value</th>
                    <th className="text-center px-1">Date</th>
                    <th className="text-center px-1">Description</th>
                    <th className="text-center px-1">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {expensesByMonth[month].map((item: Record<string, any>) => (
                    <tr key={item.id}>
                      <td className="text-center px-1">{item.whoPaid}</td>
                      <td className="text-center px-1">{item.expenseCategory}</td>
                      <td className="text-center px-1">{formatCurrency(Number(item.expenseValue))}</td>
                      <td className="text-center px-1">{formatDate(item.expenseDate)}</td>
                      <td className="text-center px-1">{item.description}</td>
                      <td className="text-center px-1 flex align-center justify-center cursor-pointer" onClick={() => deleteExpense(item.id)}>
                        <Image
                          aria-hidden
                          src="/delete.svg"
                          alt="delete icon"
                          width={20}
                          height={20}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h2 className="font-bold">Total Month: {calculateTotalExpense(expensesByMonth[month])}</h2>
            </div>
          ))}
        </>
      )}
    </>
  );
}
