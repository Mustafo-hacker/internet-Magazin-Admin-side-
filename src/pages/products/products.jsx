"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { del, get, updateProductImage, deleteProductImage } from "../../features/todoSlice"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  Modal,
  IconButton,
} from "@mui/material"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import AddIcon from "@mui/icons-material/Add"
import ImageIcon from "@mui/icons-material/Image"
import CloseIcon from "@mui/icons-material/Close"
import { Link } from "react-router-dom"

const Products = () => {
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [newImage, setNewImage] = useState(null)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    dispatch(get())
  }, [dispatch])

  const data = useSelector((store) => store.todo.data)

  const handleOpenModal = (image, productId) => {
    setSelectedImage(image)
    setSelectedProductId(productId)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setNewImage(null)
    setSelectedProductId(null)
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0])
    }
  }

  const handleSaveImage = async () => {
    if (!newImage || !selectedProductId) return

    setIsLoading(true)
    try {
      await dispatch(updateProductImage({ id: selectedProductId, imageFile: newImage }))
      handleCloseModal()
    } catch (error) {
      console.error("Error updating image:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteImage = async () => {
    if (!selectedProductId) return

    setIsLoading(true)
    try {
      await dispatch(deleteProductImage(selectedProductId))
      handleCloseModal()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box className="p-4 min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <Box className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-start sm:items-center mb-4 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <Typography variant="h5" className="font-semibold text-gray-800 dark:text-white">
          Product Management
        </Typography>
        <Typography variant="body1" className="text-gray-600 dark:text-gray-300">
          Total Products: {data?.length || 0}
        </Typography>
        <Link to="/add">
          <Button variant="contained" color="primary" endIcon={<AddIcon />}>
            Add A Product
          </Button>
        </Link>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} className="overflow-x-auto" sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1f2937" }}>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>Image</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>Price</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>Discount</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>Stock</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((el) => (
              <TableRow key={el.id} sx={{ "&:hover": { backgroundColor: "#f3f4f6" } }}>
                <TableCell>
                  <img
                    src={`https://store-api.softclub.tj/images/${el.image}`}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg shadow-md object-cover"
                    alt=""
                  />
                </TableCell>
                <TableCell className="font-medium text-sm sm:text-base text-gray-700">{el.productName}</TableCell>
                <TableCell className="text-gray-800 text-sm sm:text-base">${el.price}</TableCell>
                <TableCell className="text-gray-800 text-sm sm:text-base">${el.discountPrice}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-white text-xs sm:text-sm ${
                      el.quantity > 0 ? "bg-green-500" : "bg-gray-500"
                    }`}
                  >
                    {el.quantity > 0 ? `${el.quantity} in stock` : "Out of stock"}
                  </span>
                </TableCell>
                <TableCell>
                  <Box className="flex items-center gap-1 sm:gap-2">
                    <Link to={`/edit/${el.id}`}>
                      <EditOutlinedIcon fontSize="small" sx={{ color: "#3b82f6", cursor: "pointer" }} />
                    </Link>
                    <DeleteOutlineOutlinedIcon
                      onClick={() => el.id && dispatch(del(el.id))}
                      fontSize="small"
                      sx={{ color: "red", cursor: "pointer" }}
                    />
                    <ImageIcon
                      onClick={() => handleOpenModal(el.image, el.id)}
                      fontSize="small"
                      sx={{ color: "blue", cursor: "pointer" }}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 w-full max-w-[450px] mx-4 rounded-lg shadow-xl">
          {/* Modal Header */}
          <Box className="flex justify-between items-center p-4 border-b bg-gray-50 dark:bg-gray-700">
            <Typography variant="h6" className="font-medium text-gray-800 dark:text-white">
              Edit Product Image
            </Typography>
            <IconButton onClick={handleCloseModal} className="hover:bg-gray-200 transition-colors" size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Image Preview + Upload */}
          <Box className="p-4">
            {selectedImage && (
              <Box className="relative mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex justify-center items-center h-[220px]">
                <img
                  src={`https://store-api.softclub.tj/images/${selectedImage}`}
                  className="max-w-full max-h-full object-contain"
                  alt="Product"
                />
              </Box>
            )}

            <Box className="mb-4">
              <Typography variant="subtitle2" className="mb-2 text-gray-700 dark:text-gray-200">
                Upload new image:
              </Typography>
              <Box className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                <input type="file" id="image-upload" className="hidden" onChange={handleFileChange} accept="image/*" />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Box className="flex flex-col items-center">
                    <AddIcon className="text-gray-500 mb-2" />
                    <Typography variant="body2" className="text-gray-600 dark:text-gray-300">
                      Click to browse or drag and drop
                    </Typography>
                  </Box>
                </label>
              </Box>
              {newImage && (
                <Typography variant="body2" className="mt-2 text-green-600">
                  Selected file: {newImage.name}
                </Typography>
              )}
            </Box>
          </Box>

          {/* Modal Footer */}
          <Box className="flex justify-end gap-2 p-4 border-t bg-gray-50 dark:bg-gray-700">
            <Button variant="outlined" onClick={handleCloseModal} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteImage}
              disabled={isLoading}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSaveImage}
              disabled={isLoading || !newImage}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default Products
