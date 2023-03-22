import "../styles/globals.css";

import { Box, ThemeProvider } from "@mui/material";
import { theme } from "../utils/theme";
import createEmotionCache from "../utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import RtL from "@/components/Rtl";
import Navbar from "@/components/navbar/Navbar";

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  return (
    <RtL>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
            <Navbar/>
            <Component {...pageProps} />
            
        </ThemeProvider>
      </CacheProvider>
    </RtL>
  );
}

export default MyApp;
