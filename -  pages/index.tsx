import { useState } from "react";
import { suggestOutfits, Item } from "../lib/suggester";

export default function Home() {
  const [closet, setCloset] = useState<Item[]>([]);
  const [form, setForm] = useState<Item>({
    id: "",
    name: "",
    category: "tops",
    color: "",
    brand: "",
    material: "",
    season: "all-season",
    formality: 3
  });
  const [event, setEvent] = useState("カジュアルデート");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const addItem = () => {
    if (!form.name) return;
    setCloset([...closet, { ...form, id: crypto.randomUUID() }]);
    setForm({ id: "", name: "", category: "tops", color: "", brand: "", material: "", season: "all-season", formality: 3 });
  };

  const handleSuggest = () => {
    const result = suggestOutfits(event, closet);
    setSuggestions(result);
  };

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>AIスタイリスト（MVP公開版）</h1>
      <p style={{ color: "#555" }}>アイテムを登録 → イベント選択 → 提案を表示</p>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>アイテム追加</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 12 }}>
          <input placeholder="名前" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Item["category"] })}>
            <option value="tops">トップス</option>
            <option value="bottoms">ボトムス</option>
            <option value="outerwear">アウター</option>
            <option value="shoes">靴</option>
            <option value="accessory">アクセサリー</option>
          </select>
          <input placeholder="色" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
          <input placeholder="ブランド" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
          <input placeholder="素材" value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} />
          <select value={form.season} onChange={(e) => setForm({ ...form, season: e.target.value as Item["season"] })}>
            <option value="spring">春</option>
            <option value="summer">夏</option>
            <option value="autumn">秋</option>
            <option value="winter">冬</option>
            <option value="all-season">通年</option>
          </select>
          <select value={form.formality} onChange={(e) => setForm({ ...form, formality: Number(e.target.value) })}>
            <option value={1}>フォーマル度 1</option>
            <option value={2}>フォーマル度 2</option>
            <option value={3}>フォーマル度 3</option>
            <option value={4}>フォーマル度 4</option>
            <option value={5}>フォーマル度 5</option>
          </select>
          <button onClick={addItem}>追加</button>
        </div>

        <div style={{ marginTop: 16 }}>
          <h3>クローゼット</h3>
          <ul>
            {closet.map((i) => (
              <li key={i.id}>{i.name} ／ {i.category} ／ {i.color} ／ {i.brand || "-"} ／ F{i.formality}</li>
            ))}
          </ul>
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>イベント選択</h2>
        <select value={event} onChange={(e) => setEvent(e.target.value)}>
          <option value="結婚式">結婚式</option>
          <option value="カジュアルデート">カジュアルデート</option>
          <option value="ピクニック">ピクニック</option>
          <option value="出社">出社</option>
        </select>
        <button onClick={handleSuggest}>コーデ提案</button>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>提案</h2>
        {suggestions.map((s, idx) => (
          <div key={idx}>
            <p>👕 {s.items.map((x: Item) => x.name).join(" + ")}</p>
            <p>理由: {s.rationale}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
