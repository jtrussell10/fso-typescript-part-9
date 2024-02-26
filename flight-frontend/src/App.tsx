import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

interface Note {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

// Assuming an interface for validation errors from your API
interface ValidationError {
  message: string;
  errors: Record<string, string[]>
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get<Note[]>('http://localhost:3002/api/diaries');
        setNotes(response.data);
      } catch (error) {
        console.error("Failed to fetch notes", error);
      }
    };

    fetchNotes();
  }, []);

  const addNote = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<Note>('http://localhost:3002/api/diaries', {
        date: newDate,
        weather: newWeather,
        visibility: newVisibility,
        comment: newComment
      });
      setNotes(notes.concat(response.data));
      setNewDate('');
      setNewWeather('');
      setNewVisibility('');
      setNewComment('');
    } catch (error) {
      if (axios.isAxiosError<ValidationError>(error)) {
        console.error("Failed to add note:", error.message);
        alert(`Failed to add note: ${error.response?.data.message || 'An error occurred'}`);
        if (error.response?.data.errors) {
          const errors = error.response.data.errors;
          Object.keys(errors).forEach(key => {
            errors[key].forEach(errMessage => {
              alert(`${key}: ${errMessage}`);
            });
          });
        }
      } else {
        console.error("An unexpected error occurred:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={newDate}
            onChange={e => setNewDate(e.target.value)}
          />
        </div>
        <fieldset>
          <legend>Weather:</legend>
          {["Sunny", "Rainy", "Cloudy", "Stormy", "Windy"].map(weather => (
            <label key={weather}>
              <input
                type="radio"
                name="weather"
                value={weather.toLowerCase()}
                checked={newWeather === weather.toLowerCase()}
                onChange={e => setNewWeather(e.target.value)}
              />
              {weather}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>Visibility:</legend>
          {["Great", "Good", "Okay", "Poor"].map(visibility => (
            <label key={visibility}>
              <input
                type="radio"
                name="visibility"
                value={visibility.toLowerCase()}
                checked={newVisibility === visibility.toLowerCase()}
                onChange={e => setNewVisibility(e.target.value)}
              />
              {visibility}
            </label>
          ))}
        </fieldset>
        <div>
          <label>Comment:</label>
          <input
            type="text"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
          />
        </div>
        <button type="submit">Add Note</button>
      </form>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <div>{note.date}</div>
            Weather: {note.weather}, Visibility: {note.visibility}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
