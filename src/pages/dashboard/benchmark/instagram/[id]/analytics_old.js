import { useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { Container, Tab, Tabs, Box, Typography, Page } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../../routes/paths';
// _mock_
import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from '../../../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../../../layouts/dashboard';
// components
import Iconify from '../../../../../components/iconify';
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../../components/settings';
// sections
import {
  AccountGeneral,
  AccountBilling,
  AccountSocialLinks,
  AccountNotifications,
  AccountChangePassword,
} from '../../../../../sections/@dashboard/user/account';


// ----------------------------------------------------------------------

UserAccountPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserAccountPage() {
  const { themeStretch } = useSettingsContext();

  const [currentTab, setCurrentTab] = useState('general');
  const onChangeTab = () => {

  }

  const TABS = [
    {
      value: 'general',
      label: 'Geral (Não pode ser editado)',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <AccountGeneral />,
    },
    // {
    //   value: 'billing',
    //   label: 'Billing',
    //   icon: <Iconify icon="ic:round-receipt" />,
    //   component: (
    //     <AccountBilling
    //       cards={_userPayment}
    //       addressBook={_userAddressBook}
    //       invoices={_userInvoices}
    //     />
    //   ),
    // },
    // {
    //   value: 'notifications',
    //   label: 'Notifications',
    //   icon: <Iconify icon="eva:bell-fill" />,
    //   component: <AccountNotifications />,
    // },
    // {
    //   value: 'social_links',
    //   label: 'Social links',
    //   icon: <Iconify icon="eva:share-fill" />,
    //   component: <AccountSocialLinks socialLinks={_userAbout.socialLinks} />,
    // },
    // {
    //   value: 'change_password',
    //   label: 'Trocar senha',
    //   icon: <Iconify icon="ic:round-vpn-key" />,
    //   component: <AccountChangePassword />,
    // },
  ];

  return (
      <Container>
    

        {/* <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          onChange={onChangeTab}
        >
          {TABS.map((tab) => (
            <Tab disableRipple key={tab.value} label={tab.value} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs> */}

        <Box sx={{ mb: 5 }} />

        {/* {TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })} */}
      </Container>
  );
}
