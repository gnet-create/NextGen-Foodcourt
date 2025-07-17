#!/usr/bin/env python3

from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

from config import app, db, api, jwt
from models import User, Cuisine, Outlet, MenuItem, Table, Order, OrderItem, Reservation

@app.route('/')
def home():
    return "<h1>Welcome to NextGen Food Court APIs</h1>"
   
    
# ------------------ AUTH ------------------ #
class Register(Resource):
    def post(self):
        pass

class Login(Resource):
    def post(self):
        pass
    
class Logout(Resource):
    def delete(self):
        pass

class CheckAuth(Resource):
    def get(self):
        pass

# ------------------ USERS ------------------ #
class UserLists(Resource):
    def get(self):
        pass

class UserDetails(Resource):
    def get(self, id):
       pass

    def patch(self, id):
        pass
    
    def delete(self, id):
       pass

# ------------------ CUISINES ------------------ #
class CuisineList(Resource):
    def get(self):
        pass
    
    def post(self):
        pass
    
class CuisineDetails(Resource):
    def get(self, id):
        pass

    def patch(self, id):
        pass

    def delete(self, id):
        pass

# ------------------ OUTLETS ------------------ #
class OutletLists(Resource):
    def get(self):
        pass

    def post(self):
       pass

class OutletDetails(Resource):
    def get(self, id):
        pass

    def patch(self, id):
       pass

    def delete(self, id):
       pass

# ------------------ MENU ITEMS ------------------ #
class MenuItemLists(Resource):
    def get(self):
        pass

    def post(self):
        pass

class MenuItemDetails(Resource):
    def get(self, id):
        pass
    
    def patch(self, id):
        pass
    
    def delete(self, id):
        pass

# ------------------ ORDERS ------------------ #
class OrderLists(Resource):
    def get(self):
        pass

    def post(self):
        pass

class OrderDetails(Resource):
    def get(self, id):
        pass
    
    def patch(self, id):
       pass

    def delete(self, id):
        pass

# ------------------ ORDER ITEMS ------------------ #
class OrderItemLists(Resource):
    def get(self):
        pass

    def post(self):
        pass

class OrderItemDetails(Resource):
    def get(self, id):
        pass

    def patch(self, id):
       pass
   
    def delete(self, id):
       pass

# ------------------ TABLES ------------------ #
class TableLists(Resource):
    def get(self):
        pass

    def post(self):
        pass

class TableDetails(Resource):
    def get(self, id):
        pass

    def patch(self, id):
       pass

    def delete(self, id):
       pass

# ------------------ RESERVATIONS ------------------ #
class ReservationLists(Resource):
    
    def get(self):
        pass

    def post(self):
        pass

class ReservationDetails(Resource):
    def get(self, id):
       pass

    def put(self, id):
       pass
   
    def delete(self, id):
       pass
# ------------------ ROUTES ------------------ #
api.add_resource(Register, '/register')
api.add_resource(Login, '/login')

api.add_resource(UserLists, '/users')
api.add_resource(UserDetails, '/users/<int:id>')

api.add_resource(CuisineList, '/cuisines')
api.add_resource(CuisineDetails, '/cuisines/<int:id>')

api.add_resource(OutletLists, '/outlets')
api.add_resource(OutletDetails, '/outlets/<int:id>')

api.add_resource(MenuItemLists, '/menu-items')
api.add_resource(MenuItemDetails, '/menu-items/<int:id>')

api.add_resource(OrderLists, '/orders')
api.add_resource(OrderDetails, '/orders/<int:id>')

api.add_resource(OrderItemLists, '/order-items')
api.add_resource(OrderItemDetails, '/order-items/<int:id>')

api.add_resource(TableLists, '/tables')
api.add_resource(TableDetails, '/tables/<int:id>')

api.add_resource(ReservationLists, '/reservations')
api.add_resource(ReservationDetails, '/reservations/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)