export default function Footer() {
  return (
    <footer className="text-white body-font bg-[#23272A]">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto flex flex-col items-center">
          <a href="#">
            <img
              src="/connectme.svg"
              className="w-40 h-20 object-contain cursor-pointer"
              alt=""
            />
          </a>
          <p className="mt-2 text-sm text-gray-500">IMAGINE A PLACE</p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium tracking-widest text-lg mb-3">
              Product{" "}
            </h2>
            <nav className="list-none mb-10">
              <li className="my-1.5 hover:underline cursor-pointer">
                Download
              </li>
              <li className="my-1.5 hover:underline cursor-pointer">Nitro</li>
              <li className="my-1.5 hover:underline cursor-pointer">Status</li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium tracking-widest text-lg mb-3">
              Company
            </h2>
            <nav className="list-none mb-10">
              <li className="my-1.5 hover:underline cursor-pointer">About</li>
              <li className="my-1.5 hover:underline cursor-pointer">Jobs</li>
              <li className="my-1.5 hover:underline cursor-pointer">
                Branding
              </li>
              <li className="my-1.5 hover:underline cursor-pointer">
                Newsroom
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium tracking-widest text-lg mb-3">
              Resources
            </h2>
            <nav className="list-none mb-10">
              <li className="my-1.5 hover:underline cursor-pointer">College</li>
              <li className="my-1.5 hover:underline cursor-pointer">Support</li>
              <li className="my-1.5 hover:underline cursor-pointer">Safety</li>
              <li className="my-1.5 hover:underline cursor-pointer">Blog</li>
              <li className="my-1.5 hover:underline cursor-pointer">
                Feedback
              </li>
              <li className="my-1.5 hover:underline cursor-pointer">
                Developers
              </li>
              <li className="my-1.5 hover:underline cursor-pointer">
                StreamKit
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium tracking-widest text-lg mb-3">
              Policies
            </h2>

            <nav className="list-none mb-10">
              <li className="my-1.5 hover:underline cursor-pointer">Terms</li>
              <li className="my-1.5 hover:underline cursor-pointer">Privacy</li>
              <li className="my-1.5 hover:underline cursor-pointer">
                Cookie Settings
              </li>
              <li className="my-1.5 hover:underline cursor-pointer">
                Guidelines
              </li>
              <li className="my-1.5 hover:underline cursor-pointer">
                Acknowledgements
              </li>
              <li className="my-1.5 hover:underline cursor-pointer">
                Licenses
              </li>
              <li className="my-1.5 hover:underline cursor-pointer">
                Moderation
              </li>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
