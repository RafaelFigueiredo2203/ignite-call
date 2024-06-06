import { Button, TextInput } from '@ignite-ui/react'
import { Form } from './styles'

export function ClaimUsernameForm() {
  return (
    <Form>
      <TextInput size="sm" prefix="ignite.com/" placeholder="Seu usuário " />

      <Button size="sm" type="submit">
        Reservar usuário
      </Button>
    </Form>
  )
}
