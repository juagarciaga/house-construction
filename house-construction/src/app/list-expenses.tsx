'use client'
import axios from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";


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
        <div className="">
          {Object.keys(expensesByMonth).map((month) => (
            <React.Fragment key={month}>
              <h2 className="red flex">{month}</h2>
              <hr />
              <br />
              <table className="table-auto">
                <thead>
                  <tr>
                    <th>Who Paid</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Value</th>
                    <th>month</th>
                    <th>year</th>
                  </tr>
                </thead>
              <tbody>
              {expensesByMonth[month].map((item: Record<string, any>) => (
                <tr key={item.id}>
                <td>{item.whoPaid}</td>
                <td>{item.description}</td>
                <td>{item.expensesType}</td>
                <td>{item.expenseCategory}</td>
                <td>{item.expenseDate}</td>
                <td>{item.expenseValue}</td>
                <td>{item.month}</td>
                <td>{item.year}</td>
              </tr>
              ))}
              </tbody>
              </table>
            </React.Fragment>
          ))}
        </div>
      )}

      <button onClick={() => listItem()} className="btn mt4">Show items</button>
    </>
  );
}
