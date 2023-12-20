import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter} from "react-router-dom";
import MainRouter from "../MainRouter";

const clerkPubKey = "pk_test_dG91Y2hlZC1ndWxsLTI2LmNsZXJrLmFjY291bnRzLmRldiQ";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <ClerkProvider publishableKey={clerkPubKey}>
          <MainRouter />
        </ClerkProvider>
      </BrowserRouter>
    </>
  );
}
