// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// /*
// =====================================================
//   Protected Route Wrapper
// =====================================================
// */

// export default function ProtectedRoute({ children }) {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="card text-center">
//           <p>Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedRoute({ children }) {
//   const { isAuthenticated, loading, user } = useAuth();
//   const location = useLocation();

//   if (loading) {
//     return null;
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   // If user not onboarded → force onboarding
//   if (!user?.isOnboarded && location.pathname !== "/onboarding") {
//     return <Navigate to="/onboarding" replace />;
//   }

//   // If already onboarded and trying to access onboarding
//   if (user?.isOnboarded && location.pathname === "/onboarding") {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// }


import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // While checking auth
  if (loading) {
    return null; // or loader component
  }

  // If not logged in → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise allow access
  return children;
}
