import Icon from "../../components/ui/Icon.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import type {ImageLink}from "../../components/header/ImageLinks.tsx"
import Image from "apps/website/components/Image.tsx";

export interface Props {
  navItems?: SiteNavigationElement[];
  topLinks: ImageLink[];
}

function MenuItem({ item }: { item: SiteNavigationElement }) {
  return (
    <div class="collapse collapse-plus">
      <input type="checkbox" />
      <div class="collapse-title">{item.name}</div>
      <div class="collapse-content">
        <ul>
          <li>
            <a class="underline text-sm" href={item.url}>Ver todos</a>
          </li>
          {item.children?.map((node) => (
            <li>
              <MenuItem item={node} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Menu({ navItems = [] , topLinks}: Props) {
  return (
    <div
      class="flex flex-col h-full overflow-y-auto  bg-base-200"
      style={{ minWidth: "100vw" }}
    >
      <ul class="px-4  flex flex-col divide-y divide-base-200 overflow-y-auto ">
        {navItems.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
      <div class="border-t border-primary mt-10 ">
        <ul class="flex flex-col py-2 px-8 items-start gap-6 mt-5">
          {topLinks.length > 0 &&
            topLinks.map((item) => (
              <a
                href={item.href}
                class="flex justify-center  gap-4 items-center"
              >
                <Image
                  class="object-contain"
                  src={item.image}
                  alt={item.text}
                  width={37}
                  height={37}
                />
                <p class="text-[12px]">{item.text}</p>
              </a>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Menu;
