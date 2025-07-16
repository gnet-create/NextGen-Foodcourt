from app import app  
from config import db
from models import Customer, Cuisine, Outlet, MenuItem, Table, Order, OrderItem, Reservation
from datetime import datetime, timedelta

with app.app_context():
    print("Seeding database...")

    db.drop_all()
    db.create_all()

    kenyan = Cuisine(name="Kenyan")
    ethiopian = Cuisine(name="Ethiopian")
    nigerian = Cuisine(name="Nigerian")

    db.session.add_all([kenyan, ethiopian, nigerian])
    db.session.commit()

    outlet1 = Outlet(name="Mama Oliech", contact="0711000001", cuisine=kenyan)
    outlet2 = Outlet(name="Jollof Haven", contact="0711000002", cuisine=nigerian)
    outlet3 = Outlet(name="Addis Taste", contact="0711000003", cuisine=ethiopian)

    db.session.add_all([outlet1, outlet2, outlet3])
    db.session.commit()

    item1 = MenuItem(name="Ugali Nyama", description="Staple Kenyan meal", price=350, category="Main", outlet=outlet1)
    item2 = MenuItem(name="Sukuma Wiki", description="Greens", price=100, category="Side", outlet=outlet1)
    item3 = MenuItem(name="Jollof Rice", description="Spicy rice", price=500, category="Main", outlet=outlet2)
    item4 = MenuItem(name="Suya", description="Spicy grilled meat", price=450, category="Snack", outlet=outlet2)
    item5 = MenuItem(name="Injera", description="Fermented flatbread", price=300, category="Main", outlet=outlet3)
    item6 = MenuItem(name="Doro Wat", description="Spicy chicken stew", price=600, category="Main", outlet=outlet3)

    db.session.add_all([item1, item2, item3, item4, item5, item6])
    db.session.commit()

    customer1 = Customer(name="billy", email="billy@example.com", phone_no=254712345678)
    customer1.password_hash = "password123"

    customer2 = Customer(name="Agnes", email="agnes@example.com", phone_no=254701234567)
    customer2.password_hash = "securepass"

    db.session.add_all([customer1, customer2])
    db.session.commit()

    table1 = Table(table_number=1, is_available="yes")
    table2 = Table(table_number=2, is_available="no")
    table3 = Table(table_number=3, is_available="yes")

    db.session.add_all([table1, table2, table3])
    db.session.commit()

    order1 = Order(status="pending", total_price=850, customer=customer1)
    order2 = Order(status="confirmed", total_price=600, customer=customer2)

    db.session.add_all([order1, order2])
    db.session.commit()

    oi1 = OrderItem(order=order1, menu_item=item1, quantity=2, sub_total=700)
    oi2 = OrderItem(order=order1, menu_item=item2, quantity=1, sub_total=150)
    oi3 = OrderItem(order=order2, menu_item=item5, quantity=2, sub_total=600)

    db.session.add_all([oi1, oi2, oi3])
    db.session.commit()

    res1 = Reservation(
        customer=customer1,
        order=order1,
        table=table1,
        booking_time=datetime.now() + timedelta(minutes=20),
        no_of_people=2,
        status="pending"
    )

    res2 = Reservation(
        customer=customer2,
        order=order2,
        table=table2,
        booking_time=datetime.now() + timedelta(minutes=25),
        no_of_people=1,
        status="confirmed"
    )

    db.session.add_all([res1, res2])
    db.session.commit()

    print("Done seeding!")
