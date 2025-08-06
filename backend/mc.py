from flask import Flask, jsonify, request
import pandas as pd
from flask_cors import CORS
import numpy as np
import warnings
warnings.filterwarnings('ignore')


app = Flask(__name__)
CORS(app, origins='*')

# Load and preprocess your dataset (e.g., BrentOilPrices.csv)
df = pd.read_csv('../Data/BrentOilPrices.csv', parse_dates=['Date'])
df.sort_values('Date', inplace=True)
# df['LogReturn'] = (df['Price'].pct_change() + 1).apply(lambda x: np.log(x))

@app.route('/api/log-return', methods=['GET'])
def log_return():
    start = request.args.get('start')
    end = request.args.get('end')

    filtered = df.copy()
    if start and end:
        filtered = filtered[(filtered['Date'] >= start) & (filtered['Date'] <= end)]

    data = filtered[['Date', 'LogReturn']].dropna().to_dict(orient='records')
    for d in data:
        d['Date'] = d['Date'].strftime('%Y-%m-%d')

    return jsonify({'status': 'success', 'data': data})


@app.route('/api/indicators', methods=['GET'])
def indicators():
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

if __name__ == '__main__':
    app.run(debug=True, port=5000)
