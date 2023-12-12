import { useState } from 'react'
import { string } from 'yup'
import InputMask from 'react-input-mask'

const schema = {
  minLength: 'muito curto',
  required: 'obrigatório',
  invalid: 'inválido',
}

export const useForm = ({ Input, Textarea }) => {
  const [phoneNumber, setPhoneNumber] = useState('')

  return {
    state: { phoneNumber, setPhoneNumber },
    fields: {
      nome: {
        initialValue: 'Nome Inicial',
        schema: string().min(3, schema.minLength).required(schema.required),
        Component: Input,
        props: {
          type: 'text',
          required: true,
          placeholder: '',
        },
      },
      email: {
        schema: string().email(schema.invalid).required(schema.required),
        Component: Input,
        props: {
          type: 'email',
          required: true,
          placeholder: 'Insira um E-mail',
        },
      },
      telefone: {
        schema: string()
          .matches(/\(\d{2}\) \d{4,5}-\d{4}/, schema.invalid)
          .required(schema.required),
        Component: Input,
        fieldProps: {
          onChange: (e) => {
            setPhoneNumber(e.target.value)
          },
        },
        props: {
          as: InputMask,
          type: 'tel',
          inputMode: 'numeric',
          required: true,
          placeholder: '(99) 99999-9999',
          mask:
            phoneNumber.charAt(5) === '9'
              ? '(99) 99999-9999'
              : '(99) 9999-9999',
          formatChars: { '9': '[0-9]', t: '[0-9-]', '?': '[0-9 ]' },
          maskChar: null,
        },
      },
      mensagem: {
        schema: string().required(schema.required),
        Component: Textarea,
        props: {
          rows: 4,
          required: true,
          placeholder: '',
        },
      },
    },
  }
}
