// @mui
import { Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import UserNewEditForm from '../../../sections/@dashboard/business/UserNewEditForm';

// ----------------------------------------------------------------------

UserCreate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Criar novo negógcio">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Typography variant="h4" sx={{ mb: 5}}>Criar um novo negógcio</Typography>
        {/* <HeaderBreadcrumbs
          heading="Create a new Business"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.list },
            { name: 'New user' },
          ]}
        /> */}
        <UserNewEditForm />
      </Container>
    </Page>
  );
}
