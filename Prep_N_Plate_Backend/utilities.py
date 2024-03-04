import pandas as pd
import json

def SurveyInput(int_arr, df, output_file):
    # If no preferences are selected, write only titles to the output file
    if all(x == 0 for x in int_arr):
        titles_df = df[['title']]
        titles_json = titles_df.to_dict(orient='index')
        titles_json = {str(key): value['title'] for key, value in titles_json.items()}
        with open(output_file, 'w') as f:
            json.dump(titles_json, f)
        return titles_df  

    else:
        # Filter out all columns except 'title'
        titles_df = df[['title']]
        
        # Limit to 200 recipes if more than 200 are available
        if len(titles_df) > 500:
            titles_df = titles_df.head(500)
        
        # Write the filtered DataFrame to the output file
        titles_json = titles_df.to_dict(orient='index')
        titles_json = {str(key): value['title'] for key, value in titles_json.items()}
        with open(output_file, 'w') as f:
            f.truncate(0)  # Clear the file
            json.dump(titles_json, f)
        
        return titles_df

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

    b_schedules[recipe[0]] =  get_recipe_slice(recipe)
    l_schedules[recipe[1]] =  get_recipe_slice(recipe)
    d_schedules[recipe[2]] =  get_recipe_slice(recipe)
    
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
