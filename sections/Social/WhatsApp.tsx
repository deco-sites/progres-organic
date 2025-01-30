export interface Props {
  phone?: number;
}

function WhatsApp({ phone }: Props) {
  if (!phone) {
    return null;
  }

  return (
    <a
      href={`https://api.whatsapp.com/send/?phone=${phone}&text&type=phone_number&app_absent=0`}
      class="fixed right-3 z-40"
      style={{ bottom: "4.8rem" }}
      aria-label="Chat on WhatsApp"
      target="blank"
    >
      <button
        class="bg-[#45D268] text-white p-2 rounded-full shadow-lg"
        aria-label="Chat on WhatsApp"
      >
        <svg
          width={32}
          height={32}
          stroke="0.01"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M22.9323 7.90694C20.9558 6.22108 18.432 5.31448 15.8345 5.35728C13.237 5.40008 10.7444 6.38934 8.82449 8.13941C6.90458 9.88948 5.68934 12.28 5.40682 14.8625C5.1243 17.4449 5.79392 20.0417 7.29002 22.1655C7.55783 22.5456 7.60822 23.0378 7.42302 23.4644L6.21292 26.2513L10.4994 25.4874C10.7781 25.4377 11.0654 25.478 11.3197 25.6025C13.6528 26.7449 16.3227 26.9965 18.8283 26.3102C21.3338 25.6239 23.5028 24.0467 24.9281 21.8748C26.3534 19.7029 26.9371 17.0855 26.5696 14.5138C26.2022 11.942 24.9088 9.5928 22.9323 7.90694ZM15.7905 2.69098C19.0374 2.63748 22.1922 3.77072 24.6628 5.87805C27.1335 7.98537 28.7502 10.9219 29.2095 14.1366C29.6688 17.3512 28.9392 20.623 27.1575 23.3379C25.3759 26.0528 22.6647 28.0242 19.5328 28.8821C16.5444 29.7007 13.3691 29.4518 10.5508 28.1869L4.23394 29.3127C3.75031 29.3988 3.25846 29.2121 2.95388 28.8267C2.64929 28.4413 2.58133 27.9196 2.77698 27.469L4.68893 23.0657C3.11582 20.5372 2.43052 17.5472 2.75597 14.5725C3.10912 11.3444 4.62818 8.35622 7.02806 6.16864C9.42795 3.98106 12.5437 2.74448 15.7905 2.69098Z"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.2525 10.5858C11.6275 10.2107 12.1362 10 12.6667 10C13.1971 10 13.7058 10.2107 14.0809 10.5858C14.456 10.9609 14.6667 11.4696 14.6667 12V13.3333C14.6667 13.8638 14.456 14.3725 14.0809 14.7475C13.946 14.8824 13.7939 14.996 13.6296 15.0863C13.8915 15.8388 14.3213 16.5304 14.8954 17.1046C15.4696 17.6787 16.1612 18.1085 16.9137 18.3704C17.004 18.2061 17.1176 18.054 17.2525 17.9191C17.6275 17.544 18.1362 17.3333 18.6667 17.3333H20C20.5304 17.3333 21.0391 17.544 21.4142 17.9191C21.7893 18.2942 22 18.8029 22 19.3333C22 19.8638 21.7893 20.3725 21.4142 20.7475C21.0391 21.1226 20.5304 21.3333 20 21.3333H18.6667C16.5449 21.3333 14.5101 20.4905 13.0098 18.9902C11.5095 17.4899 10.6667 15.4551 10.6667 13.3333V12C10.6667 11.4696 10.8774 10.9609 11.2525 10.5858Z"
          />
        </svg>
      </button>
    </a>
  );
}

export const LoadingFallback = () => null;

export default WhatsApp;
