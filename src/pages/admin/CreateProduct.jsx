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
import { apiCreateProduct } from "apis";
import Loading from "components/Loading/Loading";
import MarkDownEditor from "components/common/MarkDownEditor";
import { SelectCustom } from "components/common/SelectCustom";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "stores/app/appSlice";
import Swal from "sweetalert2";
import icons from "utils/icons";

const CreateProduct = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue, reset
  } = useForm();
  const dispatch = useDispatch()
  const [category, setCategory] = useState();
  const { productCategory } = useSelector((state) => state.appReducer);
  const { isProductEdit } = useSelector(state => state.productReducer)
  console.log(productCategory?.data);
  const [payload, setPayload] = useState({ description: "" });
  const [invalidField, setInvalidField] = useState([]);
  const [selectedThumb, setSelectedThumb] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleThumbSelect = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedThumb(selectedFile);

    // Set value for react-hook-form
    setValue("thumb", selectedFile);
  };

  const handleImageSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setSelectedImages(selectedFiles);

    // Set value for react-hook-form
    setValue("images", selectedFiles);
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);

    // Set value for react-hook-form
    setValue("images", updatedImages);
  };
  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );

  const handleCreateProduct = async (data) => {
      const req = { ...data, ...payload, ...selectedThumb, ...selectedImages };
      const formData = new FormData();
      formData.append('title', req.title);
      formData.append('category', req.category);
      formData.append('price', req.price);
      formData.append('quantity', req.quantity);
      formData.append('brand', req.brand);
      formData.append('color', req.color);
      formData.append('description', req.description);
      formData.append('thumb', req.thumb);
      for (const image of req.images) {
        formData.append('images', image);
      }
      dispatch(showModal({isShowModal: true, modalChildren: <Loading />}))
      const res = await apiCreateProduct(formData);
      dispatch(showModal({isShowModal: false, modalChildren: <Loading />}))
      if(res.status) {
        Swal.fire("Tạo thành công", res.createProduct, 'success')
        setPayload({ description: "" })
        setSelectedImages([])
        setSelectedThumb(null)
        reset()
      } else Swal.fire('Tạo thất bại', res.createProduct, 'error')
  };

  return (
    <div className="">
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
              className="w-3/5"
              label="Title product"
              variant="outlined"
              {...register("title", { required: true, maxLength: 100 })}
            />
            <TextField
              className="w-1/5"
              label="Price"
              type="number"
              variant="outlined"
              {...register("price", { required: true, maxLength: 100 })}
            />
            <TextField
              className="w-1/5"
              label="Quantity"
              type="number"
              variant="outlined"
              {...register("quantity", { required: true, maxLength: 100 })}
            />
          </Box>
          <Box className="flex gap-4">
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                {...register("category")}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                {productCategory?.data?.map((item) => (
                  <MenuItem value={item.title}>{item.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel>Brand</InputLabel>
              <Select {...register("brand")} label="Brand">
                {productCategory?.data
                  ?.find((el) => el.title === category)
                  ?.brand.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
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
          <Box>
            <MarkDownEditor
              name={"description"}
              changeValue={changeValue}
              label={"Description"}
              invalidField={invalidField}
              setInvalidField={setInvalidField}
            />
            {payload.description && (
              <Typography>Require description</Typography>
            )}
          </Box>
          <div className="flex">
            <div className="flex flex-col">
              <label>Chọn thumbnail</label>
              <input
                type="file"
                onChange={handleThumbSelect}
                accept="image/*"
                ref={register("thumb", { required: true })}
              />
              {selectedThumb && (
                <div>
                  <Typography variant="subtitle1">
                    Selected Thumbnail:
                  </Typography>
                  <div>
                    <img
                      src={URL.createObjectURL(selectedThumb)}
                      alt="Thumbnail"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                    <Button
                      color="secondary"
                      onClick={() => setSelectedThumb(null)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <label>Chọn các image sản phẩm</label>
              <input
                type="file"
                onChange={handleImageSelect}
                accept="image/*"
                multiple
                ref={register("images", { required: true })}
              />
              {selectedImages.length > 0 && (
                <div className="flex flex-col ">
                  <Typography variant="subtitle1">Selected Images:</Typography>
                <div className="w-full">
                <ul className="flex gap-2 overflow-scroll w-full items-center">
                    {selectedImages.map((file, index) => (
                      <li key={index}>
                        <div>
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Image ${index + 1}`}
                            className="w-[100px] h-[100px]"
                          />
                          <Button
                            color="secondary"
                            onClick={() => handleImageRemove(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                </div>
              )}
            </div>
          </div>
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
