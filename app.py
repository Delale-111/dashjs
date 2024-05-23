import os
from http.server import SimpleHTTPRequestHandler, HTTPServer
import threading
import pandas as pd
import json

# Exécuter le script de traitement des données
def process_data():
    df = pd.read_csv('weather_data.csv')
    data = {
        'hours': df['hour'].tolist(),
        'temperatures': df['temperature'].tolist(),
        'precipitation': df['precipitation'].tolist(),
        'conditions': df['condition'].tolist()
    }
    with open('weather_data.json', 'w') as json_file:
        json.dump(data, json_file)

process_data()

# Démarrer le serveur HTTP pour servir les fichiers statiques
def start_server():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    handler = SimpleHTTPRequestHandler
    httpd = HTTPServer(('0.0.0.0', 8501), handler)
    print("Serving at port 8501")
    httpd.serve_forever()

# Utiliser un thread pour ne pas bloquer le script principal
thread = threading.Thread(target=start_server)
thread.start()
