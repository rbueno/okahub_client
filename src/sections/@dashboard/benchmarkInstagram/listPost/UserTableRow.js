import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import {
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';
// components


// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onAnalyticRow: PropTypes.func,
};

export default function UserTableRow({ row, selected, onSelectRow, onAnalyticRow }) {
  const { score, rank, postUrl, mediaUrl, mediaType } = row;
  console.log('row', row)

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
      <TableRow hover selected={selected}>
            
        <TableCell align="left">
        {rank}
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
           Image
          </Stack>
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
          <Stack>
            <Typography variant="subtitle2" noWrap>
            {score}
            </Typography>
            </Stack>
          </Stack>
        </TableCell>
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button href={postUrl}>Visualizar</Button>
          </Stack>
        </TableCell>

      </TableRow>
   
  );
}
