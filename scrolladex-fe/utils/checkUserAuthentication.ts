import { GetServerSidePropsContext } from 'next';


export async function checkUserAuthentication(context: GetServerSidePropsContext) {
    try {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; //////////////////////////// REMOVE FOR PRODUCTION
  
      const response = await fetch('https://nginx/api/check-session', {
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
  