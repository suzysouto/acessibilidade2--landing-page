import axios, { AxiosResponse } from 'axios'
import { Formik, Form as FormBase } from 'formik'
import { object } from 'yup'

import { FormTypes } from './types'
import { Content, ErrorMessage } from './styles'

const Form = ({
  fields,
  url,
  on = {},
  Error = ErrorMessage,
  children,
}: FormTypes) => {
  const initialValues = {}
  const schema = {}
  Object.keys(fields).map((name) => {
    initialValues[name] = fields[name].initialValue ?? ''
    schema[name] = fields[name].schema
  })
  const validationSchema = object(schema)

  return (
    <Content>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, helpers) => {
          if (on.submit) {
            on.submit(values, helpers)
            return
          }
          if (!url) return
          const data = new FormData()
          Object.keys(fields).map(
            (name) => values[name] && data.append(name, values[name]),
          )
          const { resetForm, setFieldValue, setErrors, setSubmitting } = helpers
          return axios
            .post(url, data)
            .then((res: AxiosResponse & any) => {
              if (res?.status === 200) {
                resetForm()
                Object.keys(fields).map((name) =>
                  setFieldValue(name, fields[name].initialValue ?? ''),
                )
                if (on.success) on.success(values, helpers)
              }
            })
            .catch(({ errors }) => {
              setErrors(errors)
              if (on.error) on.error(values, helpers)
            })
            .finally(() => {
              setSubmitting(false)
            })
        }}
      >
        {({ ...props }) => (
          <FormBase>
            {children({
              ...props,
              customField:
                (item) =>
                ({ field, meta }) => {
                  const { Component, props } = item
                  return (
                    <>
                      <Component {...field} {...props} />
                      <Error>
                        {meta.touched && meta.error ? meta.error : null}&nbsp;
                      </Error>
                    </>
                  )
                },
            })}
          </FormBase>
        )}
      </Formik>
    </Content>
  )
}

export default Form
