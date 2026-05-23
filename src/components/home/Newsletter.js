// src/components/Newsletter.js
export default function Newsletter() {
  return (
    <section className="py-16 bg-white text-primary-content">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl text-nazrul-terracotta font-bold mb-4">
          Join the Nazrul Consciousness
        </h2>
        <p className="mb-8 opacity-90 text-nazrul-ink text-xl max-w-2xl mx-auto">
          Get updates on new archival additions, events, and research papers.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-2 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="input py-5 bg-nazrul-offwhite text-xl text-gray-600 w-full border-2 border-nazrul-terracotta"
          />
          <button className="btn bg-nazrul-terracotta border py-5 border-nazrul-terracotta  hover:bg-nazrul-crimson px-8 text-lg">Subscribe</button>
        </div>
      </div>
    </section>
  );
}
