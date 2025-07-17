#!/usr/bin/env python3

from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity,  get_jwt

from config import app, db, api, jwt, jwt_blacklist
from models import User, Cuisine, Outlet, MenuItem, Table, Order, OrderItem, Reservation

@app.route('/')
def home():
    return "<h1>Welcome to NextGen Food Court APIs</h1>"
     
# ------------------ AUTH ------------------ #
class Register(Resource):
    def post(self):
        data = request.get_json()
        try:
            user = User(
                name=data['name'],
                email=data['email'],
                phone_no=data['phone_no'],
                role=data['role']
            )
            user.password_hash = data['password']
            db.session.add(user)
            db.session.commit()
            return {"message": "User registered successfully"}, 201
        except IntegrityError:
            db.session.rollback()
            return {"message": "User already exists"}, 400

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()
        if user and user.authenticate(data['password']):
            access_token = create_access_token(identity={'id': user.id, 'role': user.role})
            return {"access_token": access_token, "user": user.to_dict(rules=('-orders', '-reservations', '-outlets'))}, 200
        return {"message": "Invalid credentials"}, 401
    
class Logout(Resource):
    @jwt_required()
    def post(self):
        jti = get_jwt()["jti"] 
        jwt_blacklist.add(jti)
        return {"message": "Successfully logged out"}, 200

class CheckAuth(Resource):
    @jwt_required()
    def get(self):
        user_identity = get_jwt_identity()
        return {"message": "Authenticated", "user": user_identity}, 200

# ------------------ USERS ------------------ #
class UserLists(Resource):
    @jwt_required()
    def get(self):
        return [user.to_dict(rules=('-orders', '-reservations', '-outlets')) for user in User.query.all()]

class UserDetails(Resource):
    @jwt_required()
    def get(self, id):
        user = User.query.get(id)
        return user.to_dict(rules=('-orders', '-reservations', '-outlets'))

    @jwt_required()
    def patch(self, id):
        data = request.get_json()
        user = User.query.get(id)
        
        if not user:
            return {"error": "User not found."}, 404
        
        if 'name' in data:
            user.name = data['name']
        if 'email' in data:
            user.email = data['email']
        if 'phone_no' in data:
            user.phone_no = data['phone_no']
            
        db.session.commit()
        return user.to_dict(rules=('-orders', '-reservations', '-outlets')) 
    
    @jwt_required()
    def delete(self, id):
       user = User.query.get(id)
       db.session.delete(user)
       db.session.commit()
       return {"message": "User deleted Successfully"}

# ------------------ CUISINES ------------------ #
class CuisineList(Resource):
    def get(self):
        return [cuisine.to_dict(rules=('-outlets',)) for cuisine in Cuisine.query.all()]
    
    def post(self):
        data = request.get_json()
        cuisine = Cuisine(name=data['name'])
        db.session.add(cuisine)
        db.session.commit()
        return cuisine.to_dict(rules=('-outlets',)), 201
    
class CuisineDetails(Resource):
    def get(self, id):
        return Cuisine.query.get(id).to_dict(rules=('-outlets',))

    def patch(self, id):
        data = request.get_json()
        cuisine = Cuisine.query.get(id)
        
        if not cuisine:
            return {"error": "Cuisine not found."}, 404
        
        if 'name' in data:
            cuisine.name = data['name']
        db.session.commit()
        return cuisine.to_dict(rules=('-outlets',))
            
    def delete(self, id):
        cuisine = Cuisine.query.get(id)
        db.session.delete(cuisine)
        db.session.commit()
        return {"message": "Cuisine deleted successfully"}

# ------------------ OUTLETS ------------------ #
class OutletLists(Resource):
    def get(self):
        outlets = Outlet.query.all()
        return [outlet.to_dict(rules=('-cuisine.outlets', '-menu_items.outlet', '-owner.outlets')) for outlet in outlets]   

    def post(self):
       data = request.get_json()
       try:
           outlet = Outlet(
               name=data['name'],
               contact=data['contact'],
               cuisine_id=data['cuisine_id'],
               owner_id=data['owner_id']
           )
           db.session.add(outlet)
           db.session.commit()
           return outlet.to_dict(rules=('-cuisine.outlets', '-menu_items.outlet', '-owner.outlets')), 201
       except IntegrityError:
           db.session.rollback()
           return {"message": "Outlet already exists or invalid data"}, 400

