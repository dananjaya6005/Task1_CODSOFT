
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter, useLocation ,Navigate } from "react-router-dom";
import MainRouter from '../MainRouter';

import {
  SignedIn,
  SignedOut,

  useUser,
  
} from "@clerk/clerk-react";


const clerkPubKey = 'pk_test_dG91Y2hlZC1ndWxsLTI2LmNsZXJrLmFjY291bnRzLmRldiQ';

export default function App() {
  return (
    <>
    <BrowserRouter>
    
      <ClerkProvider publishableKey={clerkPubKey}>
      <MainRouter />
      <SignedIn>
        {/* //somting  */}
      </SignedIn>
      <SignedOut>
        <SignUpORLogin/>
      </SignedOut>
    </ClerkProvider>
    </BrowserRouter>
    </>
  );
}
const SignUpORLogin = () : any=>{
  const location = useLocation();
  const CurruntPath = location.pathname;
  const {  isSignedIn } = useUser();

  if (!isSignedIn && CurruntPath === '/') {
    return <Navigate to="/login" />;
  }
  else if (CurruntPath === '/signup'){
    return <Navigate to="/signup" />;
  }
  return null;
  
}
