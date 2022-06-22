import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from '../assets';

// ----------------------------------------------------------------------

const LICENSES = ['Standard', 'Standard Plus', 'Extended'];

export const _homePlans = [...Array(3)].map((_, index) => ({
  license: LICENSES[index],
  commons: ['One end products', '12 months updates', '6 months of support'],
  options: ['JavaScript version', 'TypeScript version', 'Design Resources', 'Commercial applications'],
  icons: [
    'https://minimal-assets-api-dev.vercel.app/assets/images/home/ic_sketch.svg',
    'https://minimal-assets-api-dev.vercel.app/assets/images/home/ic_figma.svg',
    'https://minimal-assets-api-dev.vercel.app/assets/images/home/ic_js.svg',
    'https://minimal-assets-api-dev.vercel.app/assets/images/home/ic_ts.svg',
  ],
}));

export const _pricingPlans = [
  {
    subscription: 'Trial',
    icon: <PlanFreeIcon />,
    price: 0,
    caption: '14 dias sem compromisso',
    lists: [
      { text: 'Gestão de leads', isAvailable: true },
      { text: 'Gestão de clientes', isAvailable: true },
      { text: 'Integre com Webhooks', isAvailable: true },
      { text: 'Automatize envio Webhooks', isAvailable: false },
      { text: 'Automatize envio WhatsApp', isAvailable: false },
      { text: 'Automatize envio Email', isAvailable: false },
    ],
    labelAction: 'Criar conta',
  },
  {
    subscription: 'anual',
    icon: <PlanStarterIcon />,
    price: 82,
    caption: 'Economize R$ 204 no plano anual: R$ 984',
    lists: [
      { text: 'Gestão de leads', isAvailable: true },
      { text: 'Gestão de clientes', isAvailable: true },
      { text: 'Integre com Webhooks', isAvailable: true },
      { text: 'Automatize envio Webhooks', isAvailable: true },
      { text: 'Automatize envio WhatsApp', isAvailable: true },
      { text: 'Automatize envio Email', isAvailable: true },
    ],
    labelAction: 'Assinar',
  },
  {
    subscription: 'mensal',
    icon: <PlanPremiumIcon />,
    price: 99,
    caption: 'plano mensal padrão',
    lists: [
      { text: 'Gestão de leads', isAvailable: true },
      { text: 'Gestão de clientes', isAvailable: true },
      { text: 'Integre com Webhooks', isAvailable: true },
      { text: 'Automatize envio Webhooks', isAvailable: true },
      { text: 'Automatize envio WhatsApp', isAvailable: true },
      { text: 'Automatize envio Email', isAvailable: true },
    ],
    labelAction: 'Assinar',
  },
];