class OutletDetails(Resource):
    def get(self, id):
        outlet = Outlet.query.get(id)
        if not outlet:
            return {"error": "Outlet not found."}, 404
        return outlet.to_dict(rules=('-cuisine.outlets', '-menu_items.outlet', '-owner.outlets'))

    def patch(self, id):
       outlet = Outlet.query.get(id)
       if not outlet:
           return {"error": "Outlet not found."}, 404
       data = request.get_json()
       if 'name' in data:
           outlet.name = data['name']
       if 'contact' in data:
           outlet.contact = data['contact']
       if 'cuisine_id' in data:
           outlet.cuisine_id = data['cuisine_id']
       if 'owner_id' in data:
           outlet.owner_id = data['owner_id']
       db.session.commit()
       return outlet.to_dict(rules=('-cuisine.outlets', '-menu_items.outlet', '-owner.outlets'))

    def delete(self, id):
       outlet = Outlet.query.get(id)
       if not outlet:
           return {"error": "Outlet not found."}, 404
       db.session.delete(outlet)
       db.session.commit()
       return {"message": "Outlet deleted successfully"}

# ------------------ MENU ITEMS ------------------ #
class MenuItemLists(Resource):
    def get(self):
        items = MenuItem.query.all()
        return [item.to_dict(rules=('-outlet.menu_items', '-order_items.menu_item')) for item in items]

    def post(self):
        data = request.get_json()
        try:
            item = MenuItem(
                name=data['name'],
                description=data['description'],
                price=data['price'],
                category=data['category'],
                outlet_id=data['outlet_id']
            )
            db.session.add(item)
            db.session.commit()
            return item.to_dict(rules=('-outlet.menu_items', '-order_items.menu_item')), 201
        except IntegrityError:
            db.session.rollback()
            return {"message": "Menu item already exists or invalid data"}, 400

class MenuItemDetails(Resource):
    def get(self, id):
        item = MenuItem.query.get(id)
        if not item:
            return {"error": "Menu item not found."}, 404
        return item.to_dict(rules=('-outlet.menu_items', '-order_items.menu_item'))
    
    def patch(self, id):
        item = MenuItem.query.get(id)
        if not item:
            return {"error": "Menu item not found."}, 404
        data = request.get_json()
        if 'name' in data:
            item.name = data['name']
        if 'description' in data:
            item.description = data['description']
        if 'price' in data:
            item.price = data['price']
        if 'category' in data:
            item.category = data['category']
        if 'outlet_id' in data:
            item.outlet_id = data['outlet_id']
        db.session.commit()
        return item.to_dict(rules=('-outlet.menu_items', '-order_items.menu_item'))
    
    def delete(self, id):
        item = MenuItem.query.get(id)
        if not item:
            return {"error": "Menu item not found."}, 404
        db.session.delete(item)
        db.session.commit()
        return {"message": "Menu item deleted successfully"}

# ------------------ ORDERS ------------------ #
class OrderLists(Resource):
    def get(self):
        orders = Order.query.all()
        return [order.to_dict(rules=('-reservation.order', '-order_items.order')) for order in orders]

    def post(self):
        data = request.get_json()
        try:
            order = Order(
                user_id=data['user_id'],
                total_price=data['total_price'],
                status=data.get('status', 'pending')
            )
            db.session.add(order)
            db.session.commit()
            return order.to_dict(rules=('-reservation.order', '-order_items.order')), 201
        except IntegrityError:
            db.session.rollback()
            return {"message": "Order already exists or invalid data"}, 400

class OrderDetails(Resource):
    def get(self, id):
        order = Order.query.get(id)
        if not order:
            return {"error": "Order not found."}, 404
        return order.to_dict(rules=('-reservation.order', '-order_items.order'))
    
    def patch(self, id):
        order = Order.query.get(id)
        if not order:
            return {"error": "Order not found."}, 404
        data = request.get_json()
        if 'status' in data:
            order.status = data['status']
        if 'total_price' in data:
            order.total_price = data['total_price']
        db.session.commit()
        return order.to_dict(rules=('-reservation.order', '-order_items.order'))

    def delete(self, id):
        order = Order.query.get(id)
        if not order:
            return {"error": "Order not found."}, 404
        db.session.delete(order)
        db.session.commit()
        return {"message": "Order deleted successfully"}

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
api.add_resource(Logout, '/logout')
api.add_resource(CheckAuth, '/check-auth')

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