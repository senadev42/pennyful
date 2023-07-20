import {
  AuthPage,
  Authenticated,
  ErrorComponent,
  GitHubBanner,
  Refine,
} from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import authProvider from "./authProvider";
import { Layout } from "./components/layout";

import { supabaseClient } from "./utility";

//Pages
import {
  ExpenseList,
  ExpenseCreate,
  ExpenseEdit,
  ExpenseShow,
} from "./pages/expenses";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";
import { useState, useEffect } from "react";
import { DashboardPage } from "./pages/dashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {
  BudgetList,
  BudgetCreate,
  BudgetEdit,
  BudgetShow,
} from "./pages/budgets";

function App() {
  const [identity, setIdentity] = useState<any | null>();

  useEffect(() => {
    async function fetchIdentity() {
      const identity = await authProvider.getIdentity?.();
      setIdentity(identity);
    }
    fetchIdentity();
  }, []);
  return (
    <BrowserRouter>
      {/* <GitHubBanner /> */}

      <RefineKbarProvider>
        <Refine
          dataProvider={dataProvider(supabaseClient)}
          liveProvider={liveProvider(supabaseClient)}
          // authProvider={authProvider}
          routerProvider={routerBindings}
          resources={[
            { name: "dashboard", list: "/dashboard" },
            {
              name: "expenses",
              list: "/expenses",
              create: "/expenses/create",
              edit: "/expenses/edit/:id",
              show: "/expenses/show/:id",
              meta: {
                canDelete: true,
              },
            },
            {
              name: "categories",
              list: "/categories",
              create: "/categories/create",
              edit: "/categories/edit/:id",
              show: "/categories/show/:id",
              meta: {
                canDelete: true,
              },
            },
            {
              name: "budgets",
              list: "/budgets",
              create: "/budgets/create",
              edit: "/budgets/edit/:id",
              show: "/budgets/show/:id",
              meta: {
                canDelete: true,
              },
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          <Routes>
            <Route
              element={
                <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                  <Layout>
                    <Outlet />
                  </Layout>
                </Authenticated>
              }
            >
              <Route
                index
                element={<NavigateToResource resource="blog_posts" />}
              />
              <Route path="/categories">
                <Route index element={<CategoryList />} />
                <Route path="create" element={<CategoryCreate />} />
                <Route path="edit/:id" element={<CategoryEdit />} />
                <Route path="show/:id" element={<CategoryShow />} />
              </Route>
              <Route path="/expenses">
                <Route index element={<ExpenseList />} />
                <Route path="create" element={<ExpenseCreate />} />
                <Route path="edit/:id" element={<ExpenseEdit />} />
                <Route path="show/:id" element={<ExpenseShow />} />
              </Route>
              <Route path="/budgets">
                <Route index element={<BudgetList />} />
                <Route path="create" element={<BudgetCreate />} />
                <Route path="edit/:id" element={<BudgetEdit />} />
                <Route path="show/:id" element={<BudgetShow />} />
              </Route>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="*" element={<ErrorComponent />} />
            </Route>
            <Route
              element={
                <Authenticated fallback={<Outlet />}>
                  <NavigateToResource />
                </Authenticated>
              }
            >
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/forgot-password"
                element={<AuthPage type="forgotPassword" />}
              />
            </Route>
          </Routes>

          <RefineKbar />
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
