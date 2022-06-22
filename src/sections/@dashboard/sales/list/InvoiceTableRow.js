import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography, Stack, Link, MenuItem } from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import createAvatar from '../../../../utils/createAvatar';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Avatar from '../../../../components/Avatar';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';

// ----------------------------------------------------------------------

InvoiceTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function InvoiceTableRow({ row, onDetailRow, selected, onSelectRow, onViewRow, onEditRow, onDeleteRow }) {
  const theme = useTheme();

  const { name, status, updatedAt, products, orderPrice,  sent, invoiceNumber, createDate, dueDate, invoiceTo, totalPrice } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      {/* <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell> */}

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <Avatar alt={invoiceTo.name} color={createAvatar(invoiceTo.name).color} sx={{ mr: 2 }}>
          {createAvatar(invoiceTo.name).name}
        </Avatar> */}

        <Stack>
          <Typography variant="subtitle2" noWrap>
            {name || 'Não informado'}
          </Typography>

          {/* <Link noWrap variant="body2" onClick={onViewRow} sx={{ color: 'text.disabled', cursor: 'pointer' }}>
            {`INV-${invoiceNumber}`}
          </Link> */}
        </Stack>
      </TableCell>

      <TableCell align="left">
       <Stack>
       <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (status === 'paid' && 'success') ||
            (status === 'unpaid' && 'warning') ||
            (status === 'overdue' && 'error') ||
            'default'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {status}
        </Label>
        <Typography>
          {fDate(updatedAt)}
        </Typography>
        {/* <Link noWrap variant="body2" onClick={onViewRow} sx={{ color: 'text.disabled', cursor: 'pointer' }}>
          {fDate(updatedAt)}
          </Link> */}
       </Stack>
      </TableCell>

      {/* <TableCell align="left">{fDate(updatedAt)}</TableCell> */}

      {/* <TableCell align="left">{fDate(updatedAt)}</TableCell> */}

      {/* <TableCell align="center">{fCurrency(orderPrice)}</TableCell> */}

      <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
        nome do produto
      </TableCell>


      <TableCell sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Label>Nenhuma atividade</Label>
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              {/* <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem> */}

              <MenuItem
                onClick={() => {
                  onDetailRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:eye-fill'} />
                Ver tudo
              </MenuItem>

              {/* <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem> */}
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
