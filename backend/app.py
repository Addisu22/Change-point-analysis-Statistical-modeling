from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app, origins='*')

# Load data
prices_df = pd.read_csv("../Data/BrentOilPrices.csv", parse_dates=["Date"])
events_df = pd.read_csv("../Data/key_events.csv", parse_dates=["Date"])

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
        "average_price": round(prices_df["Price"].mean(), 2),
        "volatility": round(prices_df["Price"].std(), 2)
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)
