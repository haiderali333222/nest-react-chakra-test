import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { DialogRoot, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogTitle, DialogBackdrop } from "../ui/dialog"; 

const ItemList = ({
  items,
  deleteItem,
  loading,
  loadMoreItems,
  hasMore,
  setItems, // Add setItems to update the parent state
}: any) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle delete item
  const handleDelete = async () => {
    if (selectedItemId) {
      try {
        // Perform the delete mutation
        await deleteItem({ variables: { id: selectedItemId } });

        // Remove the item from the local state (if it's controlled in this component)
        setItems((prevItems: any) => prevItems.filter((item: any) => item.id !== selectedItemId));

        setIsDialogOpen(false); // Close the dialog after deletion
      } catch (error) {
        console.error("Error deleting item:", error);
        // Handle the error accordingly (could show a toast or error message)
      }
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" width="100%">
      <VStack spacing={4}>
        {items.length === 0 ? (
          <Text>No items found.</Text>
        ) : (
          items.map((item: { id: string; name: string; description: string; quantity: number }) => (
            <Box
              key={item.id}
              display="flex"
              justifyContent="space-between"
              p={3}
              borderWidth="1px"
              borderRadius="md"
              width="100%"
            >
              <Box>
                <Text fontWeight="bold">{item.name}</Text>
                <Text>{item.description}</Text>
                <Text>Quantity: {item.quantity}</Text> {/* Display quantity */}
              </Box>
              <Button
                colorScheme="red"
                onClick={() => {
                  setSelectedItemId(item.id);
                  setIsDialogOpen(true); // Open dialog when delete is clicked
                }}
              >
                Delete
              </Button>
            </Box>
          ))
        )}
      </VStack>

      {hasMore && (
        <Box mt={4} display="flex" justifyContent="center">
          <Button
            onClick={loadMoreItems}
            loading={loading}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <DialogRoot open={isDialogOpen}>
        <DialogBackdrop />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text>Are you sure you want to delete this item?</Text>
          </DialogBody>
          <DialogFooter>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};

export default ItemList;
