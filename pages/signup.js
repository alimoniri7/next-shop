import DarkBlueBtn from "@/components/shared/buttons/darkBlueBtn";
import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import React, { useState } from "react";

const Signup = () => {
  const [firstName, setFirstName] = useState({ value: "", valid: false });
  const [lastName, setLastName] = useState({ value: "", valid: false });
  const [shopName, setShopName] = useState({ value: "", valid: false });
  const [email, setEmail] = useState({ value: "", valid: false });
  const [password, setPassword] = useState({ value: "", valid: false });
  const [verifyPass, setVerifyPass] = useState({ value: "", valid: false });

  const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const checkVerifyPass = () => {
    if (password.value === verifyPass.value) {
      setVerifyPass((prev) => {
        return { ...prev, valid: true };
      });
    } else {
      setVerifyPass((prev) => {
        return { ...prev, valid: false };
      });
    }
  };

  const validatePass = () => {
    if (passRegex.test(password.value)) {
      setPassword((prev) => {
        return { ...prev, valid: true };
      });
    } else {
      setPassword((prev) => {
        return { ...prev, valid: false };
      });
    }
  };
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

  const validateFirstname = () => {
    if (firstName) {
      setFirstName((prev) => {
        return { ...prev, valid: true };
      });
    } else {
      setFirstName((prev) => {
        return { ...prev, valid: false };
      });
    }
  };

  const validateLastName = () => {
    if (lastName) {
      setLastName((prev) => {
        return { ...prev, valid: true };
      });
    } else {
      setLastName((prev) => {
        return { ...prev, valid: false };
      });
    }
  };

  const validateShopName = () => {
    if (shopName) {
      setShopName((prev) => {
        return { ...prev, valid: true };
      });
    } else {
      setShopName((prev) => {
        return { ...prev, valid: false };
      });
    }
  };

   const signupHandler = ()=>{
    if(firstName.valid && lastName.valid && shopName.valid && password.valid && email.valid){
        fetch('api/auth/signup-seller', {
            method: 'POST',
            body: JSON.stringify({firstName: firstName.value, lastName: lastName.value, email: email.value, password:password.value, shopName:shopName.value}),
            headers: {"Content-Type": "application/json"}
        }).then((res=> res.json())).then(data=> console.log(data))
    }
   }

  return (
    <Box>
      <Box>
        <Box>
          <Box>
            <Typography>نام:</Typography>
            <TextField
              onKeyUp={validateFirstname}
              onBlur={validateFirstname}
              type="text"
              variant="filled"
              hiddenLabel
              size="small"
              placeholder="نام"
              value={firstName.value}
              onChange={(e) =>
                setFirstName((prev) => {
                  return { ...prev, value: e.target.value };
                })
              }
            error={firstName.valid ? false : true}

            />
          </Box>
          <Box>
            <Typography>نام خانوادگی:</Typography>
            <TextField
              onKeyUp={validateLastName}
              onBlur={validateLastName}
              type="text"
              variant="filled"
              hiddenLabel
              size="small"
              placeholder="نام خانوادگی"
              value={lastName.value}
              onChange={(e) =>
                setLastName((prev) => {
                  return { ...prev, value: e.target.value };
                })
              }
            error={lastName.valid ? false : true}

            />
          </Box>
        </Box>

        <Box>
          <Typography>نام مغازه:</Typography>
          <TextField
            onKeyUp={validateShopName}
            onBlur={validateShopName}
            type="text"
            variant="filled"
            hiddenLabel
            size="small"
            placeholder="نام مغازه"
            value={shopName.value}
            onChange={(e) =>
              setShopName((prev) => {
                return { ...prev, value: e.target.value };
              })
            }
            error={shopName.valid ? false : true}
          />
        </Box>
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
            onKeyUp={validatePass}
            onBlur={validatePass}
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
        <Box>
          <Typography>تکرار رمز عبور:</Typography>
          <TextField
            onKeyUp={checkVerifyPass}
            onBlur={checkVerifyPass}
            type="text"
            variant="filled"
            hiddenLabel
            size="small"
            placeholder="رمز عبور خود را مجددا وارد نمایید"
            value={verifyPass.value}
            onChange={(e) =>
              setVerifyPass((prev) => {
                return { ...prev, value: e.target.value };
              })
            }
            error={verifyPass.valid ? false : true}
          />
        </Box>
        <DarkBlueBtn onClick={signupHandler}>ثبت نام</DarkBlueBtn>
      </Box>
      <Box>
        <Link href='/signin'>
            ثبت نام کرده اید؟ ورود
        </Link>
      </Box>
    </Box>
  );
};

export default Signup;
