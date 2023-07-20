function getSpendPerCategory(data, categories) {
  const spendByCategory = {};
  data.forEach((item) => {
    const categoryId = item.category_id;
    const categoryName = getCategoryName(categoryId, categories);
    if (!spendByCategory[categoryName]) {
      spendByCategory[categoryName] = 0;
    }
    spendByCategory[categoryName] += item.amount;
  });
  return spendByCategory;
}

function getCategoryName(categoryId, categories) {
  const category = categories.find((item) => item.id === categoryId);
  return category ? category.name : "";
}

function getSpendPerWeek(data) {
  const spendByWeek = {};
  data.forEach((item) => {
    const weekNumber = getWeekNumber(new Date(item.date));
    if (!spendByWeek[weekNumber]) {
      spendByWeek[weekNumber] = 0;
    }
    spendByWeek[weekNumber] += item.amount;
  });
  return spendByWeek;
}

function getWeekNumber(date) {
  const oneJan = new Date(date.getFullYear(), 0, 1);
  return Math.ceil(((date - oneJan) / 86400000 + oneJan.getDay() + 1) / 7);
}

function getSpendPerMonth(data) {
  const spendByMonth = {};
  data.forEach((item) => {
    const monthYear = item.date.substr(0, 7);
    if (!spendByMonth[monthYear]) {
      spendByMonth[monthYear] = 0;
    }
    spendByMonth[monthYear] += item.amount;
  });
  return spendByMonth;
}

export { getSpendPerCategory, getSpendPerMonth, getSpendPerWeek };
