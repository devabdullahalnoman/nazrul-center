export default function SupportSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="bg-primary rounded-3xl p-8 md:p-16 text-primary-content flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Preserve the Legacy
            </h2>
            <p className="text-lg opacity-90">
              Your contributions help us digitize rare manuscripts and maintain
              the world&apos;s largest Nazrul archive.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="btn btn-neutral btn-lg px-8">Donate Now</button>
            <button className="btn btn-outline btn-lg text-white border-white">
              Volunteer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
