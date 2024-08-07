import { Box, Typography, Button, Grid } from "@mui/material";

export default function WelcomePage({ onGetStarted }) {
  return (
    <Box 
      width="100vw" 
      height="100vh" 
      display="flex" 
      justifyContent="center" 
      alignItems="center"
      bgcolor="#f7d8c5"  // Background color of the welcome page
      padding="0 20px"
    >
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        {/* Left side with text */}
        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <Box 
            textAlign="center"  // Center all text inside the box
            sx={{
              border: '0px solid #bbb',  // Border size (0px as no visible border is needed)
              borderRadius: '30px',  // Rounded corners
              boxShadow: '5px 5px 15px rgba(0,0,0,0.3)',  // 3D shadow effect
              padding: '50px',  // Padding inside the box
              backgroundColor: '#f7d8c5',  // Slightly darker shade than the page background
              display: 'flex',  // Flexbox to center content
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              ml:25,
            }}
          >
            <Typography 
              variant="h1" 
              component="h1" 
              gutterBottom 
              fontWeight="bold"
              sx={{ fontSize: '4rem', mb: 3 }}
            >
              FoodPal
            </Typography>
            <Typography 
              variant="h5"
              gutterBottom
              sx={{ fontSize:'1.2rem', mb: 6 }}
            >
              Your kitchen, organized and optimized.
            </Typography>
            <Button 
              variant="contained" 
              onClick={onGetStarted}
              sx={{ 
                padding: '10px 20px', 
                fontSize: '1.5rem', 
                borderRadius: '8px',
                boxShadow: '3px 3px 10px rgba(0,0,0,0.2)',  // Button shadow for 3D effect
                backgroundColor: '#8B4513',  // Warm brown color
                color: '#fff',  // White text for contrast
                '&:hover': {
                  backgroundColor: '#6B3A10',  // Darker brown on hover
                },
              }}
            >
              Start
            </Button>
          </Box>
        </Grid>

        {/* Right side with an image */}
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="center">
            <img 
              src="/images/pantrylanding.png"  // Replace with your image path
              alt="App Screenshot"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
