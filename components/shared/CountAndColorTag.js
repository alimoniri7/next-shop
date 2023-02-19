import { Button, Dialog, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const CountAndColorTag = ({ count, color, countAndColors, name, setValues }) => {
  const [open, setOpen] = useState(false);
  const [newCount, setNewCount] = useState(count);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = ()=>{
    setOpen(true)
  }

  const updateItem = ()=>{
    if(Number(count)!==Number(newCount)){
        countAndColors.map((item, index)=>{
            if(item.color===color){
                countAndColors.splice(index,1)
            }
        })
        countAndColors.push({color: color, count: newCount})
        setValues(name, countAndColors)
        // console.log(countAndColors);
        
        // setValues(name, newArr)
    }
    handleClose()
  }

  const deleteItem = ()=>{
    countAndColors.map((item, index)=>{
        if(item.color===color){
            countAndColors.splice(index,1)
        }
    })
    setValues(name, countAndColors)
    handleClose()

  }

  const changeHandler = (e) => {
    setNewCount(e.target.value);
  };

  return (
    <Box
      width="50px"
      borderRadius="7px"
      border="2px solid #e5e5e5"
      overflow="hidden"
    >
      <Button onClick={handleOpen} sx={{display: 'flex', flexDirection: 'column', padding: '0', color: 'inherit', width: '100%', minWidth: '0px'}}  >
        <Box width="100%" height="30px" bgcolor={color}></Box>
        <Box
          bgcolor="#bdbdbd"
          padding=".2rem 0"
          width="100%"
          textAlign="center"
          fontWeight={900}
          fontSize=".7rem"
        >
          {count}
        </Box>
      </Button>
      <Dialog open={open} onClose={handleClose} >
        <Box padding='1rem' display='flex' flexDirection='column' alignItems='center' >
        <Box width="80%" height='40px' bgcolor={color} my='1rem' mx='auto' borderRadius='4px'></Box>
        <TextField
          type="number"
          value={newCount}
          onChange={changeHandler}
          placeholder="تعداد"
          size="small"
          width="50px"
        />
        <Button onClick={updateItem} defaultChecked >تایید</Button>
        <Button onClick={deleteItem}>حذف رنگ</Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default CountAndColorTag;
