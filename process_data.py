import pandas as pd
import json

# Lire les données météorologiques à partir d'un fichier CSV
df = pd.read_csv('weather_data.csv')

# Préparer les données pour le graphique de température et de précipitations
data = {
    'hours': df['hour'].tolist(),
    'temperatures': df['temperature'].tolist(),
    'precipitation': df['precipitation'].tolist(),
    'conditions': df['condition'].tolist()
}

# Sauvegarder les données préparées dans un fichier JSON
with open('weather_data.json', 'w') as json_file:
    json.dump(data, json_file)
