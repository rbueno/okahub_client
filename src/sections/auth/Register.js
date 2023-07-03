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
import Image from '../../components/image'

// ----------------------------------------------------------------------

Register.propTypes = {
  phoneNumberFromQuery: PropTypes.string
}
export default function Register({ phoneNumberFromQuery }) {
  return (
      <LoginLayout title="Converta seguidores em leads">
      <Box width={40} height={40} mb={4} >
        <Image disabledEffect width='100px' height='100px' alt="rocket" src='/logo/okahub_logo.png' />
        {/* <Typography>Okahub</Typography> */}
      </Box>
        <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
          <Typography variant="h4">Crie uma conta grátis.</Typography>

          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2"> Já tem uma conta?</Typography>

            <Link component={NextLink} href={PATH_AUTH.login} variant="subtitle2">
              Entrar
            </Link>
          </Stack>
        </Stack>

        <AuthRegisterForm phoneNumberFromQuery={phoneNumberFromQuery} />

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
