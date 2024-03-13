import React, { useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Input, Select, Text, VStack, HStack, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, IconButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

const Index = () => {
  const toast = useToast();

  const initialTransactions = [
    { id: 1, date: "2023-01-01", type: "income", category: "Salary", amount: 5000 },
    { id: 2, date: "2023-01-05", type: "expense", category: "Groceries", amount: 150 },
  ];

  const [transactions, setTransactions] = useState(initialTransactions);
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    type: "income",
    category: "Salary",
    amount: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleAddTransaction = () => {
    const newId = transactions.length > 0 ? Math.max(...transactions.map((t) => t.id)) + 1 : 1;
    setTransactions([...transactions, { ...newTransaction, id: newId }]);
    setNewTransaction({ date: "", type: "income", category: "Salary", amount: 0 });
    toast({
      title: "Transaction added.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
    toast({
      title: "Transaction deleted.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleEditTransaction = (id) => {
    const transaction = transactions.find((t) => t.id === id);
    setEditingId(id);
    setIsEditing(true);
    setNewTransaction({ ...transaction });
  };

  const handleSaveEdit = () => {
    setTransactions(transactions.map((transaction) => (transaction.id === editingId ? { ...transaction, ...newTransaction } : transaction)));
    setIsEditing(false);
    setEditingId(null);
    setNewTransaction({ date: "", type: "income", category: "Salary", amount: 0 });
    toast({
      title: "Transaction updated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    setNewTransaction({ date: "", type: "income", category: "Salary", amount: 0 });
  };

  const totalBalance = transactions.reduce((acc, transaction) => {
    return transaction.type === "income" ? acc + transaction.amount : acc - transaction.amount;
  }, 0);

  return (
    <VStack spacing={5} p={5}>
      <Text fontSize="2xl" fontWeight="bold">
        My Budgeting App
      </Text>
      <Box w="100%" p={4} borderWidth="1px" borderRadius="md">
        <VStack spacing={3}>
          <FormControl>
            <FormLabel htmlFor="date">Date</FormLabel>
            <Input id="date" type="date" value={newTransaction.date} onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="type">Type</FormLabel>
            <Select id="type" value={newTransaction.type} onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="category">Category</FormLabel>
            <Select id="category" value={newTransaction.category} onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}>
              <option value="Salary">Salary</option>
              <option value="Groceries">Groceries</option>
              <option value="Bills">Bills</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="amount">Amount</FormLabel>
            <NumberInput value={newTransaction.amount} onChange={(value) => setNewTransaction({ ...newTransaction, amount: Number(value) })}>
              <NumberInputField id="amount" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <Flex justify="space-between" w="100%">
            {isEditing ? (
              <>
                <Button leftIcon={<FaSave />} colorScheme="blue" onClick={handleSaveEdit}>
                  Save
                </Button>
                <Button leftIcon={<FaTimes />} colorScheme="red" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button leftIcon={<FaPlus />} colorScheme="green" onClick={handleAddTransaction}>
                Add Transaction
              </Button>
            )}
          </Flex>
        </VStack>
      </Box>
      <Box w="100%" p={4} borderWidth="1px" borderRadius="md">
        <VStack spacing={3}>
          {transactions.map((transaction) => (
            <Flex key={transaction.id} justify="space-between" align="center" w="100%" p={2} borderWidth="1px" borderRadius="md">
              <Text>{transaction.date}</Text>
              <Text fontWeight="bold">
                {transaction.type === "income" ? "+" : "-"}${transaction.amount}
              </Text>
              <Text>{transaction.category}</Text>
              <IconButton aria-label="Edit transaction" icon={<FaEdit />} size="sm" colorScheme="yellow" onClick={() => handleEditTransaction(transaction.id)} />
              <IconButton aria-label="Delete transaction" icon={<FaTrash />} size="sm" colorScheme="red" onClick={() => handleDeleteTransaction(transaction.id)} />
            </Flex>
          ))}
        </VStack>
      </Box>
      <HStack w="100%" justify="space-between">
        <Text fontSize="xl" fontWeight="bold">
          Total Balance
        </Text>
        <Text fontSize="xl" fontWeight="bold" color={totalBalance >= 0 ? "green.500" : "red.500"}>
          ${totalBalance.toFixed(2)}
        </Text>
      </HStack>
    </VStack>
  );
};

export default Index;
