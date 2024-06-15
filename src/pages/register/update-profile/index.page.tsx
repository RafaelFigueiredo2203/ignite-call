import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Heading, MultiStep, Text, TextArea } from '@ignite-ui/react'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Container, Header } from '../styles'
import { FormAnnotation, ProfileBox } from './styles'

const updateprofileSchema = z.object({
  bio: z.string(),
})

type UpdateProfileSchema = z.infer<typeof updateprofileSchema>

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,

    formState: { isSubmitting },
  } = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateprofileSchema),
  })

  const session = useSession()

  async function handleUpdateProfile() {}

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>
        <MultiStep size={4} currentStep={1} />
      </Header>

      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text size="sm">Foto do perfil</Text>
        </label>

        <label>
          <Text size="sm"> Sobre você</Text>
          <TextArea placeholder="Seu nome" {...register('bio')} />
          <FormAnnotation>
            Fale um pouco sobre você. Isto será exibido em sua página
          </FormAnnotation>
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Finalizar
          <ArrowRight />
        </Button>
      </ProfileBox>
    </Container>
  )
}

export const getServerSideprops: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  return {
    props: {
      session,
    },
  }
}
