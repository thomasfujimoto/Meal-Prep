import pandas as pd

# Read the CSV file into a DataFrame
df = pd.read_csv('epi_r.csv')

# Define keywords for each mealtime
breakfast_keywords = ['breakfast', 'pancake', 'pancake', 'omelette', 'cereal', 'smoothie', 'muffin', 'oatmeal', 'egg', 'eggs', 'bagel', 'croissant', 'bacon']
lunch_keywords = ['lunch', 'sandwich', 'fish', 'salad', 'pasta', 'wrap', 'soup', 'grill', 'grilled', 'bowl', 'burger', 'pizza', 'burrito']
dinner_keywords = ['dinner', 'stir fry', 'fish', 'casserole', 'roast', 'pasta', 'grill', 'grilled', 'steak', 'roast', 'pizza', 'burrito', 'stir fry', 'skillet']

# Create empty DataFrames for each category
breakfast_df = pd.DataFrame(columns=df.columns)
lunch_df = pd.DataFrame(columns=df.columns)
dinner_df = pd.DataFrame(columns=df.columns)
other_df = pd.DataFrame(columns=df.columns)

# Iterate through each row in the DataFrame
for index, row in df.iterrows():
    # Check if any keyword for breakfast is in the recipe name
    if any(keyword in row['title'].lower() for keyword in breakfast_keywords):
        breakfast_df = pd.concat([breakfast_df, pd.DataFrame([row])], ignore_index=True)
    # Check if any keyword for lunch is in the recipe name
    if any(keyword in row['title'].lower() for keyword in lunch_keywords):
        lunch_df = pd.concat([lunch_df, pd.DataFrame([row])], ignore_index=True)
    # Check if any keyword for dinner is in the recipe name
    if any(keyword in row['title'].lower() for keyword in dinner_keywords):
        dinner_df = pd.concat([dinner_df, pd.DataFrame([row])], ignore_index=True)
    if not any(keyword in row['title'].lower() for keyword in breakfast_keywords + lunch_keywords + dinner_keywords):
        other_df= pd.concat([other_df, pd.DataFrame([row])], ignore_index=True)

                     
# Sort each DataFrame by the recipe name
breakfast_df = breakfast_df.sort_values(by='title')
lunch_df = lunch_df.sort_values(by='title')
dinner_df = dinner_df.sort_values(by='title')
other_df = other_df.sort_values(by='title')

# Add a column to each DataFrame indicating the mealtime
# Change this to 1 after confirming script works
breakfast_df['mealtime'] = 'Breakfast'
lunch_df['mealtime'] = 'Lunch'
dinner_df['mealtime'] = 'Dinner'
other_df['mealtime'] = 'Other'

# Concatenate all DataFrames into one
result_df = pd.concat([breakfast_df, lunch_df, dinner_df, other_df])

# Reset the index
result_df.reset_index(drop=True, inplace=True)

# Save the result to a single CSV file
result_df.to_csv('sorted_recipes.csv', index=False)

