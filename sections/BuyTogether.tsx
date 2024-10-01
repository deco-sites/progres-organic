import { ProductDetailsPage } from "apps/commerce/types.ts";
import SectionUi from "../components/ui/Section.tsx";
import { useSendEvent } from "../sdk/useSendEvent.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "../sdk/useOffer.ts";
import { useId } from "../sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../sdk/clx.ts";
import { relative } from "../sdk/url.ts";
import { formatPrice } from "../sdk/format.ts";
import AddToCartBuyTogether from "../components/product/AddToCartBuyTogether.tsx";
import type { Product } from "apps/commerce/types.ts";
import ProductCardBuyTogether from "../components/product/ProductCartBuyTogether.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  products: Product[] | null;
}

export default function BuyTogether({ page, products }: Props) {
  if (page === null || products === null) {
    throw new Error("Informações do produto insdisponível");
  }

  const { product } = page;
  const { productID, offers } = product;

  const { availability } = useOffer(offers);
  const inStock = availability === "https://schema.org/InStock";

  const pdpProductTag = product.additionalProperty?.find(({ name }) =>
    name?.includes("related")
  )?.value;

  // Find the related product
  const secondProduct = pdpProductTag
    ? products.find((item) => {
      return (
        item.additionalProperty?.find(({ name }) =>
            name?.includes(pdpProductTag)
          ) !== undefined && item.productID !== productID
      );
    })
    : undefined;

  return (
    <div class="container flex gap-4 sm:gap-5 w-full pt-8 items-center py-5">
      {(page !== undefined || secondProduct !== undefined) && (
        <>
          <ProductCardBuyTogether
            index={1}
            product={product}
            class="w-[272px] "
          />
          <div class="py-auto w-[25px] h-[25px]">
            <p class="w-full h-full text-xl font-bold text-base-200 bg-secondary rounded-full flex items-center justify-center">
              +
            </p>
          </div>
          {secondProduct && (
            <ProductCardBuyTogether
              index={1}
              product={secondProduct}
              class="w-[272px] "
            />
          )}

          <div class="py-auto w-[25px] h-[25px]">
            <p class="w-full h-full text-xl font-bold text-base-200 bg-secondary rounded-full flex items-center justify-center">
              =
            </p>
          </div>

          <div class="flex flex-col items-center">
            <p class="text-sm font-semibold ">Valor total:</p>
            <p class="text-lg font-bold text-warning">
              {" "}
              {formatPrice(offers?.lowPrice, offers?.priceCurrency)}
            </p>

            <div>
              {inStock && secondProduct
                ? (
                  <AddToCartBuyTogether
                    product={product}
                    productBt={secondProduct}
                    class={clx("btn btn-primary no-animation w-full")}
                    icon=""
                  />
                )
                : (
                  <p
                    class={clx(
                      "btn",
                      "btn-outline justify-center  !text-[12px] !font-medium px-0 no-animation w-full",
                      "text-center border border-secondary btn-secondary min-h-0 h-[26px]",
                    )}
                  >
                    Fora de estoque
                  </p>
                )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export const LoadingFallback = () => <SectionUi.Placeholder height="635px" />;
