import React from "react";

const headerItems = [
  {
    name: "Home",
  },
  {
    name: "About Us",
  },
  {
    name: "Contact",
  },
];

function HeaderItems() {
  return (
    <div className="md:flex gap-10 hidden">
      {headerItems.map((item, index) => (
        <a
          key={index}
          href={`/#${item.name.toLowerCase().replace(" ", "-")}`}
          className="text p-1 link font-thin"
        >
          {item.name}
        </a>
      ))}
    </div>
  );
}

export default HeaderItems;
