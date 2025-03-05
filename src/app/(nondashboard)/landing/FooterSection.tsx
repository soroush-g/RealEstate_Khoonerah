import Link from "next/link";
import React from "react";
import {
  faInstagram,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIconComponent } from "@/components/ui/font-awesome-icon";

const FooterSection = () => {
  return (
    <footer className="border-t border-gray-200 py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* بخش بالایی فوتر */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* لوگو */}
          <div>
            <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-900 transition duration-200" scroll={false}>
              KHOONERAH
            </Link>
          </div>

          {/* منوی فوتر */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-4 md:gap-6"> {/* تغییر اینجا */}
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-800 transition duration-200 leading-6 tracking-wide">
                  هدف خونه راه
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-800 transition duration-200 leading-6 tracking-wide">
                  راه ارتباطی ما
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-gray-800 transition duration-200 leading-6 tracking-wide">
                  سوالات متداول
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-800 transition duration-200 leading-6 tracking-wide">
                  قوانین و مقررات
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-800 transition duration-200 leading-6 tracking-wide">
                  حریم خصوصی
                </Link>
              </li>
            </ul>
          </nav>

          {/* آیکون‌های شبکه‌های اجتماعی */}
          <div className="flex space-x-4">
            <a href="#" aria-label="Instagram" className="text-gray-600 hover:text-primary-600 transition duration-200">
              <FontAwesomeIconComponent icon={faInstagram} className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Linkedin" className="text-gray-600 hover:text-primary-600 transition duration-200">
              <FontAwesomeIconComponent icon={faLinkedin} className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Youtube" className="text-gray-600 hover:text-primary-600 transition duration-200">
              <FontAwesomeIconComponent icon={faYoutube} className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* بخش پایینی فوتر */}
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-4">
            <span className="leading-6 tracking-wide">© KHOONERAH. همه حقوق محفوظ است.</span>
            <Link href="/cookies" className="hover:text-gray-700 transition duration-200 leading-6 tracking-wide">
              سیاست کوکی‌ها
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;