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
  addEventListener("load", () =>
    navigator &&
    navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));

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
                background-color: #fff;
                border-top-left-radius: 4px;
                box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2) !important;
                padding: 8px !important;
                height: 70px !important;
                bottom: -6px !important;
                right: -4px !important;
                width: 170px !important;
              }

              .rating-badge-container iframe {
                border-top-left-radius: 4px;
                height: 100% !important;
                width: 100% !important;
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.renderBadge = function() {
                const ratingBadgeContainer = document.createElement("div");
                ratingBadgeContainer.classList.add('rating-badge-container')
                ratingBadgeContainer.style.position = "fixed";
                ratingBadgeContainer.style.bottom = "16px";
                ratingBadgeContainer.style.right = "16px";
                document.body.appendChild(ratingBadgeContainer);

                // Load the Google Badge
                window.gapi.load('ratingbadge', function() {
                  window.gapi.ratingbadge.render(ratingBadgeContainer, {
                    "merchant_id": "545541741",
                    "position": "BOTTOM_RIGHT"
                  });

                  // Custom Link
                  const newLink = document.createElement('a');
                  newLink.href = 'https://customerreviews.google.com/v/merchant?q=progressivaorganica.com.br&c=BR&v=19&hl=pt_BR';
                  newLink.target = '_blank';
                  ratingBadgeContainer.appendChild(newLink);
                });
              };
            `,
          }}
        />

        {/* Google Survey Opt-In Script */}
        <script
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
