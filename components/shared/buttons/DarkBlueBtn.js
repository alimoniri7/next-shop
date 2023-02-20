import React from "react";
import { Button } from "@mui/material";

const DarkBlueBtn = ({
  children,
  type,
  onClick,
  disabled = false,
  variant = "contained",
  ...otherProps
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      sx={{
        bgcolor: `${
          disabled
            ? "babyBlue.main"
            : `${variant === "outlined" ? "#fff" : "charcoal.main"}`
        }`,
        border: `${variant === "outlined" ? "1px solid" : "none"}`,
        borderColor: `${variant === "outlined" ? "charcoal.main" : "none"}`,
        color: `${variant === "outlined" ? "charcoal.main" : "#fff"}`,
        "&:hover": { bgcolor: `${variant==='outlined' ? 'whiteGreen.main' : "navyBlue.main"}`, borderColor: 'charcoal.main' },
      }}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default DarkBlueBtn;
