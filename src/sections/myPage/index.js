import PropTypes from 'prop-types';
import { useEffect} from 'react'
import Head from 'next/head';

import { useTheme } from '@mui/material/styles';
import {
    Stack,
    Typography,
    Container,
    Box,
    Button
} from '@mui/material'

import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import AppleIcon from '@mui/icons-material/Apple';
import ShopIcon from '@mui/icons-material/Shop';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';

import { useSettingsContext } from '../../components/settings';
import localStorageAvailable from '../../utils/localStorageAvailable';
import { useAuthContext } from '../../auth/useAuthContext';
import { CustomAvatar } from '../../components/custom-avatar'
import Footer from '../../layouts/main/Footer';

import MapComponent from './components/mapComponent'
import GetContactComponent from './components/getContactComponent'
import YoutubeCardVideo from './components/youtubeCardVideo'

const availableThemeColorPresets = {
    default: 'default',
    cyan: 'cyan',
    purple: 'purple',
    blue: 'blue',
    orange: 'orange',
    red: 'red'
  }

  const availableIcons = [
    {
      iconId: 'googlePlayStore',
      iconComponent: <ShopIcon />
    },
    {
      iconId: 'appleStore',
      iconComponent: <AppleIcon />
    },
    {
      iconId: 'whatsapp',
      iconComponent: <WhatsAppIcon />
    },
    {
      iconId: 'facebook',
      iconComponent: <FacebookIcon />
    },
    {
      iconId: 'instagram',
      iconComponent: <InstagramIcon />
    },
    {
      iconId: 'email',
      iconComponent: <EmailIcon />
    },
    {
      iconId: 'school',
      iconComponent: <SchoolIcon />
    },
    {
      iconId: 'youtube',
      iconComponent: <YouTubeIcon />
    },
    {
      iconId: 'telegram',
      iconComponent: <TelegramIcon />
    },
    {
      iconId: 'camera',
      iconComponent: <PhotoCameraFrontIcon />
    },
  
  ]

  const eventEntry = ({ component, eventType, data }) => {


    const payload = {
      createdAt: new Date,
      context: { userAgent: '' },
      data: component,
      eventType,
      bid: data.businessId,
      pid: data._id,
      componentId: component?.componentId
    }
    
    fetch('/api/evententry', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  const buildComponent = ({ component, theme, businessSlug, businessId, data }) => {
    const iconComponent = component.props?.icon?.id && availableIcons.find(item => item.iconId === component.props.icon.id)
  
    // <Button component={NextLink} href="/" size="large" variant="contained">
    //         Go to Home
    //       </Button>
  
  if (!component?.props) return <></>
    if (component.type === 'linkButton' && component.props.link && component.props.text) {
      console.log('component.props', component.props)
      return (
        <Button
              {...(iconComponent ? { startIcon: iconComponent.iconComponent } : {})}
              //  startIcon={iconComponent.iconComponent}
                  size="large"
                  variant="contained"
                  sx={{
                    backgroundColor: component.props?.color || theme.palette.primary.main
                  }}
                  // component={NextLink}
                  href={component.props.link}
                  // href={PATH_DOCS.root} 
                  target="_blank"
                  rel="noopener" 
                  // disabled={false}
                  onClick={() => eventEntry({ component, eventType: 'click', data })}
                  // disabled={props?.data?.Celular ? false : true}
                  // onClick={() => handleWhatsAppClick(props.data.Celular)} disableRipple
                  disableRipple
                >
                  {component.props?.text}
              </Button>
      )
    }
    if (component.type === 'paragraph' && component.props.text) {
      return (
        <Typography textAlign="center" variant="body2">{component.props.text}</Typography>
      )
    }
  
    if (component.type === 'googlemaps' && component.props.lat && component.props.lng && component.props.url) {
      return (
        <MapComponent
          lat={component.props.lat}
          lng={component.props.lng}
          url={component.props.url}
          placeTitle={component.props.name}
          placeAddress={component.props.formattedAddress}
          component={component}
          businessSlug={businessSlug}
          businessId={data.businessId}
          pageId={data._id}
          eventEntry={eventEntry}
        />
      )
    }
  
    if (component.type === 'getContacts') {
      return (
        <GetContactComponent
        price="$50"
        title={component.props.title}
        description={component.props.description}
        businessSlug={businessSlug}
        businessId={data.businessId}
        pageId={data._id}
        component={component}
        eventEntry={eventEntry}
        />
      )
    }
    if (component.type === 'youtubeCardVideo' && component.props?.videoId) {
      return (
        <YoutubeCardVideo
          title={component.props?.title}
          videoId={component.props?.videoId}
          subscriptionLink={component.subscriptionLink}
          subscriptionLinkLabel={component.subscriptionLinkLabel}
          businessSlug={businessSlug}
          businessId={data.businessId}
          pageId={data._id}
          component={component}
          eventEntry={eventEntry}
        />
      )
    }
  
    return <></>
  }

MyPage.getLayout = (page) => <> {page} </>;

MyPage.propTypes = {
    business: PropTypes.object,
  };

export function MyPage({ business }) {
    const { onChangeColorPresets } = useSettingsContext();
    const storageAvailable = localStorageAvailable();
    const data = business
    // eslint-disable-next-line no-prototype-builtins
    const colorPreset = data?.themeColor && availableThemeColorPresets.hasOwnProperty(data?.themeColor) ? data?.themeColor : 'default'
    useEffect(() => {
      if (storageAvailable) {
        onChangeColorPresets({ target: { value:  colorPreset }})
        localStorage.setItem('businessSlug', data.businessSlug)
      }
      eventEntry({ component: {}, eventType: 'view', data })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storageAvailable, onChangeColorPresets, colorPreset, data.businessSlug]);
  
    
    const { user } = useAuthContext();
    const theme = useTheme();
  
    const components = data.sections.map((section) => (
      <Stack
          spacing={2}
          direction="column"
          sx={{
            p: theme.spacing(3, 0, 3, 0),
          }}
        >
            { section.title && <Typography textAlign="center" variant="h6">{section.title}</Typography>  }
              
            {
              section.components && section.components.map(comp => buildComponent({ component: comp, theme, businessSlug: data.pageSlug, businessId: data.businessId, data }))
            }
  
        </Stack>
     ))
  
    return (
      <>
        <Head>
          <title>{data.meta?.headTag?.title}</title>
      <meta name="description" content={data.meta?.headTag?.description} />
      <link href={data.meta?.headTag?.websiteURL} rel="canonical" />
  
      <meta property="og:title" content={data.meta?.headTag?.ogTitle} />
      <meta property="og:url" content={data.meta?.headTag?.websiteURL} />
      <meta property="og:description" content={data.meta?.headTag?.description} />
      <meta property="og:image" content={data.meta?.headTag?.image} />
  
      {/* {
        microdata && microdata.product && (
          <>
            <meta property="og:price:amount" content={microdata.product.price.original} />
            <meta property="og:price:currency" content="BRL" />
  
            <meta property="product:brand" content={microdata.business.businessName} />
            <meta property="product:availability" content="in stock" />
            <meta property="product:condition" content="new" />
            <meta property="product:price:amount" content={microdata.product.price.original} />
            <meta property="product:price:currency" content="BRL" />
            <meta property="product:retailer_item_id" content={microdata.product._id} />
  
            {
        microdata.product.price.sale && (
          <>
            <meta property="product:sale_price:amount" content={microdata.product.price.sale} />
            <meta property="product:sale_price:currency" content="BRL" />
          </>
        )
      }
          </>
        )
      } */}
        </Head>
         {/* <Stack
            spacing={2}
            sx={{
              //  mb: 3,
              // p: theme.spacing(0, 0, 3, 0),
              height: 150,
              position: 'relative',
              width: '100%'
            }}
          >
            <ProfileCover name={data.name} description={data.description} avatar={data.avatarURL} coverImage={data.backgroundImage} coverColor={data.backgroundImage} />
          </Stack> */}
  
          
        <Container maxWidth='sm'>
        <Box mt={4}>
        <CustomAvatar
            src={data.avatarURL}
            alt={data.name}
            name={data.name}
            sx={{
              mx: 'auto',
              borderWidth: 2,
              borderStyle: 'solid',
              borderColor: 'common.white',
              width: { xs: 80, md: 80 },
              height: { xs: 80, md: 80 },
            }}
          />
        </Box>
  
          <Box
            sx={{
              ml: { xs: 1, md: 1 },
              mt: { xs: 1, md: 1 },
          //    color: 'common.white',
              textAlign: { xs: 'center', md: 'center' },
            }}
          >
            <Typography variant="h4">{data.name}</Typography>
          </Box>
          {
            data.description && <Box sx={{
              ml: { xs: 1, md: 1 },
              mt: { xs: 1, md: 1 },
              // color: 'common.white',
              textAlign: { xs: 'center', md: 'center' },
            }}>
          <Typography textAlign="center" variant="body2">{data.description}</Typography>
          </Box>
          }
          
          {
            components.map(item => item)
          }
  
          
        
        </Container>
        <Footer />
      </>
    );
  }