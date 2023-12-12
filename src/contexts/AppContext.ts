import React, { Dispatch, SetStateAction } from 'react'
import Glide from '@glidejs/glide'

export interface GenericDataTypes {
  data: { [k: string]: any }
}

interface SliderTypes {
  [k: string]: Glide
}

interface StateTypes {
  header: GenericDataTypes
  footer: GenericDataTypes
  slider: SliderTypes
  setSlider?: (SliderTypes) => void
}

export interface StoredTypes {
  state: StateTypes
  update?: Dispatch<SetStateAction<StoredTypes>>
}
const AppContext = React.createContext<StoredTypes>({
  state: {
    header: null,
    footer: null,
    slider: {},
  },
})
export default AppContext
