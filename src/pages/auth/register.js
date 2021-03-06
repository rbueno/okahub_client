import { capitalCase } from 'change-case';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography, Tooltip } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// routes
import { PATH_AUTH } from '../../routes/paths';
// guards
import GuestGuard from '../../guards/GuestGuard';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
// sections
import { RegisterForm } from '../../sections/auth/register';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {
  const { method } = useAuth();

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <GuestGuard>
      <Page title="Register">
        <RootStyle>
          <HeaderStyle>
            <Logo />
            {smUp && (
              <Typography variant="body2" sx={{ mt: { md: -2 } }}>
                J?? possui uma conta? {''}
                <NextLink href={PATH_AUTH.login} passHref>
                  <Link variant="subtitle2">Entrar</Link>
                </NextLink>
              </Typography>
            )}
          </HeaderStyle>

          {mdUp && (
            <SectionStyle>
              {/* <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                Gerencie Manage the job more effectively with Minimal
              </Typography> */}
              <Image
                visibleByDefault
                disabledEffect
                alt="register"
                src="/assets/illustrations/illustration_register.png"
              />
            </SectionStyle>
          )}

          <Container>
            <ContentStyle>
              <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    Iniciar teste gr??tis.
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>14 dias sem compromisso.</Typography>
                </Box>
                {/* <Tooltip title={capitalCase(method)}>
                  <>
                    <Image
                      disabledEffect
                      alt={method}
                      src={`https://minimal-assets-api-dev.vercel.app/assets/icons/auth/ic_${method}.png`}
                      sx={{ width: 32, height: 32 }}
                    />
                  </>
                </Tooltip> */}
              </Box>

              <RegisterForm />

              <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
                Ao criar uma conta, eu concordo os &nbsp;
                <Link underline="always" color="text.primary" href="#">
                  Termos de Servi??o
                </Link>
                {' '}e{' '}
                <Link underline="always" color="text.primary" href="#">
                  Pol??tica de Privacidade
                </Link>
                .
              </Typography>

              {!smUp && (
                <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                  J?? possui uma conta?{' '}
                  <NextLink href={PATH_AUTH.login} passHref>
                    <Link variant="subtitle2">Entrar</Link>
                  </NextLink>
                </Typography>
              )}
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
    </GuestGuard>
  );
}
