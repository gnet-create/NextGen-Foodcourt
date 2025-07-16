from app import app  
from config import db
from models import User, Cuisine, Outlet, MenuItem, Table, Order, OrderItem, Reservation
from datetime import datetime, timedelta

with app.app_context():
    print("Seeding database...")

    db.drop_all()
    db.create_all()

    customer1 = User(name="Alice", email="alice@example.com", phone_no=712345678, role="customer")
    customer1.password_hash = "password123"

    customer2 = User(name="Bob", email="bob@example.com", phone_no=722345678, role="customer")
    customer2.password_hash = "password123"

    Admin = User(name="Charlie", email="charlie@example.com", phone_no=732345678, role="admin")
    Admin.password_hash = "adminpass456"

    db.session.add_all([customer1, customer2, Admin])

    italian = Cuisine(name="Italian")
    chinese = Cuisine(name="Chinese")
    indian = Cuisine(name="Indian")
    mexican = Cuisine(name="Mexican")
    db.session.add_all([italian, chinese, indian, mexican])

    outlet1 = Outlet(name="Pasta Palace", contact="0700111222", cuisine=italian)
    outlet2 = Outlet(name="Dragon Express", contact="0700333444", cuisine=chinese)
    outlet3 = Outlet(name="Curry Hut", contact="0700555666", cuisine=indian)
    outlet4 = Outlet(name="Taco Town", contact="0700777888", cuisine=mexican)
    db.session.add_all([outlet1, outlet2, outlet3, outlet4])

    item1 = MenuItem(name="Spaghetti", description="Classic spaghetti with tomato sauce", price=800, category="Main", outlet=outlet1)
    item2 = MenuItem(name="Lasagna", description="Layered pasta with cheese and meat", price=950, category="Main", outlet=outlet1)
    item3 = MenuItem(name="Fried Rice", description="Fried rice with vegetables", price=600, category="Main", outlet=outlet2)
    item4 = MenuItem(name="Sweet and Sour Chicken", description="Chicken with tangy sauce", price=700, category="Main", outlet=outlet2)
    item5 = MenuItem(name="Chicken Tikka", description="Spiced grilled chicken", price=850, category="Main", outlet=outlet3)
    item6 = MenuItem(name="Naan Bread", description="Soft Indian flatbread", price=150, category="Side", outlet=outlet3)
    item7 = MenuItem(name="Beef Taco", description="Soft taco with seasoned beef", price=300, category="Main", outlet=outlet4)
    item8 = MenuItem(name="Quesadilla", description="Grilled cheese tortilla", price=500, category="Main", outlet=outlet4)
    db.session.add_all([item1, item2, item3, item4, item5, item6, item7, item8])

    table1 = Table(table_number=1, is_available="Yes")
    table2 = Table(table_number=2, is_available="Yes")
    table3 = Table(table_number=3, is_available="Yes")
    table4 = Table(table_number=4, is_available="No")
    db.session.add_all([table1, table2, table3, table4])

    print("Creating orders and reservations...")

    order1 = Order(status="Pending", total_price=950, user=customer1)
    db.session.add(order1)
    order_item1 = OrderItem(order=order1, menu_item=item2, quantity=1, sub_total=950)
    db.session.add(order_item1)
    reservation1 = Reservation(
        user=customer1,
        order=order1,
        table=table1,
        booking_time=datetime.now() + timedelta(minutes=25),
        no_of_people=2,
        status="Confirmed"
    )
    db.session.add(reservation1)

    order2 = Order(status="Confirmed", total_price=1200, user=customer2)
    db.session.add(order2)
    order_item2 = OrderItem(order=order2, menu_item=item3, quantity=2, sub_total=1200)
    db.session.add(order_item2)
    reservation2 = Reservation(
        user=customer2,
        order=order2,
        table=table2,
        booking_time=datetime.now() + timedelta(minutes=25),
        no_of_people=3,
        status="Confirmed"
    )
    db.session.add(reservation2)

    db.session.commit()
    print("Seed data added successfully.")
