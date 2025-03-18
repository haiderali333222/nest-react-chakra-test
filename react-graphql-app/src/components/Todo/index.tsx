import { useQuery, useMutation } from "@apollo/client";
import { GET_ITEMS, DELETE_ITEM } from "../../graphql/todo";
import { Box, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import DataEntryForm from "./form";
import ItemList from "./list";
import { toaster } from "../ui/toaster";

const Todo = () => {
  const [items, setItems] = useState<any[]>([]);
  const [skip, setSkip] = useState(0);
  const limit = 5;
  const [hasMoreItems, setHasMoreItems] = useState(true);

  const { loading, error, data, refetch, fetchMore } = useQuery(GET_ITEMS, {
    variables: { limit, skip },
    notifyOnNetworkStatusChange: true,
  });

  const [deleteItem] = useMutation(DELETE_ITEM, {
    onCompleted: () => {
      toaster.create({
        title: "Success",
        description: "Item deleted successfully.",
        type: "success",
      });
      refetch();
    },
    onError: () => {
      toaster.create({
        title: "Error",
        description: "Failed to delete item.",
        type: "error",
      });
    },
  });

  const handleItemAdded = () => {
    refetch();
    toaster.create({
      title: "Success",
      description: "Item added successfully.",
      type: "success",
    });
  };

  useEffect(() => {
    if (data?.items) {
      const newItems = data.items.filter((newItem: { id: string }) => {
        return !items.some(
          (existingItem: { id: string }) => existingItem.id === newItem.id,
        );
      });

      setItems((prevItems) => [...prevItems, ...newItems]);
      if (data.items.length < limit) setHasMoreItems(false);
    }
  }, [data]);

  // Load more items
  const loadMoreItems = () => {
    fetchMore({
      variables: {
        skip: skip + limit,
        limit,
      },
    }).then(() => {
      setSkip(skip + limit);
    });
  };

  if (loading && !data) return <Spinner />;
  if (error) return <Text color="red">Error: {error.message}</Text>;

  return (
    <Box maxW="100%">
      <VStack paddingX={60}>
        <Heading as="h1" size="xl" mb={6}>
          Shopping List
        </Heading>
        <DataEntryForm onItemAdded={handleItemAdded} />
        <ItemList
          items={items}
          setItems={setItems}
          deleteItem={deleteItem}
          loading={loading}
          loadMoreItems={loadMoreItems}
          hasMore={hasMoreItems}
        />
      </VStack>
    </Box>
  );
};

export default Todo;
