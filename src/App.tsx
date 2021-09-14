import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import * as Pages from "./pages";

function App() {
  /**
   * Create a new instance of queryClient
   * and pass it on to the QueryClientProvider
   * to access data throughout the App using React Query.
   */
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Pages.Dashboard} />
          </Switch>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
