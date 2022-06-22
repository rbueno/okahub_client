import { useState } from 'react';
// @mui
import { MenuItem, Stack, Typography, Box, Button, Divider } from '@mui/material';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// hooks
import useLocales from '../../../hooks/useLocales';
import useAuth from '../../../hooks/useAuth';
// components
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';

import { PATH_DASHBOARD } from '../../../routes/paths'
import NextLink from 'next/link'

// ----------------------------------------------------------------------

export default function WorkspacePopover() {
  const { workspaces, currentWorkspace, switchWorkspace } = useAuth()
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleChangeLang = (newWorkspace) => {
    console.log('newWorkspace', newWorkspace)
    switchWorkspace(newWorkspace)
    handleClose();
  };

  return (
    <>
      <Box display='flex' flexDirection='column' alignContent='center' alignItems='flex-end'>
        <Typography sx={{ color: 'gray', fontSize: '12px'}} m={0} padding={0}>Área de trabalho: </Typography>
        <Button
              component="a"
              endIcon={(<ChangeCircleIcon fontSize="small" />)}
              // sx={{ mt: 3 }}
              onClick={handleOpen}
              // variant="contained"
              // sx={{ minHeight: 0, minWidth: 0, padding: 0 }}
            >
              {currentWorkspace.businessId.name}
            </Button>
        {/* <Box display='flex' alignItems='center' m={0} padding={0}> */}
          {/* <Typography sx={{ color: 'gray', fontSize: '16px'}}>{currentWorkspace.businessId.name}</Typography>
          <Button color="info" onClick={handleOpen}>
          <Iconify icon="ic:round-view-list" />
          </Button> */}
          
        {/* </Box> */}
      </Box>
      

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 180,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <Stack spacing={0.75}>
          {workspaces.map((option) => (
            <MenuItem
              key={option._id}
              selected={option._id === currentWorkspace._id}
              onClick={() => handleChangeLang(option._id)}
            >
              {/* <Image disabledEffect alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} /> */}

              {option.businessId.name}
            </MenuItem>
          ))}
          <Divider />
          

            <NextLink href={PATH_DASHBOARD.business.new} passHref>
            <MenuItem
              key='add_new_workspace'
              selected={false}
              onClick={() => handleClose()}
            >
              {/* <Image disabledEffect alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} /> */}

              <AddCircleIcon/>
              Criar novo negócio

            </MenuItem>
            </NextLink>
        </Stack>
      </MenuPopover>
    </>
  );
}
