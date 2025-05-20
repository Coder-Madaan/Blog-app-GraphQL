'use client';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

export function ApolloWrapper({ children }) {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}`,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
