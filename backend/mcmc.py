from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import pymc as pm
import matplotlib.pyplot as plt
import os

app = Flask(__name__)
CORS(app, origins='*')

# Load Brent oil data
prices_df = pd.read_csv("../Data/BrentOilPrices.csv", parse_dates=["Date"])
prices_df['LogPrice'] = np.log(prices_df['Price'])
prices_df['LogReturn'] = prices_df['LogPrice'].diff()
prices_df.dropna(inplace=True)
prices_df.reset_index(drop=True, inplace=True)
returns = prices_df['LogReturn'].values
n = len(returns)

# Run Bayesian Change Point Model
def run_change_point_model():
    with pm.Model() as model:
        tau = pm.DiscreteUniform('tau', lower=0, upper=n)
        mu1 = pm.Normal('mu1', mu=0, sigma=1)
        mu2 = pm.Normal('mu2', mu=0, sigma=1)
        sigma = pm.HalfNormal('sigma', sigma=1)
        mu = pm.math.switch(tau >= np.arange(n), mu1, mu2)
        obs = pm.Normal('obs', mu=mu, sigma=sigma, observed=returns)
        trace = pm.sample(1000, tune=500, chains=1, cores=1, return_inferencedata=False)
    return trace

trace = run_change_point_model()

@app.route('/api/oilprices')
def get_oil_prices():
    return prices_df[['Date', 'Price']].to_json(orient='records')

@app.route('/api/events')
def get_events():
    events_df = pd.read_csv("../Data/key_events.csv")
    return events_df.to_json(orient='records')

@app.route('/api/changepoint')
def get_changepoint():
    change_idx = int(np.median(trace['tau']))
    change_date = str(prices_df.iloc[change_idx]['Date'].date())
    mu1 = float(np.mean(trace['mu1']))
    mu2 = float(np.mean(trace['mu2']))
    return jsonify({
        "change_point_index": change_idx,
        "change_point_date": change_date,
        "mu1": mu1,
        "mu2": mu2
    })

@app.route('/api/indicators')
def get_indicators():
    volatility = prices_df['LogReturn'].rolling(window=30).std().dropna().tolist()
    avg_price = prices_df['Price'].rolling(window=30).mean().dropna().tolist()
    return jsonify({
        "volatility": volatility[-100:],  # latest values
        "avg_price": avg_price[-100:]
    })

if __name__ == '__main__':
    app.run(debug=True)