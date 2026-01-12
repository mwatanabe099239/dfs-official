'use client'

import React from "react"
import Link from "next/link"
import { useLanguage } from '../src/context/LanguageContext'
import { useTheme } from '../src/context/ThemeContext'
import { useState } from "react"
import { FaTelegram, FaDiscord, FaGithub, FaYoutube } from "react-icons/fa"
import { SiX } from "react-icons/si"
import { HiOutlineChevronDown } from "react-icons/hi"
import { ReactNode } from 'react'

function Navbar() {
  const { t } = useLanguage()

  return (
    <nav className="py-4 transition-colors duration-300 bg-white text-gray-900 border-b border-gray-200">
      <div className="flex items-center justify-between md:px-20 px-5">
        <Link href="/" className="bg-transparent cursor-pointer">
          <img 
            src="/logo.png" 
            alt="logo" 
            className="md:w-40 w-32 brightness-0"
          />
        </Link>
        <div className="flex items-center gap-2 md:hidden">
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg focus:outline-none focus:ring-2 text-gray-500 hover:bg-gray-100 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex items-center space-x-4 md:flex-row">
            <li>
              <a href="#contact" className="block text-sm font-medium py-2 px-4 rounded-lg border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black">
                {t("common.contactUs")}
              </a>
            </li>
            <li>
              <a href="#get-started" className="block text-sm font-medium py-2 px-4 rounded-lg transition-colors bg-gray-900 text-white hover:bg-gray-800">
                {t("common.getStarted")}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  const [open, setOpen] = useState<number | null>(null)
  const [langOpen, setLangOpen] = useState<boolean>(false)
  const { isDark } = useTheme()
  const { t, language, changeLanguage, languages, currentLanguage } = useLanguage()

  const toggle = (section: number) => {
    setOpen(open === section ? null : section)
  }

  const socialLinks = [
    { icon: SiX, link: "https://x.com/difines_ofc", name: "X" },
    { icon: FaTelegram, link: "https://t.me/DFSChain", name: "Telegram" },
    { icon: FaDiscord, link: "#", name: "Discord" },
    { icon: FaYoutube, link: "#", name: "YouTube" },
  ]

  // Three columns of links following Solana's layout
  const linkColumns = [
    {
      titleKey: "footer.sections.dfsChain",
      items: [
        { nameKey: "footer.links.makeWallet", link: "https://metaface.dfsscan.com/get-started" },
        { nameKey: "footer.links.getDfs", link: "https://wexswap.com" },
        { nameKey: "footer.links.stakeDfs", link: "/staking" },
        { nameKey: "footer.links.exploreDapps", link: "/explore-dapps" },
        { nameKey: "footer.links.payByCrypto", link: "/payviner" },
      ],
    },
    {
      titleKey: "footer.sections.about",
      items: [
        { nameKey: "footer.links.blog", link: "/blog" },
        { nameKey: "footer.links.whitepaper", link: "/whitepaper" },
        { nameKey: "footer.links.faq", link: "/whitepaper#faq" },
        { nameKey: "footer.links.privacyPolicy", link: "/whitepaper#privacy-policy" },
        { nameKey: "footer.links.termsOfUse", link: "/whitepaper#terms-of-use" },
        { nameKey: "footer.links.cookies", link: "/whitepaper#cookies" },
      ],
    },
  ]

  return (
    <footer className={`pt-10 pb-6 text-sm font-space transition-colors duration-300 relative ${
      isDark ? "bg-[#181A1E] text-white" : "bg-gray-100 text-gray-900 border-t border-gray-200"
    }`}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Main Footer Content - Three Column Layout */}
        <div className="hidden md:flex flex-row pb-8 justify-between">
        {/* Left Section - Logo, Copyright, Social */}
        <div className="flex flex-col gap-4 flex-shrink-0">
          <div>
            <p className={`text-xs mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              Managed by
            </p>
            <img 
              src="/logo.png" 
              alt="DFS Chain Logo" 
              className={`md:w-32 w-24 ${isDark ? "brightness-0 invert" : "brightness-0"}`}
            />
          </div>
          <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            <p>{t("footer.copyright")}</p>
          </div>
          <div className="flex items-center gap-3 mt-2">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon
              return (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isDark 
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            })}
          </div>
        </div>

        {/* Middle Section - First Column of Links */}
        <div className="min-w-[160px] ml-12">
          <h4 className={`font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            {t(linkColumns[0].titleKey)}
          </h4>
          <ul className={`space-y-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            {linkColumns[0].items.map((item, i) => (
              <li key={i} className="hover:underline cursor-pointer text-xs">
                {item.link.startsWith('/') ? (
                  <Link href={item.link} className="block">{t(item.nameKey)}</Link>
                ) : (
                  <a href={item.link} className="block" target="_blank" rel="noopener noreferrer">{t(item.nameKey)}</a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section - Second Column of Links */}
        <div className="min-w-[160px] ml-6">
          <h4 className={`font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            {t(linkColumns[1].titleKey)}
          </h4>
          <ul className={`space-y-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            {linkColumns[1].items.map((item, i) => (
              <li key={i} className="hover:underline cursor-pointer text-xs">
                {item.link.startsWith('/') ? (
                  <Link href={item.link} className="block">{t(item.nameKey)}</Link>
                ) : (
                  <a href={item.link} className="block" target="_blank" rel="noopener noreferrer">{t(item.nameKey)}</a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Language Switcher - Third Column */}
        <div className="min-w-[160px] ml-6">
          <h4 className={`font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            {t("common.language")}
          </h4>
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`w-full flex items-center justify-between gap-1 px-3 py-2 rounded-lg transition-colors text-xs ${
                isDark 
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-300" 
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <svg
                  data-theme="dark"
                  viewBox="0 0 24 24"
                  focusable="false"
                  className="w-4 h-4"
                >
                  <path
                    d="M 12 21.996094 C 10.601562 21.996094 9.292969 21.734375 8.074219 21.210938 C 6.859375 20.683594 5.800781 19.972656 4.902344 19.074219 C 4 18.171875 3.292969 17.109375 2.777344 15.886719 C 2.257812 14.660156 2 13.347656 2 11.949219 C 2 10.546875 2.257812 9.242188 2.777344 8.035156 C 3.292969 6.828125 4 5.773438 4.902344 4.875 C 5.800781 3.972656 6.859375 3.269531 8.074219 2.761719 C 9.292969 2.253906 10.601562 1.996094 12 1.996094 C 13.402344 1.996094 14.710938 2.253906 15.925781 2.761719 C 17.144531 3.269531 18.199219 3.972656 19.101562 4.875 C 20 5.773438 20.710938 6.828125 21.226562 8.035156 C 21.742188 9.242188 22 10.546875 22 11.949219 C 22 13.347656 21.742188 14.660156 21.226562 15.886719 C 20.710938 17.109375 20 18.171875 19.101562 19.074219 C 18.199219 19.972656 17.144531 20.683594 15.925781 21.210938 C 14.710938 21.734375 13.402344 21.996094 12 21.996094 Z M 12 20.546875 C 12.585938 19.949219 13.070312 19.261719 13.464844 18.484375 C 13.855469 17.710938 14.175781 16.789062 14.425781 15.722656 L 9.601562 15.722656 C 9.835938 16.722656 10.148438 17.625 10.539062 18.421875 C 10.929688 19.222656 11.417969 19.929688 12 20.546875 Z M 9.875 20.25 C 9.460938 19.613281 9.101562 18.929688 8.800781 18.199219 C 8.5 17.464844 8.25 16.640625 8.050781 15.722656 L 4.300781 15.722656 C 4.933594 16.90625 5.667969 17.835938 6.5 18.511719 C 7.335938 19.183594 8.460938 19.765625 9.875 20.25 Z M 14.152344 20.222656 C 15.351562 19.839844 16.429688 19.265625 17.386719 18.5 C 18.347656 17.730469 19.117188 16.804688 19.699219 15.722656 L 15.976562 15.722656 C 15.757812 16.625 15.503906 17.441406 15.214844 18.171875 C 14.921875 18.90625 14.566406 19.589844 14.152344 20.222656 Z M 3.800781 14.222656 L 7.777344 14.222656 C 7.726562 13.773438 7.695312 13.367188 7.6875 13.011719 C 7.679688 12.652344 7.675781 12.296875 7.675781 11.949219 C 7.675781 11.53125 7.683594 11.160156 7.699219 10.835938 C 7.71875 10.511719 7.75 10.148438 7.800781 9.75 L 3.800781 9.75 C 3.683594 10.148438 3.605469 10.507812 3.5625 10.824219 C 3.523438 11.140625 3.5 11.515625 3.5 11.949219 C 3.5 12.382812 3.523438 12.769531 3.5625 13.109375 C 3.605469 13.453125 3.683594 13.824219 3.800781 14.222656 Z M 9.324219 14.222656 L 14.699219 14.222656 C 14.769531 13.707031 14.808594 13.285156 14.824219 12.960938 C 14.84375 12.636719 14.851562 12.296875 14.851562 11.949219 C 14.851562 11.613281 14.84375 11.292969 14.824219 10.984375 C 14.808594 10.675781 14.769531 10.265625 14.699219 9.75 L 9.324219 9.75 C 9.257812 10.265625 9.21875 10.675781 9.199219 10.984375 C 9.183594 11.292969 9.175781 11.613281 9.175781 11.949219 C 9.175781 12.296875 9.183594 12.636719 9.199219 12.960938 C 9.21875 13.285156 9.257812 13.707031 9.324219 14.222656 Z M 16.199219 14.222656 L 20.199219 14.222656 C 20.316406 13.824219 20.398438 13.453125 20.4375 13.109375 C 20.480469 12.769531 20.5 12.382812 20.5 11.949219 C 20.5 11.515625 20.480469 11.140625 20.4375 10.824219 C 20.398438 10.507812 20.316406 10.148438 20.199219 9.75 L 16.226562 9.75 C 16.277344 10.332031 16.308594 10.777344 16.324219 11.085938 C 16.34375 11.394531 16.351562 11.679688 16.351562 11.949219 C 16.351562 12.316406 16.339844 12.660156 16.3125 12.984375 C 16.289062 13.3125 16.25 13.722656 16.199219 14.222656 Z M 15.949219 8.25 L 19.699219 8.25 C 19.152344 7.097656 18.398438 6.140625 17.4375 5.371094 C 16.480469 4.605469 15.375 4.066406 14.125 3.75 C 14.542969 4.363281 14.898438 5.03125 15.1875 5.746094 C 15.480469 6.464844 15.734375 7.296875 15.949219 8.25 Z M 9.601562 8.25 L 14.449219 8.25 C 14.269531 7.363281 13.960938 6.511719 13.527344 5.6875 C 13.09375 4.859375 12.585938 4.132812 12 3.496094 C 11.46875 3.949219 11.019531 4.539062 10.652344 5.273438 C 10.285156 6.007812 9.933594 7 9.601562 8.25 Z M 4.300781 8.25 L 8.074219 8.25 C 8.257812 7.347656 8.492188 6.542969 8.777344 5.835938 C 9.058594 5.128906 9.417969 4.441406 9.851562 3.773438 C 8.601562 4.089844 7.507812 4.621094 6.574219 5.371094 C 5.644531 6.121094 4.882812 7.082031 4.300781 8.25 Z M 4.300781 8.25 "
                    fill="currentColor"
                  ></path>
                </svg>
                <span>{currentLanguage.nativeName}</span>
              </div>
              <HiOutlineChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {langOpen && (
              <div className={`absolute top-full mt-2 left-0 w-full rounded-lg shadow-lg border overflow-hidden z-50 ${
                isDark ? "bg-[#1a1d23] border-gray-700" : "bg-white border-gray-200"
              }`}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setLangOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors flex items-center gap-2 whitespace-nowrap ${
                      language === lang.code
                        ? "bg-[#21f201] text-black"
                        : isDark 
                          ? "hover:bg-gray-700 text-gray-300"
                          : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span className="font-medium flex-shrink-0">{lang.nativeName}</span>
                    <span className={`text-xs flex-shrink-0 ${language === lang.code ? "text-black/60" : isDark ? "text-gray-500" : "text-gray-400"}`}>
                      ({lang.name})
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden space-y-6">
        {/* Logo, Copyright, Social - Mobile */}
        <div className="flex flex-col gap-4 pb-4 border-b border-gray-300">
          <div>
            <p className={`text-xs mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              Managed by
            </p>
            <img 
              src="/logo.png" 
              alt="DFS Chain Logo" 
              className={`w-24 ${isDark ? "brightness-0 invert" : "brightness-0"}`}
            />
          </div>
          <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            <p>{t("footer.copyright")}</p>
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon
              return (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isDark 
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            })}
          </div>
        </div>

        {/* Link Columns - Mobile */}
        <div className="space-y-4">
          {linkColumns.map((column, colIdx) => (
            <div key={colIdx}>
              <button
                onClick={() => toggle(colIdx)}
                className={`w-full flex justify-between items-center font-bold py-3 border-b ${
                  isDark ? "border-gray-700" : "border-gray-300"
                }`}
              >
                <span className="text-sm">{t(column.titleKey)}</span>
                <span className="text-xs">{open === colIdx ? "▲" : "▼"}</span>
              </button>
              <ul
                className={`pt-3 space-y-2 overflow-hidden transition-all duration-500 ease-in-out ${
                  isDark ? "text-gray-300" : "text-gray-600"
                } ${open === colIdx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
              >
                {column.items.map((item, i) => (
                  <li key={i} className="hover:underline cursor-pointer text-sm py-1">
                    {item.link.startsWith('/') ? (
                      <Link href={item.link} className="block">{t(item.nameKey)}</Link>
                    ) : (
                      <a href={item.link} className="block" target="_blank" rel="noopener noreferrer">{t(item.nameKey)}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Language Switcher - Mobile */}
        <div className="pt-4 border-t border-gray-300">
          <h4 className={`font-bold mb-3 text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
            {t("common.language")}
          </h4>
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`w-full flex items-center justify-between gap-1 px-3 py-2.5 rounded-lg transition-colors text-sm ${
                isDark 
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-300" 
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <svg
                  data-theme="dark"
                  viewBox="0 0 24 24"
                  focusable="false"
                  className="w-4 h-4"
                >
                  <path
                    d="M 12 21.996094 C 10.601562 21.996094 9.292969 21.734375 8.074219 21.210938 C 6.859375 20.683594 5.800781 19.972656 4.902344 19.074219 C 4 18.171875 3.292969 17.109375 2.777344 15.886719 C 2.257812 14.660156 2 13.347656 2 11.949219 C 2 10.546875 2.257812 9.242188 2.777344 8.035156 C 3.292969 6.828125 4 5.773438 4.902344 4.875 C 5.800781 3.972656 6.859375 3.269531 8.074219 2.761719 C 9.292969 2.253906 10.601562 1.996094 12 1.996094 C 13.402344 1.996094 14.710938 2.253906 15.925781 2.761719 C 17.144531 3.269531 18.199219 3.972656 19.101562 4.875 C 20 5.773438 20.710938 6.828125 21.226562 8.035156 C 21.742188 9.242188 22 10.546875 22 11.949219 C 22 13.347656 21.742188 14.660156 21.226562 15.886719 C 20.710938 17.109375 20 18.171875 19.101562 19.074219 C 18.199219 19.972656 17.144531 20.683594 15.925781 21.210938 C 14.710938 21.734375 13.402344 21.996094 12 21.996094 Z M 12 20.546875 C 12.585938 19.949219 13.070312 19.261719 13.464844 18.484375 C 13.855469 17.710938 14.175781 16.789062 14.425781 15.722656 L 9.601562 15.722656 C 9.835938 16.722656 10.148438 17.625 10.539062 18.421875 C 10.929688 19.222656 11.417969 19.929688 12 20.546875 Z M 9.875 20.25 C 9.460938 19.613281 9.101562 18.929688 8.800781 18.199219 C 8.5 17.464844 8.25 16.640625 8.050781 15.722656 L 4.300781 15.722656 C 4.933594 16.90625 5.667969 17.835938 6.5 18.511719 C 7.335938 19.183594 8.460938 19.765625 9.875 20.25 Z M 14.152344 20.222656 C 15.351562 19.839844 16.429688 19.265625 17.386719 18.5 C 18.347656 17.730469 19.117188 16.804688 19.699219 15.722656 L 15.976562 15.722656 C 15.757812 16.625 15.503906 17.441406 15.214844 18.171875 C 14.921875 18.90625 14.566406 19.589844 14.152344 20.222656 Z M 3.800781 14.222656 L 7.777344 14.222656 C 7.726562 13.773438 7.695312 13.367188 7.6875 13.011719 C 7.679688 12.652344 7.675781 12.296875 7.675781 11.949219 C 7.675781 11.53125 7.683594 11.160156 7.699219 10.835938 C 7.71875 10.511719 7.75 10.148438 7.800781 9.75 L 3.800781 9.75 C 3.683594 10.148438 3.605469 10.507812 3.5625 10.824219 C 3.523438 11.140625 3.5 11.515625 3.5 11.949219 C 3.5 12.382812 3.523438 12.769531 3.5625 13.109375 C 3.605469 13.453125 3.683594 13.824219 3.800781 14.222656 Z M 9.324219 14.222656 L 14.699219 14.222656 C 14.769531 13.707031 14.808594 13.285156 14.824219 12.960938 C 14.84375 12.636719 14.851562 12.296875 14.851562 11.949219 C 14.851562 11.613281 14.84375 11.292969 14.824219 10.984375 C 14.808594 10.675781 14.769531 10.265625 14.699219 9.75 L 9.324219 9.75 C 9.257812 10.265625 9.21875 10.675781 9.199219 10.984375 C 9.183594 11.292969 9.175781 11.613281 9.175781 11.949219 C 9.175781 12.296875 9.183594 12.636719 9.199219 12.960938 C 9.21875 13.285156 9.257812 13.707031 9.324219 14.222656 Z M 16.199219 14.222656 L 20.199219 14.222656 C 20.316406 13.824219 20.398438 13.453125 20.4375 13.109375 C 20.480469 12.769531 20.5 12.382812 20.5 11.949219 C 20.5 11.515625 20.480469 11.140625 20.4375 10.824219 C 20.398438 10.507812 20.316406 10.148438 20.199219 9.75 L 16.226562 9.75 C 16.277344 10.332031 16.308594 10.777344 16.324219 11.085938 C 16.34375 11.394531 16.351562 11.679688 16.351562 11.949219 C 16.351562 12.316406 16.339844 12.660156 16.3125 12.984375 C 16.289062 13.3125 16.25 13.722656 16.199219 14.222656 Z M 15.949219 8.25 L 19.699219 8.25 C 19.152344 7.097656 18.398438 6.140625 17.4375 5.371094 C 16.480469 4.605469 15.375 4.066406 14.125 3.75 C 14.542969 4.363281 14.898438 5.03125 15.1875 5.746094 C 15.480469 6.464844 15.734375 7.296875 15.949219 8.25 Z M 9.601562 8.25 L 14.449219 8.25 C 14.269531 7.363281 13.960938 6.511719 13.527344 5.6875 C 13.09375 4.859375 12.585938 4.132812 12 3.496094 C 11.46875 3.949219 11.019531 4.539062 10.652344 5.273438 C 10.285156 6.007812 9.933594 7 9.601562 8.25 Z M 4.300781 8.25 L 8.074219 8.25 C 8.257812 7.347656 8.492188 6.542969 8.777344 5.835938 C 9.058594 5.128906 9.417969 4.441406 9.851562 3.773438 C 8.601562 4.089844 7.507812 4.621094 6.574219 5.371094 C 5.644531 6.121094 4.882812 7.082031 4.300781 8.25 Z M 4.300781 8.25 "
                    fill="currentColor"
                  ></path>
                </svg>
                <span>{currentLanguage.nativeName}</span>
              </div>
              <HiOutlineChevronDown className={`w-4 h-4 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {langOpen && (
              <div className={`absolute top-full mt-2 left-0 w-full rounded-lg shadow-lg border overflow-hidden z-50 ${
                isDark ? "bg-[#1a1d23] border-gray-700" : "bg-white border-gray-200"
              }`}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setLangOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center gap-2 whitespace-nowrap ${
                      language === lang.code
                        ? "bg-[#21f201] text-black"
                        : isDark 
                          ? "hover:bg-gray-700 text-gray-300"
                          : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span className="font-medium flex-shrink-0">{lang.nativeName}</span>
                    <span className={`text-xs flex-shrink-0 ${language === lang.code ? "text-black/60" : isDark ? "text-gray-500" : "text-gray-400"}`}>
                      ({lang.name})
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </footer>
  )
}

interface LayoutWrapperProps {
  children: ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}




