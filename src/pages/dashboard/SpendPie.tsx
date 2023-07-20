import { Card, Title, DonutChart } from "@tremor/react";

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;

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

interface ExpensesByCategory {
  [key: string]: number;
}

export const SpendPie = ({ expenses, categories }: Props) => {
  // Create an object to store the total expenses per category
  const expensesByCategory: ExpensesByCategory = {};
  for (const category of categories) {
    expensesByCategory[category.name] = 0;
  }

  // Calculate the total expenses per category
  for (const expense of expenses) {
    const categoryName = categories.find(
      (category) => category.id === expense.category_id
    )?.name;
    if (categoryName) {
      expensesByCategory[categoryName] += expense.amount;
    }
  }

  // Convert the expenses by category object to an array of objects
  const categoriesData = Object.entries(expensesByCategory).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
    <Card className="max-w-lg">
      <Title>Spending by Category</Title>
      <DonutChart
        className="mt-6"
        data={categoriesData}
        category="value"
        index="name"
        valueFormatter={valueFormatter}
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
      />
    </Card>
  );
};

export default SpendPie;
