import pandas as pd
import numpy as np
import pymc as pm
import arviz as az
import matplotlib.pyplot as plt

import time
start = time.time()
trace = pm.sample(draws=500, tune=500, return_inferencedata=True)
print("Time taken:", time.time() - start)


def load_and_preprocess(csv_path):
    try:
        df = pd.read_csv(csv_path, parse_dates=['Date'])
        df.sort_values("Date", inplace=True)
        df["LogReturn"] = np.log(df["Price"]).diff()
        df.dropna(inplace=True)
        return df
    except Exception as e:
        print(f"Error loading or preprocessing data: {e}")
        return None
def load_event(csv_path):
    try:
        df = pd.read_csv(csv_path, parse_dates=['Date'])
        df.sort_values("Date", inplace=True)
        df.dropna(inplace=True)
        return df
    except Exception as e:
        print(f"Error loading or preprocessing data: {e}")
        return None
def build_model(returns, target_accept=0.95, draws=500, tune=500, cores=1):
    try:
        with pm.Model() as model:
            tau = pm.DiscreteUniform("tau", lower=0, upper=len(returns) - 1)
            mu1 = pm.Normal("mu1", mu=0, sigma=1)
            mu2 = pm.Normal("mu2", mu=0, sigma=1)
            sigma1 = pm.HalfNormal("sigma1", sigma=1)
            sigma2 = pm.HalfNormal("sigma2", sigma=1)

            mu = pm.math.switch(tau >= np.arange(len(returns)), mu1, mu2)
            sigma = pm.math.switch(tau >= np.arange(len(returns)), sigma1, sigma2)

            obs = pm.Normal("obs", mu=mu, sigma=sigma, observed=returns)

            trace = pm.fit(draws=draws, tune=tune, return_inferencedata=True, target_accept=target_accept)
        return model, trace
    except Exception as e:
        print(f"Error building or sampling model: {e}")
        return None, None

def extract_change_point(trace, dates):
    try:
        tau_posterior = trace.posterior["tau"].values.flatten()
        most_probable_tau = int(np.median(tau_posterior))
        change_date = dates[most_probable_tau]
        return most_probable_tau, change_date
    except Exception as e:
        print(f"Error extracting change point: {e}")
        return None, None

def plot_results(df, change_date, trace):
    try:
        fig, ax = plt.subplots(figsize=(12, 6))
        ax.plot(df["Date"], df["LogReturn"], label="Log Returns")
        ax.axvline(change_date, color="yellow", linestyle="--", label="Change Point")
        ax.set_title("Detected Change Point in Brent Oil Log Returns")
        ax.legend()
        plt.show()

        az.plot_posterior(trace, var_names=["tau", "mu1", "mu2", "sigma1", "sigma2"])
        plt.show()
    except Exception as e:
        print(f"Error plotting results: {e}")