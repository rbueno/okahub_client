import axios from 'axios'
import {Elements, useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import PropTypes from 'prop-types';
// next
import Head from 'next/head';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
// @mui
import { Card, Button, Box, Container, Typography, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// layouts
import SimpleLayout from '../layouts/simple';

// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import api from '../utils/axios'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_JIGpkjVW2BuMNnpJYCXlBHbY');


// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     // We don't want to let default form submission happen here,
//     // which would refresh the page.
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     const result = await stripe.confirmPayment({
//       //`Elements` instance that was used to create the Payment Element
//       elements,
//       confirmParams: {
//         return_url: "https://example.com/order/123/complete",
//       },
//     });

//     if (result.error) {
//       // Show error to your customer (for example, payment details incomplete)
//       console.log(result.error.message);
//     } else {
//       // Your customer will be redirected to your `return_url`. For some payment
//       // methods like iDEAL, your customer will be redirected to an intermediate
//       // site first to authorize the payment, then redirected to the `return_url`.
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <PaymentElement />
//       <Button type='submit' disabled={!stripe}>Submit</Button>
//     </form>
//   )
// };

// function StripePayment() {
//   const options = {
//     // passing the client secret obtained from the server
//     clientSecret: `pk_test_JIGpkjVW2BuMNnpJYCXlBHbY_secret_'sk_test_cr2Rk8YQimJzRtBlVpUJ6ynu'`,
//   };

  
// useEffect(() => {
// console.log('stripePromise', stripePromise.client_secret)
// },[])
//   return (
//     <Elements stripe={stripePromise} options={options}>
//       <CheckoutForm />
//     </Elements>
//   );
// };


// ----------------------------------------------------------------------

PricingPage.getLayout = (page) => <SimpleLayout>{page}</SimpleLayout>;

// ----------------------------------------------------------------------

const pricingContent = {
  pt: {
    plan: {
      // subscription: 'Premium',
      price: '29.90',
      caption: 'Uma super IA com a particidade de um chat',
      lists: [
        { text: 'ChatGPT Plus', isAvailable: true },
        { text: 'Integração com WhatsApp', isAvailable: true },
        { text: 'Mensagens Ilimitadas', isAvailable: true },
        { text: 'Crie posts, anúncios, redações, resumos de textos e relatórios... tire dúvidas sobre assuntos gerais e muitos mais!', isAvailable: true },
      ],
      labelAction: 'Avançar',
      simbol: 'R$',
      period: 'mês',
      whatsappNumber: 'Número do WhatsApp',
    whatsappNumberExample: 'Example: 5511918486569',
    whatsappNumberHelper: 'Insira o seu número de WhatsApp completo com código de país',
    sessionErrorHelper: (n) => `Número do WhatsApp não localizado. Utilize o número completo como: ${n}`
    },
  text: {
    headline: ` O poder do ChatGPT, e outras IAs, diretamente em seu WhatsApp`,
    description: `Utilize o ChatGPT plus, entre outras IAs, diretamente em seu WhatsApp com acesso ilimitado.`,
  }
},
en: {
  plan: {
    // subscription: 'Premium',
    price: '4.99',
    caption: 'A super AI with the practicality of a chat',
    lists: [
      { text: 'ChatGPT Plus', isAvailable: true },
      { text: 'WhatsApp Integration', isAvailable: true },
      { text: 'Unlimited Messages', isAvailable: true },
      { text: 'Create posts, ads, essays, summaries of texts and reports... ask questions about general topics and much more!', isAvailable: true },
      
    ],
    labelAction: 'Next',
    simbol: '$',
    period: 'mo',
    whatsappNumber: 'WhatsApp Number',
    whatsappNumberExample: 'Example: 5511918486569',
    whatsappNumberHelper: 'Inform your complete WhatsApp number with country code.',
    sessionErrorHelper: (n) => ` WhatsApp number not found. Use the complete number like: ${n}`
  },
text: {
  headline: ` The power of ChatGPT, and other AIs, directly on your WhatsApp.`,
  description: `Use ChatGPT plus, among other AIs, directly on your WhatsApp with unlimited access.`
}
}
}



// ----------------------------------------------------------------------

PricingPlanCard.propTypes = {
  sx: PropTypes.object,
  card: PropTypes.object,
  phoneNumber: PropTypes.string
};

function PricingPlanCard({ card, phoneNumber, sx, ...other }) {
  const { subscription, price, caption, lists, labelAction, simbol = '$', period = 'mo', whatsappNumber,
  whatsappNumberExample,
  whatsappNumberHelper, sessionErrorHelper } = card;
  const [phone, setPhone] = useState(phoneNumber)
  const [sessionError, setSessionError] = useState(false)
  const [loading, setLoading] = useState(false)

    const createCheckOutSession = async () => {
    setLoading(true);
    setSessionError(false)
    try {
      const stripe = await stripePromise;
    const checkoutSession = await api.post("v1/stripe/session", { phoneNumber: phone });

    if (checkoutSession.status !== 200) {
      console.log('erro', checkoutSession)
      setSessionError(true)
      setLoading(false);
      return
    }
    console.log('checkoutSession', checkoutSession)
    await axios.post('https://okahub.herokuapp.com/hooks/stripe', { checkoutSession })

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
    } catch (error) {
      console.log('erro', error)
      setSessionError(true)
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <Card
      sx={{
        p: 5,
        boxShadow: (theme) => theme.customShadows.z24,
      }}
    >
      <Label color="info" sx={{ top: 16, right: 16, position: 'absolute' }}>
          PREMIUM
        </Label>

      <Typography variant="overline" sx={{ color: 'text.secondary' }}>
        {subscription}
      </Typography>

      <Stack spacing={1} direction="row" sx={{ my: 2 }}>
      <Typography variant="h5">{simbol}</Typography>

        <Typography variant="h2">{price === 0 ? 'Free' : price}</Typography>

        <Typography component="span" sx={{ alignSelf: 'center', color: 'text.secondary' }}>
            /{period}
          </Typography>
      </Stack>

      <Typography
        variant="caption"
        sx={{
          color: 'primary.main',
          textTransform: 'capitalize',
        }}
      >
        {caption}
      </Typography>

      {/* <Box sx={{ width: 80, height: 80, mt: 5 }}>

      <PlanFreeIcon />
      <PlanStarterIcon />
      <PlanPremiumIcon />
      
      </Box> */}

      <Stack component="ul" spacing={2} sx={{ p: 0, my: 5 }}>
        {lists.map((item) => (
          <Stack
            key={item.text}
            component="li"
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              typography: 'body2',
              color: item.isAvailable ? 'text.primary' : 'text.disabled',
            }}
          >
            <Iconify
              icon={item.isAvailable ? 'eva:checkmark-fill' : 'eva:close-fill'}
              width={16}
              sx={{
                color: item.isAvailable ? 'primary.main' : 'inherit',
              }}
            />
            <Typography variant="body2">{item.text}</Typography>
          </Stack>
        ))}
      </Stack>

      <Box m={2}>
        


           <TextField
              fullWidth
              // multiline
              // rows={3}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              label={whatsappNumber}
              placeholder={whatsappNumberExample}
              error={sessionError}
              helperText={sessionError ? sessionErrorHelper(phoneNumber) : whatsappNumberHelper}
              />
      </Box>
      <LoadingButton loading={loading} fullWidth size="large" variant="contained" disabled={!phone} onClick={() => createCheckOutSession()}>
      {labelAction}
      </LoadingButton>
      {/* <StripePayment /> */}
    </Card>
  );
}


export default function PricingPage() {
  const { query } = useRouter()

  const [phoneNumber, setPhoneNumber] = useState(null)
  const [locale, setLocale] = useState('en')

  useEffect(()=> {
    if (query?.n) setPhoneNumber(query.n)
    if (query?.n && query?.n.startsWith('55')) setLocale('pt')
  }, [query])

  if (!phoneNumber) return <Box>Loading</Box>
  return (
    <>
      <Head>
        <title> Pricing | Okahub Pulse</title>
      </Head>
      <Container
        sx={{
          pt: 15,
          pb: 10,
          minHeight: 1,
        }}
      >
         <Box display='flex' alignItems='center' alignContent='center' justifyContent='center'>
            <Box maxWidth={550}>

        <Typography variant="h3" align="center" paragraph>
         {pricingContent[locale].text.headline}
        </Typography>
            </Box>
        </Box>

        <Typography align="center" sx={{ color: 'text.secondary' }}>
        {pricingContent[locale].text.description}
        </Typography>

        {/* <Box sx={{ my: 5 }}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <Typography variant="overline" sx={{ mr: 1.5 }}>
              MONTHLY
            </Typography>

            <Switch />
            <Typography variant="overline" sx={{ ml: 1.5 }}>
              YEARLY (save 10%)
            </Typography>
          </Stack>

          <Typography
            variant="caption"
            align="right"
            sx={{ color: 'text.secondary', display: 'block' }}
          >
            * Plus applicable taxes
          </Typography>
        </Box> */}

        <Box mt={4} display='flex' alignItems='center' alignContent='center' justifyContent='center'>
          
            <PricingPlanCard key={pricingContent[locale].plan.subscription} phoneNumber={phoneNumber} card={pricingContent[locale].plan} index={1} />
          
        </Box>
      </Container>
    </>
  );
}




// ===== stripe body =====
// 2023-04-19T13:33:32.329722+00:00 app[web.1]: {
// 2023-04-19T13:33:32.329723+00:00 app[web.1]: checkoutSession: {
// 2023-04-19T13:33:32.329723+00:00 app[web.1]: data: {
// 2023-04-19T13:33:32.329724+00:00 app[web.1]: id: 'cs_test_a1dYqfNtbXqLdOJaJ8xdaXLO0zaqIKMw5CI016spmKXAcV3EpUmMscuWNG',
// 2023-04-19T13:33:32.329724+00:00 app[web.1]: object: 'checkout.session',
// 2023-04-19T13:33:32.329725+00:00 app[web.1]: after_expiration: null,
// 2023-04-19T13:33:32.329725+00:00 app[web.1]: allow_promotion_codes: null,
// 2023-04-19T13:33:32.329725+00:00 app[web.1]: amount_subtotal: 499,
// 2023-04-19T13:33:32.329725+00:00 app[web.1]: amount_total: 499,
// 2023-04-19T13:33:32.329726+00:00 app[web.1]: automatic_tax: { enabled: false, status: null },
// 2023-04-19T13:33:32.329726+00:00 app[web.1]: billing_address_collection: null,
// 2023-04-19T13:33:32.329726+00:00 app[web.1]: cancel_url: 'https://example.com',
// 2023-04-19T13:33:32.329727+00:00 app[web.1]: client_reference_id: null,
// 2023-04-19T13:33:32.329727+00:00 app[web.1]: consent: null,
// 2023-04-19T13:33:32.329727+00:00 app[web.1]: consent_collection: null,
// 2023-04-19T13:33:32.329727+00:00 app[web.1]: created: 1681911211,
// 2023-04-19T13:33:32.329727+00:00 app[web.1]: currency: 'usd',
// 2023-04-19T13:33:32.329727+00:00 app[web.1]: currency_conversion: null,
// 2023-04-19T13:33:32.329727+00:00 app[web.1]: custom_fields: [],
// 2023-04-19T13:33:32.329728+00:00 app[web.1]: custom_text: { shipping_address: null, submit: null },
// 2023-04-19T13:33:32.329728+00:00 app[web.1]: customer: null,
// 2023-04-19T13:33:32.329728+00:00 app[web.1]: customer_creation: 'always',
// 2023-04-19T13:33:32.329728+00:00 app[web.1]: customer_details: null,
// 2023-04-19T13:33:32.329728+00:00 app[web.1]: customer_email: null,
// 2023-04-19T13:33:32.329728+00:00 app[web.1]: expires_at: 1681997611,
// 2023-04-19T13:33:32.329728+00:00 app[web.1]: invoice: null,
// 2023-04-19T13:33:32.329729+00:00 app[web.1]: invoice_creation: null,
// 2023-04-19T13:33:32.329729+00:00 app[web.1]: livemode: false,
// 2023-04-19T13:33:32.329729+00:00 app[web.1]: locale: null,
// 2023-04-19T13:33:32.329729+00:00 app[web.1]: metadata: {},
// 2023-04-19T13:33:32.329729+00:00 app[web.1]: mode: 'subscription',
// 2023-04-19T13:33:32.329729+00:00 app[web.1]: payment_intent: null,
// 2023-04-19T13:33:32.329730+00:00 app[web.1]: payment_link: null,
// 2023-04-19T13:33:32.329730+00:00 app[web.1]: payment_method_collection: 'always',
// 2023-04-19T13:33:32.329730+00:00 app[web.1]: payment_method_options: null,
// 2023-04-19T13:33:32.329730+00:00 app[web.1]: payment_method_types: [ 'card' ],
// 2023-04-19T13:33:32.329730+00:00 app[web.1]: payment_status: 'unpaid',
// 2023-04-19T13:33:32.329731+00:00 app[web.1]: phone_number_collection: { enabled: false },
// 2023-04-19T13:33:32.329731+00:00 app[web.1]: recovered_from: null,
// 2023-04-19T13:33:32.329731+00:00 app[web.1]: setup_intent: null,
// 2023-04-19T13:33:32.329731+00:00 app[web.1]: shipping_address_collection: null,
// 2023-04-19T13:33:32.329731+00:00 app[web.1]: shipping_cost: null,
// 2023-04-19T13:33:32.329731+00:00 app[web.1]: shipping_details: null,
// 2023-04-19T13:33:32.329731+00:00 app[web.1]: shipping_options: [],
// 2023-04-19T13:33:32.329731+00:00 app[web.1]: status: 'open',
// 2023-04-19T13:33:32.329732+00:00 app[web.1]: submit_type: null,
// 2023-04-19T13:33:32.329732+00:00 app[web.1]: subscription: null,
// 2023-04-19T13:33:32.329732+00:00 app[web.1]: success_url: 'https://okahub.com',
// 2023-04-19T13:33:32.329732+00:00 app[web.1]: total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
// 2023-04-19T13:33:32.329733+00:00 app[web.1]: url: 'https://checkout.stripe.com/c/pay/cs_test_a1dYqfNtbXqLdOJaJ8xdaXLO0zaqIKMw5CI016spmKXAcV3EpUmMscuWNG#fidkdWxOYHwnPyd1blpxYHZxWk9MQnVub1NSN0dwSEtrdU9cRl1pR01nXCcpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl'
// 2023-04-19T13:33:32.329733+00:00 app[web.1]: },
// 2023-04-19T13:33:32.329733+00:00 app[web.1]: status: 200,
// 2023-04-19T13:33:32.329733+00:00 app[web.1]: statusText: 'OK',
// 2023-04-19T13:33:32.329733+00:00 app[web.1]: headers: {
// 2023-04-19T13:33:32.329733+00:00 app[web.1]: connection: 'keep-alive',
// 2023-04-19T13:33:32.329734+00:00 app[web.1]: 'content-encoding': 'gzip',
// 2023-04-19T13:33:32.329734+00:00 app[web.1]: 'content-type': 'application/json; charset=utf-8',
// 2023-04-19T13:33:32.329734+00:00 app[web.1]: date: 'Wed, 19 Apr 2023 13:33:32 GMT',
// 2023-04-19T13:33:32.329734+00:00 app[web.1]: etag: '"ab0gaura1l16f"',
// 2023-04-19T13:33:32.329734+00:00 app[web.1]: 'keep-alive': 'timeout=5',
// 2023-04-19T13:33:32.329734+00:00 app[web.1]: 'transfer-encoding': 'chunked',
// 2023-04-19T13:33:32.329734+00:00 app[web.1]: vary: 'Accept-Encoding'
// 2023-04-19T13:33:32.329734+00:00 app[web.1]: },
// 2023-04-19T13:33:32.329735+00:00 app[web.1]: config: {
// 2023-04-19T13:33:32.329735+00:00 app[web.1]: transitional: {
// 2023-04-19T13:33:32.329735+00:00 app[web.1]: silentJSONParsing: true,
// 2023-04-19T13:33:32.329735+00:00 app[web.1]: forcedJSONParsing: true,
// 2023-04-19T13:33:32.329735+00:00 app[web.1]: clarifyTimeoutError: false
// 2023-04-19T13:33:32.329735+00:00 app[web.1]: },
// 2023-04-19T13:33:32.329735+00:00 app[web.1]: adapter: [ 'xhr', 'http' ],
// 2023-04-19T13:33:32.329735+00:00 app[web.1]: transformRequest: [ null ],
// 2023-04-19T13:33:32.329736+00:00 app[web.1]: transformResponse: [ null ],
// 2023-04-19T13:33:32.329736+00:00 app[web.1]: timeout: 0,
// 2023-04-19T13:33:32.329736+00:00 app[web.1]: xsrfCookieName: 'XSRF-TOKEN',
// 2023-04-19T13:33:32.329736+00:00 app[web.1]: xsrfHeaderName: 'X-XSRF-TOKEN',
// 2023-04-19T13:33:32.329736+00:00 app[web.1]: maxContentLength: -1,
// 2023-04-19T13:33:32.329737+00:00 app[web.1]: maxBodyLength: -1,
// 2023-04-19T13:33:32.329737+00:00 app[web.1]: env: {},
// 2023-04-19T13:33:32.329737+00:00 app[web.1]: headers: {
// 2023-04-19T13:33:32.329737+00:00 app[web.1]: Accept: 'application/json, text/plain, */*',
// 2023-04-19T13:33:32.329737+00:00 app[web.1]: 'Content-Type': 'application/json'
// 2023-04-19T13:33:32.329737+00:00 app[web.1]: },
// 2023-04-19T13:33:32.329737+00:00 app[web.1]: method: 'post',
// 2023-04-19T13:33:32.329738+00:00 app[web.1]: url: '/api/create-stripe-session',
// 2023-04-19T13:33:32.329738+00:00 app[web.1]: data: '{"item":{"name":"Monthly plan","description":"okahub Pulse monthly plan","image":"https://www.okahub.com/logo/okahub_logo.png","quantity":1,"price":4.99}}'
// 2023-04-19T13:33:32.329739+00:00 app[web.1]: },
// 2023-04-19T13:33:32.329739+00:00 app[web.1]: request: {}
// 2023-04-19T13:33:32.329739+00:00 app[web.1]: }
// 2023-04-19T13:33:32.329739+00:00 app[web.1]: }
// 2023-04-19T13:33:32.329741+00:00 app[web.1]: =======================






// confirma


// ===== stripe body =====
// 2023-04-19T13:35:08.934887+00:00 app[web.1]: {
// 2023-04-19T13:35:08.934889+00:00 app[web.1]: id: 'evt_1MybA8AJW2XjEkveVtnSqowH',
// 2023-04-19T13:35:08.934889+00:00 app[web.1]: object: 'event',
// 2023-04-19T13:35:08.934890+00:00 app[web.1]: api_version: '2016-07-06',
// 2023-04-19T13:35:08.934891+00:00 app[web.1]: created: 1681911308,
// 2023-04-19T13:35:08.934891+00:00 app[web.1]: data: {
// 2023-04-19T13:35:08.934891+00:00 app[web.1]: object: {
// 2023-04-19T13:35:08.934892+00:00 app[web.1]: id: 'cs_test_a1dYqfNtbXqLdOJaJ8xdaXLO0zaqIKMw5CI016spmKXAcV3EpUmMscuWNG',
// 2023-04-19T13:35:08.934893+00:00 app[web.1]: object: 'checkout.session',
// 2023-04-19T13:35:08.934893+00:00 app[web.1]: after_expiration: null,
// 2023-04-19T13:35:08.934893+00:00 app[web.1]: allow_promotion_codes: null,
// 2023-04-19T13:35:08.934894+00:00 app[web.1]: amount_subtotal: 2990,
// 2023-04-19T13:35:08.934894+00:00 app[web.1]: amount_total: 2990,
// 2023-04-19T13:35:08.934896+00:00 app[web.1]: automatic_tax: { enabled: false, status: null },
// 2023-04-19T13:35:08.934896+00:00 app[web.1]: billing_address_collection: null,
// 2023-04-19T13:35:08.934896+00:00 app[web.1]: cancel_url: 'https://example.com',
// 2023-04-19T13:35:08.934897+00:00 app[web.1]: client_reference_id: null,
// 2023-04-19T13:35:08.934897+00:00 app[web.1]: consent: null,
// 2023-04-19T13:35:08.934898+00:00 app[web.1]: consent_collection: null,
// 2023-04-19T13:35:08.934898+00:00 app[web.1]: created: 1681911211,
// 2023-04-19T13:35:08.934898+00:00 app[web.1]: currency: 'brl',
// 2023-04-19T13:35:08.934898+00:00 app[web.1]: currency_conversion: null,
// 2023-04-19T13:35:08.934899+00:00 app[web.1]: custom_fields: [],
// 2023-04-19T13:35:08.934899+00:00 app[web.1]: custom_text: { shipping_address: null, submit: null },
// 2023-04-19T13:35:08.934899+00:00 app[web.1]: customer: 'cus_Nk5Kdlg3B5Ua29',
// 2023-04-19T13:35:08.934900+00:00 app[web.1]: customer_creation: 'always',
// 2023-04-19T13:35:08.934900+00:00 app[web.1]: customer_details: {
// 2023-04-19T13:35:08.934900+00:00 app[web.1]: address: {
// 2023-04-19T13:35:08.934900+00:00 app[web.1]: city: null,
// 2023-04-19T13:35:08.934901+00:00 app[web.1]: country: 'BR',
// 2023-04-19T13:35:08.934901+00:00 app[web.1]: line1: null,
// 2023-04-19T13:35:08.934901+00:00 app[web.1]: line2: null,
// 2023-04-19T13:35:08.934901+00:00 app[web.1]: postal_code: null,
// 2023-04-19T13:35:08.934901+00:00 app[web.1]: state: null
// 2023-04-19T13:35:08.934901+00:00 app[web.1]: },
// 2023-04-19T13:35:08.934902+00:00 app[web.1]: email: 'rafaelbuenolink@gmail.com',
// 2023-04-19T13:35:08.934902+00:00 app[web.1]: name: 'Rafael Bueno',
// 2023-04-19T13:35:08.934902+00:00 app[web.1]: phone: null,
// 2023-04-19T13:35:08.934902+00:00 app[web.1]: tax_exempt: 'none',
// 2023-04-19T13:35:08.934902+00:00 app[web.1]: tax_ids: []
// 2023-04-19T13:35:08.934902+00:00 app[web.1]: },
// 2023-04-19T13:35:08.934902+00:00 app[web.1]: customer_email: null,
// 2023-04-19T13:35:08.934903+00:00 app[web.1]: expires_at: 1681997611,
// 2023-04-19T13:35:08.934903+00:00 app[web.1]: invoice: 'in_1MybA6AJW2XjEkveKZcmTVIK',
// 2023-04-19T13:35:08.934903+00:00 app[web.1]: invoice_creation: null,
// 2023-04-19T13:35:08.934903+00:00 app[web.1]: livemode: false,
// 2023-04-19T13:35:08.934903+00:00 app[web.1]: locale: null,
// 2023-04-19T13:35:08.934903+00:00 app[web.1]: metadata: {},
// 2023-04-19T13:35:08.934904+00:00 app[web.1]: mode: 'subscription',
// 2023-04-19T13:35:08.934904+00:00 app[web.1]: payment_intent: null,
// 2023-04-19T13:35:08.934904+00:00 app[web.1]: payment_link: null,
// 2023-04-19T13:35:08.934904+00:00 app[web.1]: payment_method_collection: 'always',
// 2023-04-19T13:35:08.934904+00:00 app[web.1]: payment_method_options: null,
// 2023-04-19T13:35:08.934904+00:00 app[web.1]: payment_method_types: [ 'card' ],
// 2023-04-19T13:35:08.934905+00:00 app[web.1]: payment_status: 'paid',
// 2023-04-19T13:35:08.934905+00:00 app[web.1]: phone_number_collection: { enabled: false },
// 2023-04-19T13:35:08.934905+00:00 app[web.1]: recovered_from: null,
// 2023-04-19T13:35:08.934905+00:00 app[web.1]: setup_intent: null,
// 2023-04-19T13:35:08.934906+00:00 app[web.1]: shipping: null,
// 2023-04-19T13:35:08.934906+00:00 app[web.1]: shipping_address_collection: null,
// 2023-04-19T13:35:08.934906+00:00 app[web.1]: shipping_options: [],
// 2023-04-19T13:35:08.934906+00:00 app[web.1]: shipping_rate: null,
// 2023-04-19T13:35:08.934906+00:00 app[web.1]: status: 'complete',
// 2023-04-19T13:35:08.934906+00:00 app[web.1]: submit_type: null,
// 2023-04-19T13:35:08.934907+00:00 app[web.1]: subscription: 'sub_1MybA6AJW2XjEkveKNxabgoE',
// 2023-04-19T13:35:08.934907+00:00 app[web.1]: success_url: 'https://okahub.com',
// 2023-04-19T13:35:08.934907+00:00 app[web.1]: total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
// 2023-04-19T13:35:08.934907+00:00 app[web.1]: url: null
// 2023-04-19T13:35:08.934907+00:00 app[web.1]: }
// 2023-04-19T13:35:08.934907+00:00 app[web.1]: },
// 2023-04-19T13:35:08.934908+00:00 app[web.1]: livemode: false,
// 2023-04-19T13:35:08.934908+00:00 app[web.1]: pending_webhooks: 1,
// 2023-04-19T13:35:08.934908+00:00 app[web.1]: request: null,
// 2023-04-19T13:35:08.934908+00:00 app[web.1]: type: 'checkout.session.completed'
// 2023-04-19T13:35:08.934908+00:00 app[web.1]: }
// 2023-04-19T13:35:08.934911+00:00 app[web.1]: =======================