import streamlit as st
import subprocess
import threading

# Exécuter le script de traitement des données
def process_data():
    subprocess.run(['python', 'process_data.py'])

# Démarrer le serveur HTTP pour servir les fichiers statiques
def start_server():
    subprocess.run(['python', '-m', 'http.server', '8501'])

# Utiliser un thread pour ne pas bloquer le script principal
thread = threading.Thread(target=start_server)
thread.start()

process_data()

st.title("Tableau de Bord Météo")
st.markdown('<iframe src="http://localhost:8000" width="100%" height="800"></iframe>', unsafe_allow_html=True)
