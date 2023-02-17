import React, { useState } from "react";
import { useFormik } from "formik";
import SendImage from "@/components/shared/sendImage";

import { Autocomplete, Box, Input, TextField, Typography } from "@mui/material";
import CustomSelectBox from "@/components/shared/customSelectBox/CustomSelectBox";

const Signup = () => {

  const category = [
    "محصولات دیجیتال",
    "خودرو، ابزار و تجهیزات صنعتی یمنبت منتن تمنت منبت ",
    "مد و پوشاک",
    "کالاهای سوپرمارکتی",
    "اسباب بازی، کودک و نوزادان",
    "زیبایی و سلامت",
    "خانه و آشپزخانه",
    "کتاب، لوازم تحریر و هنر",
    "ورزش و سفر",
  ];

  // form
  const formik = useFormik({
    initialValues: {
      productName: "",
      lName: "",
      title: '',
      category: "",
      email: "",
      shopName: "",
      shopAddress: "",
      avatar: "",
    },
    onSubmit: async (values) => {
      const response = await fetch("/api/sellers", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
    },
  });

  console.log(formik.values)

  return (
    <Box
      maxWidth="lg"
      marginX="auto"
      backgroundColor="#fff"
      padding="2rem"
      mt="3rem"
      borderRadius={2}
    >
      <Typography variant="h4" component="h1" textAlign="center" mb={4}>
        ثبت محصول جدید
      </Typography>

      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <Box display="flex" gap={2} alignItems="center">
          <Typography variant="label" component="label" whiteSpace="nowrap">
            عنوان محصول:
          </Typography>
          <Input
            placeholder="عنوان محصول را به طور کامل وارد کنید"
            fullWidth
            variant="filled"
            value={formik.values.title}
            name='title'
            onChange={formik.handleChange}
          />
        </Box>
        <Box display="flex" gap={2} alignItems="center">
          <Typography variant="label" component="label" whiteSpace="nowrap">
            دسته بندی محصول:
          </Typography>
          <CustomSelectBox  name="category" onChange={formik.handleChange} options={category}/>
          {/* <Autocomplete
          dir="ltr"
          fullWidth
            id="size-small-standard"
            size="small"
            options={category}
            renderInput={(params) => (
              <TextField
              dir="rtl"
                {...params}
                variant="standard"
                placeholder="دسته بندی ها"
              />
            )}
          /> */}
        </Box>
        <div>
          <label htmlFor="email">ایمیل</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <div>
          <label htmlFor="email">نام فروشگاه</label>
          <input
            id="shopName"
            name="shopName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.shopName}
          />
        </div>
        <div>
          <label htmlFor="email">آدرس فروشگاه</label>
          <input
            id="shopAddress"
            name="shopAddress"
            type="textaria"
            onChange={formik.handleChange}
            value={formik.values.shopAddress}
          />
        </div>
        <SendImage />
        <button type="submit">Submit</button>
      </form>
    </Box>
  );
};

export default Signup;
