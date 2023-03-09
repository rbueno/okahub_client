import { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
// next
import Head from 'next/head';
import Script from 'next/script';
// @mui
import { useTheme } from '@mui/material/styles';

import Bowser from "bowser"
// import 'react-app-polyfill/stable'
// import useResizeObserver from "use-resize-observer";
import ResizeObserver from "resize-observer-polyfill"
import { Grid, Container, Typography, Box, TextField, Stack, MenuItem, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import { add, format, formatDistance, startOfDay, eachHourOfInterval, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval } from 'date-fns'
// layouts
import DashboardLayout from '../../layouts/dashboard';
// _mock_
import { _bookings, _bookingNew, _bookingsOverview, _bookingReview } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
import { useAuthContext } from '../../auth/useAuthContext'
// sections
import {
  BookingDetails,
  BookingBookedRoom,
  BookingTotalIncomes,
  BookingRoomAvailable,
  BookingNewestBooking,
  BookingWidgetSummary,
  BookingCheckInWidgets,
  BookingCustomerReviews,
  BookingReservationStats,
} from '../../sections/@dashboard/general/booking';
import {
  AppWelcome
} from '../../sections/@dashboard/general/app';
// assets
import {
  BookingIllustration,
  CheckInIllustration,
  CheckOutIllustration,
} from '../../assets/illustrations';

import api from '../../utils/axios'
// import { PATH_DASHBOARD } from '../../routes/paths'

// ----------------------------------------------------------------------
if (typeof window !== "undefined" && !window.ResizeObserver) {
  window.ResizeObserver = window.ResizeObserver || ResizeObserver;
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const dataTeste = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [27, 84, 29, 94, 39, 18, 40],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [94, 17, 39, 47, 93, 94, 37],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

// export function GraphTest() {
//   return <Bar options={options} data={dataTeste} />;
// }

const SERVICE_OPTIONS = [
  'Hoje',
  '7 dias',
  '14 dias',
  // '28 dias',
  // '90 dias',
  // '180 dias',
  // '365 dias',
  // 'Este mês',
  // 'Último mês',
  // 'Últimos 3 mês',
  // 'Últimos 6 mês',
  // 'Últimos 12 mês',
  // 'Customizado'
];

const browserSatifies = {
  chrome: ">=35",
  firefox: ">=31",
  safari: '>=6',
  "internet explorer": ">11",
}

const INPUT_WIDTH = 160;

const fetchData = async ({ startDate, filterStartDate, filterEndDate, endDate, interval, intervalType }) => {
  const start = startOfDay(startDate || filterStartDate || new Date)
  const end = endDate || filterEndDate || new Date
  
  const query = start && end ? `/v1/evententry?startDate=${start}&endDate=${end}` : `/v1/evententry`

  // const dateRange = formatDistance(start, end, { addSuffix: false })
  const dateIntervalType = interval || intervalType
  const dateInterval = dateIntervalType === 'hour' ? eachHourOfInterval({ start, end }) : eachDayOfInterval({ start, end })
  try {
    const response = await api.get(query)

    const dataXY2 = dateInterval.map(date => {

      if(dateIntervalType === 'hour') {
        const formated = format(date, 'HH')
        const dataClicks = []
        const dataView = []
        
        response.data.eventEntries.forEach((itemData) => {
          if (itemData.eventType !== 'view' && format(new Date(itemData.eventCreatedAt), 'HH') === formated) {
            dataClicks.push(itemData)
          }
          if (itemData.eventType === 'view' && format(new Date(itemData.eventCreatedAt), 'HH') === formated) {
            dataView.push(itemData)
          }
          
        })

        return {
          clicks: {
            y: dataClicks.length,
            x: formated
          },
          views: {
            y: dataView.length,
            x: formated
          }
        }

      }
       


        const formated = format(date, 'dd')
        const dataClicks = []
        const dataView = []

        response.data.eventEntries.forEach((itemData) => {
          console.log('itemData.eventType', itemData.eventType)
          if (itemData.eventType !== 'view' && format(new Date(itemData.eventCreatedAt), 'dd') === formated) {
            dataClicks.push(itemData)
          }
          if (itemData.eventType === 'view' && format(new Date(itemData.eventCreatedAt), 'dd') === formated) {
            dataView.push(itemData)
          }
          
          })

        return {
          clicks: {
            y: dataClicks.length,
            x: formated
          },
          views: {
            y: dataView.length,
            x: formated
          }
        }

        
    })
    console.log('dataxy2', dataXY2)
    // setData({ graph: dataXY, clicks: response.data.eventEntries.length, views: response.data.eventEntries.length })
    // console.log('============> dataXY', dataXY)
    // console.log('============> dataXY sum', { graph: dataXY, clicks: dataXY.reduce((acc, item) => acc + item.clicks.y, 0), views: dataXY.reduce((acc, item) => acc + item.views.y, 0) })
    return dataXY2
  
  
  
  
  } catch (error) {
    console.log('error sales get', error)
    return []
  }
}

FetchController.propTypes = {
  setData: PropTypes.func,
  filterService: PropTypes.string,
  setFilterService: PropTypes.func,
  intervalType: PropTypes.string,
  setIntervalType: PropTypes.func,
}

export function FetchController({ filterService, setFilterService, intervalType, setIntervalType, setData }) {


  const [filterStartDate, setFilterStartDate] = useState(null);

  const [filterEndDate, setFilterEndDate] = useState(null);

  const [pickDateStart, setPickDateStart] = useState(null);

  const [pickDateEnd, setPickDateEnd] = useState(null);

  const [isSubmittingDateFilter, setIsSubmittingDateFilter] = useState(false)

  function buildDateInterval(value) {
    if (value === 'Customizado') return { startDate: null, endDate: null }
    const rangeType = {
      'Hoje': { start: {}, end: {}, intervalType: 'hour' },
      '7 dias': { start: { days: -7}, end: { days: -1}, intervalType: 'days' },
      '14 dias': { start: { days: -14}, end: {days: -1}, intervalType: 'days' },
      // '28 dias': { start: { days: -28}, end: {days: -1}, intervalType: 'days' },
      // '90 dias': { start: { days: -90}, end: {days: -1}, interval: 'month' },
      // '180 dias': { start: { days: -180}, end: {days: -1}, interval: 'month' },
      // '365 dias': { start: { days: -365}, end: {days: -1}, interval: 'month' },
      // 'Este mês': { start: { days: -7}, end: {days: -1} },
      // 'Último mês': { start: { days: -7}, end: {days: -1} },
      // 'Últimos 3 mês': { start: { days: -7}, end: {days: -1} },
      // 'Últimos 6 mês': { start: { days: -7}, end: {days: -1} },
      // 'Últimos 12 mês': { start: { days: -7}, end: {days: -1} },
      // 'Customizado': { start: {}, end: {} },
    }
    return {
      startDate: add(new Date(), rangeType[value].start),
      endDate: add(new Date(), rangeType[value].end),
      interval: rangeType[value].intervalType
    }
  }

  

  // useEffect(() => {
  //    fetchData()
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[])

  const handleSetCustomDateFilter = (ref, newValue) => {

    if (ref === 'start') {
      setFilterStartDate(newValue)
      setPickDateStart(newValue)
    }
    if (ref === 'end') {
      setFilterEndDate(newValue)
      setPickDateEnd(newValue)
    }
    // setFilterService('Customizado')
  }

  const handleSubmitDateFilter = async (startDate, endDate, interval) => {
    setIsSubmittingDateFilter(true)
    setFilterStartDate(startDate)
    setFilterEndDate(endDate)
    
    try {
      // setPage(0)
     const dataXY2 = await fetchData({startDate, endDate, interval})
      setData({ graph: dataXY2, clicks: dataXY2.reduce((acc, item) => acc + item.clicks.y, 0), views: dataXY2.reduce((acc, item) => acc + item.views.y, 0) })
    setIsSubmittingDateFilter(false)
    } catch(error) {
      console.log('deu erro', error)
    }
  }

  const handleFilterService = async (event) => {
    const dateFilter = event.target.value
    const {startDate, endDate, interval} = buildDateInterval(dateFilter)
    setFilterService(event.target.value);
    setIntervalType(interval)
    // eslint-disable-next-line no-unused-expressions
    dateFilter !== 'Customizado' && await handleSubmitDateFilter(startDate, endDate, interval)
  };

  // useEffect(() => {
  //   setFilterService(defaultFilterService)
  // }, [defaultFilterService])

  return (
    <Box display='flex' justifyContent='space-between' alignContent='center' alignItems='center'>
        <Typography variant="h4" >Período</Typography>
        <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} sx={{ py: 2.5, px: 3 }}>
        {
          filterService === 'Customizado' && <>
            <DatePicker
            label="Start date"
            value={pickDateStart}
            onChange={(newValue) => {
              handleSetCustomDateFilter('start', newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                sx={{
                  maxWidth: { md: INPUT_WIDTH },
                }}
              />
            )}
          />

          <DatePicker
            label="End date"
            value={pickDateEnd}
            onChange={(newValue) => {
              handleSetCustomDateFilter('end', newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                sx={{
                  maxWidth: { md: INPUT_WIDTH },
                }}
              />
            )}
          />
          <LoadingButton
            disabled={!filterStartDate || !filterEndDate}
            variant='contained'
            loading={isSubmittingDateFilter}
            onClick={() => handleSubmitDateFilter(filterStartDate, filterEndDate)}
          >
            Aplicar
          </LoadingButton>
          </>
        }
          

          <TextField
                  fullWidth
                  select
                  label="Intervalo"
                  value={filterService}
                  onChange={handleFilterService}
                  SelectProps={{
                    MenuProps: {
                      sx: { '& .MuiPaper-root': { maxHeight: 260 } },
                    },
                  }}
                  sx={{
                    maxWidth: { md: INPUT_WIDTH },
                    textTransform: 'capitalize',
                  }}
                >
                  {SERVICE_OPTIONS.map((option) => (
                    <MenuItem
                      key={option}
                      value={option}
                      sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
          </TextField>
              </Stack>
      </Box>
  )

}

// ----------------------------------------------------------------------

GeneralBookingPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------
export default function GeneralBookingPage() {
  const theme = useTheme();

  const { themeStretch } = useSettingsContext();
  const { currentWorkspace } = useAuthContext()
  const [filterService, setFilterService] = useState('Hoje')
  const [intervalType, setIntervalType] = useState('hour')

  const [data, setData] = useState({ graph: [], clicks: 0, views: 0 })

  useEffect(() => {
    async function getData() {
      try {
        const dataXY2 = await fetchData({ intervalType: 'hour' })

      setData({ graph: dataXY2, clicks: dataXY2.reduce((acc, item) => acc + item.clicks.y, 0), views: dataXY2.reduce((acc, item) => acc + item.views.y, 0) })
      setFilterService('Hoje')
      setIntervalType('hour')
      } catch (error) {
        console.log('deu erro no GeneralBookingPage useEffect', error)
      }
    }

    getData()
  }, [currentWorkspace])

  useEffect(() => {
    const browser1 = Bowser.getParser(window.navigator.userAgent);
console.log('browser1 ==============>', browser1.getBrowser());

    const browser = Bowser.getParser(window.navigator.userAgent);
const isValidBrowser = browser.satisfies(browserSatifies)
console.log('isValidBrowser ================>', isValidBrowser)

  },[])

  return (
    <>
      <Head>
        <title> Métricas | Okahub </title>
      </Head>
      {/* <Script type="application/javascript" src="https://cdn.jsdelivr.net/npm/@juggle/resize-observer" /> */}

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <FetchController filterService={filterService} setFilterService={setFilterService} intervalType={intervalType} setIntervalType={setIntervalType} setData={setData}/>
        <Grid container spacing={3}>
          <Grid item xs={6} md={6}>
            <BookingWidgetSummary
              title="Cliques"
              total={data.clicks}
            />
          </Grid>

          <Grid item xs={6} md={6}>
            <BookingWidgetSummary
              title="Visualizações"
              total={data.views}
              />
          </Grid>

          <Grid item xs={12} md={12}>
            <BookingReservationStats
              title="Insigth"
              // subheader="(+43% Check In | +12% Check Out) than last year"
              chart={{
                categories: data.graph.map(item => item.clicks.x),
                series: [
                  {
                    data: [
                      { name: 'Cliques', data: data.graph.map(item => item.clicks.y) },
                      { name: 'Visualizações', data: data.graph.map(item => item.views.y) },
                    ],
                  }
                ],
              }}
            />
          </Grid>
          {/* <Grid item xs={12} md={12}>
            <GraphTest />
          </Grid> */}

       
        </Grid>
        <AppWelcome
              title='Inscritos'
              description="Confira os inscritos através do compoennt Capturar Contatos"
             
              action={<Button href="/dashboard/deal/list" variant="contained">Abrir lista</Button>}
            />
      </Container>
    </>
  );
}
