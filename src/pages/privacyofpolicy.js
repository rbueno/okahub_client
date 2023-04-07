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
      <header>
  <h1>Política de privacidade do chatbot para Instagram</h1>
</header>
<main>
  <p>A privacidade dos nossos usuários é extremamente importante para nós. Todas as informações coletadas e utilizadas pelo nosso chatbot são armazenadas de acordo com a Lei Geral de Proteção de Dados (LGPD) brasileira.</p>

  <h2>Informações coletadas</h2>
  <p>Ao utilizar o nosso chatbot, coletamos as seguintes informações do usuário:</p>
  <ul>
    <li>Nome de usuário do Instagram</li>
    <li>Conteúdo postado pelo usuário em nosso chatbot</li>
    <li>Informações coletadas através de cookies (conforme definido abaixo)</li>
    <li>Qualquer informação adicional fornecida pelo usuário durante o uso do chatbot</li>
  </ul>

  <h2>Uso das informações coletadas</h2>
  <p>As informações coletadas são utilizadas para os seguintes fins:</p>
  <ul>
    <li>Personalização da experiência do usuário</li>
    <li>Aperfeiçoamento dos produtos e serviços oferecidos</li>
    <li>Melhoria do atendimento ao cliente</li>
    <li>Comunicações diretas com o usuário</li>
    <li>Estudos e análises de dados genéricos para fins estatísticos e de mercado</li>
  </ul>

  <h2>Compartilhamento de informações</h2>
  <p>Não compartilharemos nenhuma informação pessoal do usuário com terceiros, exceto se for solicitado por autoridades judiciais.</p>

  <h2>Uso de cookies</h2>
  <p>Cookies são arquivos de texto que são armazenados no dispositivo do usuário por meio de seu navegador. Usamos cookies para melhorar a experiência do usuário em nosso chatbot. O usuário pode recusar o uso de cookies a qualquer momento, mas isso pode afetar a funcionalidade do nosso chatbot.</p>

  <h2>Segurança das informações</h2>
  <p>Todas as informações coletadas são armazenadas em servidores seguros e protegidos. Tomamos todas as medidas necessárias para garantir a segurança das informações dos nossos usuários.</p>

  <h2>Alterações nesta política de privacidade</h2>
  <p>Esta política de privacidade pode ser alterada de tempos em tempos e a versão atualizada será postada em nosso chatbot. O uso contínuo do nosso chatbot significa que o usuário concorda com nossa política de privacidade atualizada.</p>

  <h2>Contato</h2>
  <p>Qualquer dúvida ou questionamento sobre esta política de privacidade pode ser enviado para nosso e-mail de contato: contato@okahub.com.</p>
</main>

      </Container>
      
              
            

      {/* <AboutVision />

      <Divider orientation="vertical" sx={{ my: 10, mx: 'auto', width: 2, height: 40 }} />

      <AboutTeam />

      <AboutTestimonials /> */}
    </>
  );
}
