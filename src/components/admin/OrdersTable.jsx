import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Tooltip,
  Box // Add this import
} from "@mui/material";
import {
  Visibility,
  Edit,
  Delete,
  MoreVert,
  CheckCircle,
  Kitchen,
  Cancel
} from "@mui/icons-material";

// Sample order data - replace with your actual data source
const sampleOrders = [
  {
    id: '#ORD-001',
    customer: 'John Doe',
    items: [
      { name: 'Burger', quantity: 2 },
      { name: 'Fries', quantity: 1 }
    ],
    total: 24.99,
    status: 'Completed',
    date: '2023-05-15 14:30'
  },
  {
    id: '#ORD-002',
    customer: 'Jane Smith',
    items: [
      { name: 'Pizza', quantity: 1 },
      { name: 'Salad', quantity: 1 },
      { name: 'Soda', quantity: 2 }
    ],
    total: 32.50,
    status: 'Preparing',
    date: '2023-05-15 15:45'
  },
  {
    id: '#ORD-003',
    customer: 'Mike Johnson',
    items: [
      { name: 'Pasta', quantity: 1 },
      { name: 'Garlic Bread', quantity: 2 }
    ],
    total: 18.75,
    status: 'Pending',
    date: '2023-05-15 16:20'
  }
];

const statusColors = {
  Completed: 'success',
  Preparing: 'warning',
  Pending: 'info',
  Cancelled: 'error'
};

const statusIcons = {
  Completed: <CheckCircle fontSize="small" />,
  Preparing: <Kitchen fontSize="small" />,
  Pending: <CheckCircle fontSize="small" />,
  Cancelled: <Cancel fontSize="small" />
};

const OrdersTable = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  const handleMenuOpen = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const handleViewDetails = (order) => {
    handleMenuClose();
    console.log("View details for order:", order.id);
    // Implement view details logic here
  };

  const handleEditStatus = (order) => {
    handleMenuClose();
    console.log("Edit status for order:", order.id);
    // Implement status edit logic here
  };

  const handleDeleteOrder = (order) => {
    handleMenuClose();
    console.log("Delete order:", order.id);
    // Implement delete logic here
  };

  const handleStatusChange = (order, newStatus) => {
    console.log(`Change order ${order.id} status to ${newStatus}`);
    // Implement status change logic here
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              {!isSmallScreen && <TableCell>Items</TableCell>}
              <TableCell align="right">Total</TableCell>
              <TableCell>Status</TableCell>
              {!isSmallScreen && <TableCell>Date</TableCell>}
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleOrders.map((order) => (
              <TableRow
                key={order.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {order.id}
                </TableCell>
                <TableCell>{order.customer}</TableCell>
                {!isSmallScreen && (
                  <TableCell>
                    {order.items.map((item, i) => (
                      <div key={i}>
                        {item.quantity}x {item.name}
                      </div>
                    ))}
                  </TableCell>
                )}
                <TableCell align="right">${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip 
                    label={order.status} 
                    color={statusColors[order.status] || 'default'} 
                    size="small"
                    icon={statusIcons[order.status]}
                  />
                </TableCell>
                {!isSmallScreen && <TableCell>{order.date}</TableCell>}
                <TableCell align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {isSmallScreen ? (
                      <>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, order)}
                        >
                          <MoreVert />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => handleViewDetails(order)}
                            color="primary"
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Status">
                          <IconButton
                            size="small"
                            onClick={() => handleEditStatus(order)}
                            color="secondary"
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Order">
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteOrder(order)}
                            color="error"
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Mobile menu for actions */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleViewDetails(selectedOrder)}>
          <Visibility fontSize="small" sx={{ mr: 1 }} /> View Details
        </MenuItem>
        <MenuItem onClick={() => handleEditStatus(selectedOrder)}>
          <Edit fontSize="small" sx={{ mr: 1 }} /> Edit Status
        </MenuItem>
        <MenuItem onClick={() => handleDeleteOrder(selectedOrder)}>
          <Delete fontSize="small" sx={{ mr: 1 }} /> Delete
        </MenuItem>
        <MenuItem divider />
        <MenuItem onClick={() => handleStatusChange(selectedOrder, 'Pending')}>
          <Chip label="Pending" size="small" color="info" sx={{ mr: 1 }} />
          Mark as Pending
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(selectedOrder, 'Preparing')}>
          <Chip label="Preparing" size="small" color="warning" sx={{ mr: 1 }} />
          Mark as Preparing
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(selectedOrder, 'Completed')}>
          <Chip label="Completed" size="small" color="success" sx={{ mr: 1 }} />
          Mark as Completed
        </MenuItem>
      </Menu>
    </>
  );
};

export default OrdersTable;