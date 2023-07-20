import { GetServerSidePropsContext } from 'next';


export async function checkUserAuthentication(context: GetServerSidePropsContext) {

  const isProduction = process.env.NODE_ENV === "production"
  const serverAddress = process.env.NEXT_PUBLIC_SERVER_ADDRESS || '';

  try {

    !!!isProduction && (process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0");

    const response = await fetch(isProduction ? serverAddress + '/api/check-session' : "https://nginx" + '/api/check-session', {
      headers: {
        'Cookie': context.req.headers.cookie || ''
      },
    });

    const responseData = await response.json();

    if (!responseData.isAuthenticated) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  } catch (error) {
    console.error('Failed to check authentication', error);
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
