import IframeLoader from "../islands/ytOtimization.tsx";

interface Props {
  /**
   * @title Título
   */
  title: string;
  /**
   * @title Sub-titulo
   * @description Texto auxiliar
   */
  subtile?: string;
  /**
   * @title Texto do link
   * @description Texto do link do produto do video
   */
  text: string;
  /**
   * @title Link
   * @description Link para a pagina do produto
   */
  href: string;
  /**
   * @title You Tube Video
   * @description Link do youTube (link copiado do navegador e nao do botao de Compartilhar)
   */
  video?: string;
}

export default function Section({ title, subtile, text, video, href }: Props) {
  return (
    <div class="w-screen pt-[30px]">
      <div class="md:w-[1300px] md:mx-auto flex flex-col-reverse md:gap-10 items-center justify-center xl:flex-row md:flex-wrap ">
        <div class="md:w-[667px] md:h-[374px] w-[390px] h-[235px] mx-auto mt-5 md:mt-0 md:mx-0">
          <IframeLoader
            videoLink={video || ""}
            preload={false}
            width={667}
            height={375}
          />
        </div>
        <div class="md:max-w-[425px] mx-auto md:mx-0 flex flex-col items-center md:items-start">
          <h2 class="text-2xl font-semibold text-secondary md:pb-5 md:pt-3 pt-10 pb-3 text-center">
            {title}
          </h2>
          <h4 class="text-sm  text-secondary md:pb-10 pb-4 ">{subtile}</h4>
          <a
            href={href}
            class="text-base text-secondary font-semibold sm:max-h-[276px] hover:underline "
          >
            {text} →
          </a>
        </div>
      </div>
    </div>
  );
}
