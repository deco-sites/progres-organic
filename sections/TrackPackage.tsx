interface Props {
  /**
   * @description The description of name.
   */
  name?: string;
}

export default function Section({ name = "Capy" }: Props) {
  return (
    <div class="mt-20 max-w-[1440px] mx-auto">
      <h2 class="text-2xl text-center font-bold">Rastreio</h2>
    </div>
  );
}
