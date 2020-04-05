import sys
from flask import Flask, jsonify, request
from flask_cors import CORS
# sys.stdout(f"path {sys.path}")

import os
current_dir = os.getcwd()
new_dir = current_dir + "/code"
os.chdir(new_dir)
print("version: " + sys.version + " current dir: " + os.getcwd() + " python location: " + sys.executable)
from sub import multiplier


app = Flask(__name__)
CORS(app, resources=r'/api/*')

@app.route("/")
def hello():
    print('Hello route')
    sys.stdout.flush()
    return jsonify({"message": "Hello from Python!"})


@app.route("/calc", methods=["POST"])
def calc():
    data = request.get_json()
    # answer = data
    try:
        answer = multiplier.doubles(data["data"])
        return jsonify({"calculated_amount": answer})
    except Exception as e:
        return jsonify({"error": data["data"]})


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5001)
