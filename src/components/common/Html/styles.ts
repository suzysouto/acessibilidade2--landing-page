import styled from '@emotion/styled'

export const Wrap = styled.div``
export const Content = styled.div`
  p,
  span,
  b,
  u,
  i,
  a {
    color: inherit;
    font-size: inherit;
    line-height: inherit;
    letter-spacing: inherit;
  }

  a {
    color: ${(p) => p.theme.colors.primary};
    text-decoration: none;
    border-bottom: 0.1em solid;
  }

  ul,
  ol {
    padding: 0;
    list-style-position: inside;
  }

  ul {
    list-style: inside;
  }

  .sl-visual-content {
    .sl-content-block {
      margin: 0;
    }

    .sl-editor__underline {
      text-decoration: underline;
    }
  }

  .sl__color {
    padding: 0.143rem 0;
    border-radius: 0.286rem;

    &__bg {
      &--red {
        background-color: #d4434340;
      }

      &--pink {
        background-color: #95218240;
      }

      &--purple {
        background-color: #57328a40;
      }

      &--blue {
        background-color: #09509740;
      }

      &--green {
        background-color: #8ed92340;
      }

      &--yellow {
        background-color: #fec72e40;
      }

      &--orange {
        background-color: #d98d2740;
      }

      &--brown {
        background-color: #96620940;
      }

      &--gray {
        background-color: #cbcdd140;
      }
    }

    &__text {
      &--red {
        color: #d44343;
      }

      &--pink {
        color: #952182;
      }

      &--purple {
        color: #57328a;
      }

      &--blue {
        color: #095097;
      }

      &--green {
        color: #8ed923;
      }

      &--yellow {
        color: #fec72e;
      }

      &--orange {
        color: #d98d27;
      }

      &--brown {
        color: #966209;
      }

      &--gray {
        color: #cbcdd1;
      }
    }
  }

  .old-visual-content {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      padding: 0.5em 0;
    }

    p:empty,
    ul {
      padding-bottom: 1.25rem;
    }
  }
`
