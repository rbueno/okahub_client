// next
import Head from 'next/head';
// @mui
import { Container, Typography } from '@mui/material';
// layouts
import MainLayout from '../layouts/main';

// sections
import { AboutHero, AboutWhat, AboutTeam, AboutVision, AboutTestimonials } from '../sections/about';

// ----------------------------------------------------------------------

AboutPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function AboutPage() {
  return (
    <>
      <Head>
        <title> Termos de uso e Política de Privacidade | Okahub</title>
      </Head>

      <Container>
      <Typography variant="h2" sx={{ mb: 3 }}>
      Termos de Uso e Política de Privacidade da Allura
              </Typography>
            

<p>Bem-vindo(a) ao Allura, inteligência artificial do Okahub. Leia atentamente estes termos de uso e política de privacidade antes de usar a Allura da Okahub.</p>
            
              <h2>1. Aceitação dos Termos de Uso e Política de Privacidade</h2>
<p>Ao usar o Allura, você concorda em cumprir e estar sujeito a estes termos de uso e política de privacidade, bem como às leis e regulamentos aplicáveis. Se você não concorda com estes termos, não use o Allura.</p>

<h2>2. Uso do Allura</h2>
<p>O Allura é fornecido gratuitamente e permite que os usuários interajam com um chatbot. Ao usar o Allura, você concorda em não usá-lo de maneira que possa danificar, desabilitar, sobrecarregar ou prejudicar a plataforma.</p>

<h2>3. Propriedade Intelectual</h2>
<p>Todos os direitos autorais, marcas comerciais, patentes e outros direitos de propriedade intelectual relacionados ao Allura pertencem exclusivamente à empresa proprietária do aplicativo. O usuário não tem permissão para reproduzir, distribuir ou criar trabalhos derivados do Allura sem autorização prévia por escrito.</p>

<h2>4. Isenção de Responsabilidade</h2>
<p>O Allura é fornecido "como está", sem garantia de qualquer tipo, expressa ou implícita. A empresa proprietária do Allura não garante que o aplicativo atenderá às suas necessidades ou que será ininterrupto, seguro ou livre de erros.</p>

<h2>5. Limitação de Responsabilidade</h2>
<p>Em nenhuma circunstância, a empresa proprietária do Allura será responsável por danos diretos, indiretos, punitivos, incidentais, especiais ou consequenciais decorrentes ou relacionados ao uso ou incapacidade de uso do Allura.</p>

<h2>6. Alterações nos Termos de Uso e Política de Privacidade</h2>
<p>A empresa proprietária do Allura pode atualizar estes termos de uso e política de privacidade periodicamente para refletir mudanças em nossas práticas de coleta, uso e compartilhamento de informações. Ao continuar a usar o Allura após a publicação das alterações, você concorda em cumprir os termos atualizados.</p>

<h2>7. Contato</h2>
<p>Se você tiver alguma dúvida sobre estes termos de uso e política de privacidade, entre em contato conosco pelo e-mail contato@okahub.com.</p>

<h2>8. Lei Aplicável</h2>
<p>Estes termos de uso e política de privacidade serão regidos e interpretados de acordo com as leis brasileiras.</p>

<p>Ao utilizar o Allura, você declara ter lido e compreendido estes termos </p>

      </Container>
      
              
            

      {/* <AboutVision />

      <Divider orientation="vertical" sx={{ my: 10, mx: 'auto', width: 2, height: 40 }} />

      <AboutTeam />

      <AboutTestimonials /> */}
    </>
  );
}
