import DarkBlueBtn from "@/components/shared/buttons/darkBlueBtn";
import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import React, { useState } from "react";;

const Signin = () => {
    const [email, setEmail] = useState({ value: "", valid: false });
    const [password, setPassword] = useState({ value: "", valid: true });
  
    const emailRegex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  

  

    const validateEmail = () => {
      if (emailRegex.test(email.value)) {
        setEmail((prev) => {
          return { ...prev, valid: true };
        });
      } else {
        setEmail((prev) => {
          return { ...prev, valid: false };
        });
      }
    };
  

  

  
  
     const signinHandler = ()=>{
      if( email.valid){
          fetch('api/auth/signin-seller', {
              method: 'POST',
              body: JSON.stringify({email: email.value, password:password.value}),
              headers: {"Content-Type": "application/json"}
          }).then((res=> res.json())).then(data=> console.log(data))
      }
     }
  
    return (
      <Box>
        <Box>
          <Box>
            <Typography>ایمیل:</Typography>
            <TextField
              onKeyUp={validateEmail}
              onBlur={validateEmail}
              type="text"
              variant="filled"
              hiddenLabel
              size="small"
              placeholder="ایمیل"
              value={email.value}
              onChange={(e) =>
                setEmail((prev) => {
                  return { ...prev, value: e.target.value };
                })
              }
              error={email.valid ? false : true}
            />
          </Box>
          <Box>
            <Typography>رمز عبور:</Typography>
            <TextField
              type="text"
              variant="filled"
              hiddenLabel
              size="small"
              placeholder="رمز عبور"
              value={password.value}
              onChange={(e) =>
                setPassword((prev) => {
                  return { ...prev, value: e.target.value };
                })
              }
              error={password.valid ? false : true}
            />
          </Box>
          <DarkBlueBtn onClick={signinHandler} >ورود</DarkBlueBtn>
        </Box>
        <Box>
          <Link href='/signup'>
              ثبت نام نکرده اید؟ ثبت نام
          </Link>
        </Box>
      </Box>
    );
};

export default Signin;