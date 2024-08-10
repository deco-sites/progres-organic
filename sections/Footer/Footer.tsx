import { type ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Section from "../../components/ui/Section.tsx";

/** @titleBy title */
interface Item {
  /**
   * @title Icone do link
   * @description Adicionar icones na lista de contato tam (largura: 18px altura:18px) */
  image?: ImageWidget;
  /** @title Texto do Link */
  title: string;
  /** @tile Url do Link */
  href: string;
}

/** @titleBy title */
interface Link {
  title: string;
  links: Item[];
}

/** @titleBy alt */
interface Social {
  /** @title Nome da Rede Social */
  alt?: string;
  /** @title Link para Rede Social */
  href?: string;
  /** @title Icone (logo)
   * @description Tamanho (largura: 26px, altura: 26px)
   */
  image: ImageWidget;
}

/** @titleBy title */
interface PaymentIcon {
  /**
   * @title Título
   * @description ex: Visa */
  title: string;
  /** 
   * @title Icone (logo)
   * @description Tamanho (largura: 31px, altura: 19px)
   */
  image: ImageWidget;
}

export interface MobileApps {
  /** @description Link para o Aplicativo da Apple */
  apple?: string;
  /** @description Link para o Aplicativo Android */
  android?: string;
}

/** @titleBy title */
interface BadgeIcon {
  /**
   * @title Título */
  title: string;
  /**
   * @title Icone (logo)
   * @description Tamanho (largura máxima: 140px, altura máxima: 75px)
   */
  image: ImageWidget;
}

interface Props {
  /** @title Nome do site */
  siteName: string;
  /**
   * @title Descrição
   * @format textarea */
  description: string;
  /** @title Lista de Links */
  links?: Link[];
  /** @title Título para redes sociais */
  socialTitle: string;
  /** @title Nome das redes sociais */
  social?: Social[];
  /** @title Formas de Pagamento */
  paymentMethods?: PaymentIcon[];
  copyright: string;
  /** @title Aplicativos mobile */
  mobileApp?: boolean;
  mobileAppLink: MobileApps;
  /** @title Políticas */
  badges: BadgeIcon[];
  delivery: ImageWidget[];
}

function Footer({
  siteName = "",
  description = "",
  links = [],
  socialTitle = "",
  social = [],

  paymentMethods = [],
  copyright,
  mobileApp = true,
  mobileAppLink = {},
  delivery = [],
  badges = [],
}: Props) {
  return (
    <footer class="w-screen  sm:mt-10 bg-primary text-base-200">
      <div class="container flex justify-between pt-[38px] gap-6">
        <div class="w-[255px]">
          <h2 class="text-[15px] font-bold w-[168px] pb-5">{siteName}</h2>
          <p class="text-[11px] ">{description} </p>
        </div>
        <ul class="flex justify-between md:w-full">
          {links.map(({ title, links }) => (
            <li class="flex flex-col gap-4">
              <p class="text-base font-semibold">{title}</p>
              <ul class="flex flex-col gap-2">
                {links.map(({ title, href, image }) => (
                  <li>
                    <a class="text-[11px] flex gap-1" href={href}>
                      {image && (
                        <Image
                          src={image}
                          alt={title}
                          loading="lazy"
                          width={18}
                          height={18}
                        />
                      )}
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div>
          <p class="text-base font-semibold">{socialTitle}</p>
          <ul class="flex gap-4 text-base-200">
            {social.map(({ image, href, alt }) => (
              <li class="text-base-200">
                <a href={href}>
                  <Image
                    src={image}
                    alt={alt}
                    loading="lazy"
                    width={24}
                    height={24}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row gap-12 justify-between items-start sm:items-center">
        <ul class="flex flex-wrap gap-2">
          {paymentMethods.map(({ image, title }) => (
            <li class="h-8 w-10 border border-base-100 rounded flex justify-center items-center">
              <Image
                src={image}
                alt={title}
                width={31}
                height={19}
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </div>

      <hr class="w-full text-base-400" />

      <div class="grid grid-flow-row sm:grid-flow-col gap-8">

        <div class="flex flex-nowrap items-center justify-between sm:justify-center gap-4">
          <div>
            <img
              loading="lazy"
              src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/12156/cbee4272-989d-40d4-ae5a-ca5fa0afdaaa"
            />
          </div>
          <span class="text-xs font-normal text-base-400">{copyright}</span>
        </div>

        {mobileApp && (
          <div class="flex flex-nowrap items-center justify-center gap-4">
            <a href={mobileAppLink.apple}>
              <Image
                alt="apple"
                width={72}
                height={22}
                loading="lazy"
                src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/12156/5c0dade1-22e2-468c-bbc9-6c1545e3ed8a"
              />
            </a>
            <a href={mobileAppLink.android}>
              <Image
                alt="android"
                width={72}
                height={22}
                loading="lazy"
                src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/12156/ca8bbc9d-72b0-44ae-8d63-d6ee5a9c2b70"
              />
            </a>
          </div>
        )}
      </div>
    </footer>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="1145px" />;

export default Footer;
