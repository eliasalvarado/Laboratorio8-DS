from flask import Flask, request, jsonify
import pandas as pd
import pickle
from flask_cors import CORS

with open('model.pkl', 'rb') as file:
    model = pickle.load(file)

with open('scalerX.pkl', 'rb') as file:
    scalerX = pickle.load(file)

with open('scalerY.pkl', 'rb') as file:
    scalerY = pickle.load(file)

with open('encoder.pkl', 'rb') as file:
    encoder = pickle.load(file)

app = Flask(__name__)
CORS(app)

def predictPrice(datos):
    test = pd.DataFrame([datos])

    datosNormalizados = pd.DataFrame(scalerX.transform(test.iloc[:, 1:]), columns=test.columns[1:])
    datosCodificados = pd.DataFrame(encoder.transform(test.iloc[:, 0:1]), columns=encoder.get_feature_names_out(['city']))

    test_final = pd.concat([datosCodificados, datosNormalizados], axis=1)
    print(test_final)

    prediccionNormalizada = model.predict(test_final)
    prediccion = scalerY.inverse_transform(prediccionNormalizada.reshape(-1, 1))
    
    return prediccion[0][0]

@app.route('/predict', methods=['POST'])
def predict():
    datos = request.json

    prediccion = predictPrice(datos)
    
    return jsonify({'prediccion': prediccion})

if __name__ == '__main__':
    app.run(debug=True)
