from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    @app.route('/')
    def home():
        return "Welcome to the NextGen FoodCourt App!"

    return app

app = create_app()
if __name__ == '__main__':
    app.run(debug=True)