import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
import api from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock
import { countries } from '../../../_mock';
// components
import Label from '../../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';
import useAuth from '../../../hooks/useAuth'


// ----------------------------------------------------------------------

UserNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  editingWorkspace: PropTypes.object,
};

export default function UserNewEditForm({ isEdit = false, editingWorkspace }) {
  console.log('== editingWorkspace >', editingWorkspace)
  const { push } = useRouter();
  const { updateWorkspaces } = useAuth()
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    company: Yup.string().required('Nome do negócio é obrigatório'),
    email: Yup.string().email('Formato inválido'),
    whatsapp: Yup.string(),
    // name: Yup.string().required('Name is required'),
    // address: Yup.string().required('Address is required'),
    // country: Yup.string().required('country is required'),
    // state: Yup.string().required('State is required'),
    // city: Yup.string().required('City is required'),
    // role: Yup.string().required('Role Number is required'),
    // avatarUrl: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
  });

  const defaultValues = useMemo(
    () => ({
      company: editingWorkspace?.businessId.name || '',
      email: editingWorkspace?.businessId.email || '',
      whatsapp: editingWorkspace?.businessId.whatsapp || '',
      phoneNumber: editingWorkspace?.businessId.phoneNumber || '',
      // name: currentUser?.name || '',
      // address: currentUser?.address || '',
      // country: currentUser?.country || '',
      // state: currentUser?.state || '',
      // city: currentUser?.city || '',
      // zipCode: currentUser?.zipCode || '',
      // avatarUrl: currentUser?.avatarUrl || '',
      // isVerified: currentUser?.isVerified || true,
      // status: currentUser?.status,
      // role: currentUser?.role || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editingWorkspace]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && editingWorkspace) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, editingWorkspace]);

  const onSubmit = async (data) => {
    console.log('onSubmit business', data)
    try {
      const response = isEdit ? await api.put('v1/business', { ...data, editingWorkspaceId: editingWorkspace._id }) : await api.post('v1/business', data)
      const { workspaceSession } = response.data
      console.log(`${ isEdit ? 'edited workspace' : 'created workspace'}`, workspaceSession)
      updateWorkspaces(workspaceSession)
      reset();
      enqueueSnackbar(isEdit ? 'Mudança concluída' : 'Novo negócio criado');
      push(PATH_DASHBOARD.business.list);
    } catch (error) {
      enqueueSnackbar(error.message && error.message, { variant: 'error' });
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'avatarUrl',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {/* <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3 }}>
            {isEdit && (
              <Label
                color={values.status !== 'active' ? 'error' : 'success'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

            {isEdit && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== 'active'}
                        onChange={(event) => field.onChange(event.target.checked ? 'banned' : 'active')}
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Banned
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}

            <RHFSwitch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email Verified
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Disabling this will automatically send the user a verification email
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />
          </Card>
        </Grid> */}

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 1,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
              }}
            >
              <RHFTextField name="company" label="Nome do negócio" />
              <RHFTextField name="email" label="Email do negócio" />
              <RHFTextField name="whatsapp" label="WhatsApp do negócio" placeholder="Ex.: 5511984655006" />
              <Typography variant="body2">Apenas números sem espaço com (código do país) + (código de área) + (número do telefone)</Typography>
              <RHFTextField name="phoneNumber" label="Phone Number" />

              {/* <RHFSelect name="country" label="Country" placeholder="Country">
                <option value="" />
                {countries.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="state" label="State/Region" />
              <RHFTextField name="city" label="City" />
              <RHFTextField name="address" label="Address" />
              <RHFTextField name="zipCode" label="Zip/Code" />
              <RHFTextField name="role" label="Role" /> */}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Criar negócio' : 'Salvar mudança'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
