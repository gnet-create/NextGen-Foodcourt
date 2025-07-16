#!/usr/bin/env python3

from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import Customer, Cuisine, Outlet, MenuItem, Table, Order, OrderItem, Reservation

@app.route('/')
def home():
    return """
    <h1>Welcome to NextGen Food Court APIs</h1>
    <p>Backend is running successfully.</p>
    """, 200




if __name__ == '__main__':
    app.run(port=5555, debug=True)