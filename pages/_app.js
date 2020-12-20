import { ChakraProvider } from '@chakra-ui/react';

import { AuthProvider } from '@/lib/auth';
import theme from '@/styles/theme';
import { css, Global } from '@emotion/react';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Global
          styles={css`
            html {
              min-width: 360px;
              scroll-behavior: smooth;
            }
            #__next {
              display: flex;
              flex-direction: column;
              min-height: 100vh;
            }
          `}
        />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
