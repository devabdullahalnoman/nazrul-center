export default function SupportSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto bg-nazrul-offwhite">
        <div className="bg-nazrul-honeycomb rounded-3xl p-8 md:p-16 text-primary-content flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-4xl md:text-5xl text-nazrul-maroon font-bold mb-4">
              Preserve the Legacy
            </h2>
            <p className="text-xl text-nazrul-ink font-medium opacity-90">
              Your contributions help us digitize rare manuscripts and maintain
              the world&apos;s largest Nazrul archive.
            </p>
          </div>
          <div className="flex gap-4 flex-col md:flex-row">
            <button className="btn bg-nazrul-terracotta border-0 btn-lg hover:bg-nazrul-crimson px-8">Donate Now</button>
            <button className="btn btn-outline btn-lg text-nazrul-terracotta hover:bg-nazrul-crimson hover:text-white border-nazrul-terracotta">
              Volunteer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
