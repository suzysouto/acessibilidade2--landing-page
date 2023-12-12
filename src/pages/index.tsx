import { useMemo, useState } from 'react'
import Starlight from '@starlightcms/react-sdk'
import { Field } from 'formik'

import { withHOC, withHOF } from 'helpers'
import { useForm } from 'hooks'

import Container from 'components/layout/Container'
import Modal from 'components/common/Modal'
import Form from 'components/common/Form'

import {
  Center,
  Close,
  ErrorMessage,
  Input,
  Logo,
  Message,
  ModalWrap,
  OpenModal,
  Submit,
  Subtitle,
  Textarea,
} from 'components/pages/index'
import Select from 'components/common/Select'

const { getStaticProps } = withHOF(async ({ revalidate, customData }) => {
  const page = await Starlight.singletons.get('home')
  return {
    revalidate,
    props: {
      page: page?.data?.data ?? {},
      ...customData,
    },
  }
})
export { getStaticProps }
export default withHOC(
  ({ page }) => {
    const { state, fields } = useForm({ Input, Textarea })
    const { nome, email, telefone, mensagem } = fields
    const [showModal, setShowModal] = useState(false)
    const hide = () => {
      setShowModal(false)
    }
    const defaultValue = {
      title: 'Default',
      slug: 'default',
    }
    const [currentValue, setCurrentValue] = useState(defaultValue)
    const options = useMemo(() => {
      const arr = new Array(100).fill(null)
      return arr.map((_, index) => {
        if (index === 2)
          return {
            title: 'Default',
            slug: 'default',
          }
        return {
          title: `Teste ${index}`,
          slug: `test-${index}`,
        }
      })
    }, [])
    return (
      <Center>
        <Container>
          <Logo page={page} />
          <Subtitle>
            <span data-teste="hello world!">{page.subtitle}</span>
          </Subtitle>
          <OpenModal
            onClick={() => {
              setShowModal(true)
            }}
          >
            Abrir modal
          </OpenModal>
          {showModal ? (
            <Modal hide={hide}>
              <ModalWrap>
                <Form
                  fields={{ nome, email, telefone, mensagem }}
                  url={`${process.env.NEXT_PUBLIC_STARLIGHT_FORM_CONTACT}/contato`}
                  Error={ErrorMessage}
                  on={{
                    success: (_, { setStatus }) => {
                      state.setPhoneNumber('')
                      setStatus({ success: 'sucesso' })
                    },
                    error: (_, { setStatus }) => {
                      setStatus({ error: 'erro' })
                    },
                    // submit: (values, { setSubmitting }) => {
                    //   const data = new FormData()
                    //   Object.keys(fields).map((name) => {
                    //     if (values[name]) data.append(name, values[name])
                    //   })
                    //   console.log({ data })
                    //   setSubmitting(false)
                    // },
                  }}
                >
                  {({ isSubmitting, status, customField }) => (
                    <>
                      <Close onClick={hide} />
                      {Object.keys({ nome, email, telefone, mensagem }).map(
                        (name, index) => (
                          <Field
                            key={index}
                            name={name}
                            {...fields[name].fieldProps}
                          >
                            {customField(fields[name])}
                          </Field>
                        ),
                      )}
                      <Submit type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'enviando' : 'enviar'}
                      </Submit>
                      {status?.success || status?.error ? (
                        <Message className={status.error ? 'error' : null}>
                          {status.success || status.error}
                        </Message>
                      ) : null}
                    </>
                  )}
                </Form>
              </ModalWrap>
            </Modal>
          ) : null}
          <div>{currentValue?.title}</div>
          <Select
            name="test"
            setCurrentValue={setCurrentValue}
            currentValue={currentValue}
            options={options}
          />
        </Container>
      </Center>
    )
  },
  {
    metaTags: () => {
      return {
        title: `Página Inicial`,
      }
    },
  },
)
