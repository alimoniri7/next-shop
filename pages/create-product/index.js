import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import SendImage from "@/components/shared/sendImage";

import {
  Autocomplete,
  Box,
  Button,
  Divider,
  IconButton,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import CustomSelectBox from "@/components/shared/customSelectBox/CustomSelectBox";
import BubbleBackground from "@/components/shared/animatedBackgrounds/bubble/BubbleBackground";
import CountAndColorPicker from "@/components/shared/CountAndColorPicker";
import CountAndColorTag from "@/components/shared/CountAndColorTag";
import DarkBlueBtn from "@/components/shared/buttons/darkBlueBtn";
import GreenBtn from "@/components/shared/buttons/GreenBtn";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UploadAvatar from "@/components/shared/UploadImage";

const Signup = () => {
  const [openCountAndColorPicker, setOpenCountAndColorPicker] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([])
  console.log(uploadedImages);
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
      imagesData: []
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

  // handle display countAndColorPicker
  useEffect(() => {
    if (
      formik.values.supplyStatus === "ناموجود" ||
      formik.values.supplyStatus === "به زودی"
    ) {
      formik.setFieldValue("countAndColors", []);
    }
  }, [formik.values.supplyStatus]);

  // set uploaded file data to formik state (imagesData)
  useEffect(()=>{
    if(uploadedImages.length!==0) formik.setFieldValue('imagesData', uploadedImages)
  }, [uploadedImages])


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

            <Box display="flex" alignItems="flex-start" gap={10}>
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
                <Box display="flex" flexDirection="column" gap={2}>
                  <Box display="flex" gap={2} alignItems="center">
                    <Typography
                      variant="label"
                      component="label"
                      whiteSpace="nowrap"
                    >
                      رنگ و تعداد:
                    </Typography>
                    <GreenBtn
                      variant="outlined"
                      onClick={handleOpenCountAndColorPicker}
                      sx={{
                        fontSize: "1.1rem",
                        padding: "0 1rem",
                        minWidth: 0,
                      }}
                    >
                      +
                    </GreenBtn>
                  </Box>
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
                    countAndColor={formik.values.countAndColors}
                  />
                </Box>
              )}
            </Box>



            <UploadAvatar onUploadDone={setUploadedImages} />
            <DarkBlueBtn type="submit">Submit</DarkBlueBtn>




            {
              formik.values.imagesData.length!==0 && formik.values.imagesData.map(image=> <img key={image.url} src={image.url}/>)
            }


          </Box>



        </form>
      </Box>
      <BubbleBackground />
    </Box>
  );
};

export default Signup;
