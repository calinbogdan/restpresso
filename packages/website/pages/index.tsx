import { Plus_Jakarta_Sans } from "@next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: "700",
});

export default function Home() {
  return (
    <main>
      <div className="grid min-h-screen min-w-full bg-restpresso justify-items-center items-center">
        <div
          style={{
            letterSpacing: -3,
            opacity: 0.9,
            ...plusJakartaSans.style,
          }}
          className="text-6xl text-stone-900 text-center"
        >
          The <span>production-ready</span> <br />
          <span>express</span> framework
        </div>
      </div>
    </main>
  );
}
