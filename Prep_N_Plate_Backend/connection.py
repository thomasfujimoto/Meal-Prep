import pandas as pd
import json
from utilities import SurveyInput
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Function to extract integers from nested dictionary
def extract_integers(data, integers=[]):
    for value in data.values():
        if isinstance(value, dict):
            extract_integers(value, integers)
        elif isinstance(value, int):
            integers.append(value)
    return integers

def extract_recipes(data, recipes=[]):
    for value in data.values():
        if isinstance(value, str):
            recipes.append(value)
    return recipes

@app.route('/submit-survey', methods=['POST'])
def handle_survey():
    survey_data = request.json

    # Initialize an empty list to store integers
    integers = extract_integers(survey_data)

    #Call SurveyInput to get the meals as specified by the survey array
    meals = SurveyInput(integers)

    #Convert pandas df to dict so can be jsonified
    meals = meals.to_dict(orient='records')
    
    # Use jsonify to serialize and return the data
    return jsonify(meals)

@app.route('/submit-recipes', methods=['POST'])
def handle_scheduling_recipes():
    survey_data = request.json

    #Convert data to recipes list
    recipes = extract_recipes(survey_data)

    #Generate the user's weekly schedule from the list of 21 recipes
    schedule = GenerateUserSchedule(recipes)

    #return jsonified list
    return jsonify(schedule)

#Note: This API endpoint is from the same recipes function on the frontend, which should reflect the recipes chosen by the user.
@app.route('/submit-recipes-grocery', methods=['POST'])
def handle_grocery_list():
    survey_data = request.json

    #Convert data to recipes list
    recipes = extract_recipes(survey_data)

    #Generate the grocery list from the recipes
    groceries = GenerateGroceryList(recipes)

    #return jsonified list
    return jsonify(groceries)

# Worry about this later
# @app.route('/submit-recipe', methods=['POST'])
# def receive_recipe():
#     survey_data = request.json

#     recipe = extract_recipes(survey_data)

#     print(recipe)

#     # Return a response
#     return jsonify({'message': 'Recipes received successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)
