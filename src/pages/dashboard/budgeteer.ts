export function getBudgetData(expenses: any[], budgets: any): any {
  const result = [];

  for (const budget of budgets) {
    const categoryExpenses = expenses.filter((expense: { category_id: any }) =>
      budget.category_ids.includes(expense.category_id)
    );

    const total = categoryExpenses.reduce(
      (sum: any, expense: { amount: any }) => sum + expense.amount,
      0
    );

    const percentage = (total / budget.total_budget) * 100;

    const halfway = (-35 + 30) / 2;
    const trend = percentage > halfway ? percentage - halfway : 0;
    result.push({
      title: budget.name,
      total: +total.toFixed(2),
      trend,
      target: +budget.total_budget.toFixed(2),
      percentage,
    });
  }

  return result;
}
