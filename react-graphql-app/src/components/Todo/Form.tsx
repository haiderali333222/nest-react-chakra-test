import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_ITEM } from "../../graphql/todo";
import { Box, Button, Input, VStack } from "@chakra-ui/react";

const DataEntryForm = ({ onItemAdded }: { onItemAdded: () => void }) => {
  const [formData, setFormData] = useState({ name: "", quantity: 0 });

  const [createItem, { loading, error }] = useMutation(CREATE_ITEM, {
    onCompleted: () => {
      onItemAdded();
      setFormData({ name: "", quantity: 0 });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createItem({ variables: { input: formData } });
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" width="100%">
      <form onSubmit={handleSubmit}>
        <VStack spaceX={4}>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter name"
          />
          <Input
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: parseInt(e.target.value) })
            }
            placeholder="Enter quantity"
            type="number"
          />
          <Button type="submit" colorScheme="blue" loading={loading}>
            Add Record
          </Button>
        </VStack>
      </form>
      {error && <Text color="red">{error.message}</Text>}
    </Box>
  );
};

export default DataEntryForm;
