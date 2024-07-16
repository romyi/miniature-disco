export const B = {
  wheat_field: {
    title: "wheat field",
    state: null,
    dice_roll: 1,
    cost: 1,
    blue: {
      income: 1,
      tags: ["wheat_field", "agriculture"],
    },
  },
  livestock_farm: {
    title: "livestock farm",
    state: null,
    dice_roll: 2,
    blue: {
      income: 1,
      tags: ["livestock_farm", "cattle"],
    },
  },
  forest: {
    title: "forest",
    state: null,
    dice_roll: 5,
    cost: 3,
    blue: {
      income: 1,
      tags: ["forest", "materials"],
    },
  },
  mine: {
    title: "mine",
    state: null,
    dice_roll: 9,
    cost: 6,
    blue: {
      income: 5,
      tags: ["mine", "materials"],
    },
  },
  apple_orchard: {
    title: "apple orchard",
    state: null,
    dice_roll: 10,
    cost: 3,
    blue: {
      income: 3,
      tags: ["apple_orchard", "agriculture"],
    },
  },
};

export const G = {
  bakery: {
    title: "bakery",
    state: null,
    dice_roll: 3,
    cost: 1,
    green: {
      income: 1,
    },
  },
  konbini: {
    title: "konbini",
    state: null,
    dice_roll: 4,
    cost: 2,
    green: {
      income: 3,
    },
  },
  cheese_factory: {
    title: "cheese factory",
    state: null,
    dice_roll: 7,
    cost: 5,
    green: {
      income: 3,
      modifiers: ["all", "livestock_farm"],
    },
  },
  furniture_factory: {
    title: "furniture factory",
    state: null,
    dice_roll: 8,
    cost: 3,
    green: {
      income: 3,
      modifiers: ["all", "materials"],
    },
  },
  produce_market: {
    title: "produce market",
    state: null,
    dice_roll: 11,
    cost: 2,
    green: {
      income: 2,
      modifiers: ["all", "agriculture"],
    },
  },
};

export const R = {
  caffee: {
    title: "caffee",
    state: null,
    dice_roll: 10,
    red: {
      income: 5,
    },
  },
};
