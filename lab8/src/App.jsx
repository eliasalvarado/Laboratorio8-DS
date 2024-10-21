import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    'city': '',
    'area': '',
    'rooms': '',
    'bathroom': '',
    'parking spaces': '',
    'animal': '',
    'furniture': '',
    'hoa (R$)': '',
    'rent amount (R$)': '',
    'property tax (R$)': '',
    'fire insurance (R$)': ''
  });

  const [prediccion, setPrediccion] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => setPrediccion(data.prediccion))
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className="App">
      <h1>Calculadora de Trivago (Brasil)</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Ciudad:</label>
          <select name="city" value={formData.city} onChange={handleChange} required>
            <option value="">Selecciona una ciudad</option>
            <option value="Belo Horizonte">Belo Horizonte</option>
            <option value="São Paulo">São Paulo</option>
            <option value="Rio de Janeiro">Rio de Janeiro</option>
            <option value="Porto Alegre">Porto Alegre</option>
          </select>
        </div>

        <div className="form-group">
          <label>Área (m²):</label>
          <input type="number" name="area" value={formData.area} onChange={handleChange} min="4" required />
        </div>

        <div className="form-group">
          <label>Habitaciones:</label>
          <input type="number" name="rooms" value={formData.rooms} onChange={handleChange} min="1" required />
        </div>

        <div className="form-group">
          <label>Baños:</label>
          <input type="number" name="bathroom" value={formData.bathroom} onChange={handleChange} min="1" required />
        </div>

        <div className="form-group">
          <label>Estacionamientos:</label>
          <input type="number" name="parking spaces" value={formData['parking spaces']} onChange={handleChange} min="0" required />
        </div>

        <div className="form-group">
          <label>Animal Permitido (0 o 1):</label>
          <input type="number" name="animal" value={formData.animal} onChange={handleChange} min="0" max="1" required />
        </div>

        <div className="form-group">
          <label>Amueblado (0 o 1):</label>
          <input type="number" name="furniture" value={formData.furniture} onChange={handleChange} min="0" max="1" required />
        </div>

        <div className="form-group">
          <label>HOA (R$):</label>
          <input type="number" name="hoa (R$)" value={formData['hoa (R$)']} onChange={handleChange} min="0" required />
        </div>

        <div className="form-group">
          <label>Renta (R$):</label>
          <input type="number" name="rent amount (R$)" value={formData['rent amount (R$)']} onChange={handleChange} min="0" required />
        </div>

        <div className="form-group">
          <label>Impuesto sobre Propiedad (R$):</label>
          <input type="number" name="property tax (R$)" value={formData['property tax (R$)']} onChange={handleChange} min="0" required />
        </div>

        <div className="form-group">
          <label>Seguro de Incendio (R$):</label>
          <input type="number" name="fire insurance (R$)" value={formData['fire insurance (R$)']} onChange={handleChange} min="0" required />
        </div>

        <button type="submit">Predecir</button>
      </form>

      {prediccion && (
        <div className="prediction-result">
          <h2>Alquiler estimado: {prediccion.toFixed(2)} R$</h2>
        </div>
      )}
    </div>
  );
}

export default App;
