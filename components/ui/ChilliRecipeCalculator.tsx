
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const recipes = {
  sambal: {
    name: "Sambal Belacan",
    base: {
      "Bird's Eye Chili (g)": 100,
      "Garlic (g)": 50,
      "Lime (pcs)": 1,
      "Belacan (g)": 30,
      "Salt & Sugar (g)": 5
    }
  },
  garlic: {
    name: "Crispy Garlic Shrimp Chili",
    base: {
      "Dried Chili (g)": 30,
      "Garlic (g)": 40,
      "Dried Shrimp (g)": 20,
      "Chili Oil (ml)": 30,
      "Salt & Seasoning (g)": 5
    }
  }
};

export default function ChilliRecipeCalculator() {
  const [selected, setSelected] = useState("sambal");
  const [bottles, setBottles] = useState(0);
  const [ingredientQty, setIngredientQty] = useState('');
  const [ingredientName, setIngredientName] = useState(Object.keys(recipes[selected].base)[0]);
  const [results, setResults] = useState({});
  const [mode, setMode] = useState('bottles');

  const handleBottleCalc = () => {
    const updated = {};
    Object.entries(recipes[selected].base).forEach(([key, value]) => {
      updated[key] = value * bottles;
    });
    setResults(updated);
  };

  const handleIngredientCalc = () => {
    const perBottle = recipes[selected].base[ingredientName];
    const numBottles = Math.floor(Number(ingredientQty) / perBottle);
    const updated = {};
    Object.entries(recipes[selected].base).forEach(([key, value]) => {
      updated[key] = value * numBottles;
    });
    setResults(updated);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Chilli Now Recipe Calculator</h1>

      <div className="mb-4 space-x-2">
        <Button variant={selected === 'sambal' ? 'default' : 'outline'} onClick={() => {
          setSelected('sambal');
          setIngredientName(Object.keys(recipes['sambal'].base)[0]);
          setResults({});
        }}>Sambal Belacan</Button>
        <Button variant={selected === 'garlic' ? 'default' : 'outline'} onClick={() => {
          setSelected('garlic');
          setIngredientName(Object.keys(recipes['garlic'].base)[0]);
          setResults({});
        }}>Garlic Shrimp Chili</Button>
      </div>

      <div className="mb-4">
        <Button onClick={() => setMode('bottles')} className="mr-2">By Bottles</Button>
        <Button onClick={() => setMode('ingredient')}>By Ingredient</Button>
      </div>

      {mode === 'bottles' ? (
        <div className="space-y-2">
          <label className="block">Number of Bottles:</label>
          <Input
            type="number"
            value={bottles}
            onChange={e => setBottles(Number(e.target.value))}
            min={0}
          />
          <Button onClick={handleBottleCalc}>Calculate</Button>
        </div>
      ) : (
        <div className="space-y-2">
          <label className="block">Select Ingredient:</label>
          <select
            value={ingredientName}
            onChange={e => setIngredientName(e.target.value)}
            className="w-full border p-2 rounded"
          >
            {Object.keys(recipes[selected].base).map(key => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
          <label className="block">Total Quantity You Have (in unit shown):</label>
          <Input
            type="number"
            value={ingredientQty}
            onChange={e => setIngredientQty(e.target.value)}
            min={0}
          />
          <Button onClick={handleIngredientCalc}>Calculate</Button>
        </div>
      )}

      {Object.keys(results).length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Calculated Recipe for {recipes[selected].name}:</h2>
          <ul className="space-y-1">
            {Object.entries(results).map(([key, value]) => (
              <li key={key}>{key}: <strong>{value}</strong></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
