'use client'

import React from "react"
import { useTheme } from '../src/context/ThemeContext'
import { useLanguage } from '../src/context/LanguageContext'
import { useState } from "react"

export default function HomePage(): React.JSX.Element {
  const { isDark } = useTheme()
  const { t } = useLanguage()

  // Landing Section
  const Landing = () => (
    <div className={`first-section px-4 sm:pl-8 md:pl-16 lg:pl-20 ${!isDark ? "first-section-light" : ""}`}>
      <div className="relative flex flex-col justify-center text-center space-y-8 pt-32 sm:pt-48 md:pb-72 pb-28 items-start" style={{ zIndex: 10 }}>
        <div className={`flex items-center space-x-3 rounded-[40px] p-2 justify-center sm:justify-start ${isDark ? "bg-[#373943] text-white" : "bg-gray-100 text-gray-900 border border-gray-200"}`}>
          <div className="w-2 h-2 bg-[#53EAA1] rounded-[50%]"></div>
          <div className={`text-[14px] leading-[24px] font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
            {t('landing.status.layer0')}{" "}
            <span className={`text-[14px] leading-[24px] ${isDark ? "text-[#C4C5CB]" : "text-gray-500"}`}>{" "}{t('landing.status.isLive')}</span>
          </div>
        </div>
        <h1 className="sm:text-[3rem] text-2xl font-bold text-black font-zen">DFS SimuChain</h1>
        <p className={`text-2xl sm:text-5xl font-space text-start max-w-3xl ${isDark ? "text-white" : "text-gray-900"}`}>
          {t('landing.hero.subtitle')}
        </p>
        <div className="flex flex-row gap-2 justify-center">
          <button className={`font-space py-1.5 px-4 text-sm sm:text-base rounded-md transition duration-300 ${isDark ? "bg-[#F7F7F8] text-[#181A1E] hover:bg-[#e1d9d9]" : "bg-gray-900 text-white hover:bg-gray-800"}`}>
            {t('landing.hero.issueCoin')}
          </button>
          <button className={`font-space bg-transparent border py-1.5 px-4 text-sm sm:text-base rounded-md transition duration-300 ${isDark ? "text-slate-300 border-white hover:bg-white hover:text-black" : "text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-black"}`}>
            {t('common.contactUs')}
          </button>
        </div>
      </div>
    </div>
  )

  // Second Section (Stats)
  const Second = () => (
    <div className={`px-4 py-8 sm:py-12 md:py-16 sm:px-8 md:px-16 lg:px-24 transition-colors duration-300 ${isDark ? "bg-landing-color text-white" : "bg-white text-gray-900"}`}>
      <div className="text-center mb-12 flex flex-col sm:flex-row justify-between items-center">
        <h2 className={`font-bold text-start text-3xl sm:text-5xl max-w-xl font-space leading-[3.5rem] mb-4 sm:mb-0 ${isDark ? "text-white" : "text-gray-900"}`}>
          {t('home.stats.title.prefix')} <span className="text-[#21f201]">{t('home.stats.title.highlight')}</span> {t('home.stats.title.suffix')}
        </h2>
        <p className={`text-[1.25rem] font-space mt-4 sm:mt-0 text-start max-w-[25rem] ${isDark ? "text-[#C4C5CB]" : "text-gray-600"}`}>
          {t('home.stats.description')}
        </p>
      </div>
      <div className={`border-b border-solid w-full mb-6 ${isDark ? "border-[#373943]" : "border-gray-200"}`}></div>
      <div className="flex flex-col sm:flex-row justify-between items-stretch gap-2 sm:gap-3">
        {[
          { icon: "users", value: "100K", label: t('home.stats.activeUsers') },
          { icon: "apps", value: "100", label: t('home.stats.activeDapps') },
          { icon: "tokens", value: "100K", label: t('home.stats.generatedTokens') },
        ].map((stat, idx) => (
          <div key={idx} className={`flex flex-row md:flex-col justify-between items-center md:items-center px-4 md:px-6 pt-6 md:pt-8 pb-6 md:pb-8 rounded-xl border-l-2 border-solid h-full flex-1 ${isDark ? "bg-landing-color border-gray-600" : "bg-gray-50 border-gray-300"}`}>
            <a href="https://bscscan.com/chart/address" target="_blank" rel="noreferrer noopener" className={`flex md:mx-auto md:h-12 md:w-12 rounded-full md:items-center md:justify-center h-16 w-16 items-center justify-center flex-shrink-0 mb-0 md:mb-6 ${isDark ? "bg-gray-800 text-gray-400" : "bg-gray-200 text-gray-500"}`}>
              {stat.icon === "tokens" ? (
                <img src="/100k.png" alt="logo" className={`md:w-6 md:h-6 w-10 h-10 ${!isDark ? "opacity-60" : ""}`} />
              ) : (
                <svg viewBox="0 0 24 24" focusable="false" className="md:w-6 md:h-6 w-8 h-8">
                  {stat.icon === "users" ? (
                    <path d="M4.61979 14.0818L6.75054 11.951L4.61979 9.82029L2.48904 11.951L4.61979 14.0818ZM17.9659 13.6722L20.1005 10.2491L22.2447 13.6722H17.9659ZM12.3539 12.8452C11.6337 12.8452 11.0204 12.5928 10.514 12.088C10.0076 11.5832 9.75441 10.9703 9.75441 10.2491C9.75441 9.51355 10.0068 8.89697 10.5116 8.39939C11.0164 7.90181 11.6294 7.65302 12.3505 7.65302C13.0861 7.65302 13.7027 7.90148 14.2003 8.39841C14.6979 8.89535 14.9467 9.51112 14.9467 10.2457C14.9467 10.9659 14.6982 11.5792 14.2013 12.0856C13.7043 12.592 13.0885 12.8452 12.3539 12.8452ZM12.3505 9.15296C12.048 9.15296 11.7896 9.25802 11.5755 9.46812C11.3614 9.67822 11.2544 9.93855 11.2544 10.2491C11.2544 10.5517 11.3614 10.81 11.5755 11.0241C11.7896 11.2382 12.0496 11.3453 12.3553 11.3453C12.6611 11.3453 12.9195 11.2382 13.1304 11.0241C13.3412 10.81 13.4467 10.5501 13.4467 10.2443C13.4467 9.93855 13.3416 9.68021 13.1316 9.46931C12.9215 9.25841 12.6611 9.15296 12.3505 9.15296ZM0.850586 18.1337V16.9145C0.850586 16.2388 1.19915 15.6898 1.89629 15.2673C2.59344 14.8449 3.49815 14.6337 4.61044 14.6337C4.8141 14.6337 5.00953 14.6395 5.19671 14.651C5.38389 14.6625 5.56274 14.685 5.73324 14.7183C5.54479 15.0132 5.40184 15.327 5.30441 15.6597C5.20698 15.9925 5.15826 16.3469 5.15826 16.7231V18.1337H0.850586ZM6.85056 18.1337V16.7587C6.85056 15.8036 7.35879 15.0375 8.37526 14.4606C9.39171 13.8837 10.7177 13.5952 12.3532 13.5952C14.004 13.5952 15.3329 13.8837 16.3399 14.4606C17.347 15.0375 17.8505 15.8036 17.8505 16.7587V18.1337H6.85056ZM20.1005 14.6337C21.2255 14.6337 22.1318 14.8449 22.8193 15.2673C23.5068 15.6898 23.8505 16.2388 23.8505 16.9145V18.1337H19.5428V16.7231C19.5428 16.3469 19.4983 15.9925 19.4092 15.6597C19.3201 15.327 19.1864 15.0132 19.0082 14.7183C19.1787 14.685 19.3556 14.6625 19.5388 14.651C19.7221 14.6395 19.9093 14.6337 20.1005 14.6337ZM12.3494 15.0952C11.3104 15.0952 10.4175 15.233 9.67071 15.5087C8.92393 15.7843 8.50951 16.1241 8.42746 16.5279V16.6337H16.289V16.5279C16.1967 16.1241 15.7813 15.7843 15.0429 15.5087C14.3044 15.233 13.4066 15.0952 12.3494 15.0952Z" fill="currentColor" />
                  ) : (
                    <path fillRule="evenodd" clipRule="evenodd" d="M16.455 3.70711C16.8455 3.31658 17.4787 3.31658 17.8692 3.70711L21.2929 7.13077C21.6834 7.52129 21.6834 8.15446 21.2929 8.54498L17.8692 11.9686C17.4787 12.3592 16.8455 12.3592 16.455 11.9686L13.0313 8.54498C12.6408 8.15446 12.6408 7.52129 13.0313 7.13077L16.455 3.70711ZM14.2334 7.83787L17.1621 4.90919L20.0908 7.83787L17.1621 10.7666L14.2334 7.83787Z" fill="currentColor" />
                  )}
                </svg>
              )}
            </a>
            <div className="flex flex-col items-end md:items-center text-right md:text-center">
              <div className={`md:text-[3.5rem] font-zen font-bold md:leading-[4rem] text-3xl mb-3 md:mb-4 ${isDark ? "text-gray-400" : "text-gray-400"}`}>
                {stat.value}<span className="text-[#21f201]">+</span>
              </div>
              <span className={`text-base md:text-lg leading-relaxed font-space ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Join Section
  const JoinSection = () => (
    <div className={`py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-16 lg:px-24 transition-colors duration-300 ${isDark ? "bg-landing-color text-white" : "bg-white text-gray-900"}`}>
      <div className={`text-center border-t border-l border-r border-gray-300 rounded-[32px] p-8 ${isDark ? "bg-[#181A1E]" : "bg-white"}`} style={{ borderBottomWidth: '4px', borderBottomColor: isDark ? '#6b7280' : '#9ca3af', boxShadow: isDark ? "0px 4px 16px 0px rgba(0, 0, 0, 0.2)" : "0px 2px 8px 0px rgba(0, 0, 0, 0.05)" }}>
        <h2 className={`md:text-[3rem] md:leading-[3.5rem] text-3xl font-bold font-space mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
          <span className="text-[#21f201]">{t('home.join.titleHighlight')}</span> {t('home.join.title')}
        </h2>
        <p className={`text-[1.25rem] leading-[1.75rem] font-medium mb-8 font-space ${isDark ? "text-[#C4C5CB]" : "text-gray-600"}`}>
          {t('home.join.description')}
        </p>
        <a href="#" className={`font-space py-1.5 px-4 text-sm sm:text-base rounded-md transition duration-300 inline-block bg-transparent border ${isDark ? "text-slate-300 border-white hover:bg-white hover:text-black" : "text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-black"}`}>
          {t('landing.hero.issueCoin')}
        </a>
      </div>
    </div>
  )

  // Features Section
  const FeaturesSection = () => (
    <div className={`px-4 py-8 sm:py-12 md:py-16 sm:px-8 md:px-16 lg:px-24 transition-colors duration-300 ${isDark ? "bg-landing-color text-white" : "bg-white text-gray-900"}`}>
      <div className="text-start mb-12 max-w-2xl">
        <h2 className={`md:text-[3rem] md:leading-[3.5rem] text-3xl font-bold font-space ${isDark ? "text-white" : "text-gray-900"}`}>
          {t('home.features.title.prefix')}{" "}
          <span className="text-[#21f201]">{t('home.features.title.highlight')}</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
        {[
          { titleKey: 'home.features.compatibility.title', descKey: 'home.features.compatibility.description', icon: 'compatibility' },
          { titleKey: 'home.features.multilingual.title', descKey: 'home.features.multilingual.description', icon: 'multilingual' },
          { titleKey: 'home.features.apps.title', descKey: 'home.features.apps.description', icon: 'apps' },
          { titleKey: 'home.features.validatorFree.title', descKey: 'home.features.validatorFree.description', icon: 'validator' },
        ].map((feature, idx) => (
          <div key={idx} className={`flex flex-col items-start text-center p-6 rounded-xl shadow-xl gap-4 border-l pl-8 ${isDark ? "bg-landing-color border-[#A0AEC0]" : "bg-gray-50 border-gray-400"}`}>
            <div className={`h-14 w-14 rounded-full flex items-center pl-[12px] ${isDark ? "bg-[#1E2026]" : "bg-gray-100"}`}>
              <svg viewBox="0 0 24 24" focusable="false" className={`h-8 w-8 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                <path d="M5.30773 20.5C4.8026 20.5 4.37503 20.325 4.02503 19.975C3.67503 19.625 3.50003 19.1974 3.50003 18.6923V15.75C3.50003 15.5372 3.57183 15.359 3.71543 15.2154C3.85901 15.0718 4.03721 15 4.25003 15C4.46285 15 4.64105 15.0718 4.78463 15.2154C4.92821 15.359 5.00001 15.5372 5.00001 15.75V18.6923C5.00001 18.7692 5.03206 18.8397 5.09616 18.9039C5.16027 18.968 5.2308 19 5.30773 19H8.25003C8.46285 19 8.64105 19.0718 8.78463 19.2154C8.92821 19.359 9.00001 19.5372 9.00001 19.75C9.00001 19.9628 8.92821 20.141 8.78463 20.2846C8.64105 20.4282 8.46285 20.5 8.25003 20.5H5.30773ZM15.75 20.5C15.5372 20.5 15.359 20.4282 15.2154 20.2846C15.0718 20.141 15 19.9628 15 19.75C15 19.5372 15.0718 19.359 15.2154 19.2154C15.359 19.0718 15.5372 19 15.75 19H18.6923C18.7692 19 18.8397 18.968 18.9039 18.9039C18.968 18.8397 19 18.7692 19 18.6923V15.75C19 15.5372 19.0718 15.359 19.2154 15.2154C19.359 15.0718 19.5372 15 19.75 15C19.9628 15 20.141 15.0718 20.2846 15.2154C20.4282 15.359 20.5 15.5372 20.5 15.75V18.6923C20.5 19.1974 20.325 19.625 19.975 19.975C19.625 20.325 19.1974 20.5 18.6923 20.5H15.75ZM7.46921 12L9.12691 13.6577C9.26537 13.7962 9.33461 13.9676 9.33461 14.1721C9.33461 14.3766 9.26537 14.5532 9.12691 14.7019C8.97821 14.857 8.80001 14.933 8.59231 14.9298C8.38462 14.9266 8.20642 14.8506 8.05771 14.7019L5.98848 12.6327C5.80771 12.4519 5.71733 12.241 5.71733 12C5.71733 11.759 5.80771 11.5481 5.98848 11.3673L8.07311 9.2827C8.22181 9.13398 8.39744 9.06059 8.60001 9.06253C8.80257 9.06444 8.97821 9.14297 9.12691 9.2981C9.26537 9.4468 9.33556 9.62243 9.33748 9.825C9.33941 10.0276 9.26602 10.2032 9.11731 10.3519L7.46921 12ZM16.5308 12L14.8731 10.3423C14.7346 10.2038 14.6654 10.0324 14.6654 9.82788C14.6654 9.62339 14.7346 9.4468 14.8731 9.2981C15.0218 9.14297 15.2 9.067 15.4077 9.0702C15.6154 9.07342 15.7936 9.14938 15.9423 9.2981L18.0115 11.3673C18.1923 11.5481 18.2827 11.759 18.2827 12C18.2827 12.241 18.1923 12.4519 18.0115 12.6327L15.9269 14.7173C15.7782 14.866 15.6026 14.9394 15.4 14.9375C15.1974 14.9356 15.0218 14.857 14.8731 14.7019C14.7346 14.5532 14.6644 14.3776 14.6625 14.175C14.6606 13.9724 14.734 13.7968 14.8827 13.6481L16.5308 12ZM4.25003 9C4.03721 9 3.85901 8.92821 3.71543 8.78463C3.57183 8.64104 3.50003 8.46284 3.50003 8.25003V5.30773C3.50003 4.80259 3.67503 4.37502 4.02503 4.02502C4.37503 3.67502 4.8026 3.50002 5.30773 3.50002H8.25003C8.46285 3.50002 8.64105 3.57183 8.78463 3.71543C8.92821 3.85901 9.00001 4.03721 9.00001 4.25002C9.00001 4.46284 8.92821 4.64104 8.78463 4.78463C8.64105 4.92821 8.46285 5 8.25003 5H5.30773C5.2308 5 5.16027 5.03205 5.09616 5.09615C5.03206 5.16027 5.00001 5.23079 5.00001 5.30773V8.25003C5.00001 8.46284 4.92821 8.64104 4.78463 8.78463C4.64105 8.92821 4.46285 9 4.25003 9ZM19.75 9C19.5372 9 19.359 8.92821 19.2154 8.78463C19.0718 8.64104 19 8.46284 19 8.25003V5.30773C19 5.23079 18.968 5.16027 18.9039 5.09615C18.8397 5.03205 18.7692 5 18.6923 5H15.75C15.5372 5 15.359 4.92821 15.2154 4.78463C15.0718 4.64104 15 4.46284 15 4.25002C15 4.03721 15.0718 3.85901 15.2154 3.71543C15.359 3.57183 15.5372 3.50002 15.75 3.50002H18.6923C19.1974 3.50002 19.625 3.67502 19.975 4.02502C20.325 4.37502 20.5 4.80259 20.5 5.30773V8.25003C20.5 8.46284 20.4282 8.64104 20.2846 8.78463C20.141 8.92821 19.9628 9 19.75 9Z" fill="currentColor" />
              </svg>
            </div>
            <h3 className={`text-[2rem] leading-[2.5rem] text-start font-bold font-space mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t(feature.titleKey)}
            </h3>
            <p className={`text-start font-space text-[1.25rem] leading-[1.75rem] ${isDark ? "text-[#C4C5CB]" : "text-gray-600"}`}>
              {t(feature.descKey)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )

  // Developer Programs
  const DeveloperPrograms = () => (
    <div className={`px-4 py-8 sm:py-12 md:py-16 sm:px-8 md:px-16 lg:px-24 md:pt-44 pt-12 sm:pt-20 transition-colors duration-300 ${isDark ? "bg-landing-color text-white" : "bg-white text-gray-900"}`}>
      <div className={`h-auto flex flex-col lg:flex-row items-center justify-between rounded-[32px] p-8 md:pr-0 border-t border-l border-r ${isDark ? "border-[#373943] bg-[#181A1E]" : "border-gray-300 bg-white"}`} style={{ borderBottomWidth: '4px', borderBottomColor: isDark ? '#6b7280' : '#9ca3af', boxShadow: isDark ? "0px 4px 16px 0px rgba(0, 0, 0, 0.2)" : "0px 2px 8px 0px rgba(0, 0, 0, 0.05)" }}>
        <div className="lg:w-1/2 text-start md:pl-14 flex flex-col items-start">
          <h2 className={`text-[32px] sm:text-[3rem] font-space leading-[3.5rem] font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Unlock Next-Level Development
          </h2>
          <p className={`text-[16px] sm:text-[1.25rem] font-space leading-[1.75rem] mb-8 ${isDark ? "text-[#C4C5CB]" : "text-gray-600"}`}>
            Request the apps you need to elevate your project. Enjoy grants, incentives, and additional support to bring your ideas to life. Turn vision into reality—faster than ever!
          </p>
          <div className="w-full flex justify-center lg:justify-start">
            <a href="#" className={`font-space py-1.5 px-4 text-sm sm:text-base rounded-md transition duration-300 inline-block bg-transparent border ${isDark ? "text-slate-300 border-white hover:bg-white hover:text-black" : "text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-black"}`}>
              Make a Request
            </a>
          </div>
        </div>
        <div className="mt-8 lg:mt-0 w-full lg:w-[28rem]" style={{ background: isDark ? "radial-gradient(circle at 1px 1px, #373943 1px, #14151a 1px) 0 0/20px 20px" : "radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 1px) 0 0/20px 20px" }}>
          <img src="/rocket.png" alt="Rocket Image" className="w-full h-auto" />
        </div>
      </div>
    </div>
  )

  // Migrate Section
  const Migrate = () => (
    <div className={`px-4 md:pb-3 pb-3 sm:px-8 md:px-16 lg:px-24 pt-16 sm:pt-24 md:pt-44 transition-colors duration-300 ${isDark ? "bg-landing-color text-white" : "bg-white text-gray-900"}`}>
      <div className={`h-auto flex flex-col lg:flex-row items-center justify-between rounded-[32px] p-8 border-t border-l border-r ${isDark ? "border-[#373943] bg-[#181A1E]" : "border-gray-300 bg-white"}`} style={{ borderBottomWidth: '4px', borderBottomColor: isDark ? '#6b7280' : '#9ca3af', boxShadow: isDark ? "0px 4px 16px 0px rgba(0, 0, 0, 0.2)" : "0px 2px 8px 0px rgba(0, 0, 0, 0.05)" }}>
        <div className="mt-8 lg:mt-0 w-full lg:w-[27rem] pr-8 pl-10" style={{ background: isDark ? "radial-gradient(circle at 1px 1px, #373943 1px, #14151a 1px) 0 0/20px 20px" : "radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 1px) 0 0/20px 20px" }}>
          <img src="/mig.png" alt="Rocket Image" className="w-full h-auto max-w-[24rem] max-h-[24rem]" />
        </div>
        <div className="lg:w-1/2 text-start pl-0 lg:pl-24 mt-8 lg:mt-0">
          <h2 className={`text-[2.5rem] sm:text-[3rem] font-space leading-[3.5rem] font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Migration from Web3 to DFS Chain
          </h2>
          <p className={`text-[1.125rem] sm:text-[1.25rem] font-space leading-[1.75rem] mb-8 ${isDark ? "text-[#C4C5CB]" : "text-gray-600"}`}>
            DFS Chain aims to provide support and assistance to projects seeking to migrate from Web3 blockchains.
          </p>
          <div className="flex justify-center">
            <a href="#" className={`font-space py-1.5 px-4 text-sm sm:text-base rounded-md transition duration-300 inline-block bg-transparent border ${isDark ? "text-slate-300 border-white hover:bg-white hover:text-black" : "text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-black"}`}>
              See Instructions
            </a>
          </div>
        </div>
      </div>
    </div>
  )

  // Developer Resources
  const DeveloperResources = () => {
    const resources = [
      { title: "DFS Scan", description: "Searching and Analyzing DFS Chain Data", icon: "https://res.cloudinary.com/dvrlivsxx/image/upload/v1766673517/guwymkq7msbhbxfwmsly.png", useBrightness: false },
      { title: "Metaface", description: "DFS Chain's main wallet. Secure, fast, and easy to use.", icon: "https://res.cloudinary.com/dvrlivsxx/image/upload/v1766673516/o2cerargskdqluetq0vs.png", useBrightness: false },
      { title: "WEXSWAP", description: "An exchange similar to a DEX ", icon: "https://res.cloudinary.com/dvrlivsxx/image/upload/v1766674347/yw14nsguzbvwonwpfgyx.png", useBrightness: false },
      { title: "White Creator", description: "DRC20 Token Generator", icon: "https://res.cloudinary.com/dvrlivsxx/image/upload/v1766673516/lfbyfr2uevv1l0qhswkd.png", useBrightness: false, iconSize: "w-16 h-16" },
      { title: "Quick ido", description: "Instant Exchanges in Web3 and Web2", icon: "/resource/5.png", useBrightness: true },
      { title: "Moegi Sale", description: "Platform for Early-Stage Fundraising", icon: "https://res.cloudinary.com/dvrlivsxx/image/upload/v1766673516/ihrgv1ojboawarw7j1km.png", useBrightness: false },
      { title: "Other apps", description: "such as Cefi and AppTool, will be updated as needed", icon: "/resource/6.png", useBrightness: true },
    ]

    return (
      <div className={`px-4 pt-16 sm:pt-24 md:pt-32 pb-0 sm:px-8 md:px-16 lg:px-24 lg:pt-48 font-space transition-colors duration-300 ${isDark ? "bg-landing-color text-white" : "bg-white text-gray-900"}`}>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#21f201]">
            Related <span className={isDark ? "text-white" : "text-gray-900"}>Tools</span>
          </h2>
          <p className={`text-lg mt-4 ${isDark ? "text-[#C4C5CB]" : "text-gray-600"}`}>
            Let us introduce the related tools of DFS Chain.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 md:gap-8 gap-2">
          {resources.map((resource, index) => (
            <div key={index} className={`flex flex-col gap-2 md:text-start text-center p-6 rounded-3xl shadow-lg transition-all duration-300 ${isDark ? "bg-[#181A1E] text-white hover:bg-gray-800" : "bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200"}`}>
              <div className="flex p-7 md:pl-0 justify-center md:justify-start">
                <img src={resource.icon} alt="resource" className={`${resource.iconSize || "w-8 h-8"} object-contain ${!isDark && resource.useBrightness ? "brightness-0" : ""}`} />
              </div>
              <h3 className="md:text-2xl text-lg md:font-bold mb-2">{resource.title}</h3>
              <p className={`hidden md:block text-[14px] ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {resource.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // FAQ Section
  const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const faqData = [
      { question: t('home.faq.q1.question'), answer: t('home.faq.q1.answer') },
      { question: t('home.faq.q2.question'), answer: t('home.faq.q2.answer') },
      { question: t('home.faq.q3.question'), answer: t('home.faq.q3.answer') },
      { question: t('home.faq.q4.question'), answer: t('home.faq.q4.answer') },
      { question: t('home.faq.q5.question'), answer: t('home.faq.q5.answer') },
    ]

    return (
      <div className={`px-4 py-16 pb-0 sm:px-8 md:px-16 lg:px-24 lg:pt-52 font-space transition-colors duration-300 ${isDark ? "bg-landing-color text-white" : "bg-white text-gray-900"}`}>
        <div className="text-center mb-14">
          <h2 className={`md:text-[3rem] md:leading-[3.5rem] text-4xl ${isDark ? "text-[#F7F7F8]" : "text-gray-900"}`}>
            {t('home.faq.title')}
          </h2>
        </div>
        <div>
          {faqData.map((faq, index) => (
            <div key={index} className={`border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
              <div className={`flex justify-between items-center py-4 cursor-pointer ${isDark ? "text-white" : "text-gray-900"}`} onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                <span className={`md:text-[3rem] md:leading-[3.5rem] text-[2rem] w-16 ${isDark ? "text-[#8C8F9B]" : "text-gray-400"}`}>
                  {index < 9 ? `0${index + 1}` : index + 1}
                </span>
                <span className="md:text-3xl text-xl text-left px-5">{faq.question}</span>
                <span className="text-4xl">{openIndex === index ? "-" : "+"}</span>
              </div>
              <div className={`overflow-hidden text-start md:px-28 transition-all duration-500 ${openIndex === index ? "max-h-[1000px] p-4" : "max-h-0 p-0"}`}>
                <pre className={`text-xl leading-[1.75rem] whitespace-pre-line ${isDark ? "text-[#C4C5CB]" : "text-gray-600"}`}>
                  {faq.answer}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Build On BNB Section
  const BuildOnBnb = () => (
    <div className={`px-4 pb-8 sm:pb-12 md:pb-16 sm:px-8 md:px-16 lg:px-24 pt-16 sm:pt-24 md:pt-44 transition-colors duration-300 ${isDark ? "bg-landing-color text-white" : "bg-white text-gray-900"}`}>
      <div className={`h-auto flex flex-col items-start justify-between rounded-[32px] p-8 border-t border-l border-r ${isDark ? "border-[#373943] bg-[#181A1E]" : "border-gray-300 bg-white"}`} style={{ borderBottomWidth: '4px', borderBottomColor: isDark ? '#6b7280' : '#9ca3af', boxShadow: isDark ? "0px 4px 16px 0px rgba(0, 0, 0, 0.2)" : "0px 2px 8px 0px rgba(0, 0, 0, 0.05)" }}>
        <div className="w-full text-start">
          <h2 className={`text-[2.5rem] sm:text-[3rem] font-space leading-[3.5rem] font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            {t('home.buildOn.title')}
          </h2>
          <p className={`text-[1.125rem] sm:text-[1.25rem] font-space leading-[1.75rem] mb-8 ${isDark ? "text-[#C4C5CB]" : "text-gray-600"}`}>
            {t('home.buildOn.description')}
          </p>
          <div className="flex justify-center">
            <a href="#" className={`font-space py-1.5 px-4 text-sm sm:text-base rounded-md transition duration-300 inline-block bg-transparent border ${isDark ? "text-slate-300 border-white hover:bg-white hover:text-black" : "text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-black"}`}>
              {t('common.contactUs')}
            </a>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="App">
      <Landing />
      <Second />
      <JoinSection />
      <FeaturesSection />
      <DeveloperPrograms />
      <Migrate />
      <DeveloperResources />
      <FAQ />
      <BuildOnBnb />
    </div>
  )
}
