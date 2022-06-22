// @mui
import { styled } from '@mui/material/styles';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
// sections
import {
  HomeHero,
  HomeMinimal,
  HomeDarkMode,
  HomeLookingFor,
  HomeColorPresets,
  HomePricingPlans,
  HomeAdvertisement,
  HomeCleanInterfaces,
  HomeHugePackElements,
} from '../sections/home';
import { PricingPlanCard } from '../sections/pricing';
import { Box, Grid, Switch, Container, Typography, Stack } from '@mui/material';
// _mock_
import { _pricingPlans } from '../_mock';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

HomePage.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="Okahub - Agile menagement crm">
      <HomeHero />

      <ContentStyle>
        <HomeMinimal />

        {/* <HomeHugePackElements /> */}

        {/* <HomeDarkMode /> */}

        {/* <HomeColorPresets /> */}

        {/* <HomeCleanInterfaces /> */}

        {/* <HomePricingPlans /> */}

        <Container sx={{ mb: 5 }}>
          <Typography variant="h3" align="center" paragraph>
            Preços
          </Typography>

          <Typography align="center" sx={{ color: 'text.secondary', mb: 5 }}>
            Teste por 14 dias sem compromisso. Após teste grátis, escolha o melhor plano para o seu negócio.
          </Typography>


          <Grid container spacing={3}>
            {_pricingPlans.map((card, index) => (
              <Grid item xs={12} md={4} key={card.subscription}>
                <PricingPlanCard card={card} index={index} />
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* <HomeLookingFor /> */}

        <HomeAdvertisement />
      </ContentStyle>
    </Page>
  );
}
