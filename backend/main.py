from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
from datetime import datetime
import json
import warnings
warnings.filterwarnings('ignore')


app = Flask(__name__)
CORS(app,origins='*')  # Enable CORS for all routes

# Load and preprocess data
def load_data():
    df = pd.read_csv('../Data/BrentOilPrices.csv', parse_dates=['Date'])
    df_event = pd.read_csv('../Data/key_event.csv', parse_dates=['Date'])
    df['Price'] = df['Price'].astype(float)
    return df

@app.route('/api/oil_prices', methods=['GET'])
def get_oil_prices():
    df = load_data()
    
    # Get query parameters for filtering
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    event_type = request.args.get('event_type')
    
    # Apply filters
    if start_date:
        df = df[df['Date'] >= pd.to_datetime(start_date)]
    if end_date:
        df = df[df['Date'] <= pd.to_datetime(end_date)]
    if event_type and event_type != 'all':
        df = df[df['Event_Type'] == event_type]
    
    # Convert to JSON-friendly format
    result = {
        'dates': df['Date'].dt.strftime('%Y-%m-%d').tolist(),
        'prices': df['Price'].tolist(),
        'events': df[['Date', 'Event_Type', 'Description']].to_dict('records')
    }
    
    return jsonify(result)

@app.route('/api/event_types', methods=['GET'])
def get_event_types():
    df = load_data()
    event_types = df['Event_Type'].unique().tolist()
    return jsonify(event_types)

@app.route('/api/correlation', methods=['GET'])
def get_correlation():
    df = load_data()
    
    # Calculate price changes
    df['PriceChange'] = df['Price'].pct_change() * 100
    
    # Group by event type and calculate stats
    event_stats = df.groupby('Event_Type')['PriceChange'].agg(['mean', 'count', 'std'])
    event_stats = event_stats[event_stats['count'] >= 5]  # Filter events with few occurrences
    event_stats = event_stats.sort_values('mean', ascending=False)
    
    return jsonify(event_stats.reset_index().to_dict('records'))

if __name__ == '__main__':
    app.run(debug=True, port=5000)