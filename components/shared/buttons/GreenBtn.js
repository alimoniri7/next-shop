import React from "react";
import { Button } from "@mui/material";

const GreenBtn = ({
  children,
  type,
  onClick,
  disabled = false,
  variant = "contained",
  sx,
  ...otherProps
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      sx={{
        ...sx,
        bgcolor: `${
          disabled
            ? "whiteGreen.main"
            : `${variant === "outlined" ? "#fff" : "green.main"}`
        }`,
        border: `${variant === "outlined" ? "1px solid" : "none"}`,
        borderColor: `${variant === "outlined" ? "green.main" : "none"}`,
        color: `${variant === "outlined" ? "green.main" : "#fff"}`,
        "&:hover": { bgcolor: `${variant==='outlined' ? 'whiteGreen.main' : "forestGreen.main"}`, borderColor: 'green.main' },
      }}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default GreenBtn;


// import { Button } from "@mui/material";
// import React from "react";

// const GreenBtn = ({
//   children,
//   type,
//   onClick,
//   disabled = false,
//   ...otherProps
// }) => {
//   return (
//     <Button
//       type={type}
//       onClick={onClick}
//       disabled={disabled}
//       sx={{
//         bgcolor: `${disabled ? "mint.main" : "green.main"}`,

//         color: "#fff",
//         "&:hover": { bgcolor: "forestGreen.main" },
//       }}
//       {...otherProps}
//     >
//       {children}
//     </Button>
//   );
// };

// export default GreenBtn;
