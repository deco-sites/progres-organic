import TrakingResult from "../components/shipping/TrakingResult.tsx";
import type { Props as Traking } from "../components/shipping/TrakingResult.tsx";
import { useComponent } from "./Component.tsx";

export interface Props {
  orderCode: Traking;
  packageCode: Traking;
}

export default function Section({ orderCode, packageCode }: Props) {
  return (
    <div class="mt-20 max-w-[1440px] mx-auto flex flex-col items-center">
      <h2 class="text-2xl text-center font-bold">Rastreio</h2>
      <form
        hx-target="closest section"
        hx-swap="outerHTML"
        hx-post={useComponent(import.meta.url)}
        class="flex flex-col gap-3 mt-12"
      >
        <input
          class="input w-[360px] border border-primary"
          type="text"
          name="orderCode"
          placeholder="Insira o código do pedido"
        />
        <input
          class="input w-[360px] border border-primary"
          type="text"
          name="packageCode"
          placeholder="Insira o código do pacote"
        />
        <button type="submit" class="btn btn-primary w-[360px]">
          enviar
        </button>
      </form>
      <TrakingResult orderCode={orderCode} packageCode={packageCode} />
    </div>
  );
}
