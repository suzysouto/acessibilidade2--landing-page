const Redirect = () => null

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  }
}

export default Redirect
