import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { CalendarBlank, Clock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'

const confirmFormSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'O nome precisa de no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Digita um email válido' }),
  observations: z.string().nullable(),
})

type ConfirmFormSchema = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelConfirmConfirmation: () => void
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmConfirmation,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormSchema>({
    resolver: zodResolver(confirmFormSchema),
  })

  const router = useRouter()
  const username = String(router.query.username)

  async function handleScheduleConfirm(data: ConfirmFormSchema) {
    const { name, email, observations } = data

    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      observations,
      date: schedulingDate,
    })

    onCancelConfirmConfirmation()
  }

  const describeDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')

  const describedTime = dayjs(schedulingDate).format('HH:mm[h]')

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleScheduleConfirm)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describeDate}
        </Text>
        <Text>
          <Clock />
          {describedTime}
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome completo:</Text>
        <TextInput crossOrigin={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} placeholder="Seu nome" {...register('name')} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Endereço de e-email:</Text>
        <TextInput
          crossOrigin={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} type="email"
          placeholder="jhondoe@example.com"
          {...register('email')}        />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observações:</Text>
        <TextArea {...register('observations')} />
      </label>

      <FormActions>
        <Button
          type="button"
          variant="tertiary"
          onClick={onCancelConfirmConfirmation}
        >
          Cancelar
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
