import { RomaneioItem } from "./lists/romaneios.list";

export const formatDate = (dateString: string): string => {
    try {
        const dateOnly = dateString?.split("T")?.[0];
        console.log("dateOnly", dateOnly);
        if (!dateOnly) return dateString;
        const dt = new Date(dateOnly)?.toISOString()?.split("T")?.[0];
        return dt.split("-").reverse().join("/");

    } catch (_error) {
        console.error("Error formatting date:", _error);
        return dateString; // Return original string if there's an error
    }
};

export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);
};

export const calculateTotalExpenseByAgnosticType = (expenses: RomaneioItem[]): number => {
    return expenses.reduce((total, item) => total + Number(item.value), 0);
};

export const computeTotalExpenseFormated = (expenses: RomaneioItem[]): string => {
    const sumTotal = calculateTotalExpenseByAgnosticType(expenses);
    return formatCurrency(sumTotal);
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
