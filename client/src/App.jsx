import { RouterProvider } from "react-router-dom";
import { router } from "./pages/router";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={client}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}
