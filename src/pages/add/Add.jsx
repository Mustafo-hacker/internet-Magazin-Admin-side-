import React, { useEffect, useState } from "react";
import { TextField, Button, Checkbox, FormControlLabel, Select, MenuItem, Switch, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addColor, getColor, setColorInput, setMultipleOptions, setOpen } from "../../features/colorSlice";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { addUser, setProductName } from "../../features/todoSlice";
import { getCategory } from "../../features/getCategory";
import { getBrand } from "../../features/brandSlice";
import { Link, useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddProduct = () => {
  const open = useSelector((store) => store.color.open);
  const colorInput = useSelector((store) => store.color.colorInput);
  const productName = useSelector((store) => store.todo.productName);
  const multipleOptions = useSelector((store) => store.color.multipleOptions);
  const data = useSelector((store) => store.color.data);
  let brandMap = useSelector((store) => store.brand.brands)
  let getCateg = useSelector((store) => store.category.getCateg)
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [brandId, setBrandId] = useState('');
  const [colorId, setColorId] = useState('');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState('');
  const [size, setSize] = useState('');
  const [code, setCode] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [hasDiscount, setHasDiscount] = useState("true");



  useEffect(() => {
    dispatch(getColor());
    dispatch(getCategory());
    dispatch(getBrand())
  }, [dispatch]);

  const handleClickOpen = () => {
    dispatch(setOpen(true));
  };

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  const AddColor = () => {
    if (colorInput) {
      dispatch(addColor({ colorName: colorInput }));
      dispatch(setColorInput(''));
      handleClose();
    }
  };


  let navigate = useNavigate()

  async function add() {
    if (!productName || !description || !brandId || !colorId || !price || !quantity || !subCategoryId || images.length === 0) {
      console.error("Please fill all required fields");
      return;
    }
    console.log((code))
    let form = new FormData();
    form.append("ProductName", productName);
    form.append("Description", description);
    form.append("BrandId", brandId);
    form.append("ColorId", +colorId);
    form.append("Price", +price);
    form.append("DiscountPrice", +discountPrice);
    form.append("Quantity", +quantity);
    form.append("SubCategoryId", +subCategoryId);
    form.append("Weight", weight);
    form.append("Size", size);
    form.append("Code", code);
    form.append("HasDiscount", true);
    form.append("Images", images[0]);

    console.log(productName)
    console.log(description)
    console.log(brandId)
    console.log(colorId)
    console.log(price)
    console.log(discountPrice)
    console.log(quantity)
    console.log(subCategoryId)
    console.log(weight)
    console.log(size)
    console.log(code)
    console.log(hasDiscount)
    console.log(images)

    console.log(images[0])

    // images && images.forEach((image) => {
    //   console.log(image)
    //   form.append("Images", image); 
    // });
    images.forEach((image) => {
      form.append("Images", image);
    });

    console.log("FormData:", Object.fromEntries(form.entries()));

    try {
      await dispatch(addUser(form));
      dispatch(setProductName(''));
      setDescription('');
      setCategory('');
      setBrandId('');
      setColorId('');
      setPrice('');
      setDiscountPrice('');
      setQuantity('');
      setWeight('');
      setSize('');
      setCode('');
      setSubCategoryId('');
      setHasDiscount("true");
      navigate("/products")
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Products / Add new</h2>

      <div className="mb-4">
        <TextField
          value={productName}
          onChange={(el) => dispatch(setProductName(el.target.value))}
          fullWidth
          label="Product name"
          variant="outlined"
          className="mb-2"
        />
        <TextField
          sx={{ marginTop: "15px" }}
          fullWidth
          label="Description"
          multiline
          rows={3}
          variant="outlined"
          className="mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="mb-4 grid grid-cols-3 gap-4">
          <Select sx={{ marginTop: "10px", width: "410px" }} fullWidth value={category} onChange={(e) => setCategory(e.target.value)} displayEmpty variant="outlined">
            <MenuItem value="" disabled>
              Categories
            </MenuItem>
            {getCateg?.map((category) => (
              <MenuItem key={category.id} value={category.categoryName}>
                {category.categoryName}
              </MenuItem>
            ))}
          </Select>

          <Select sx={{ marginTop: "10px", width: "410px", marginLeft: "150px" }} fullWidth value={brandId}
            onChange={(e) => setBrandId(e.target.value)} displayEmpty variant="outlined">
            <MenuItem value="" disabled>
              Brands
            </MenuItem>
            {brandMap?.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.brandName}
              </MenuItem>
            ))}
          </Select>

        </div>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-4">
        <TextField
          fullWidth
          label="Price"
          variant="outlined"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          fullWidth
          label="Discount Price"
          variant="outlined"
          value={discountPrice}
          onChange={(e) => setDiscountPrice(e.target.value)}
        />
        <TextField
          fullWidth
          label="Quantity"
          variant="outlined"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      <div className="mb-4 grid grid-cols-3 gap-4">
        <TextField
          fullWidth
          label="Weight"
          variant="outlined"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <TextField
          fullWidth
          label="Size"
          variant="outlined"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <TextField
          fullWidth
          label="Code"
          variant="outlined"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <div className="mb-4 grid grid-cols-3 gap-4">
        <Select
          displayEmpty
          variant="outlined"
          value={hasDiscount}
          onChange={(e) => setHasDiscount(e.target.value)}
        >
          <MenuItem value="true">True</MenuItem>
          <MenuItem value="false">False</MenuItem>
        </Select>
        <TextField
          fullWidth
          label="SubCategoryId"
          variant="outlined"
          value={subCategoryId}
          onChange={(e) => setSubCategoryId(e.target.value)}
        />
      </div>

      <FormControlLabel control={<Checkbox />} label="Add tax for this product" className="mb-4" />

      <div className="mb-4">
        <FormControlLabel
          control={<Switch checked={multipleOptions} onChange={() => dispatch(setMultipleOptions(!multipleOptions))} />}
          label="This product has multiple options"
        />
        {multipleOptions && (
          <div className="mt-2">
            <TextField fullWidth label="Option 1" variant="outlined" className="mb-2" />
            <TextField fullWidth label="Value" variant="outlined" className="mb-2" />
          </div>
        )}
      </div>

      <div className="mb-4 flex gap-4">
        <div>
          <p className="mb-2">Colour:</p>
          <div className="flex gap-2">
            {data?.map((el) => (
              <button
                key={el.id}
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: el.colorName }}
                onClick={() => setColorId(el.id)}
              ></button>
            ))}
          </div>
          {colorId && (
            <div className="mt-2">
              <p>Selected color:</p>
              <div
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: data.find(el => el.id === colorId)?.colorName }}
              ></div>
            </div>
          )}
        </div>
        <Button sx={{ marginTop: "30px" }} variant="outlined" onClick={handleClickOpen}>
          Add a color
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Add a new Color"}</DialogTitle>
          <DialogContent>
            <Box
              component="form"
              sx={{ '& > :not(style)': { m: 1, width: '35ch' } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Type a color"
                color="info"
                focused
                value={colorInput}
                onChange={(e) => dispatch(setColorInput(e.target.value))}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={AddColor}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div className="mb-4">
        <p className="mb-2">Images</p>
        <div className="border border-gray-300 p-4 rounded-lg text-center">
          <input
            type="file"
            multiple
            onChange={(e) => setImages([...images, ...Array.from(e.target.files)])}
            className="mt-2"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Link to="/products">
          <Button variant="outlined">Cancel</Button>
        </Link>
        <Button variant="contained" color="primary" onClick={add}>Save</Button>
      </div>
    </div >
  );
};

export default AddProduct;