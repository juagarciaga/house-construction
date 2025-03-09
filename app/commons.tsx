// export const LargeBtnAddStyle 
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('default', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);
};

// export const deleteExpense = async (id: string, month: string) => {
//     try {
//         await axios.delete(`https://ucn9prowa5.execute-api.us-east-1.amazonaws.com/dev/items/${id}`);
//         expensesByMonth[month] = expensesByMonth[month].filter((item) => item.id !== id);
//         setExpensesByMonth({ ...expensesByMonth });
//     } catch (error) {
//         console.error('Error deleting item:', error);
//     }
// };
