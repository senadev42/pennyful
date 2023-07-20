import React from "react";
import {
  Card,
  Grid,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
} from "@tremor/react";

import { useEffect, useState } from "react";
import { supabaseClient } from "../../utility/supabaseClient";

//Tremor Components
import { SpendCard } from "./SpendCard";
import { SpendPie } from "./SpendPie";
import { SpendHistory } from "./SpendHistory";

import { getBudgetData } from "./budgeteer";

//interfaces
interface Budget {
  title: string;
  total: string;
  trend: number;
  target: string;
  percentage: number;
}

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

export const DashboardPage: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const [budgetData, setBudgetData] = useState<Budget[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: expenses, error: expensesError } = await supabaseClient
        .from("expenses")
        .select("*");
      const { data: categories, error: categoriesError } = await supabaseClient
        .from("categories")
        .select("*");
      const { data: budgets, error: budgetsError } = await supabaseClient
        .from("budgets")
        .select("*");

      if (expensesError || categoriesError || budgetsError) {
        console.error(expensesError || categoriesError || budgetsError);
      } else {
        setExpenses(expenses);
        setCategories(categories);
        setBudgets(budgets);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (expenses && categories && budgets) {
      // console.log(expenses);
      // console.log(categories);
      // console.log(budgets);
      const budgetData = getBudgetData(expenses, budgets);
      setBudgetData(budgetData);
      console.log(budgetData);
    } else if (expenses === null || categories === null || budgets === null) {
      console.log("One or more states are loading...");
    } else {
      console.log("Error loading data...");
    }
  }, [expenses, categories, budgets]);

  return (
    <main className="m-2">
      <Title>Welcome Back</Title>
      <Text>Here's how the spending's going</Text>
      <TabGroup className="mt-6">
        <TabPanels>
          {/* the budgets */}
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
              {budgetData &&
                budgetData.map((budget) => (
                  <Card key={budget.title}>
                    <div className="">
                      <SpendCard
                        title={budget.title}
                        total={budget.total}
                        trend={budget.trend}
                        target={budget.target}
                        percentage={budget.percentage}
                      />
                    </div>
                  </Card>
                ))}
              <Card>
                <SpendPie expenses={expenses} categories={categories} />
              </Card>{" "}
            </Grid>{" "}
            <div className="mt-6">
              <Card>
                <SpendHistory expenses={expenses} categories={categories} />
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
};
