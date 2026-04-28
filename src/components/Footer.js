export default function Footer() {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content mt-auto">
      <nav>
        <h6 className="footer-title">Archive</h6>
        <a className="link link-hover">Poetry</a>
        <a className="link link-hover">Music (Sangeet)</a>
        <a className="link link-hover">Manuscripts</a>
        <a className="link link-hover">Biography</a>
      </nav>
      <nav>
        <h6 className="footer-title">Organization</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Donations</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Copyright Info</a>
      </nav>
    </footer>
  );
}
