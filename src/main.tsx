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
import BookPage from './views/book';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route index element={<LandingPage />} />

      {/* Authentication */}
      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/book/:bookId" element={<BookPage />} />

      <Route element={<RequireAuth allowedRoles={['USER']}/>}>
        <Route path="/dashboard" element={<h1>Welcome</h1>}/>
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
  <React.StrictMode>
    <ReduxProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position='top-right' />
      </QueryClientProvider>
    </ReduxProvider>
  </React.StrictMode>,
)
