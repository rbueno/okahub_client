import { paramCase, capitalCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// @mui
import { Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
import useAuth from '../../../../hooks/useAuth';
// _mock_
import { _userList } from '../../../../_mock';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import UserNewEditForm from '../../../../sections/@dashboard/business/UserNewEditForm';

// ----------------------------------------------------------------------

UserEdit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserEdit() {
  const { themeStretch } = useSettings();

  const { query } = useRouter();

  const { name } = query;
  const { workspaces } = useAuth()
  const editingWorkspace = workspaces.find((ws) => paramCase(ws._id) === name);

  return (
    <Page title="User: Edit user">
      <Container maxWidth={themeStretch ? false : 'lg'}>
      <Typography variant="h4" sx={{ mb: 5}}>Editar negócio</Typography>

        {/* <HeaderBreadcrumbs
          heading="Edit user"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.list },
            { name: capitalCase(name) },
          ]}
        /> */}

        <UserNewEditForm isEdit editingWorkspace={editingWorkspace} />
      </Container>
    </Page>
  );
}
