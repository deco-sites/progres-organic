import { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { useSendEvent } from "../sdk/useSendEvent.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  /** @description Tamanho da imagem (largura: 1440px, altura: 437px) */
  desktop: ImageWidget;

  /** @description Descrição de acessibilidade e SEO */
  alt: string;

  /** @description Link */
  href: string;
}

export interface Props {
  images?: Banner[];

  /**
   * @description Selecione essa opção se a imagem estiver maior que o tamanho recomendado, para otimizar a imagem
   */
  preload?: boolean;
}

function BannerItem({ image }: { image: Banner }) {
  const { alt, desktop, href } = image;

  return (
    <div className="relative w-full h-96">
      <img
        src={desktop}
        alt="Image Description"
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white">
        <p className="text-lg font-bold">{alt}</p>
        <a
          className="px-4 py-2 mt-4 bg-blue-500 rounded-md text-white hover:bg-blue-600"
          href={href}
        >
          {"buttonText"}
        </a>
      </div>
    </div>
  );
}

export default function CarouselBanner({ images = [] }: Props) {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <BannerItem
            key={index}
            image={image}
          />
        ))}
      </div>
    </div>
  );
}
