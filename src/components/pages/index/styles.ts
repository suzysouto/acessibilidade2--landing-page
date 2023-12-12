import styled from '@emotion/styled'

export const Center = styled.div`
  display: inline-block;
  margin: 0 auto;
  text-align: center;
`
export const Subtitle = styled.p`
  text-align: center;
`
export const OpenModal = styled.div`
  display: inline-block;
  margin: 1rem 0;
  cursor: default;
`
export const ModalWrap = styled.div`
  background-color: #fff;
`
export const Input = styled.input`
  display: block;
`
export const Textarea = styled.textarea`
  display: block;
`
export const Submit = styled.button`
  display: block;
`
export const Message = styled.span`
  display: block;
`
export const ErrorMessage = styled.span`
  display: block;
`
export const Close = styled.span`
  position: absolute;
  bottom: 100%;
  left: 100%;

  &::before {
    content: 'X';
  }
`
