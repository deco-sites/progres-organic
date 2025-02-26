import { ImageWidget } from "apps/admin/widgets.ts";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";

/** @titleby alt */
export interface SocialMedia {
  icon: ImageWidget;
  alt: string;
  link: string;
}

export interface AlertItemProps {
  banner: ImageWidget;
  html?: string;
}

export interface Props {
  fullWidth?: boolean;
  alerts?: AlertItemProps[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
  icons?: SocialMedia[];
  showIcons: boolean;
}

function Alert({ alerts = [], interval = 5, icons, showIcons=true, fullWidth=false }: Props) {
  const id = useId();

  return (
    <div id={id} class="bg-primary w-screen">
      <div class={clx(" flex items-center mx-auto w-full",
        !fullWidth && "lg:max-w-[1440px]",
      )}>
          {icons && showIcons &&
            (
            <div class="flex gap-2 pl-3 ">
              {icons.map((item) => (
              <a
                href={item.link}
                target="blank"
                class="w-[26px] h-[26px] border border-base-200 rounded flex items-center justify-center"
              >
                <Image
                  src={item.icon}
                  alt={item.alt}
                  width={18}
                  height={18}
                  class="object-contain w-[18px] h-[18px]"
                />
              </a>
            ))}
          </div>
          )
        }
        <div class="flex justify-center items-center w-full">
          <Slider class="carousel carousel-center text-secondary-content text-[12px] w-full">
            {alerts.map((alert, index) => {
              if(alert.banner) {
                return (
                  <Slider.Item
                    index={index}
                    class="carousel-item w-full flex items-center justify-center"
                  >
                    <Image src={alert.banner} class="w-full h-auto"/>
                  </Slider.Item>
                )
              }

              return (
                <Slider.Item
                  index={index}
                  class="carousel-item w-full flex items-center justify-center"
                >
                  <span
                    class="py-3 text-center "
                    dangerouslySetInnerHTML={{ __html: alert.html }}
                  />
                </Slider.Item>
              )
            })}
          </Slider>
        </div>

        <Slider.JS rootId={id} interval={interval && interval * 1e3} />
      </div>
    </div>
  );
}

export default Alert;
