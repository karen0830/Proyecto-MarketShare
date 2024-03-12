import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import Box from "@mui/material/Box";
import TableHead from "@mui/material/TableHead";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { useDeleteECommerceProductsMutation } from "../ECommerceApi";
/**
 * The table head rows data.
 */
const rows = [
  {
    id: "image",
    align: "left",
    disablePadding: true,
    label: "",
    sort: false,
  },
  {
    id: "name",
    align: "left",
    disablePadding: false,
    label: "Nombre",
    sort: true,
  },
  {
    id: "categories",
    align: "left",
    disablePadding: false,
    label: "Categoría",
    sort: true,
  },
  {
    id: "priceTaxIncl",
    align: "right",
    disablePadding: false,
    label: "Precio",
    sort: true,
  },
  {
    id: "quantity",
    align: "right",
    disablePadding: false,
    label: "Cantidad",
    sort: true,
  },
  {
    id: "active",
    align: "right",
    disablePadding: false,
    label: "Activo",
    sort: true,
  },
];

/**
 * The products table head component.
 */
function ProductsTableHead(props) {
  const {
    selectedProductIds,
    tableOrder,
    onSelectAllClick,
    onRequestSort,
    rowCount,
    onMenuItemClick,
  } = props;
  const [removeProducts] = useDeleteECommerceProductsMutation();
  const numSelected = selectedProductIds.length;
  const [selectedProductsMenu, setSelectedProductsMenu] = useState(null);
  const createSortHandler = (event, property) => {
    onRequestSort(event, property);
  };

  function openSelectedProductsMenu(event) {
    setSelectedProductsMenu(event.currentTarget);
  }

  function closeSelectedProductsMenu() {
    setSelectedProductsMenu(null);
  }

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        <TableCell padding="none" className="w-40 md:w-64 text-center z-99">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount !== 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
          {numSelected > 0 && (
            <Box className="flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1">
              <IconButton
                aria-haspopup="true"
                onClick={openSelectedProductsMenu}
                size="large"
              >
                <FuseSvgIcon>heroicons-outline:dots-horizontal</FuseSvgIcon>
              </IconButton>
              <Menu
                id="selectedProductsMenu"
                anchorEl={selectedProductsMenu}
                open={Boolean(selectedProductsMenu)}
                onClose={closeSelectedProductsMenu}
              >
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      removeProducts(selectedProductIds);
                      onMenuItemClick();
                      closeSelectedProductsMenu();
                    }}
                  >
                    <ListItemIcon className="min-w-40">
                      <FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
                    </ListItemIcon>
                    <ListItemText />
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          )}
        </TableCell>
        {rows.map((row) => {
          return (
            <TableCell
              className="p-4 md:p-16"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? "none" : "normal"}
              sortDirection={
                tableOrder.id === row.id ? tableOrder.direction : false
              }
              style={{ color: "white" }}
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={
                    row.align === "right" ? "bottom-end" : "bottom-start"
                  }
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={tableOrder.id === row.id}
                    direction={tableOrder.direction}
                    onClick={(ev) => createSortHandler(ev, row.id)}
                    className="font-semibold"
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

export default ProductsTableHead;
