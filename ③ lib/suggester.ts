export type Item = {
  id: string;
  name: string;
  category: "tops" | "bottoms" | "outerwear" | "shoes" | "accessory";
  color: string;
  brand?: string;
  material?: string;
  season?: "spring" | "summer" | "autumn" | "winter" | "all-season";
  formality?: number;
};

export function suggestOutfits(event: string, closet: Item[]) {
  const tops = closet.filter(i => i.category === "tops");
  const bottoms = closet.filter(i => i.category === "bottoms");
  const outers = closet.filter(i => i.category === "outerwear");
  const shoes = closet.filter(i => i.category === "shoes");

  const outfits = [];

  tops.forEach(t => {
    bottoms.forEach(b => {
      shoes.forEach(s => {
        const base = [t, b, s];
        outfits.push({
          items: base,
          rationale: `TPO「${event}」に合わせた基本コーデ。フォーマル度平均: ${avg([t, b, s])}`
        });
        outers.forEach(o => {
          outfits.push({
            items: [t, b, o, s],
            rationale: `TPO「${event}」に合わせたレイヤードコーデ。フォーマル度平均: ${avg([t, b, o, s])}`
          });
        });
      });
    });
  });

  return outfits.slice(0, 6);
}

function avg(items: Item[]) {
  const scores = items.map(i => i.formality ?? 3);
  return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
}
