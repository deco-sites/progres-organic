import { SectionProps } from "deco/mod.ts";
//import TrakingResult from "../components/shipping/TrakingResult.tsx";
//import type { Props as Traking } from "../components/shipping/TrakingResult.tsx";
import { useComponent } from "./Component.tsx";
import { AppContext } from "apps/vnda/mod.ts";

interface TrakingData {
  id: number;
  tracking_code: string;
  tracked_at: string;
  url: string;
  company: string;
}

interface Props {
  notFoundMessage: string;
  /** @hide true */
  status?: "";
}

export async function loader(props: Props, req: Request, _ctx: AppContext) {
  if (!req.headers.get("Content-Type")) {
    req.headers.set("Content-Type", "application/x-www-form-urlencoded");
  }

  const form = await req.formData();
  const orderCode = `${form.get("orderCode") ?? ""}`;
  const packageCode = `${form.get("packageCode") ?? ""}`;

  try {
  if (!orderCode || !packageCode) {
    // You can return a status like "incomplete" if required
    return { ...props, status: "incomplete" };
  }


    const response = await fetch(
      `https://api.vnda.com.br/api/v2/orders/${orderCode}/packages/${packageCode}/trackings`
    );

    // Check for a successful response (status code 200)
    if (response.status === 200) {
      const data = await response.json() as TrakingData
      console.log("Traking response:", response.status);
      console.log("Traking response:", response);
      return {
        ...props,
        data,
        status: "success", // Indicate success
      };
    } else {
      return {
        ...props,
        status: "packageNotFound",
      };
    }
  } catch (error) {
    console.error("Error traking package:", error);
    return {
      ...props,
      status: "failed", 
    };
  }
}

export default function TrackPackage({ data, notFoundMessage, status }: SectionProps<typeof loader>) {
  return (
    <div class="mt-20 max-w-[1440px] mx-auto flex flex-col items-center">
      <h2 class="text-2xl text-center font-bold">Rastreio</h2>
      <form
        hx-target="closest section"
        hx-swap="outerHTML"
        hx-post={useComponent(import.meta.url)}
        class="flex flex-col gap-3 mt-12"
        enctype="application/x-www-form-urlencoded"
      >
        <input
          class="input w-[360px] border border-primary"
          type="text"
          name="orderCode"
          placeholder="Insira o código do pedido"
          required
        />
        <input
          class="input w-[360px] border border-primary"
          type="text"
          name="packageCode"
          placeholder="Insira o código do pacote"
          required
        />
        <button type="submit" class="btn btn-primary w-[360px] ">
          enviar
        </button>
      </form>
      {status !== "incomplete" &&
        (status === "success" ? (
          <div>
            <div>
              <span>Ultima atualização:</span>
              <span>{data.tracked_at}</span>
            </div>
            <div>
              <span>Nome da Transportadora:</span>
              <span>{data.company}</span>
            </div>
            <div>
              <span>Link do rastreamento do pedido na transportadora:</span>
              <span>{data.url}</span>
            </div>
          </div>
        ) : status === "packageNotFound" ? (
          <div>
            <div>
              <span>Ultima atualização:</span>
              <span>00/00/0000</span>
            </div>
            <div>
              <span>Nome da Transportadora:</span>
              <span>Correios</span>
            </div>
            <div>
              <span>Link do rastreamento do pedido na transportadora:</span>
              <span>www.meupedido.com.br/004433</span>
            </div>
          </div>
        ) : null)}
    </div>
  );
}

