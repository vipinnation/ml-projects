from flask import Flask, render_template,request,jsonify
import numpy as np
import pandas as pd
import pickle
from flask_cors import CORS, cross_origin

data = pickle.load(open("artifacts/data.pkl","rb"))
pipe  = pickle.load(open("./artifacts/pipe.pkl","rb"))

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
     return "Welcome to ML PROJECT"


@app.route("/api/car",methods=["POST"])
def api_car():
 
    required_fields = ['name', 'company', 'year', 'km_driven', 'fuel', 'transmission', 'owner', 'seller_type']
    input_data = request.json
    
    missing_fields = [field for field in required_fields if field not in input_data]
    if missing_fields:
        return jsonify({'msg': f'Missing required fields: {", ".join(missing_fields)}'}), 400

    invalid_fields = [field for field, value in input_data.items() if not isinstance(value, list) or len(value) != 1]
    if invalid_fields:
        return jsonify({'error': f'Invalid format for fields: {", ".join(invalid_fields)}'}), 400
    
    local = request.get_json() 
    res = pipe.predict(pd.DataFrame(local) ) 
    
    formatted_price = round(float(np.expm1(res)[0]), 2)
    return {'predicted_price': formatted_price}


@app.route("/api/car", methods =["GET"])
def get_car():
    car_names = data['name'].drop_duplicates().tolist()
    company_names = data['company'].drop_duplicates().tolist()
    seller_type = data['seller_type'].drop_duplicates().tolist()
    fuel = data['fuel'].drop_duplicates().tolist()
    transmission = data['transmission'].drop_duplicates().tolist()
    owner = data['owner'].drop_duplicates().tolist()
    
    return jsonify({
        'car_names': car_names,
        'company_names': company_names,
        "seller_type":seller_type,
        "fuel":fuel,
        "owner":owner,
        "transmission":transmission
    })


if __name__ == '__main__':
    app.run(debug=True)