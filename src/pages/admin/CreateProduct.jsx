import { Label } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { SelectCustom } from "components/common/SelectCustom";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const CreateProduct = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const [category, setCategory] = useState()
  const { productCategory } = useSelector(state => state.appReducer)
  console.log(productCategory?.data)
  const handleCreateProduct = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Typography variant="h3" color={"#EE3131"} mb={4}>
        Create Product
      </Typography>
      <Box className="">
        <form
          onSubmit={handleSubmit(handleCreateProduct)}
          className="flex flex-col gap-4 w-full"
        >
          <Box className="flex gap-4">
            <TextField
              fullWidth
              label="Title product"
              variant="outlined"
              {...register("title", { required: true, maxLength: 100 })}
            />
          </Box>
          <Box className="flex gap-4">
            <TextField
              fullWidth
              label="Title product"
              variant="outlined"
              {...register("price", { required: true, maxLength: 100 })}
            />
            <TextField
              fullWidth
              className="w-1/3"
              label="Title product"
              variant="outlined"
              {...register("quantity", { required: true, maxLength: 100 })}
            />
          </Box>
          <Box className="flex gap-4">
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select {...register("category")} label="Category" onChange={e => setCategory(e.target.value)} value={category}>
                {productCategory?.data?.map((item) =>
                (<MenuItem value={item.title}>{item.title}</MenuItem>)
                )}
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel>Brand</InputLabel>
              <Select {...register("brand")} label="Brand" >
                {productCategory?.data?.find(el => el.title === category)?.brand.map((item) =>
                (<MenuItem value={item}>{item}</MenuItem>)
                )}
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel>Color</InputLabel>
              <Select {...register("color")} label="Color">
                <MenuItem value="yellow">Yellow</MenuItem>
                <MenuItem value="blue">Blue</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box></Box>
          <Box>
            <Button size="large" variant="contained" type="submit">
              Add product
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default CreateProduct;
