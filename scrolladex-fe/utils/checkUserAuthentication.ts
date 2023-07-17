import { GetServerSidePropsContext } from 'next';


export async function checkUserAuthentication(context: GetServerSidePropsContext) {
  try {
    if (process.env.NODE_ENV !== "production") {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }

    const response = await fetch(process.env.NEXT_PUBLIC_SERVER_ADDRESS + '/api/check-session', {
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
