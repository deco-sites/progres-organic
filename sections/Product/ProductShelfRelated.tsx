import type { Product, ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import type { LoadingFallbackProps } from "deco/mod.ts";
import ProductSlider from "../../components/product/ProductSlider.tsx";
import Section, {
  Props as SectionHeaderProps,
} from "../../components/ui/Section.tsx";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";

export interface Props extends SectionHeaderProps {
  page: ProductDetailsPage | null;
  products: Product[] | null;
}

export default function ProductShelf({
  page,
  products,
  title,
  cta,
  subtitle,
}: Props) {
  if (!products || products.length === 0) {
    return null;
  }

  if (page === null || products === null) {
    throw new Error("Informações do produto insdisponível");
  }

  const inStockProducts = products.filter((product) => {
    const { availability } = useOffer(product.offers);
    return availability === "https://schema.org/InStock";
  });

  const { product } = page;
  const pdpProductTag = product.additionalProperty?.find(({ name }) =>
    name?.includes("categoria")
  )?.value;

  const productsList = pdpProductTag
    ? inStockProducts.filter((item) => {
        return (
          item.additionalProperty?.find(({ name }) =>
            name?.includes(pdpProductTag)
          ) !== undefined && item.productID !== product.productID
        );
      })
    : [];

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

      <ProductSlider products={productsList} itemListName={title} />
    </Section.Container>
  );
}

export const LoadingFallback = ({
  title,
  cta,
}: LoadingFallbackProps<Props>) => (
  <Section.Container>
    <Section.Header title={title} cta={cta} />
    <Section.Placeholder height="508px" />;
  </Section.Container>
);
