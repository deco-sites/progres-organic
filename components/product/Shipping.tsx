import { useId } from "../../sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";

// Evento de clique para calcular o frete
const onClick = async () => {
  event?.stopPropagation();
  const button = event?.currentTarget as HTMLButtonElement | null;
  if (!button) return;

  button.innerText = "Calculando...";

  const container = button.closest<HTMLDivElement>("div[data-shipping]")!;
  const cepInput = container.querySelector<HTMLInputElement>("#shippingCEP");
  const errorSpan = container.querySelector<HTMLSpanElement>("#shippingError");
  const cep = cepInput?.value.trim().replace("-", "");

  if (!cep) {
    if (errorSpan) errorSpan.textContent = "Digite um CEP válido.";
    button.innerText = "Calcular Frete";
    return;
  }

  function urlencodeFormData(formData: any) {
    let string = "";

    function encode(s: any) {
      return encodeURIComponent(s).replace(/%20/g, "+");
    }

    for (const pair of formData.entries()) {
      if (typeof pair[1] == "string") {
        string += (string ? "&" : "") + encode(pair[0]) + "=" + encode(pair[1]);
      }
    }
    return string;
  }

  function formatMoney(value: any) {
    return (
      "R$ " +
      value
        .toFixed(2)
        .replace(".", ",")
        .replace(/(\d)(?=(\d{3})+\,)/g, "$1.")
    );
  }

  const skuInput = document.querySelector<HTMLInputElement>("[data-shipping-sku]");
  const quantityInput = document.querySelector<HTMLInputElement>('#productDetailValue');
  const sku = skuInput?.getAttribute("data-shipping-sku") || "";
  const quantity = quantityInput?.value || "1";

  const formData = new URLSearchParams();
  formData.append("sku", sku);
  formData.append("quantity", quantity);
  formData.append("zip", cep);

  try {
    const response = await fetch("/frete_produto", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: urlencodeFormData(formData),
    });

    const data = await response.json();

    if (data.error) {
      if (errorSpan) {
        errorSpan.textContent =
          "Ocorreu um erro ao calcular o frete. Verifique seu CEP.";
      }
      button.innerText = "Calcular Frete";
      return;
    }

    // Limpa mensagens de erro se o frete for calculado com sucesso
    if (errorSpan) errorSpan.textContent = "";
    button.innerText = "Calcular Frete";

    const methods = JSON.parse(data.methods);
    const listContainer = container.querySelector("[data-list-shipping]");
    if (!listContainer) return;

    if (methods.length > 0) {
      const address = data.address_details;

      let result =
        `<h4 class="px-4 py-2 text-sm font-normal text-gray-500 my-2 flex flex-col gap-2 border border-gray-300 rounded">
        <span class="text-primary text-base">Enviando para</span> ${address.street_name}, ${address.neighborhood} - ${address.city}/${address.state}
      </h4>`;

      result += '<ul class="shipping-list">';

      methods.forEach((method: any) => {
        let price = method.price;
        price = price == 0 ? "Grátis" : formatMoney(price);

        result += `
          <li class="py-2">
            <div class="flex items-center justify-between font-medium text-base mb-1">
              <p class="type">${method.name}</p>
              <p class="border border-gray-300 rounded-full px-4 py-1 bg-primary text-white text-sm">${price}</p>
            </div>
            <span class="text-sm font-normal text-gray-500 mt-2 block">${method.description}</span>
          </li>
        `;
      });

      result += "</ul>";

      listContainer.innerHTML = result;
    } else {
      listContainer.innerHTML =
        `<h4 class="px-4 py-3 text-sm text-gray-500 my-2 flex items-center justify-center border border-gray-300 rounded">
        <span class="text-base font-semibold text-gray-500">Sem opções!</span>
      </h4>`;
    }
  } catch (error) {
    console.error("Erro ao calcular o frete:", error);
    if (errorSpan) {
      errorSpan.textContent = "Erro ao calcular o frete. Tente novamente.";
    }
    button.innerText = "Calcular Frete";
  }
};

// Evento de mudança no input de CEP
const onChange = () => {
  const input = event?.currentTarget as HTMLInputElement | null;
  if (!input) return;

  const x = input.value.replace(/\D/g, "").match(/(\d{0,5})(\d{0,3})/);
  if (x) input.value = !x[2] ? x[1] : x[1] + "-" + x[2];
};

export function Shipping({ sku }: { sku?: string }) {
  const id = useId();

  return (
    <div
      id={id}
      class="flex flex-col border-t border-neutral pt-4"
      data-shipping
      data-shipping-sku={sku}
    >
      <div class="mt-8">
        <p class="text-sm font-medium text-gray-500">
          Cálculo de frete
        </p>
        <input
          type="text"
          id="shippingCEP"
          class="border border-gray-300 p-2 w-full mt-2"
          placeholder="Digite seu CEP"
          maxlength={10}
          hx-on:change={useScript(onChange)}
        />
      </div>
      <div class="flex mt-4 flex-col">
        <button
          class="flex w-full h-[48px] bg-primary text-base-200 min-h-0 mt-2 btn btn-primary no-animation"
          hx-on:click={useScript(onClick)}
        >
          <span class="text-base-200 font-medium text-[12px] text-center w-full hover:text-sm">
            Calcular Frete
          </span>
        </button>
        <span id="shippingError" class="text-red-600 text-sm mt-2"></span>
      </div>

      <ul data-list-shipping class="mt-4"></ul>
    </div>
  );
}
