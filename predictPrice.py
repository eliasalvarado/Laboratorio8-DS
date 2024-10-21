import pandas as pd
import pickle

with open('model.pkl', 'rb') as file:
    model = pickle.load(file)

with open('scalerX.pkl', 'rb') as file:
    scalerX = pickle.load(file)

with open('scalerY.pkl', 'rb') as file:
    scalerY = pickle.load(file)

with open('encoder.pkl', 'rb') as file:
    encoder = pickle.load(file)

def predictPrice(datos):
    test = pd.DataFrame([datos])

    scaler_X = scalerX

    datosNormalizados = pd.DataFrame(scaler_X.transform(test.iloc[:,1:]), columns=test.columns[1:])
    datosCodificados = pd.DataFrame(encoder.transform(test.iloc[:,0:1]), columns=encoder.get_feature_names_out(['city']))

    test = pd.concat([datosCodificados, datosNormalizados], axis=1)

    predccionNormalizada = model.predict(test)

    predccion = scalerY.inverse_transform(predccionNormalizada.reshape(-1,1))
    return predccion[0][0]


test = {
    'city': 'Belo Horizonte',
    'area': 133,
    'rooms': 3.0,
    'bathroom': 2.0,
    'parking spaces': 3.0,
    'animal': 0.0,
    'furniture': 0.0,
    'hoa (R$)': 806.0,
    'rent amount (R$)': 2100.0,
    'property tax (R$)': 161.0,
    'fire insurance (R$)': 28.0
}

print(predictPrice(test))