"use client"

import React, { useEffect, useState } from "react"
import { TextField, Button, Checkbox, FormControlLabel, Select, MenuItem, Switch, Box } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { addColor, getColor, setColorInput, setMultipleOptions, setOpen } from "../../features/colorSlice"
import { getProductById, editUser } from "../../features/todoSlice"
import { getCategory } from "../../features/getCategory"
import { getBrand } from "../../features/brandSlice"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Edit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const open = useSelector((store) => store.color.open)
  const colorInput = useSelector((store) => store.color.colorInput)
  const multipleOptions = useSelector((store) => store.color.multipleOptions)
  const data = useSelector((store) => store.color.data)
  const brandMap = useSelector((store) => store.brand.brands)
  const getCateg = useSelector((store) => store.category.getCateg)
  const editableProduct = useSelector((store) => store.todo.editableProduct)

  const [category, setCategory] = useState("")
  const [brandId, setBrandId] = useState("")
  const [colorId, setColorId] = useState("")
  const [hasDiscount, setHasDiscount] = useState("true")
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    discountPrice: "",
    quantity: "",
    weight: "",
    size: "",
    code: "",
    subCategoryId: "",
    hasDiscount: true,
  })

  useEffect(() => {
    dispatch(getColor())
    dispatch(getCategory())
    dispatch(getBrand())
    dispatch(getProductById(id))
  }, [dispatch, id])

  useEffect(() => {
    if (editableProduct) {
      setFormData({
        productName: editableProduct.productName,
        description: editableProduct.description,
        price: editableProduct.price,
        discountPrice: editableProduct.discountPrice,
        quantity: editableProduct.quantity,
        weight: editableProduct.weight,
        size: editableProduct.size,
        code: editableProduct.code,
        subCategoryId: editableProduct.subCategoryId,
        hasDiscount: editableProduct.hasDiscount,
      })

      setCategory(editableProduct.category)
      setBrandId(editableProduct.brandId)
      setColorId(editableProduct.colorId)
      setHasDiscount(editableProduct.hasDiscount ? "true" : "false")
    }
  }, [editableProduct])

  const handleClickOpen = () => {
    dispatch(setOpen(true))
  }

  const handleClose = () => {
    dispatch(setOpen(false))
  }

  const AddColor = () => {
    if (colorInput) {
      dispatch(addColor({ colorName: colorInput }))
      dispatch(setColorInput(""))
      handleClose()
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    try {
      await dispatch(
        editUser({
          id,
          brandId,
          colorId,
          productName: formData.productName,
          description: formData.description,
          quantity: formData.quantity,
          weight: formData.weight,
          size: formData.size,
          code: formData.code,
          price: formData.price,
          hasDiscount: hasDiscount === "true",
          discountPrice: formData.discountPrice,
          subCategoryId: formData.subCategoryId,
        })
      );

      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please check the form and try again.");
    }
  };


  const selectedColor = data?.find((el) => el.id === colorId)

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Products / Edit</h2>

      <div className="mb-4">
        <TextField
          fullWidth
          label="Product name"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          variant="outlined"
          className="mb-2"
        />
        <TextField
          sx={{ marginTop: "15px" }}
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
          variant="outlined"
          className="mb-2"
        />
        <div className="mb-4 grid grid-cols-3 gap-4">
          <Select
            sx={{ marginTop: "10px", width: "410px" }}
            fullWidth
            value={category || ""}
            onChange={(e) => setCategory(e.target.value)}
            displayEmpty
            variant="outlined"
          >
            <MenuItem value="" disabled>
              Categories
            </MenuItem>
            {getCateg?.map((category) => (
              <MenuItem key={category.id} value={category.categoryName}>
                {category.categoryName}
              </MenuItem>
            ))}
          </Select>

          <Select
            sx={{ marginTop: "10px", width: "410px", marginLeft: "150px" }}
            fullWidth
            value={brandId}
            onChange={(e) => setBrandId(e.target.value)}
            displayEmpty
            variant="outlined"
          >
            <MenuItem value="" disabled>
              Brands
            </MenuItem>
            {brandMap?.map((brand) => (
              <MenuItem key={brand.id} value={brand.id}>
                {brand.brandName}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-4">
        <TextField
          fullWidth
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          variant="outlined"
          type="number"
        />
        <TextField
          fullWidth
          label="Discount Price"
          name="discountPrice"
          value={formData.discountPrice}
          onChange={handleChange}
          variant="outlined"
          type="number"
        />
        <TextField
          fullWidth
          label="Quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          variant="outlined"
          type="number"
        />
      </div>

      <div className="mb-4 grid grid-cols-3 gap-4">
        <TextField
          fullWidth
          label="Weight"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Size"
          name="size"
          value={formData.size}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          variant="outlined"
        />
      </div>

      <div className="mb-4 grid grid-cols-3 gap-4">
        <Select displayEmpty variant="outlined" value={hasDiscount} onChange={(e) => setHasDiscount(e.target.value)}>
          <MenuItem value="true">True</MenuItem>
          <MenuItem value="false">False</MenuItem>
        </Select>
        <TextField
          fullWidth
          label="SubCategoryId"
          name="subCategoryId"
          value={formData.subCategoryId}
          onChange={handleChange}
          variant="outlined"
        />
      </div>

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.hasTax}
            onChange={(e) => setFormData((prev) => ({ ...prev, hasTax: e.target.checked }))}
          />
        }
        label="Add tax for this product"
        className="mb-4"
      />

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
                className={`w-8 h-8 rounded-full ${el.id === colorId ? "ring-2 ring-offset-2 ring-blue-500" : ""}`}
                style={{ backgroundColor: el.colorName }}
                onClick={() => setColorId(el.id)}
              ></button>
            ))}
          </div>
          {colorId && selectedColor && (
            <div className="mt-2">
              <p>Selected color: {selectedColor.colorName}</p>
              <div className="w-8 h-8 rounded-full" style={{ backgroundColor: selectedColor.colorName }}></div>
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
            <Box component="form" sx={{ "& > :not(style)": { m: 1, width: "35ch" } }} noValidate autoComplete="off">
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
          <input type="file" multiple className="mt-2" />
          {editableProduct?.images && editableProduct.images.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {editableProduct.images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt=""
                    className="w-20 h-20 object-cover rounded"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outlined" onClick={() => navigate("/products")}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  )
}

export default Edit

