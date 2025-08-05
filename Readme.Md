Brent Oil Price Change Point Detection & Dashboard
==================================================
This study aims to detect structural changes in Brent oil prices using Bayesian Change Point Modeling (via PyMC3) and deliver interactive visual insights through a modern Flask + React dashboard.

Task 2: Change Point Modeling and Insight Generation
====================================================
2.1 Core Analysis (Mandatory)
1. Bayesian Change Point Detection with PyMC3
We apply Bayesian inference using PyMC3 to detect statistically significant change points in the Brent oil price time series.

The model assumes a discrete switch point (τ) separating the data into two regimes (before and after) a structural break.

Steps Implemented:
Data Transformation: Converted daily oil prices to log returns for stationarity and clearer volatility modeling.

Prior Setup:

τ: Uniform prior across all dates.

μ₁, μ₂: Normal priors for mean before and after the change.

Switch Function: mu = switch(t < τ, μ₁, μ₂)

Likelihood: pm.Normal('obs', mu=mu, sigma=σ, observed=log_returns)

Sampling: MCMC used to obtain posterior distribution.

2.2 Advanced Extensions (Optional)
Explore Other Factors
In future work, we could extend the model by:

Integrating macroeconomic indicators: GDP, inflation, exchange rates.

Applying multivariate models for richer causal inference.

Advanced Time Series Models
Vector Autoregression (VAR) to capture interactions between oil and macro variables.

Markov-Switching models to detect regime shifts between stable vs. volatile periods.

 Task 3: Interactive Dashboard
 =============================
An integrated Flask + React.js dashboard helps stakeholders explore the analysis interactively.

Backend: Flask
Serves:

Raw oil price data

Change point model results

Key event annotations

Example API Endpoints:

/api/oil-prices

/api/change-points

/api/key-events

Option to extend with real-time sources (e.g., oil price APIs).

Frontend: React (Vite)
Framework: React (with Vite for fast builds).

Libraries: Recharts, React Chart.js 2, D3.js.

Features:
Time-series plots with event annotations

"Event Highlight" mode to show:

Pre-event vs. post-event average prices.

Volatility spikes.

Filters: date ranges, zooming, event selection

Responsive for desktop and mobile