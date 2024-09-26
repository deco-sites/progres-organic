import { AppContext } from "apps/vnda/mod.ts";

export interface TrakingData  {
  id: number;
  tracking_code: string;
  tracked_at: string;
  url: string;
  company: string;
}

export interface Props {
  orderCode: string;
  packageCode: string;
  trakingData: TrakingData;
}

export async function loader (
  props: Props,
  _req: Request,
  _ctx: AppContext
) {

  try {
    const response = await fetch(
      `https://api.vnda.com.br/api/v2/orders/${props.orderCode}/packages/${props.packageCode}/trackings`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Traking response:", data);
    return props.trakingData = data;
  } catch (error) {
    console.error("Error traking package:", error);
  }
}

export default function TrakingResult({orderCode, packageCode}: Props) {

  return (
    <div>
      <p>oi</p>
      {orderCode && <p>{orderCode}</p>}
      {packageCode && <p>{packageCode}</p>}
    </div>
  );
}
