import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { date: 'Mon', mood: 3 },
  { date: 'Tue', mood: 4 },
  { date: 'Wed', mood: 2 },
  { date: 'Thu', mood: 5 },
  { date: 'Fri', mood: 3 },
];

const getMoodScore = (text) => {
  const moodWords = {
    happy: 5, great: 5, good: 4, okay: 3, fine: 3, meh: 2, sad: 1, terrible: 1
  };
  const lower = text.toLowerCase();
  for (const [word, score] of Object.entries(moodWords)) {
    if (lower.includes(word)) return score;
  }
  return 3; // neutral default
};

export default function WellNudge() {
  const [entry, setEntry] = useState('');
  const [moodHistory, setMoodHistory] = useState(mockData);
  const [suggestion, setSuggestion] = useState('');

  const handleSubmit = () => {
    const score = getMoodScore(entry);
    const newEntry = { date: `Day ${moodHistory.length + 1}`, mood: score };
    setMoodHistory([...moodHistory, newEntry]);

    const suggestions = {
      5: "Keep up the positive vibes! Try journaling again tomorrow!",
      4: "You're doing well. Maybe do a creative activity today!",
      3: "You're feeling neutral. How about a walk or music break?",
      2: "A bit down? Try a short meditation or deep breathing.",
      1: "Rough day? Call a friend or write more about how you feel."
    };
    setSuggestion(suggestions[score]);
    setEntry('');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">WellNudge</h1>
      <Card>
        <CardContent className="space-y-4">
          <p className="text-lg">How are you feeling today?</p>
          <Input 
            placeholder="Type your thoughts here..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
          <Button onClick={handleSubmit}>Submit Entry</Button>
        </CardContent>
      </Card>

      {suggestion && (
        <Card className="bg-blue-50">
          <CardContent>
            <p className="text-blue-800">✨ {suggestion}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Mood Tracker</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={moodHistory}>
              <XAxis dataKey="date" />
              <YAxis domain={[1, 5]} allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="mood" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
