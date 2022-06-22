import { useState } from 'react'
// @mui
import { Container, Typography, Tabs, Tab, Box, Card } from '@mui/material';
import WebhookIcon from '@mui/icons-material/Webhook';
import AppsIcon from '@mui/icons-material/Apps';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import ProductNewEditForm from '../../../../sections/@dashboard/integration/ProductNewEditForm';
import ProviNewEditForm from '../../../../sections/@dashboard/integration/ProviNewEditForm';

// ----------------------------------------------------------------------

EcommerceProductCreate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

// export default function EcommerceProductCreate() {
//   const { themeStretch } = useSettings();

//   return (
//     <Page title="Okahub: Integration">
//       <Container maxWidth={themeStretch ? false : 'lg'}>
//       <Typography variant="h4" sx={{ mb: 5}}>Criar integração</Typography>
//         {/* <HeaderBreadcrumbs
//           heading="Adicionar integração"
//           links={[
//             { name: 'Dashboard', href: PATH_DASHBOARD.root },
//             {
//               name: 'E-Commerce',
//               href: PATH_DASHBOARD.eCommerce.root,
//             },
//             { name: 'New product' },
//           ]}
//         /> */}
//         <ProductNewEditForm />
//       </Container>
//     </Page>
//   );
// }

export default function EcommerceProductCreate() {
  const { themeStretch } = useSettings();

  const [currentTab, setCurrentTab] = useState('Webhook');

  const onChangeTab = (event, newValue) => {
    console.log('event', event)
    console.log('newValue', newValue)
    setCurrentTab(newValue)
  }

  const ACCOUNT_TABS = [
    {
      value: 'Webhook',
      source: 'webhook',
      icon: <WebhookIcon />,
      component: <ProductNewEditForm />,
    },
    {
      value: 'Provi',
      source: 'provi',
      icon: <AppsIcon />,
      component: <ProviNewEditForm />,
    },
    {
      value: 'Hotmart',
      source: 'hotmart',
      icon: <AppsIcon />,
      component: <ProductNewEditForm />,
    },
    {
      value: 'Eduzz',
      source: 'eduzz',
      icon: <AppsIcon />,
      component: <ProductNewEditForm />,
    },
    // {
    //   value: 'notifications',
    //   icon: <Iconify icon={'eva:bell-fill'} width={20} height={20} />,
    //   component: <AccountNotifications />,
    // },
    // {
    //   value: 'social_links',
    //   icon: <Iconify icon={'eva:share-fill'} width={20} height={20} />,
    //   component: <AccountSocialLinks myProfile={_userAbout} />,
    // },
    // {
    //   value: 'change_password',
    //   icon: <Iconify icon={'ic:round-vpn-key'} width={20} height={20} />,
    //   component: <AccountChangePassword />,
    // },
  ];

  return (
    <Page title="User: Account Settings">
      <Container maxWidth={themeStretch ? false : 'lg'}>
      <Typography variant="h4" sx={{ mb: 5}}>Criar nova integração</Typography>
        {/* <HeaderBreadcrumbs
          heading="Account"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'Account Settings' },
          ]}
        /> */}

        <Card sx={{ p: 3 }}>
        <Typography variant="p" >Escolha um app para realizar a integração:</Typography>
        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          onChange={onChangeTab}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab disableRipple key={tab.value} label={tab.value} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>
        </Card>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
