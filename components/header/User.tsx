import Image from "apps/website/components/Image.tsx";

function UserIcon() {
  return (
    <>
      <label class="indicator text-secondary" aria-label="user-login">
        <span class="hidden indicator-item badge badge-primary badge-sm font-thin" />

        <a
          href="/entrar"
          class="btn btn-square btn-sm btn-outline no-animation hover:bg-accent text-secondary border border-secondary hover:border-secondary"
        >
          <Image
            src="https://data.decoassets.com/progres-organic/7225a448-d572-4666-b3d7-508c77481dec/image-(2)-(1).svg"
            alt="icone de usuario"
            width={20}
            height={20}
          />
        </a>
      </label>
    </>
  );
}

export default UserIcon;
