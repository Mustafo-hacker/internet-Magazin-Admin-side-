import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, deleteCategory, editCategory, getCategory } from "../../features/getCategory.js";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Other = () => {
  let data = useSelector((store) => store.category.getCateg);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  console.log("Category Data:", data);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [addName, setAddName] = useState('');
  const [addFile, setAddFile] = useState(null);
  const [editName, setEditName] = useState('');
  const [editFile, setEditFile] = useState(null);
  const [idx, setIdx] = useState(null);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClickOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  function addCateg() {
    const formdata = new FormData();
    formdata.append("CategoryName", addName);
    if (addFile) {
      formdata.append("CategoryImage", addFile[0]);
    }
    dispatch(addCategory(formdata));
    setAddName('');
    setAddFile(null);
    handleClose();
  }

  function editFunction() {
    const editFormdata = new FormData();
    editFormdata.append("CategoryName", editName);
    editFormdata.append("id", idx);
    if (editFile) {
      editFormdata.append("CategoryImage", editFile[0]);
    }
    dispatch(editCategory(editFormdata));
    console.log(editFormdata);
    handleClose2();
  }

  return (
    <>
      <div>
        <div className="flex justify-end mb-10">
          <Button variant="contained" onClick={handleClickOpen} sx={{ backgroundColor: "#2563EB", '&:hover': { backgroundColor: "#1E40AF" } }}>
            + Add
          </Button>
        </div>

        <div className="flex gap-6 flex-wrap">
          {data?.map((el) => (
            <div key={el.id} className="w-52 h-44 p-5 flex justify-between border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200 dark:bg-gray-800 dark:border-none">
              <div>
                <img className="w-28 h-24 mb-3 rounded-md object-cover" src={"https://store-api.softclub.tj/images/" + el.categoryImage} alt="" />
                <p className="text-gray-700 font-medium dark:text-white">{el.categoryName}</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <BorderColorIcon
                  onClick={() => { setEditName(el.categoryName); setEditFile(el.categoryImage); setIdx(el.id); handleClickOpen2(); }}
                  sx={{ cursor: "pointer", color: "#2563EB", transition: "color 0.2s", '&:hover': { color: "#1E40AF" } }}
                />
                <DeleteIcon
                  onClick={() => dispatch(deleteCategory(el.id))}
                  sx={{ cursor: "pointer", color: "red", transition: "color 0.2s", '&:hover': { color: "#B91C1C" } }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <input className="w-64 h-8 border rounded-md px-3 mb-5 block" type="text" placeholder="Name" value={addName} onChange={(e) => setAddName(e.target.value)} />
            <input className="w-64 h-8 border rounded-md px-3 cursor-pointer" type="file" multiple onChange={(e) => setAddFile(e.target.files)} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addCateg} autoFocus>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open2} onClose={handleClose2}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <input className="w-64 h-8 border rounded-md px-3 mb-5 block" type="text" placeholder="Name" value={editName} onChange={(e) => setEditName(e.target.value)} />
            <input className="w-64 h-8 border rounded-md px-3 cursor-pointer" type="file" multiple onChange={(e) => setEditFile(e.target.files)} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Cancel</Button>
          <Button onClick={editFunction} autoFocus>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Other;
