// next
import Head from 'next/head';
// @mui
import { Container, Box, Button, Typography, TextField, InputAdornment, Stack, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock_
import { _userCards } from '../../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import { UserCard } from '../../../../sections/@dashboard/user/cards';

// ----------------------------------------------------------------------

UserCardsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserCardsPage() {
  const { themeStretch } = useSettingsContext();
  const [showPreview, setShowPreview] = useState(false)
  const [updatingComponent, setUpdatingComponent] = useState(false)

  return (
    <>
      <Head>
        <title> Benchmark | Okahub</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Box mb={2}>

        <Typography variant='h3'>Benchmark Instagram</Typography>
        </Box>

        <Box
          m={2}
        >
          <Card sx={{ maxWidth: 345 }}>
            { showPreview ? <>
              <CardHeader
               avatar={
                 <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                   R
                 </Avatar>
               }
              //  action={
              //    <IconButton aria-label="settings">
              //      <MoreVertIcon />
              //    </IconButton>
              //  }
               title="Shrimp and Chorizo Paella"
               subheader="September 14, 2016"
             />

<Box m={2}>

             <Divider />
</Box>

              <Box m={2}>

                  <Box m={2}>
                    <Typography variant='subtitle2'>Adicionar esta conta?</Typography>
                    {/* <Typography variant='caption'>Clique em confirmar para adicionar está conta, ou cancelar para trocar</Typography> */}

                  </Box>

                          
              <Stack
              spacing={2}
              direction="row"
              alignItems="flex-end"
              >
              <LoadingButton fullWidth variant='outlined' color="error" onClick={() => setShowPreview(false)} >Cancelar</LoadingButton>

              <LoadingButton fullWidth variant='contained' loading={updatingComponent}>Adicionar</LoadingButton>

              </Stack>
              </Box>

            </> :  <Box m={2}>
            <Typography variant='h5' mb={2}>Adicionar Instagram</Typography>
              <Box display='flex' flexDirection='column' >
                <TextField
                // fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>@</InputAdornment>
                  }} helperText='Adicione o @perfil do Instagram'
                />
                <Box m={2}>

                <Button fullWidth variant='contained' onClick={() => setShowPreview(true)}>Verificar perfil</Button>
                </Box>

              </Box>
            </Box>
            }
           </Card>
        </Box>
      </Container>
    </>
  );
}
