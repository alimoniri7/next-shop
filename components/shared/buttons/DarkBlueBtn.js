import React from "react";
import { Button } from "@mui/material";

const DarkBlueBtn = ({
  children,
  type,
  onClick,
  disabled = false,
  ...otherProps
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      sx={{
        bgcolor: `${disabled ? "babyBlue.main" : "charcoal.main"}`,
        
        color: "#fff",
        "&:hover": { bgcolor: "navyBlue.main", },
      }}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default DarkBlueBtn;
