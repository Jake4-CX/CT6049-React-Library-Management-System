import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import LandingPage from './views/landing';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './views/authentication/login';

import { Toaster } from 'react-hot-toast';
import { ReduxProvider } from './redux/provider';
import RequireAuth from './routes/features/RequireAuth';
import BookPage from './views/books/viewBook';
import AppInitializer from './utils/appInitializer';
import AdminDashboardPage from './views/dashboard/adminDashboard';
import CreateBookPage from './views/books/createBook';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route index element={<LandingPage />} />

      {/* Authentication */}
      <Route path="/login" element={<LoginPage />} />

      <Route path="/book/:bookId" element={<BookPage />} />

      <Route element={<RequireAuth allowedRoles={['USER', 'ADMIN']} />}>
        <Route path="/dashboard" element={<AdminDashboardPage />} />
        <Route path="/books/add" element={<CreateBookPage />} />
      </Route>
    </Route>
  )
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchIntervalInBackground: false,
      cacheTime: 10_000,
      refetchOnWindowFocus: false,
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReduxProvider>
    <QueryClientProvider client={queryClient}>
      <AppInitializer>
        <RouterProvider router={router} />
      </AppInitializer>
      <Toaster position='top-right' />
    </QueryClientProvider>
  </ReduxProvider>,
)
