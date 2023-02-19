import React, { useState } from "react";
import { useFormik } from "formik";
import SendImage from "@/components/shared/sendImage";

import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import CustomSelectBox from "@/components/shared/customSelectBox/CustomSelectBox";
import BubbleBackground from "@/components/shared/animatedBackgrounds/bubble/BubbleBackground";
import CountAndColorPicker from "@/components/shared/CountAndColorPicker";
import CountAndColorTag from "@/components/shared/CountAndColorTag";
import DarkBlueBtn from "@/components/shared/buttons/darkBlueBtn";

const Signup = () => {
  const [openCountAndColorPicker, setOpenCountAndColorPicker] = useState(false);
  const handleOpenCountAndColorPicker = () => {
    setOpenCountAndColorPicker(true);
  };
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
  const supplyStatuses = ["موجود", "ناموجود", "به زودی"];

  // form
  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      supplyStatus: "",
      countAndColors: [],
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

  console.log(formik.values);

  return (
    <Box>
      <Box
        maxWidth="lg"
        marginX="auto"
        backgroundColor="#fff"
        padding="2rem"
        mt="3rem"
        borderRadius={2}
        position="relative"
        zIndex={20}
        boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;"
      >
        <Typography variant="h4" component="h1" mb={1}>
          ثبت محصول جدید
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <form onSubmit={formik.handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" alignItems="center">
              <Typography
                variant="label"
                component="label"
                whiteSpace="nowrap"
                width="150px"
              >
                عنوان محصول:
              </Typography>
              <TextField
                hiddenLabel
                placeholder="عنوان محصول را به طور کامل وارد کنید"
                // fullWidth

                variant="filled"
                value={formik.values.title}
                name="title"
                onChange={formik.handleChange}
                size="small"
                sx={{ flexGrow: 1 }}
              />
            </Box>

            <Box display="flex" alignItems="center" gap={10}>
              <Box display="flex" alignItems="center">
                <Typography
                  variant="label"
                  component="label"
                  whiteSpace="nowrap"
                  width="150px"
                >
                  دسته بندی محصول:
                </Typography>
                <CustomSelectBox
                  width="200px"
                  name="category"
                  onChange={formik.handleChange}
                  options={category}
                />
              </Box>
              <Box display="flex" alignItems="center">
                <Typography
                  variant="label"
                  component="label"
                  whiteSpace="nowrap"
                  width="150px"
                >
                  وضعیت موجودی:
                </Typography>
                <CustomSelectBox
                  name="supplyStatus"
                  onChange={formik.handleChange}
                  options={supplyStatuses}
                  width="120px"
                />
              </Box>
              {formik.values.supplyStatus === "موجود" && (
                <Box>
                  <Typography
                    variant="label"
                    component="label"
                    whiteSpace="nowrap"
                    width="150px"
                  >
                    رنگ و تعداد:
                  </Typography>
                  <Button onClick={handleOpenCountAndColorPicker}>+</Button>
                  <Box maxWidth="200px" display="flex" gap={1} flexWrap="wrap">
                    {formik.values.countAndColors.map((item) => (
                      <CountAndColorTag
                        color={item.color}
                        count={item.count}
                        name="countAndColors"
                        setValues={formik.setFieldValue}
                        countAndColors={formik.values.countAndColors}
                      />
                    ))}
                  </Box>
                  <CountAndColorPicker
                    setValues={formik.setFieldValue}
                    countAndColors={formik.values.countAndColors}
                    setOpen={setOpenCountAndColorPicker}
                    open={openCountAndColorPicker}
                    name="countAndColors"
                  />
                </Box>
              )}
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
            <DarkBlueBtn disabled type="submit" >Submit</DarkBlueBtn>
          </Box>
        </form>
      </Box>
      <BubbleBackground />
    </Box>
  );
};

export default Signup;
