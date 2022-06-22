import { useEffect } from 'react';
import { paramCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// @mui
import { Container, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../../redux/store';
import { getProducts } from '../../../../../redux/slices/app';
// routes
import { PATH_DASHBOARD } from '../../../../../routes/paths';
// hooks
import useSettings from '../../../../../hooks/useSettings';
// layouts
import Layout from '../../../../../layouts';
// components
import Page from '../../../../../components/Page';
import HeaderBreadcrumbs from '../../../../../components/HeaderBreadcrumbs';
// sections
import ProductNewEditForm from '../../../../../sections/@dashboard/integration/ProductNewEditForm';
import ProviNewEditForm from '../../../../../sections/@dashboard/integration/ProviNewEditForm';

// ----------------------------------------------------------------------

EcommerceProductEdit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EcommerceProductEdit() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const { query } = useRouter();

  const { name } = query;

  const { products } = useSelector((state) => state.product);

  const currentProduct = products.find((product) => product._id === name);
  console.log('======== currentProduct', currentProduct)
  const ACCOUNT_TABS = [
    {
      value: 'Webhook',
      source: 'webhook',
      component: <ProductNewEditForm />,
    },
    {
      value: 'Provi',
      source: 'provi',
      component: <ProviNewEditForm isEdit currentProduct={currentProduct}/>,
    },
    {
      value: 'Hotmart',
      source: 'hotmart',
      component: <ProductNewEditForm />,
    },
    {
      value: 'Eduzz',
      source: 'eduzz',
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

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Ecommerce: Edit product">
      <Container maxWidth={themeStretch ? false : 'lg'}>
      <Typography variant="h4" sx={{ mb: 5 }}>Editar Integração</Typography>
        {/* <HeaderBreadcrumbs
          heading="Edit product"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            { name: name },
          ]}
        /> */}
        {
          currentProduct && ACCOUNT_TABS.find(c => c.source === currentProduct.source).component
        }
        {/* <ProductNewEditForm isEdit currentProduct={currentProduct} /> */}
      </Container>
    </Page>
  );
}
