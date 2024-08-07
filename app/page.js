'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Modal, Typography, Stack, TextField, Button, Grid } from "@mui/material";
import { collection, deleteDoc, doc, getDocs, query, getDoc, setDoc } from "firebase/firestore";
import WelcomePage from "./welcome"; // Importing the WelcomePage component

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State to manage the search term

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }

    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity == 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }

    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleGetStarted = () => {
    setIsStarted(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term as the user types
  };

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ); // Filter inventory based on the search term

  return (
    <>
      {!isStarted ? (
        <WelcomePage onGetStarted={handleGetStarted} />
      ) : (
        <Box
          width="100vw"
          height="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          gap={4}
          paddingTop={8}
          sx={{ overflowX: "hidden" }} // Prevent horizontal scrolling
        >
          <Modal open={open} onClose={handleClose}>
            <Box
              position="absolute"
              top="50%"
              left="50%"
              width={400}
              bgcolor="white"
              border="2px solid #000"
              boxShadow={24}
              p={4}
              display="flex"
              flexDirection="column"
              gap={3}
              sx={{
                transform: 'translate(-50%,-50%)',
                maxWidth: "100vw", // Ensure modal doesn't cause overflow
                overflowX: "hidden",
              }}
            >
              <Typography variant="h6">Add Item</Typography>
              <Stack width="100%" direction="row" spacing={2}>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={itemName}
                  onChange={(e) => {
                    setItemName(e.target.value);
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#d2a679',  // Matching the Your Pantry bar color
                    '&:hover': {
                      backgroundColor: '#b58e5b',  // Slightly darker shade on hover
                    },
                  }}
                  onClick={() => {
                    addItem(itemName);
                    setItemName('');
                    handleClose();
                  }}
                >
                  Add
                </Button>
              </Stack>
            </Box>
          </Modal>

          {/* Search Bar, Your Pantry Bar, and Add New Item Button Row */}
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
            width="100%"
            maxWidth="1200px"
            sx={{
              marginBottom: '10px',
              paddingLeft: '10px', // Padding to prevent overflow
              paddingRight: '10px', // Padding to prevent overflow
              mx: 'auto', // Centering the grid with equal space on both sides
            }}
          >
            <Grid item xs={12} sm={4} md={3}>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Search items..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={6} display="flex" justifyContent="center">  {/* Centered "Your Pantry" bar */}
              <Box
                width="70%" // Adjust the width to make the bar shorter
                maxWidth="400px" // Set a max width to prevent it from being too long
                height="80px"
                bgcolor="#eac4ae"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="12px"
                sx={{
                  boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)', 
                  border: '1px solid #d1a98a',
                }}
              >
                <Typography variant="h4" color="#333">
                  Your Pantry
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={3} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#d2a679',  // Matching the Your Pantry bar color
                  '&:hover': {
                    backgroundColor: '#b58e5b',  // Slightly darker shade on hover
                  },
                }}
                onClick={handleOpen}
              >
                Add New Item
              </Button>
            </Grid>
          </Grid>

          <Box width="100%" display="flex" justifyContent="center" sx={{ overflowX: "hidden" }}>
            <Box 
              width="100%" 
              maxWidth="1000px" // Adjust to ensure the grid is centered with equal spacing on both sides
              padding="10px" 
              sx={{ 
                overflowY: "scroll", 
                height: "calc(100vh - 200px)", // Adjust height to make room for scrolling
                scrollbarWidth: "none", // Hide scrollbar in Firefox
                '&::-webkit-scrollbar': { display: "none" } // Hide scrollbar in WebKit browsers
              }}
            >
              <Stack width="100%" height="auto" spacing={2}>
                <Grid 
                  container 
                  spacing={2} 
                  justifyContent="center" // Center the grid content
                  sx={{ overflowX: "hidden" }}
                >
                  {filteredInventory.map(({ name, quantity }) => (
                    <Grid 
                      item 
                      xs={12} 
                      sm={6} 
                      md={4} 
                      key={name}
                    >
                      <Box
                        width="100%"
                        minHeight="120px"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="space-between"
                        bgcolor="#f8e9dc"
                        padding={2}
                        boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
                        borderRadius="8px"
                        sx={{ maxWidth: "100%" }} // Ensure no overflow from individual items
                      >
                        <Typography variant="h5" color="#333" textAlign="center">
                          {name.charAt(0).toUpperCase() + name.slice(1)}
                        </Typography>
                        <Typography variant="body1" color="#333" textAlign="center">
                          Quantity: {quantity}
                        </Typography>
                        <Stack direction="row" spacing={2}>
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: '#d2a679',  
                              '&:hover': {
                                backgroundColor: '#b58e5b',  
                              },
                            }}
                            onClick={() => addItem(name)}
                          >
                            +
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: '#d2a679',  
                              '&:hover': {
                                backgroundColor: '#b58e5b',  
                              },
                            }}
                            onClick={() => removeItem(name)}
                          >
                            -
                          </Button>
                        </Stack>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
