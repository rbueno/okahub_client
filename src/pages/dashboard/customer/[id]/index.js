import { capitalCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useAuth from '../../../../hooks/useAuth';
import useTabs from '../../../../hooks/useTabs';
import useSettings from '../../../../hooks/useSettings';
// _mock_
import { _userAbout, _userFeeds, _userFriends, _userGallery, _userFollowers } from '../../../../_mock';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import Iconify from '../../../../components/Iconify';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import {
  Profile,
  ProfileCover,
  ProfileFriends,
  ProfileGallery,
  ProfileFollowers,
} from '../../../../sections/@dashboard/customer/profile';
import api from '../../../../utils/axios'

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  // zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  // position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

UserProfile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserProfile() {
  const { themeStretch } = useSettings();

   const { query } = useRouter();

  const { id } = query;

  const { user } = useAuth();

  const { currentTab, onChangeTab } = useTabs('geral');

  const [findFriends, setFindFriends] = useState('');
  const [customerDetail, setCustomerDetail] = useState({})

  const handleFindFriends = (value) => {
    setFindFriends(value);
  };

  const fetchData = async () => {
    try {
      const response = await api.get(`v1/deal/${id}`)
      console.log('===== dela response.data', response.data)
      setCustomerDetail(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const PROFILE_TABS = [
    {
      value: 'geral',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <Profile customerDetail={customerDetail} myProfile={_userAbout} posts={_userFeeds} />,
    },
    {
      value: 'followers',
      icon: <Iconify icon={'eva:heart-fill'} width={20} height={20} />,
      component: <ProfileFollowers followers={_userFollowers} />,
    },
    {
      value: 'friends',
      icon: <Iconify icon={'eva:people-fill'} width={20} height={20} />,
      component: <ProfileFriends friends={_userFriends} findFriends={findFriends} onFindFriends={handleFindFriends} />,
    },
    {
      value: 'gallery',
      icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
      component: <ProfileGallery gallery={_userGallery} />,
    },
  ];

  return (
    <Page title="User: Profile">
      <Container maxWidth={themeStretch ? false : 'lg'}>
      <Typography variant="h4" sx={{ mb: 5}}>Detalhes do Deal</Typography>
        <Card
          sx={{
            paddingTop: 2,
            paddingBottom: 2,
            mb: 3,
          }}
        >
          <Box sx={{ ml: 3}}>
            <Tabs
                allowScrollButtonsMobile
                variant="scrollable"
                scrollButtons="auto"
                value={currentTab}
                onChange={onChangeTab}
              >
                {PROFILE_TABS.map((tab) => (
                  <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={capitalCase(tab.value)} />
                ))}
              </Tabs>
          </Box>
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
