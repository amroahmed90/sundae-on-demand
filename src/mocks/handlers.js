import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3035/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Mint Chip", imagePath: "/images/mint-chip.png" },
        { name: "Salted Caramel", imagePath: "/images/salted-caramel.png" },
      ]),
    );
  }),

  rest.get("http://localhost:3035/toppings", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
        { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
      ]),
    );
  }),
];
