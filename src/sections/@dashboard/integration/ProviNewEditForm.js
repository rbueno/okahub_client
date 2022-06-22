import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, CardHeader, Divider, Box, CardContent, Button } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFEditor,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadMultiFile,
} from '../../../components/hook-form';
import Label from '../../../components/Label'
import api from '../../../utils/axios'

// ----------------------------------------------------------------------

const GENDER_OPTION = [
  { label: 'Men', value: 'Men' },
  { label: 'Women', value: 'Women' },
  { label: 'Kids', value: 'Kids' },
];

const CATEGORY_OPTION = [
  { group: 'Clothing', classify: ['Shirts', 'T-shirts', 'Jeans', 'Leather'] },
  { group: 'Tailored', classify: ['Suits', 'Blazers', 'Trousers', 'Waistcoats'] },
  { group: 'Accessories', classify: ['Shoes', 'Backpacks and bags', 'Bracelets', 'Face masks'] },
];

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots',
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

ProviNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function ProviNewEditForm({ isEdit, currentProduct }) {
  const { push } = useRouter();
  const theme = useTheme()

  const { enqueueSnackbar } = useSnackbar();
  const [isRemoving, setIsRemoving] = useState(false)

  const NewProductSchema = Yup.object().shape({
    apiToken: Yup.string().required('Api Token é obrigatório'),
    // description: Yup.string().required('Description is required'),
    // images: Yup.array().min(1, 'Images is required'),
    // price: Yup.number().moreThan(0, 'Price should not be $0.00'),
  });

  const defaultValues = useMemo(
    () => ({
      apiToken: currentProduct?.apiToken || '',
      // description: currentProduct?.description || '',
      // images: currentProduct?.images || [],
      // code: currentProduct?.code || '',
      // sku: currentProduct?.sku || '',
      // price: currentProduct?.price || 0,
      // priceSale: currentProduct?.priceSale || 0,
      // tags: currentProduct?.tags || [TAGS_OPTION[0]],
      // inStock: true,
      // taxes: true,
      // gender: currentProduct?.gender || GENDER_OPTION[2].value,
      // category: currentProduct?.category || CATEGORY_OPTION[0].classify[1],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProduct]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentProduct) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);

  const removeIntegration = async () => {
    setIsRemoving(true)
    try {
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await api.delete(`/v1/app/${currentProduct._id}`)
      console.log('response.data', response.data)

      // updateWorkspaces(workspaceSession)
      reset();
      enqueueSnackbar(isEdit ? 'Integração removida' : 'App Provi Adicionado');
      push(PATH_DASHBOARD.integration.list);
    } catch (error) {
      let errorMessage = ''
      if (typeof error === 'string') errorMessage = error
      if (typeof error === 'object') errorMessage = error.message
      enqueueSnackbar(errorMessage, { variant: 'error' });
      console.error(error);
    } finally {
      setIsRemoving(false)
    }
  }
  const onSubmit = async (data) => {
const { apiToken } = data
const body = {
  settingsData: { apiToken },
  source: 'provi'
}
console.log('body', body)

    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await api.post('/v1/app', body)
      console.log('response.data', response.data)

      // updateWorkspaces(workspaceSession)
      reset();
      enqueueSnackbar(isEdit ? 'Edição concluída' : 'App Provi Adicionado');
      push(PATH_DASHBOARD.integration.list);
    } catch (error) {
      let errorMessage = ''
      if (typeof error === 'string') errorMessage = error
      if (typeof error === 'object') errorMessage = error.message
      enqueueSnackbar(errorMessage, { variant: 'error' });
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const images = values.images || [];

      setValue('images', [
        ...images,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    [setValue, values.images]
  );

  const handleRemoveAll = () => {
    setValue('images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images?.filter((_file) => _file !== file);
    setValue('images', filteredItems);
  };

  return (
    <>
    <Card sx={{ mb: 5 }}>
      <CardHeader
        subheader="Confira os recursos disponível ao vincular a Provi"
        title="Provi"
      />
      <Divider />
      <CardContent>

        <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Funil de vendas</Typography>
        <Typography>Acompanhe cada aluno durante o funil de vendas.</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Acompanhamento mensal</Typography>
        <Typography>Acompanhe o status atual e fluxo de pagamento dos alunos todos os meses.</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
        <Typography variant="h6">WhatsApp e email</Typography>
        <Typography>Facilidade para enviar WhatsApp e Email individuais.</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Anotações</Typography>
        <Typography>Faça anotações para cada aluno durante o funil de venda ou atividade mensal.</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Timeline de atividade</Typography>
        <Typography>Acompanhe todas as atualizações individuais de cada aluno ao longo do tempo.</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Deal Status</Typography>
        <Typography>Organização de status do aluno separado por status de negócio como OPEN, LOST, WON, ACTIVE, .</Typography>
        <Typography>- Funil de vendas: OPEN, LOST, WON</Typography>
        <Typography>- Acompanhamento mensal: ACTIVE, CHURN</Typography>
        </Box>

        <Divider />

        <Box sx={{ mt: 2, mb: 2 }}>
        <Typography variant="h6">Como configurar a Provi</Typography>
        <Typography>Okahub faz tudo automaticamente. Você precisa apenas adicionar a sua API Token e clicar em vincular. Para obter a sua api Token com a Provi, envie um email para dev@provi.com.br solicitando a api-token para acesso a Provi API.</Typography>
        </Box>

        {/* <Grid
          container
          spacing={6}
          wrap="wrap"
        >
          
          <Grid
            item
            md={4}
            sm={6}
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
            xs={12}
          >
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h6"
            >
              Provi
            </Typography>
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                />
              )}
              label="Email"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                />
              )}
              label="Push Notifications"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Text Messages"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                />
              )}
              label="Phone calls"
            />
          </Grid>
          <Grid
            item
            md={4}
            sm={6}
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
            xs={12}
          >
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h6"
            >
              Messages
            </Typography>
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                />
              )}
              label="Email"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Push Notifications"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                />
              )}
              label="Phone calls"
            />
          </Grid>
        </Grid> */}
      </CardContent>
      {/* <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          variant="contained"
        >
          Save
        </Button>
      </Box> */}
    </Card>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          
          <Card sx={{ p: 3 }}>
            
          <Box mb={2}>
          <CardHeader
          // subheader="Adicionar e editar api-token"
          title="Provi API-Token"
        />
        {/* <Divider /> */}
          </Box>

            <Stack spacing={3}>
              {!isEdit && <RHFTextField name="apiToken" label="Adicionar Provi Api-Token aqui" />}
              {isEdit && <TextField label={currentProduct?.options?.apiToken} disabled variant='filled' />}

              {/* <div>
                <RHFEditor simple name="description" />
              </div> */}

              {/* <div>
                <LabelStyle>Images</LabelStyle>
                <RHFUploadMultiFile
                  showPreview
                  name="images"
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                  onUpload={() => console.log('ON UPLOAD')}
                />
              </div> */}
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              {
                isEdit && <Box display='flex' sx={{ mb: 2 }}>
                <Typography sx={{ mr: 2}}>Status:</Typography>
                <Label
                  variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                  color={
                    (currentProduct?.status === 'live' && 'success') || (currentProduct?.status === 'pending_configuration' && 'warning') || 'error'
                  }
                  sx={{ textTransform: 'capitalize' }}
                >
                  {currentProduct ? currentProduct?.status : 'inactive'}
                </Label>

              </Box>
              }
            <LabelStyle>
            {
              isEdit && <>Ao clicar em "remover integração", seu app Provi irá deixar de receber novos dados. Você terá que criar um novo app Provi caso queira voltar a receber atualizações de sua vendas.</>
            }
            {
              !isEdit && <>Ao clicar em "criar integração", seu app Provi estará ativo e você passara a receber atualizações de sua vendas.</>
            }
            </LabelStyle>

              {/* <Stack spacing={3} mt={2}>
                <RHFTextField name="code" label="Product Code" />

                <RHFTextField name="sku" label="Product SKU" />

                <div>
                  <LabelStyle>Gender</LabelStyle>
                  <RHFRadioGroup
                    name="gender"
                    options={GENDER_OPTION}
                    sx={{
                      '& .MuiFormControlLabel-root': { mr: 4 },
                    }}
                  />
                </div>

                <RHFSelect name="category" label="Category">
                  {CATEGORY_OPTION.map((category) => (
                    <optgroup key={category.group} label={category.group}>
                      {category.classify.map((classify) => (
                        <option key={classify} value={classify}>
                          {classify}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </RHFSelect>

                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      multiple
                      freeSolo
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={TAGS_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <TextField label="Tags" {...params} />}
                    />
                  )}
                />
              </Stack> */}
            </Card>

            {/* <Card sx={{ p: 3 }}>
              <Stack spacing={3} mb={2}>
                <RHFTextField
                  name="price"
                  label="Regular Price"
                  placeholder="0.00"
                  value={getValues('price') === 0 ? '' : getValues('price')}
                  onChange={(event) => setValue('price', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    type: 'number',
                  }}
                />

                <RHFTextField
                  name="priceSale"
                  label="Sale Price"
                  placeholder="0.00"
                  value={getValues('priceSale') === 0 ? '' : getValues('priceSale')}
                  onChange={(event) => setValue('price', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    type: 'number',
                  }}
                />
              </Stack>

              <RHFSwitch name="taxes" label="Price includes taxes" />
            </Card> */}
            {
              isEdit ? (
                <LoadingButton color='error' type='button' variant="contained" size="large" loading={isRemoving} onClick={() => removeIntegration()}>
                  Remover Integração
                </LoadingButton>
              ) : (
                <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                  Criar Integração
                </LoadingButton>
              )
            }


          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
    </>
  );
}
