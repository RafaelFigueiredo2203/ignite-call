import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormAnnotation } from './styles'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(4, { message: 'O usuário precisa ter mais que 3 letras!' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens!',
    })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameForm = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameForm>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  function hanldeClaimUsername(data: ClaimUsernameForm) {
    console.log(data)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(hanldeClaimUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="Seu usuário "
          crossOrigin={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          {...register('username')}
        />

        <Button size="sm" type="submit">
          Reservar
          <ArrowRight />
        </Button>
      </Form>

      <FormAnnotation>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : 'Digite o nome do usuário desejado!'}
        </Text>
      </FormAnnotation>
    </>
  )
}