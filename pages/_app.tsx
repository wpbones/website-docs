import "@mantine/core/styles.css";
import "./styles.css";

import "@gfazioli/mantine-marquee/styles.css";

import { docsTheme } from "@components/docs-theme";
import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";

export default function WPBonesDocsApp({ Component, pageProps }) {
  // DON'T REMOVE THIS CODE - IT'S REQUIRED FOR COLOR SCHEME SUPPORT
  const [colorScheme] = useState();

  const theme = createTheme(docsTheme);

  useEffect(() => {
    const observeStyleChanges = target => {
      const observer = new MutationObserver(mutationsList => {
        mutationsList.forEach(mutation => {
          if (mutation.type === "attributes" && mutation.attributeName === "style") {
            const styleValue = target.getAttribute("style");
            const colorSchemeMatch = styleValue?.match(/color-scheme:\s*(light|dark);/);
            if (colorSchemeMatch) {
              const colorScheme = colorSchemeMatch[1]; // "light" or "dark"

              htmlElement.setAttribute("data-mantine-color-scheme", colorScheme);
            }
          }
        });
      });

      observer.observe(target, { attributes: true, attributeFilter: ["style"] });

      return observer;
    };

    const htmlElement = document.documentElement;

    if (htmlElement) {
      const observer = observeStyleChanges(htmlElement);

      if (colorScheme === undefined) {
        const styleValue = htmlElement.getAttribute("style");
        const colorSchemeMatch = styleValue?.match(/color-scheme:\s*(light|dark);/);

        if (colorSchemeMatch) {
          const colorScheme = colorSchemeMatch[1]; // "light" or "dark"

          htmlElement.setAttribute("data-mantine-color-scheme", colorScheme);
        }
      }

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    <>
      <ColorSchemeScript nonce="8IBTHwOdqNKAWeKl7plt8g==" defaultColorScheme={"auto"} />
      <MantineProvider theme={theme}>
        <Component {...pageProps} />
        <GoogleTagManager gtmId="GTM-WGWNN65V" />
        <Analytics />
      </MantineProvider>
    </>
  );
}
