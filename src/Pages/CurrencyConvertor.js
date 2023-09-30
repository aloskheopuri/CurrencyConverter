import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function CurrencyConverter() {
  const [have, setHave] = useState('');
  const [want, setWant] = useState('');
  const [amount, setAmount] = useState('');
  const [currencyData, setCurrencyData] = useState(null);


  const apiKey = 'YOUR_API_KEY_HERE'; // Store your API key securely on the server-side

  useEffect(() => {
    if (have && want && amount) {
      fetchdata(have, want, amount);
    }
  }, [have, want, amount]);

  const handleOnChange = (e) => {
    const inputValue = e.target.value;
    const fieldName = e.target.name;
  
    if (fieldName === 'have' || fieldName === 'want') {
      // Allow only letters for 'have' and 'want' fields
      const onlyLetters = /^[A-Za-z]+$/;
      if (onlyLetters.test(inputValue) || inputValue === '') {
        if (fieldName === 'have') setHave(inputValue);
        if (fieldName === 'want') setWant(inputValue);
      }
    } else if (fieldName === 'amount') {
      // Allow only numbers for 'amount' field
      const onlyNumbers = /^\d+$/;
      if (onlyNumbers.test(inputValue) || inputValue === '') {
        setAmount(inputValue);
      }
    }
  };

  const fetchdata = (have, want, amount) => {
    fetch(
      `https://api.api-ninjas.com/v1/convertcurrency?have=${have}&want=${want}&amount=${amount}`,
      {
        method: 'GET',
        headers: { 'X-Api-Key': apiKey },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        setCurrencyData(data);
  
      })
      .catch((error) => {
 
        console.log(error);
      });
  };

  return (
    <div    >
      <img src="./images/money.jpg" 
      style={{width:'100%',height:'720px'}}
      alt="image" />
      <Box

style={{display:'flex',flexDirection:'column',
width:'20%',height:'400px',boxShadow:'2px 2px 2px 4px gray',
position:'absolute',top:'30px',left:'300px'
}}



      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
<TextField

label="Currency" color="secondary" focused
name="have" value={have} onChange={handleOnChange}
/>
<h1>To</h1>
<TextField label="Currency" color="secondary" focused
 name="want" value={want} onChange={handleOnChange}
/>

<TextField label="Amount" color="secondary" focused
 name="amount" value={amount} onChange={handleOnChange}
/>


<Button
onClick={() => fetchdata(have, want, amount)}
variant="contained">Convert Currency</Button>
 
 

{ currencyData ? (
        <div>
         <TextField
  label="Your Result"
  variant="standard"
  value={currencyData.new_amount}
  color="warning"
  focused
  
/>
        </div>
      ) : (
        <div>Enter amount and currency</div>
      )}



    </Box>
    
      
      
  



    </div>
  );
}
