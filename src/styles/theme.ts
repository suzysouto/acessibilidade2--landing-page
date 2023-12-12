import { Colors, Breakpoints, Typography, Theme } from './types'

///////////////////////////////////////////////////////////////////////////////
//  # Variables
//--------------------------------
//    Define all your global variables in this file
///////////////////////////////////////////////////////////////////////////////

// ## Colors
//---------------------------------
//    Colors variables are used with the syntax below
//    const EmotionComponent = styled.selector`
//      $rule:  ${colors.colorName};
//    `
//    not color names as it won't affect your project in the long run
///////////////////////////////////////////////////////////////////////////////

const colors: Colors = {
  primary: '#737288',
  primaryLight: '#73728899',
  primaryDark: '#737288CC',

  secondary: '#2A5E91',

  tertiary: '#ED730F',

  quaternary: '#2CB7BD',

  background: '#F7F3F3',
  backgroundLight: '#FFFFFF',
  invertedText: '#FFFFFF',
  invertedTextLight: '#FEFAFA',

  light: '#ECE7E4',
}

// # Media Queries breakpoints
//    MQ variables are defined as number and are used with the syntax below.
//
//      const EmotionComponent = styled.selector`
//        @media (min-width: ${props => props.theme.breakpoints.small}px) {
//          ...
//        }
//      `
//
//    Try to use abstract names and not something specific as mobile, as it
//    won't affect your project in the long run
///////////////////////////////////////////////////////////////////////////////
const breakpoints: Breakpoints = {
  small: 769,

  maxWidthDesk: '72rem',
}

const typography: Typography = {
  h1: '700 1.75rem "Inter", sans-serif',
  h2: '700 1.5rem "Inter", sans-serif',
  h3: '700 1.25rem "Inter", sans-serif',
  h4: '700 1.125rem "Inter", sans-serif',
  paragraph: '300 0.875rem "Inter", sans-serif',

  h1Desk: '700 2.75rem "Inter", sans-serif',
  h2Desk: '700 2.25rem "Inter", sans-serif',
  h3Desk: '700 1.75rem "Inter", sans-serif',
  h4Desk: '700 1.5rem "Inter", sans-serif',
  paragraphDesk: '300 1.125rem "Inter", sans-serif',

  base: '100%',
  baseDesk: '100%',
  display: '"Inter", sans-serif',
  body: '"Inter", sans-serif',

  size1: '2.75rem',
  size2: '2.25rem',
  size3: '1.75rem',
  size4: '1.5rem',
  size5: '1.25rem',
  size6: '1rem',
  large: '1.25rem',
  medium: '1.125rem',
  normal: '1rem',
  small: '0.875rem',
}

const theme: Theme = { colors, breakpoints, typography }

export default theme
