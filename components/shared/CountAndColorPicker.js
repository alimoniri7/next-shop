import { Button, Dialog, DialogTitle, Input, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { SketchPicker } from "react-color";
import CountAndColorTag from "./CountAndColorTag";
import GreenBtn from "./buttons/GreenBtn";

const CountAndColorPicker = ({ onClose, setValues, open, setOpen, name, countAndColor  }) => {
  const [color, setColor] = useState("");
  const [count, setCount] = useState(0);

  const [opentPicker, setOpenPicker] = useState(false);

  const [newCountAndColor, setCountAndColor] = useState([...countAndColor]);

  // handle open the popup
  const handleOpenPicker = () => {
    setOpenPicker(true);
  };

  const handleClosePicker = ()=> {
    setOpenPicker(false)
  }
  // handle close the popup and add picked colors to main values in formik states
  const handleClose = () => {
    setOpen(false);
    setValues(name, newCountAndColor);
    // onClose(selectedValue);
  };

  // add picked color to countAndColor state in this component
  const addColor = () => {
    newCountAndColor.push({ color, count });
    setColor("");
    setCount(0);
    setOpenPicker(false);
    // console.log(newCountAndColor);
  };
  // console.log(newCountAndColor);

  return (
    <Dialog onClose={handleClose} open={open} sx={{}}>
      {/* picker popup */}
      {opentPicker && (
        <Box padding="1rem">
          {" "}
          <Box display="flex" justifyContent="center">
            <SketchPicker
              color={color}
              onChangeComplete={(e) => setColor(e.hex)}
            />
          </Box>
          <Box
            width="100%"
            height="20px"
            borderRadius={1}
            bgcolor={color}
            mt={2}
            mb={1}
          ></Box>
            <TextField
            fullWidth
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              hiddenLabel
              variant="filled"
              placeholder="تعداد"
              sx={{  mb: "1rem", mx: "auto" }}
              size="small"
            />
          <Box display='flex' gap={2} justifyContent='flex-end'>
            <Button color="error" variant="outlined" sx={{padding: '0 1rem' , fontSize: '.75rem'}} onClick={handleClosePicker}>بیخیال</Button>
            <GreenBtn variant="outlined" onClick={addColor}>افزودن</GreenBtn>
          </Box>
        </Box>
      )}

      {/* show already picked colors in popup */}
      {!opentPicker && (
        <Box padding="1rem" display='flex' flexDirection='column' gap={3}>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {newCountAndColor.length !== 0 &&
              newCountAndColor.map((item) => (
                <CountAndColorTag
                  key={item.color}
                  color={item.color}
                  count={item.count}
                  name={name}
                  setValues={setValues}
                  countAndColors={newCountAndColor}
                />
              ))}
          </Box>
          <Box display="flex" gap={2} justifyContent='space-between'>
            <GreenBtn onClick={handleOpenPicker}>افزودن رنگ جدید</GreenBtn>
            <GreenBtn variant="outlined" onClick={handleClose}>
              تایید
            </GreenBtn>
          </Box>
        </Box>
      )}
    </Dialog>
  );
};

export default CountAndColorPicker;
