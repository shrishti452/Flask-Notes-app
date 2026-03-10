from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

notes = []

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/notes', methods=['GET'])
def get_notes():
    return jsonify(notes)

@app.route('/notes', methods=['POST'])
def add_note():
    data = request.json
    note = data['note']
    notes.append(note)
    return jsonify({"message": "Note added"})

@app.route('/notes/<int:index>', methods=['DELETE'])
def delete_note(index):
    if 0 <= index < len(notes):
        notes.pop(index)
        return jsonify({"message": "Note deleted"})
    return jsonify({"error": "Invalid index"})

if __name__ == '__main__':
    app.run(debug=True)