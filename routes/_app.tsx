import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { useScript } from "deco/hooks/useScript.ts";
import { Context } from "deco/deco.ts";

const serviceWorkerScript = () =>
  addEventListener(
    "load",
    () =>
      navigator &&
      navigator.serviceWorker &&
      navigator.serviceWorker.register("/sw.js")
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
        <script src="https://cdn.vnda.com.br/referrals/invite-widget.js?v=v27" />
        <link
          href="https://cdn.vnda.com.br/referrals/invite-widget.css?v=v27"
          rel="stylesheet"
        />

        <script src="https://apis.google.com/js/platform.js?onload=renderOptIn" async defer></script>

        <script dangerouslySetInnerHTML={{__html:`
            if (window._NEXT_DATA_) {
            console.log('Checkout - Google Merchant!');
            
            var order = window._NEXT_DATA_.props.pageProps.order;
            var order_id = order.code;
            var email = order.email;
            var estimated_delivery_date = order.expected_delivery_date;

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
          `}} >
        </script>
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(serviceWorkerScript) }}
      />
    </>
  );
});
