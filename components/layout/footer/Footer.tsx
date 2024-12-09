import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex py-lg justify-between">
          <div className="flex justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">XMA Agency</h2>
              <p className="mt-4 text-gray-400">
                XMA Agency is a digital marketing agency.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-20">
            <div>
              <h3 className="text-lg font-semibold mb-4">Projects</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:underline link">
                    Curated
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline link">
                    Circa
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline link">
                    Storytale
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline link">
                    Icons
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline link">
                    Studio
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:underline link">
                    License
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline link">
                    Refund
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline link">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline link">
                    Terms of use
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline link">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Info</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:underline link">
                    License
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline link">
                    Refund
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline link">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline link">
                    Terms of use
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline link">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-700 pt-4 text-center text-gray-500">
          <p>© 2024 XMA Agency. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
