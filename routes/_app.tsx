import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { useScript } from "@deco/deco/hooks";
import { Context } from "@deco/deco";

// Declaração para TypeScript reconhecer `gapi`
declare global {
  interface Window {
    gapi: any;
    renderBadge: () => void;
  }
}

// Service Worker Script
const serviceWorkerScript = () =>
  addEventListener(
    "load",
    () =>
      navigator &&
      navigator.serviceWorker &&
      navigator.serviceWorker.register("/sw.js"),
  );

export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();

  return (
    <>
      {/* Include Icons and manifest */}
      <Head>
        {/* Enable View Transitions API */}
        <style
          dangerouslySetInnerHTML={{
            __html: `@view-transition { navigation: auto; }`,
          }}
        />

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />

        {/* Custom Styles */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .rating-badge-container {
                z-index: 30 !important;
                background-color: #fff;
                border-top-left-radius: 4px;
                box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2) !important;
                padding: 8px !important;
                height: 70px !important;
                bottom: -6px !important;
                right: -4px !important;
                width: 170px !important;
                display: flex !important;
              }

              .rating-badge-container iframe {
                display: none !important;
              }

              .rating-badge-container a {
                top: 0;
                left: 0;
                position: absolute;
                width: 100%;
                height: 100%;
              }
            `,
          }}
        />

        {/* Google Platform Script */}
        <script
          src="https://apis.google.com/js/platform.js?onload=renderBadge"
          async
          defer
        >
        </script>

        {/* Google Badge Script */}
        {/* <script
          async
          defer
          dangerouslySetInnerHTML={{
            __html: `
              window.renderBadge = function() {
                const ratingBadgeContainer = document.createElement("div");
                ratingBadgeContainer.classList.add('rating-badge-container')
                ratingBadgeContainer.style.position = "fixed";
                ratingBadgeContainer.style.bottom = "16px";
                ratingBadgeContainer.style.right = "16px";
                ratingBadgeContainer.style.display = "none";
                document.body.appendChild(ratingBadgeContainer);

                // Load the Google Badge
                  window.gapi.load('ratingbadge', function() {
                      window.gapi.ratingbadge.render(ratingBadgeContainer, {
                          "merchant_id": "545541741",
                          "position": "BOTTOM_RIGHT"
                      }, function() {
                          // Callback executado quando o badge é renderizado
                          const iframe = ratingBadgeContainer.querySelector("iframe");
                          if (iframe) {
                              iframe.title = "Avaliações do Google";
                          }
                      });

                  // Custom Link
                  const newLink = document.createElement('a');
                  newLink.href = 'https://customerreviews.google.com/v/merchant?q=progressivaorganica.com.br&c=BR&v=19&hl=pt_BR';
                  newLink.setAttribute('aria-label', 'Avaliações do Google');
                  newLink.target = '_blank';
                  ratingBadgeContainer.appendChild(newLink);
                  
                  const newImage = document.createElement('img');
                  newImage.src = 'https://cdn.vnda.dev/200x/progressivaorganica/2025/01/29/15_1_5_512_google_badge.png?v=1738175671';
                  newImage.alt = 'google-badge';
                  
                  newLink.appendChild(newImage);
                });
              };
            `,
          }}
        /> */}

        {/* Google Survey Opt-In Script */}
        <script
          async
          defer
          dangerouslySetInnerHTML={{
            __html: `
              if (window._NEXT_DATA_) {
                console.log('Checkout - Google Merchant!');

                const order = window._NEXT_DATA_.props.pageProps.order;
                const order_id = order.code;
                const email = order.email;
                const estimated_delivery_date = order.expected_delivery_date;

                window.gapi.load('surveyoptin', function() {
                  window.gapi.surveyoptin.render({
                    "merchant_id": "545541741",
                    "order_id": order_id,
                    "email": email,
                    "delivery_country": "BR",
                    "estimated_delivery_date": estimated_delivery_date,
                  });
                });
              }
            `,
          }}
        />
      </Head>

      {/* Render the application */}
      <ctx.Component />

      {/* Service Worker Script */}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(serviceWorkerScript),
        }}
      />
    </>
  );
});
