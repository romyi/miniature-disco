export type HeroProps = {
  title: "hero";
  balance: number;
  name: string;
  state: {
    name: string;
    do: (pool: Pool3, item: ItemProps, hero: HeroProps) => void;
  };
};

export interface Establishment {
  key: number;
  title: string;
  state: string | null;
  dice_roll: number;
  blue?: { income: number; tags: string[] };
  red?: { income: number };
  green?: { income: number; modifiers: string[] };
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
  establishment: Establishment[];
};

export type EstablishmentConfig = [number, number, Establishment];
