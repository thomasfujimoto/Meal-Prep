import pandas as pd
import json
from utilities import SurveyInput, GenerateUserSchedule, GenerateUserGroceryList, GenerateRecipes
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Function to extract integers from nested dictionary from survey data
def extract_integers(data, integers=[]):
    for value in data.values():
        if isinstance(value, dict):
            extract_integers(value, integers)
        elif isinstance(value, int):
            integers.append(value)
    return integers


def extract_meals(data, recipes=[]):
    pair = []
    for dict in data:
        for value in dict.values():
            pair.append(value)
            if len(pair) == 2:
                recipes.append(pair)
                pair = []
    return recipes

# parses out meal titles based on submitted survey results
@app.route('/submit-survey', methods=['POST'])
def handle_survey():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    survey_data = request.get_json()

    try:
        # Initialize an empty list to store integers
        integers = extract_integers(survey_data, [])

        # Call SurveyInput to get the meals as specified by the survey array
        # DEBUG
        meals = SurveyInput(integers)

        # Convert pandas df to dict so can be jsonified
        meals = meals.to_dict(orient='records')

        with open('meal_page.json', 'w') as f:
            json.dump(meals, f)

        # Use jsonify to serialize and return the data
        return jsonify(meals), 200
    except Exception as e:
        # Handle errors
        return jsonify({"error": str(e)}), 500

# Pulls out ingredients for grocery page
@app.route('/submit-grocery', methods=['POST'])
def handle_grocery_list():
    survey_data = request.json

    # Convert data to recipes list
    meals = extract_meals(survey_data, [])
    
    # Generate the user's weekly schedule from the list of 21 recipes
    groceries = GenerateUserGroceryList(meals)

    with open('grocery_page.json', 'w') as f:
        json.dump(groceries, f)

    # return success message
    return jsonify(message="Success: Meals submitted successfully"), 200

# Pulls out the recipes for each meal
@app.route('/submit-recipes', methods=['POST'])
def handle_recipes_list():
    survey_data = request.json

    # Convert data to recipes list
    meals = extract_meals(survey_data, [])
    # Generate the user's weekly schedule from the list of 21 recipes
    recipes = GenerateRecipes(meals)
    
    with open('recipes_page.json', 'w') as f:
        json.dump(recipes, f)

    # return Sucecss message
    return jsonify(message="Success: Meals submitted successfully"), 200

# POST request to submit meals selected
@app.route('/submit-meals', methods=['POST'])
def handle_scheduling_recipes():
    survey_data = request.json

    #Convert data to recipes list
    meals = extract_meals(survey_data, [])

    #Generate the user's weekly schedule from the list of 21 recipes
    schedule = GenerateUserSchedule(meals)

    with open('schedule_page.json', 'w') as f:
         json.dump(schedule, f)

    # call grocery and recipes function to reduce frontend / backend requests
    handle_grocery_list()
    handle_recipes_list()

    # return success message
    return jsonify(message="Success: Meals submitted successfully"),200

# GET request reciever to get meal for meal page
@app.route('/get-meals', methods=['GET'])
def get_meals():
    with open('meal_page.json', 'r') as f:
        meals_data = json.load(f)

    return jsonify({'meals': meals_data})

# GET request reciever to get meal titles for schedule page
@app.route('/get-schedule', methods=['GET'])
def get_schedule():
    with open('schedule_page.json', 'r') as f:
        schedule_data = json.load(f)

    return jsonify({'schedule': schedule_data})

#GET request receiver to get ingredients for grocery page
@app.route('/get-grocery', methods=['GET'])
def get_grocery():
    with open('grocery_page.json', 'r') as f:
        grocery_data = json.load(f)

    return jsonify({'grocery': grocery_data})

#GET request to get recipes for recipe page
@app.route('/get-recipes', methods=['GET'])
def get_recipes():
    with open('recipes_page.json', 'r') as f:
        recipes_data = json.load(f)

    return jsonify({'recipes': recipes_data})

if __name__ == '__main__':
    app.run(debug=True)
