export type HeroProps = {
  title: "hero";
  balance: number;
  name: string;
  stats: Record<string, number>;
  state: {
    name: string;
    do: (pool: Pool3, data: unknown) => void;
  };
};

export const modificators = ["corn", "bake", "rest"] as const;
export type ModKeys = (typeof modificators)[number];

export interface Establishment {
  key: number;
  title: ModKeys;
  state: string | null;
  dice_roll: number;
  blue?: { income: number };
  red?: { income: number };
  green?: { income: number; modifier: ModKeys };
}

interface Blue {
  blue: { income: number; tags: ModKeys[] };
}

export type ItemProps = {
  title: "item";
  name: string;
  data: [number, number];
};

export type Item = HeroProps | ItemProps | Establishment | null;

export type Pool3 = {
  heroes: HeroProps[];
  dice: ItemProps[];
  modificators: Record<ModKeys, number[]>;
  establishment: Establishment[];
};
