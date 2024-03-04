import pandas as pd
import json

#.csv filepath
filePath = "/Users/vivansinghal/Documents/CSE115AProject/Prep_N_Plate/Prep_N_Plate_Backend/archive/recipes.csv"
filePath2 = "/Users/vivansinghal/Documents/CSE115AProject/Prep_N_Plate/Prep_N_Plate_Backend/archive/full_format_recipes.json"

#Read the CSV into a DF
df = pd.read_csv(filePath)

#Clean the CSV by dropping Null caloric values, removing duplicate rows, and renaming weird names.
df = df.dropna(axis=0, subset='calories')
df = df.rename(columns={'22-minute meals': 'twentyMinMeals', 'dairy free': 'dairyFree', 'peanut free': 'nutFree'})

def SurveyInput(int_arr):
    df_loc = df
    column_dict = {0: 'breakfast', 1: 'lunch', 2: 'dinner', 3: 'twentyMinMeals', 4: 'dessert', 5: 'calories',
                   6: 'vegetarian', 7: 'vegan', 8: 'nutFree', 9: 'dairyFree'}
    intersection_list = []

    for i in range(len(int_arr)):
        if int_arr[i] == 1:
            intersection_list.append(column_dict[i])

    df_loc = df_loc[df_loc[intersection_list].all(axis=1)]

    df_loc = df_loc[['title']]

    # Gets you a random 500 selected
    if len(df_loc) > 250:
        df_loc = df_loc.sample(n=250)

    return df_loc

# Function to generate grocery list from chosen recipes
def GenerateUserGroceryList(recipes):
    grocery_list = []
    for recipe in recipes:
        grocery_list += get_total_ingredients(recipe)
    return grocery_list

# Function to extract ingredients from recipes
def get_total_ingredients(recipe_name):
    # Read the JSON file containing recipes data
    with open(filePath2, 'r') as file:
        data = json.load(file)
    
    total_ingredients = {}
    
    recipe_data = None
    for key in data.keys():
        if recipe_name.lower() in key.lower():
            recipe_data = data[key]
            break
        
    if recipe_data:
        start_index = recipe_data.find('"fat"')
        end_index = recipe_data.find(']', start_index)
        if start_index != -1 and end_index != -1:
            ingredients_json = recipe_data[start_index:end_index+1]
            ingredients = json.loads(ingredients_json)
            
            for ingredient in ingredients:
                total_ingredients[ingredient] = total_ingredients.get(ingredient, 0) + 1
    
    return total_ingredients

# Function to generate user schedule from chosen recipes
def GenerateUserSchedule(recipes):
    user_schedule = []
    return_list = []
    for i in range(7):
        day_schedule = [recipes[i], recipes[i + 7], recipes[i + 14]]
        user_schedule.append(day_schedule)
  
    for i in user_schedule:
        return_list.append(OneDaySchedule(user_schedule[i]))

    return return_list

# Function to generate one day's schedule
def OneDaySchedule(recipes):
    b_schedules = dict()
    l_schedules = dict()
    d_schedules = dict()

    b_schedules[recipes[0]] =  get_recipe_slice(recipes[0])
    l_schedules[recipes[1]] =  get_recipe_slice(recipes[1])
    d_schedules[recipes[2]] =  get_recipe_slice(recipes[2])
    
    return [b_schedules, l_schedules, d_schedules]

# Function to extract recipe details from JSON
def get_recipe_slice(recipe_name):
    with open(filePath2, 'r') as f:
        data = json.load(f)
        recipe_json = None
        for recipe in data['recipes']:
            if recipe['title'] == recipe_name:
                recipe_json = recipe['json']
                break
        if recipe_json:
            start_index = recipe_json.find("fat")
            end_index = recipe_json.find("]", start_index) + 1
            if start_index != -1 and end_index != -1:
                return recipe_json[start_index:end_index]
        return None
