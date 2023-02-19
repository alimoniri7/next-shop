import { Button, Dialog, DialogTitle, Input, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { SketchPicker } from "react-color";
import CountAndColorTag from "./CountAndColorTag";

const CountAndColorPicker = ({ onClose, setValues, open, setOpen, name }) => {
  const [color, setColor] = useState("");
  const [count, setCount] = useState(0);

  const [opentPicker, setOpenPicker] = useState(false);

  const [countAndColors, setCountAndColor] = useState([]);

  // handle open the popup
  const handleOpenPicker = () => {
    setOpenPicker(true);
  };

  // handle close the popup and add picked colors to main values in formik states
  const handleClose = () => {
    setOpen(false);
    setValues(name, countAndColors);
    // onClose(selectedValue);
  };

  // add picked color to countAndColor state in this component
  const addColor = () => {
    countAndColors.push({ color, count });
    setColor("");
    setCount(0);
    setOpenPicker(false);
    // console.log(countAndColors);
  };
  // console.log(countAndColors);

  return (
    <Dialog onClose={handleClose} open={open} sx={{}}>
      {/* picker popup */}
      {opentPicker && (
        <Box padding='1rem' >
          {" "}
          <Box display='flex' justifyContent='center' >
            <SketchPicker
              color={color}
              onChangeComplete={(e) => setColor(e.hex)}
            />
          </Box>
          <Box width="100%" height="50px" bgcolor={color} mt={2} mb={1}></Box>
          <TextField
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            hiddenLabel
            variant="filled"
            placeholder="تعداد"
            sx={{ width: "100px", mb: "1rem", mx: "auto" }}
            size="small"
          />
          <Button onClick={addColor} defaultChecked>افزودن</Button>
          <Button onClick={handleClose}>بیخیال</Button>
        </Box>
      )}

      {/* show already picked colors in popup */}
      {!opentPicker && (
        <Box padding="1rem">
          <Box display="flex" flexWrap="wrap" gap={1}>
            {countAndColors.length !== 0 &&
              countAndColors.map((item) => (
                <CountAndColorTag
                  key={item.color}
                  color={item.color}
                  count={item.count}
                  name={name}
                  setValues={setValues}
                  countAndColors={countAndColors}
                />
              ))}
          </Box>
          <Button onClick={handleOpenPicker} defaultChecked>افزودن رنگ جدید</Button>
          <Button onClick={handleClose}>تایید</Button>
        </Box>
      )}
    </Dialog>
  );
};

export default CountAndColorPicker;
