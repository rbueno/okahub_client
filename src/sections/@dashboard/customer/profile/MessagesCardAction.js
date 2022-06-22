import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import EmailIcon from '@mui/icons-material/Email';
import { Grid, Stack, Card, Box, Typography, Button } from '@mui/material';
export default function MessagesCardAction() {
    return (
        <Card sx={{ mt: 0, mb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItem: 'center',
            justifyContent: 'space-between',
            p: 2
          }}
        >
          <Box padding={2}>
          <Typography variant='h6'>Enviar Mensagem</Typography>
          <Typography variant='caption'>Enviar mensagem manualmente</Typography>
          </Box>
         <Box sx={{ display: 'flex'}}>
         <Box padding={2}>
            <Button
              startIcon={<EmailIcon />}
              color="info"
              variant="contained"
              // disabled={props?.data?.Email ? false : true}
              disabled={false}
              // onClick={() => handleEmailClick(props.data.Email)} disableRipple
            >
              Abrir Email
            </Button>
          </Box>
          <Box padding={2}>
              <Button
                startIcon={<WhatsAppIcon />}
                variant="contained"
                sx={{
                  backgroundColor: '#075e54'
                }}
                disabled={false}
                // disabled={props?.data?.Celular ? false : true}
                // onClick={() => handleWhatsAppClick(props.data.Celular)} disableRipple
              >
                Abrir WhatsApp
              </Button>
            </Box>
          {/* <Box padding={2}>
              <Button
                startIcon={<WhatsAppIcon />}
                variant="contained"
                sx={{
                  backgroundColor: '#075e54'
                }}
                disabled={false}
                // disabled={props?.data?.Celular ? false : true}
                // onClick={() => handleWhatsAppClick(props.data.Celular)} disableRipple
              >
                Cria nota
              </Button>
            </Box> */}
         </Box>
        </Box>
      </Card>
    )
}