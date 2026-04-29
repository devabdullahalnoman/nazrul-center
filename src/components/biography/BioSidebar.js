export default function BioSidebar() {
  return (
    <aside className="lg:w-1/5 order-2 lg:order-1">
      <div className="lg:sticky lg:top-24 bg-base-200 p-6 rounded-2xl border border-base-300">
        <h3 className="font-bold text-lg mb-4 border-b border-base-300 pb-2">
          Quick Links
        </h3>
        <ul className="menu menu-sm p-0 font-medium gap-2">
          <li>
            <a href="#Early" className="hover:text-primary transition-colors">
              Early Life
            </a>
          </li>
          <li>
            <a href="#Family" className="hover:text-primary transition-colors">
              Family & Education
            </a>
          </li>
          <li>
            <a
              href="#Literary"
              className="hover:text-primary transition-colors"
            >
              Literary Journey
            </a>
          </li>
          <li>
            <a
              href="#Revolutionary"
              className="hover:text-primary transition-colors"
            >
              Revolutionary Spirit
            </a>
          </li>
          <li>
            <a href="#Prison" className="hover:text-primary transition-colors">
              Prison Life
            </a>
          </li>
          <li>
            <a href="#Musical" className="hover:text-primary transition-colors">
              Musical Contribution
            </a>
          </li>
          <li>
            <a href="#Film" className="hover:text-primary transition-colors">
              Film & Radio
            </a>
          </li>
          <li>
            <a href="#Tragedy" className="hover:text-primary transition-colors">
              Tragedy & Illness
            </a>
          </li>
          <li>
            <a href="#Awards" className="hover:text-primary transition-colors">
              Awards
            </a>
          </li>
          <li>
            <a
              href="#Timeline"
              className="hover:text-primary transition-colors font-bold text-secondary"
            >
              Timeline
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
