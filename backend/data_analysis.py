import pandas as pd
import numpy as np

def get_log_return_data():
    df = pd.read_csv("../Data/BrentOilPrices.csv", parse_dates=["Date"])
    df.sort_values("Date", inplace=True)
    df['LogReturn'] = np.log(df['Price'] / df['Price'].shift(1))
    df.dropna(inplace=True)
    return df[['Date', 'LogReturn']].to_dict(orient="records")

def get_summary_indicators():
    df = pd.read_csv("../Data/BrentOilPrices.csv", parse_dates=["Date"])
    df.sort_values("Date", inplace=True)
    df['LogReturn'] = np.log(df['Price'] / df['Price'].shift(1))
    df.dropna(inplace=True)

    return {
        "average_return": df['LogReturn'].mean(),
        "volatility": df['LogReturn'].std(),
        "max_return": df['LogReturn'].max(),
        "min_return": df['LogReturn'].min()
    }
