import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { apiCreateProduct } from "apis";
import Loading from "components/Loading/Loading";
import MarkDownEditor from "components/common/MarkDownEditor";
import MultipleSelectChip from "components/common/MultipleSelectChip";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "stores/app/appSlice";
import Swal from "sweetalert2";
import icons from "utils/icons";
import { ramList, colorList, internalList } from "utils/resource";
import { NumericFormat } from "react-number-format";

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

  const handleCreateProduct = async (data) => {
      const req = { ...data, ...selectedThumb, ...selectedImages };
      const formData = new FormData();
      formData.append('title', req.title);
      formData.append('category', req.category);
      formData.append('price', parseInt(req.price));
      formData.append('quantity', req.quantity);
      formData.append('brand', req.brand);
      formData.append('thumb', req.thumb);
      formData.append('payment', req.payment);
      formData.append('delivery', req.delivery);
      formData.append('warranty', req.warranty);
      formData.append('descriptionDetail', req.descriptionDetail);
      for (const image of req.images) {
        formData.append('images', image);
      }
      for(const r of req.ram) {
        formData.append('ram', r);
      }
      for(const i of req.internal) {
        formData.append('internal', i);
      }
      for(const c of req.color) {
        formData.append('color', c);
      }
      for(const d of req.description.split('\n')) {
        formData.append('description', d);
      }

      dispatch(showModal({isShowModal: true, modalChildren: <Loading />}))
      const res = await apiCreateProduct(formData);
      dispatch(showModal({isShowModal: false, modalChildren: <Loading />}))
      if(res.status) {
        Swal.fire("Tạo thành công", res.createProduct, 'success')
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
          <Box className="flex gap-4 items-start">
            <FormControl variant="outlined" fullWidth >
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
            <FormControl variant="outlined" fullWidth >
              <InputLabel>Brand</InputLabel>
              <Select {...register("brand")} label="Brand">
                {productCategory?.data
                  ?.find((el) => el.title === category)
                  ?.brand.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
              </Select>
            </FormControl>
            <MultipleSelectChip register={register} names={ramList} type="ram"/>
            <MultipleSelectChip register={register} names={colorList} type="color"/>
            <MultipleSelectChip register={register} names={internalList} type="internal"/>
          </Box>
          <Box>
              <TextField fullWidth
                id="filled-multiline-flexible"
                label="Description (Nội dung viết cách nhau bởi dấu xuống dòng)"
                multiline
                maxRows={6}
                required
                rows={6}
                variant="filled"
                  {...register("description")}
              />
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
              <div className="overflow-x-scroll w-[60vw]">
              {selectedImages.length > 0 && (
                <div className="flex flex-col ">
                  <Typography variant="subtitle1">Selected Images:</Typography>
                <div className="w-full">
                <ul className="flex gap-2 w-full items-center">
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
          </div>
          <div className="w-full flex flex-col gap-[5%]">
            <div className="w-full flex mb-[2%] gap-[2.5%]">
              <TextField fullWidth
                  id="filled-multiline-flexible"
                  label="Description Detail (Nội dung viết cách nhau bởi dấu xuống dòng)"
                  multiline
                  maxRows={6}
                  required
                  rows={6}
                  variant="filled"
                    {...register("descriptionDetail")}
                />
              <TextField fullWidth
                  id="filled-multiline-flexible"
                  label="Warranty (Nội dung viết cách nhau bởi dấu xuống dòng)"
                  multiline
                  maxRows={6}
                  required
                  rows={6}
                  variant="filled"
                    {...register("warranty")}
                />
            </div>
            <div className="w-full flex gap-[2.5%]"> 
            <TextField fullWidth
                id="filled-multiline-flexible"
                label="Delivery (Nội dung viết cách nhau bởi dấu xuống dòng)"
                multiline
                maxRows={6}
                required
                rows={6}
                variant="filled"
                  {...register("delivery")}
              />
            <TextField fullWidth
                id="filled-multiline-flexible"
                label="Payment (Nội dung viết cách nhau bởi dấu xuống dòng)"
                multiline
                maxRows={6}
                required
                rows={6}
                variant="filled"
                  {...register("payment")}
              />
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
