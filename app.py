from flask import Flask, render_template, request

app = Flask(__name__)

# KNOWLEDGE BASE
knowledge_base = {
    "Influenza (Flu)": ["fever", "cough", "body_ache", "fatigue"],
    "Common Cold": ["cough", "runny_nose", "sore_throat", "sneezing"],
    "Malaria": ["high_fever", "chills", "sweating", "headache"],
    "Dengue": ["high_fever", "severe_joint_pain", "rash", "headache"]
}

@app.route('/', methods=['GET', 'POST'])
def index():
    diagnosis = None
    if request.method == 'POST':
        patient_symptoms = request.form.getlist('symptoms')
        
        
        max_matches = 0
        probable_disease = "Inconclusive"

        for disease, symptoms in knowledge_base.items():
            matches = sum(1 for sym in patient_symptoms if sym in symptoms)
            if matches > max_matches and matches > 0:
                max_matches = matches
                probable_disease = disease
                
        diagnosis = {
            "disease": probable_disease,
            "matches": max_matches
        }
        
    
    return render_template('index.html', diagnosis=diagnosis)

if __name__ == '__main__':
    app.run(debug=True)