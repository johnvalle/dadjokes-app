import React from "react";
import { Box, Button, Container, Divider, Text, useToast } from "@chakra-ui/react";

import { useDadJoke } from "../hooks";

const Dashboard = () => {
  const [page, setPage] = React.useState(1);
  const dadJokeQuery = useDadJoke({ page });
  const toast = useToast();

  const dadJoke = dadJokeQuery.data?.data;

  React.useEffect(() => {
    if (!dadJokeQuery.isLoading) {
      if (dadJokeQuery.isError) {
        toast({
          title: "We've encountered some problems.",
          description: "Please try again later.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  }, [dadJokeQuery, dadJoke, toast]);

  return (
    <Container maxW="container.lg">
      {dadJokeQuery.isLoading ? (
        <Text>Loading jokes...</Text>
      ) : dadJokeQuery.isError ? (
        <Text>Uh oh...</Text>
      ) : (
        dadJoke?.results?.map((data: { id: number; joke: string }) => (
          <Box key={data.id} bgColor="gray.50" my="1rem" p="0.5rem">
            <Text>{data.joke}</Text>
          </Box>
        ))
      )}
      <Divider my="1rem" />
      {!dadJokeQuery.isLoading && !dadJokeQuery.isError && (
        <>
          <Text>
            Current page: {dadJoke?.current_page}/{dadJoke?.total_pages}
          </Text>
          <Text>Total jokes: {dadJoke?.total_jokes}</Text>
          {dadJoke?.current_page !== 1 && (
            <Button colorScheme="blue" onClick={() => setPage(1)} mr="1rem">
              First page
            </Button>
          )}
          <Button
            colorScheme="blue"
            disabled={dadJoke?.current_page === 1}
            onClick={() => setPage(dadJoke?.previous_page)}
          >
            Previous page
          </Button>

          <Button
            colorScheme="blue"
            disabled={dadJoke?.current_page === dadJoke?.total_pages}
            onClick={() => setPage(dadJoke?.next_page)}
            ml="1rem"
          >
            Next page
          </Button>
          {dadJoke?.current_page !== dadJoke?.total_pages && (
            <Button colorScheme="blue" onClick={() => setPage(dadJoke?.total_pages)} ml="1rem">
              Last page
            </Button>
          )}
        </>
      )}
    </Container>
  );
};

export default Dashboard;
