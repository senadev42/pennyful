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

import { SpendCard } from "./SpendCard";

import {
  getSpendPerCategory,
  getSpendPerMonth,
  getSpendPerWeek,
} from "./utils";

export const DashboardPage: React.FC = () => {
  const [tableData, setTableData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchTableData = async () => {
      const { data, error } = await supabaseClient.from("expenses").select("*");
      if (error) {
        console.error(error);
      } else {
        setTableData(data);
      }
    };
    fetchTableData();
  }, []);

  useEffect(() => {
    const fetchTableData = async () => {
      const { data, error } = await supabaseClient
        .from("categories")
        .select("*");
      if (error) {
        console.error(error);
      } else {
        setCategories(data);
      }
    };
    fetchTableData();
  }, []);

  useEffect(() => {
    if (tableData && categories) {
      console.log(getSpendPerCategory(tableData, categories));
    }
  }, [tableData, categories]);

  return (
    <main className="m-2">
      <Title>Dashboard</Title>
      <Text>How's the Spending Going?</Text>
      <TabGroup className="mt-6">
        <TabList>
          <Tab>Budgets</Tab>
          <Tab>Details</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
              <Card>
                <div className="h-28">
                  <SpendCard />
                </div>
              </Card>
              <Card>
                <div className="h-28" />
              </Card>
              <Card>
                <div className="h-28" />
              </Card>
            </Grid>
            <div className="mt-6">
              <Card>
                <div className="h-80" />
              </Card>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">
              <Card>
                <div className="h-96" />
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
};
