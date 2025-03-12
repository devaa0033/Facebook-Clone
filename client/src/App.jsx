import { useState } from 'react'
import { createBrowserRouter, RouterProvider, Route, Outlet, useLocation } from 'react-router-dom'
import './App.scss'
import Register from './pages/register/Register'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navbar from './components/navbar/Navbar'
import LeftBar from './components/leftBar/LeftBar'
import RightBar from './components/rightBar/RightBar'
import AddPost from './components/Add_Post/AddPost'
import Share from './components/share/Share'



const Layout = () => {
  const location = useLocation()
  
  const noSidebarRoutes = ['/login', '/register', '/addPost']
  
  const isNoSidebarRoute = noSidebarRoutes.includes(location.pathname)

  return (

      <div className="layout">
        <Navbar />
        <div style={{ display: "flex" }}>
          {!isNoSidebarRoute && <LeftBar />}
          <div style={{ flex: 8 }}>
            <Outlet />
          </div>
          {!isNoSidebarRoute && <RightBar />}
        </div>
      </div>
  )
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { 
        path: "/", 
        element: <Home /> 
      },
      { 
        path: "/register", 
        element: <Register /> 
      },
      {
        path: "/login",
        element: <Login /> 
      },
      {
        path: "/addPost",
        element: <AddPost />
      },
      {
        path: "/share",
        element: < Share />
      }
    ],
  },
  
])

// Main App Component
function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App




































// import { useState } from 'react'
// import { createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom'
// import './App.scss'
// import Register from './pages/register/Register'
// import Home from './pages/home/Home'
// import Login from './pages/login/Login'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import Navbar from './components/navbar/Navbar'
// import LeftBar from './components/leftBar/LeftBar'
// import RightBar from './components/rightBar/RightBar'



// const queryClient = new QueryClient()

// const Layout = () => {
//   return (
//     <QueryClientProvider client={queryClient}>
//         <div className="layout">
//             <Navbar />
//             <div style={{ display: "flex" }}>
//                 <LeftBar/>
//                 <div style={{ flex: 6 }}>
//                     <Outlet/>
//                 </div>
//                 <RightBar/>
//             </div>
//         </div>
        
//     </QueryClientProvider>
//   )
// }

// const router = createBrowserRouter([
//   {
//     path : "/",
//     element :  <Layout />,
//     children : [
//       {
//         path : "/",
//         element : <Home/>
//       },
//       {
//         path : "/register",
//         element : <Register/>
//       }


//       // {
//       //   path : "/login",
//       //   element : <Login />
//       // }
//     ]
//   }
// ])


// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div className="app">
//         <div className="container">
//           <RouterProvider router = {router}/>
//         </div>
//       </div>

//     </>
//   )
// }

// export default App
