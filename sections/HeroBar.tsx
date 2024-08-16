import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/** @titleBy title */
export interface TopItem {
  /**
   * @title Imagem
   * @description Tamanho da imagem (largura: 50px, altura: 50px) */
  image?: ImageWidget;
  /**
   * @title Link
   */
  href?: string;
  /**
   * @title Título
   */
  title: string;
  /**
   * @title Subtitulo
   */
  subtitle?: string;
}

interface Props {
  /** @title Conteúdo */
  content: TopItem[];
}

export default function TopBar({ content }: Props) {
  return (
    <div class="hidden md:flex md:max-w-[1075px] md:mx-auto md:justify-between md:visible md:pt-9 md:mb-[55px]">
      {content.map((item) => (
        <a href={item.href} class="flex items-center">
          <div class="flex items-center justify-center  w-[50px] h-[50px] ">
            {item.image && (
              <Image
                class="object-cover"
                src={item.image}
                alt={item.title}
                width={50}
                height={50}
              />
            )}
          </div>
          <div class="ml-6 text-base text-secondary">
            <p>{item.title}</p>
            <p>{item.subtitle}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
