from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from data_analysis import get_log_return_data, get_summary_indicators
from mc import *

import warnings
warnings.filterwarnings('ignore')


app = Flask(__name__)
CORS(app, origins='*')

# Load data
prices_df = pd.read_csv("../Data/BrentOilPrices.csv", parse_dates=["Date"])
events_df = pd.read_csv("../Data/key_event.csv", parse_dates=["Date"])

# price route
@app.route("/api/prices")
def get_prices():
    return jsonify(prices_df.to_dict(orient="records"))

# event route
@app.route("/api/events")
def get_events():
    return jsonify(events_df.to_dict(orient="records"))

# indicate route
@app.route("/api/indicators")
def get_indicators():
    return jsonify({
        "average_price": round(prices_df["Price"].mean(), 4),
        "volatility": round(prices_df["Price"].std(), 4)
    })

@app.route("/api/log-return", methods=["GET"])
def log_return():
    data = get_log_return_data()  # This is already a list of dicts
    return jsonify(data)  # Don't call .to_dict()


@app.route("/api/summary", methods=["GET"])
def summary_api():
    try:
        indicators = get_summary_indicators()
        return jsonify({"status": "success", "data": indicators})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})


# Load and preprocess your dataset (e.g., BrentOilPrices.csv)
df = pd.read_csv('../Data/BrentOilPrices.csv', parse_dates=['Date'])
df.sort_values('Date', inplace=True)
df['LogReturn'] = (df['Price'].pct_change() + 1).apply(lambda x: np.log(x))

@app.route('/api/log-return-price', methods=['GET'])
def log_return_price():
    start = request.args.get('start')
    end = request.args.get('end')

    filtered = df.copy()
    if start and end:
        filtered = filtered[(filtered['Date'] >= start) & (filtered['Date'] <= end)]

    data = filtered[['Date', 'LogReturn']].dropna().to_dict(orient='records')
    for d in data:
        d['Date'] = d['Date'].strftime('%Y-%m-%d')

    return jsonify({'status': 'success', 'data': data})


@app.route('/api/indicators-price', methods=['GET'])
def indicators_price():
    start = request.args.get('start')
    end = request.args.get('end')
    filtered = df.copy()
    if start and end:
        filtered = filtered[(filtered['Date'] >= start) & (filtered['Date'] <= end)]

    volatility = filtered['LogReturn'].std()
    avg_change = filtered['Price'].pct_change().mean()

    return jsonify({
        'status': 'success',
        'data': {
            'volatility': round(volatility, 6),
            'average_change': round(avg_change, 6)
        }
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)