import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSlider from "../../components/product/ProductSlider.tsx";
import Section, {
  Props as SectionHeaderProps,
} from "../../components/ui/Section.tsx";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import { type LoadingFallbackProps } from "@deco/deco";
import { useDevice } from "@deco/deco/hooks";
export interface Props extends SectionHeaderProps {
  products: Product[] | null;
}
export default function ProductShelf(
  { products, title, cta, subtitle }: Props,
) {
  if (!products || products.length === 0) {
    return null;
  }
  const inStockProducts = products.filter((product) => {
    const { availability } = useOffer(product.offers);
    return availability === "https://schema.org/InStock";
  });
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
    <Section.Container {...viewItemListEvent} class="mx-auto overflow-hidden">
      <Section.Header title={title} cta={cta} subtitle={subtitle} />

      <ProductSlider products={inStockProducts} itemListName={title} />
    </Section.Container>
  );
}
export const LoadingFallback = (
  { title, cta }: LoadingFallbackProps<Props>,
) => {
  const device = useDevice();
  return (
    <Section.Container>
      <Section.Header title={title} cta={cta} />
      <Section.Placeholder height={device == "mobile" ? "791" : "508px"} />
    </Section.Container>
  );
};
