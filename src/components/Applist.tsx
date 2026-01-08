import React from "react";
import DappRow from "./item/DappRow";

const Applist: React.FC = () => {
  const dapps = [
    {
      rank: 1,
      name: "World of Dypians",
      categories: [
        "Metaverse",
        "RPG",
        "Strategy",
        "Gaming Platform",
        "Adventure",
      ],
      users: "1.45M",
      growth: 17.87,
      link: "#",
    },
    {
      rank: 2,
      name: "Particle Network",
      categories: ["Wallets", "Developer Tools", "Data Storage"],
      users: "989.42K",
      growth: 127.44,
      link: "#",
    },
    {
      rank: 3,
      name: "SERAPH In The Darkness",
      categories: ["Action", "RPG"],
      users: "895.34K",
      growth: -1.45,
      link: "#",
    },
    {
      rank: 4,
      name: "UXUY Wallet",
      categories: ["Wallets"],
      users: "806.37K",
      growth: -4.3,
      link: "#",
    },
    {
      rank: 5,
      name: "Aluya AI",
      categories: ["Analytics"],
      users: "688.08K",
      growth: -14.98,
      link: "#",
    },
  ];

  return (
    <div className="bg-landing-color text-white px-4 py-16 sm:px-8 md:px-16 lg:px-24 flex flex-col justify-center items-center">
      <div className="text-center mb-12 max-w-4xl">
        <h2 className="text-[2rem] sm:text-[3rem] leading-[3.5rem] font-space text-white">
          Hundreds of Coins Already Deployed on DFS Chain
        </h2>
        <p className="text-xl font-medium mt-4 text-[#C4C5CB]">
          The DFS Chain ecosystem continues to grow, engaging hundreds of
          thousands of active users
        </p>
      </div>

      {/* DApp List */}
      <div className="space-y-6 sm:space-y-8 w-full">
        {dapps.map((dapp, index) => (
          <DappRow
            key={index}
            rank={dapp.rank}
            name={dapp.name}
            categories={dapp.categories}
            users={dapp.users}
            growth={dapp.growth}
            link={dapp.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Applist;
