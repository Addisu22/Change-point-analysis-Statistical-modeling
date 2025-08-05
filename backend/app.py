from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import pymc as pm
import numpy as np
import matplotlib.pyplot as plt

import warnings
warnings.filterwarnings('ignore')



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

prices_df['LogPrice'] = np.log(prices_df['Price'])
prices_df['LogReturn'] = prices_df['LogPrice'].diff()
prices_df = prices_df.dropna().reset_index(drop=True)

returns = prices_df['LogReturn'].values
n = len(returns)

# Global placeholders
trace = None
change_idx = None
change_date = None

def run_model():
    global trace, change_idx, change_date

    with pm.Model() as model:
        tau = pm.DiscreteUniform('tau', lower=0, upper=n)
        mu1 = pm.Normal('mu1', mu=0, sigma=1)
        mu2 = pm.Normal('mu2', mu=0, sigma=1)
        sigma = pm.HalfNormal('sigma', sigma=1)

        mu = pm.math.switch(tau >= np.arange(n), mu1, mu2)
        obs = pm.Normal('obs', mu=mu, sigma=sigma, observed=returns)

        trace = pm.sample(2000, tune=1000, target_accept=0.95, return_inferencedata=False, cores=1)

    change_idx = int(np.median(trace['tau']))
    change_date = prices_df.iloc[change_idx]['Date']

# Flask endpoint
@app.route('/api/changepoints')
def get_changepoints():
    global trace, change_idx, change_date

    if trace is None:
        return jsonify({"error": "Model not yet computed"}), 400

    result = {
        "change_point_index": change_idx,
        "change_point_date": str(change_date),
        "mu1": float(np.mean(trace['mu1'])),
        "mu2": float(np.mean(trace['mu2']))
    }
    return jsonify(result)


if __name__ == "__main__":
    run_model()
    app.run(debug=True, port=5000)