import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Checkbox, Select, MenuItem, TextField } from "@mui/material";
import { Search, Add } from "@mui/icons-material";

const ordersData = [
  { id: "#12512B", date: "May 5, 4:20 PM", customer: "Tom Anderson", paymentStatus: "Paid", orderStatus: "Ready", total: "$49.80" },
  { id: "#12523C", date: "May 5, 4:15 PM", customer: "Jayden Walker", paymentStatus: "Paid", orderStatus: "Ready", total: "$34.36" },
  { id: "#51232A", date: "May 5, 4:15 PM", customer: "Inez Kim", paymentStatus: "Paid", orderStatus: "Ready", total: "$5.11" },
  { id: "#23534D", date: "May 5, 4:12 PM", customer: "Francisco Henry", paymentStatus: "Paid", orderStatus: "Shipped", total: "$26.74" },
  { id: "#51323C", date: "May 5, 4:12 PM", customer: "Violet Phillips", paymentStatus: "Paid", orderStatus: "Shipped", total: "$23.06" },
  { id: "#35622A", date: "May 5, 4:10 PM", customer: "Rosetta Becker", paymentStatus: "Paid", orderStatus: "Shipped", total: "$87.44" },
  { id: "#43232D", date: "May 5, 4:10 PM", customer: "Dean Love", paymentStatus: "Paid", orderStatus: "Ready", total: "$44.55" },
  { id: "#35612D", date: "May 5, 4:08 PM", customer: "Nettie Tyler", paymentStatus: "Paid", orderStatus: "Ready", total: "$39.79" },
  { id: "#23534D", date: "May 5, 4:04 PM", customer: "Miguel Harris", paymentStatus: "Pending", orderStatus: "Ready", total: "$50.54" },
  { id: "#12532C", date: "May 5, 4:04 PM", customer: "Angel Conner", paymentStatus: "Pending", orderStatus: "Ready", total: "$63.47" },
  { id: "#51232A", date: "May 5, 4:03 PM", customer: "Rosalie Singleton", paymentStatus: "Pending", orderStatus: "Received", total: "$91.83" }
];

const Orders = () => {
  const [filter, setFilter] = useState("Newest");

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Orders</h2>
        <Button variant="contained" startIcon={<Add />} className="bg-blue-500">Add order</Button>
      </div>
      <div className="flex mb-4">
        <div className="relative">
          <Search className="absolute left-48 top-4 text-gray-500" />
          <TextField placeholder="Search..." className="border rounded-md" />
        </div>
        <Select sx={{marginLeft: "20px"}} value={filter} onChange={(e) => setFilter(e.target.value)}>
          <MenuItem value="Newest">Newest</MenuItem>
          <MenuItem value="Oldest">Oldest</MenuItem>
        </Select>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Checkbox /></TableCell>
              <TableCell>Order</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Payment status</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersData.map((order) => (
              <TableRow key={order.id}>
                <TableCell><Checkbox /></TableCell>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-md text-white ${order.paymentStatus === "Paid" ? "bg-green-500" : "bg-yellow-500"}`}>
                    {order.paymentStatus}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-md text-white ${order.orderStatus === "Ready" ? "bg-orange-500" : order.orderStatus === "Shipped" ? "bg-gray-500" : "bg-blue-500"}`}>
                    {order.orderStatus}
                  </span>
                </TableCell>
                <TableCell>{order.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Orders;
