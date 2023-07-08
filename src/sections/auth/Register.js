// next
import NextLink from 'next/link';
// @mui
import { Stack, Typography, Link, Box } from '@mui/material';
import PropTypes from 'prop-types'
// layouts
import LoginLayout from '../../layouts/login';
// routes
import { PATH_AUTH } from '../../routes/paths';
//
import AuthWithSocial from './AuthWithSocial';
import AuthRegisterForm from './AuthRegisterForm';
import AuthRegisterFormGuest from './AuthRegisterFormGuest';
import Image from '../../components/image'

// ----------------------------------------------------------------------

Register.propTypes = {
  phoneNumberFromQuery: PropTypes.string
}
export default function Register({ phoneNumberFromQuery }) {
  return (
      <LoginLayout title="Converta seguidores em leads">
        {
          phoneNumberFromQuery &&   <>
          <Box width={40} height={40} mb={4} >
          <Image disabledEffect width='100px' height='100px' alt="rocket" src='/logo/okahub_logo.png' />
        </Box>
        
          </>
        }
    
    <Typography variant="h4">Crie uma conta grátis.</Typography>
        <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>

        {
          !phoneNumberFromQuery && <Image disabledEffect width='100px' height='100px' alt="rocket" src='/assets/benchmark/1.png' />
        }

        
          

            <Typography variant="body2"> Já tem uma conta?</Typography>
          
        </Stack>
        <AuthRegisterForm phoneNumberFromQuery={phoneNumberFromQuery} />
        <Stack direction="row" spacing={0.5}>

<Link component={NextLink} href={PATH_AUTH.login} variant="subtitle2">
  Entrar
</Link>
</Stack>
        {/* {
          phoneNumberFromQuery ? <AuthRegisterForm phoneNumberFromQuery={phoneNumberFromQuery} /> : <AuthRegisterFormGuest />
        } */}
        

        {/* <Typography
          component="div"
          sx={{ color: 'text.secondary', mt: 3, typography: 'caption', textAlign: 'center' }}
        >
          {'By signing up, I agree to '}
          <Link underline="always" color="text.primary">
            Terms of Service
          </Link>
          {' and '}
          <Link underline="always" color="text.primary">
            Privacy Policy
          </Link>
          .
        </Typography> */}

        {/* <AuthWithSocial /> */}
      </LoginLayout>
  );
}
