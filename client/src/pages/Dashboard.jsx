import "./Dashboard.css";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import wordCloudImg from "../icons/wordcloud.png";

export default function Dashboard() {
  // Sample data for “Activities”
  const activityData = [
    { date: "Oct 10", Routine: 10, Challenge: 5 },
    { date: "Oct 12", Routine: 15, Challenge: 7 },
    { date: "Oct 14", Routine: 18, Challenge: 8 },
    { date: "Oct 16", Routine: 20, Challenge: 10 },
    { date: "Oct 18", Routine: 15, Challenge: 9 },
    { date: "Oct 20", Routine: 25, Challenge: 12 },
    { date: "Oct 22", Routine: 30, Challenge: 15 },
  ];

  const planning = [
    { id: 1, title: "Natural Language Intervention", date: "Dec 14, 08:30 PM", icon: "🏅" },
    { id: 2, title: "Pivot Response Treatment", date: "Dec 18, 10:30 PM", icon: "📋" },
    { id: 3, title: "Meet My Therapist", date: "Dec 18, 10:30 PM", icon: "🪐" },
    { id: 4, title: "Music Therapy", date: "Dec 22, 10:30 PM", icon: "🎧" },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        {/* ACTIVITIES CHART */}
        <div className="panel activities">
          <div className="panel-header">
            <h3>Activities</h3>
            <select>
              <option>Week</option>
              <option>Month</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Routine" stroke="#f97316" strokeWidth={3} />
              <Line type="monotone" dataKey="Challenge" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PLANNING SECTION */}
        <div className="panel planning">
          <div className="panel-header">
            <h3>Oliver’s Planning</h3>
            <select>
              <option>Week</option>
              <option>Month</option>
            </select>
          </div>
          <div className="planning-list">
            {planning.map((p) => (
              <div className="planning-item" key={p.id}>
                <div className="icon">{p.icon}</div>
                <div className="details">
                  <p className="title">{p.title}</p>
                  <p className="date">{p.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WORD CLOUD (STATIC IMAGE FOR NOW) */}
        <div className="panel wordcloud">
          <div className="panel-header">
            <h3>Word Cloud</h3>
            <select>
              <option>Monthly</option>
              <option>Weekly</option>
            </select>
          </div>
          <img
            src={wordCloudImg}
            alt="Word Cloud"
            className="wordcloud-img"
          />
        </div>

        {/* OLIVER’S CORPUS */}
        <div className="panel corpus">
          <div className="panel-header">
            <h3>Oliver's Corpus</h3>
          </div>
          <p>
            <strong>Language Profile:</strong> Oliver primarily uses declarative sentences with occasional echolalia.
            He responds well to visual cues and shows strong engagement with topics related to animals and vehicles.
          </p>
          <p>
            <strong>Communication Patterns:</strong>
            • Prefers concrete questions over abstract concepts<br />
            • Uses repetitive sentence starters ("I see...", "Look at...")<br />
            • Strong vocabulary in specific interest areas<br />
            • Emerging use of emotional descriptors
          </p>
          <p>
            <strong>BridgeTalk Adaptation:</strong> The system uses open-ended questions about his interest areas
            to encourage expanded responses, while gradually introducing new vocabulary through contextual repetition
            and positive reinforcement.
          </p>
          <p>
            <strong>Recent Progress:</strong> Oliver has begun initiating conversations 23% more frequently
            and is using 15% more varied sentence structures compared to last month.
          </p>
        </div>
      </div>
    </div>
  );
}
