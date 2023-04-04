import flask
import json
import requests
import mysql.connector
import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522

app = flask.Flask(__name__)


@app.route('/process-data', methods=['POST'])
def process_data():
  # Get the RFID tag's ID from the request body
  data = flask.request.get_json()
  if 'user_id' in data:
    idUser = data['user_id']
  else:
    idUser = 'default_value'


  # Connect to the database
  cnx = mysql.connector.connect(
    user = "root",
    password = "test123",
    host = "127.0.0.1",
    database = "pswtm_db"
  )
  cursor = cnx.cursor()
  reader = SimpleMFRC522()

  # Check if the RFID tag's ID is already present in the database
  try: 
  
    id, text = reader.read()

    query = 'SELECT rfid FROM pswtm_db.users WHERE user_id = %s'
    cursor.execute(query, (idUser,))
    result = cursor.fetchone()

  finally:
    GPIO.cleanup

    # If the ID is not present, insert it into the database
  if result == (None,):
    cursor.execute('Update pswtm_db.users SET rfid = %s WHERE user_id = %s',(id, idUser))
    cnx.commit()

  # Close the database connection
  cnx.close()

  # Send a response to the client
  response = flask.jsonify({"message": "RFID tag's ID processed"})
  response.headers.add('Access-Control-Allow-Origin', '*')
  return response


@app.route('/retrieve-rfid-data', methods=['GET'])
def retrieve_rfid_data():
   # Connect to the database
  cnx = mysql.connector.connect(
    user = "root",
    password = "test123",
    host = "127.0.0.1",
    database = "pswtm_db"
  )
  cursor = cnx.cursor()
  reader = SimpleMFRC522()

  try: 
      id, text = reader.read()
      print(id)
      query = 'SELECT * FROM pswtm_db.users WHERE rfid = %s'
      cursor.execute(query, (id,))
      result = cursor.fetchone()
  finally:
      GPIO.cleanup

  # If the RFID ID is present in the database, send the user's data to the frontend
  if result:
      response = flask.jsonify({"user_data": result})
  else:
      response = flask.jsonify({"error": "RFID ID not found"})

  response.headers.add('Access-Control-Allow-Origin', '*')
  return response






if __name__ == '__main__':
   app.run(host='localhost', port=5000)