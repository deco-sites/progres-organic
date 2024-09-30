import { AnalyticsItem, Product } from "apps/commerce/types.ts";
import { useScript } from "deco/hooks/useScript.ts";
import { JSX } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import QuantitySelector from "../ui/QuantitySelector.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import type { Props as AddToCartProps } from "../../actions/buyTogether.ts";

export interface Props extends JSX.HTMLAttributes<HTMLButtonElement> {
  product: Product;
  productBt: Product;
  //seller: string;
  //item: AnalyticsItem;
  icon: string;
}

const onClick = () => {
  event?.stopPropagation();
  const button = event?.currentTarget as HTMLButtonElement | null;
  const container = button!.closest<HTMLDivElement>("div[data-cart-item]")!;
  const { item, platformProps } = JSON.parse(
    decodeURIComponent(container.getAttribute("data-cart-item")!),
  );
  window.STOREFRONT.CART.addToCart(item, platformProps);
};

const onChange = () => {
  const input = event!.currentTarget as HTMLInputElement;
  const productID = input!
    .closest("div[data-cart-item]")!
    .getAttribute("data-item-id")!;
  const quantity = Number(input.value);

  if (!input.validity.valid) {
    return;
  }

  window.STOREFRONT.CART.setQuantity(productID, quantity);
};

// Copy cart form values into AddToCartButton
const onLoad = (id: string) => {
  window.STOREFRONT.CART.subscribe((sdk) => {
    const container = document.getElementById(id);
    // const checkbox = container?.querySelector<HTMLInputElement>(
    //   'input[type="checkbox"]',
    // );
    const input = container?.querySelector<HTMLInputElement>(
      'input[type="number"]',
    );
    const itemID = container?.getAttribute("data-item-id")!;

    const quantity = sdk.getQuantity(itemID) || 0;

    // if (!input || !checkbox) {
    //   return;
    // }

    // input.value = quantity.toString();
    // checkbox.checked = quantity > 0;

    container
      ?.querySelectorAll<HTMLButtonElement>("button")
      .forEach((node) => (node.disabled = false));
    container
      ?.querySelectorAll<HTMLButtonElement>("input")
      .forEach((node) => (node.disabled = false));
    return;
  });
};

const useAddToCart = ({ product, productBt }: Props) => {
  const platform = usePlatform();
  const { additionalProperty = [], isVariantOf, productID } = product;
  const productGroupID = isVariantOf?.productGroupID;

  if (platform === "vnda") {
    const items: AddToCartProps["productsList"] = [
      {
        itemId: productID,
        quantity: 1,
        attributes: Object.fromEntries(
          additionalProperty.map(({ name, value }) => [name, value])
        ),
      },
    ];

    if (productBt) {
      const { additionalProperty = [], isVariantOf, productID } = productBt;
      items.push({
        itemId: productID,
        quantity: 1,
        attributes: Object.fromEntries(
          additionalProperty.map(({ name, value }) => [name, value])
        ),
      });
    }
    return {
      
      productsList: items,
    };
  }

  return null;
};


function AddToCartButton(props: Props) {
  const { product, class: _class, icon, productBt } = props;
  const platformProps = useAddToCart(props);
  const id = useId();
  const { price, listPrice } = useOffer(product.offers);

  const item = mapProductToAnalyticsItem({
    product,
    price,
    listPrice,
  });

  const offersBt = useOffer(productBt.offers);

  const itemP2 = mapProductToAnalyticsItem({
    product: productBt,
    price: offersBt.price,
    listPrice: offersBt.listPrice,
  });

  return (
    <div
      id={id}
      class="flex"
      data-item-id={product.productID}
      data-cart-item={encodeURIComponent(
        JSON.stringify({ item, itemP2, platformProps }),
      )}
    >
      {/* <input type="checkbox" class="hidden peer" /> */}

      <button
        class={clx(
          "flex  w-[271px] h-[26px] bg-primary text-base-200 min-h-0 ",
          _class?.toString(),
        )}
        hx-on:click={useScript(onClick)}
        disabled={false}
      >
        <span class="text-base-200 font-medium text-[12px] text-center w-full hover:text-sm flex justify-center items-center">
          Compre Junto
          {icon !== "" && (
            <img
              class="ml-1"
              src={icon}
              alt="icone de um carrinho de compras"
            />
          )}
        </span>
      </button>

      {/* Quantity Input */}
      {
        /* <div class="flex-grow hidden peer-checked:flex">
        <QuantitySelector
          disabled
          min={0}
          max={100}
          hx-on:change={useScript(onChange)}
        />
      </div> */
      }

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, id) }}
      />
    </div>
  );
}

export default AddToCartButton;
