import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import type { LoadingFallbackProps } from "deco/mod.ts";
import ProductSliderHorizontal from "../components/product/ProductSliderHorizontal.tsx";
import Section, {
  Props as SectionHeaderProps,
} from "../components/ui/Section.tsx";
import { useOffer } from "../sdk/useOffer.ts";
import { useSendEvent } from "../sdk/useSendEvent.ts";

export interface Props extends SectionHeaderProps {
  title?: "string";
  products: Product[] | null;
}

export default function ProductShelf({
  products,
  title,
}: Props) {
  if (!products || products.length === 0) {
    return null;
  }

  const viewItemListEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item_list",
      params: {
        item_list_name: title,
        items: products.map((product, index) =>
          mapProductToAnalyticsItem({
            index,
            product,
            ...useOffer(product.offers),
          })
        ),
      },
    },
  });

  return (
    <Section.Container {...viewItemListEvent} class="mx-auto" style={{padding: 0}}>
      {title && (
        <p class="text-base font-semibold text-secondary border-t border-gray-300 pt-5">
          {title}
        </p>
      )}

      <ProductSliderHorizontal products={products} itemListName={title} />
    </Section.Container>
  );
}

export const LoadingFallback = ({ title }: LoadingFallbackProps<Props>) => (
  <Section.Container>
    {title && <p class="text-base font-semibold text-secondary">{title}</p>}
    <Section.Placeholder height="508px" />;
  </Section.Container>
);
