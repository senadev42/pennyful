import { Card, Title, AreaChart } from "@tremor/react";
import { useEffect, useState } from "react";

const dataFormatter = (number: number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};

interface Category {
  id: number;
  name: string;
}

interface Expense {
  id: number;
  amount: number;
  category_id: number;
  date: string;
  note: string;
}

interface Props {
  expenses: Expense[];
  categories: Category[];
}

interface WeeklyExpensesByCategory extends Array<Expense> {}

interface WeeklyExpenses {
  [key: string]: number;
}

export const SpendHistory = ({ expenses, categories }: Props) => {
  const [chartData, setChartData] = useState<Expense[]>([]);

  // Create an array of objects to store the weekly expenses by category
  const weeklyExpensesByCategory: WeeklyExpensesByCategory = [];

  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(endDate.getMonth() - 1);
  let currentDate = startDate;
  while (currentDate < endDate) {
    const startOfWeek = new Date(currentDate.getTime());
    const endOfWeek = new Date(currentDate.getTime() + 6 * 24 * 60 * 60 * 1000);

    const weeklyExpenses: WeeklyExpenses = {};
    for (const category of categories) {
      weeklyExpenses[category.name] = 0;
    }

    for (const expense of expenses) {
      const expenseDate = new Date(expense.date);
      if (expenseDate >= startOfWeek && expenseDate <= endOfWeek) {
        const categoryName = categories.find(
          (category) => category.id === expense.category_id
        )?.name;
        if (categoryName) {
          weeklyExpenses[categoryName] += expense.amount;
        }
      }
    }

    weeklyExpensesByCategory.push({
      id: weeklyExpensesByCategory.length + 1, // Generate a unique ID
      amount: Object.values(weeklyExpenses).reduce(
        (acc, curr) => acc + curr,
        0
      ), // Calculate the total amount
      date: `${startOfWeek.toLocaleString("default", {
        month: "short",
      })} ${startOfWeek.getDate()}`,
      category_id: 0, // Set a default category ID
      note: "", // Set a default note
      ...weeklyExpenses,
    });
    currentDate = endOfWeek;
  }

  useEffect(() => {
    setChartData(weeklyExpensesByCategory);
  }, [expenses, categories]);

  return (
    <Card>
      <Title>Expenses this Past Month</Title>
      <AreaChart
        className="h-72 mt-4"
        data={chartData}
        index="date"
        categories={categories.map((category) => category.name)}
        colors={[
          "slate",
          "violet",
          "indigo",
          "rose",
          "cyan",
          "amber",
          "emerald",
          "teal",
        ]}
        valueFormatter={dataFormatter}
      />
    </Card>
  );
};

export default SpendHistory;
