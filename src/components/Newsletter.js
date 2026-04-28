// src/components/Newsletter.js
export default function Newsletter() {
  return (
    <section className="py-16 bg-primary text-primary-content">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Join the Nazrul Consciousness
        </h2>
        <p className="mb-8 opacity-90 max-w-xl mx-auto">
          Get updates on new archival additions, events, and research papers.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="input text-base-content w-full"
          />
          <button className="btn btn-neutral px-8">Subscribe</button>
        </div>
      </div>
    </section>
  );
}
