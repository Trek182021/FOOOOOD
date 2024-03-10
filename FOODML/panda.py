import pandas as pd

df = pd.read_csv('nutrients.csv')

df = df[['Shrt_Desc','Energ_Kcal', 'Protein_(g)','Carbohydrt_(g)']]

column_names_mapping = {
    'Shrt_Desc': 'description',
    'Energ_Kcal': 'calories',
    'Carbohydrt_(g)': 'carbohydrates',
    'Protein_(g)': 'protein'
}

df.rename(columns=column_names_mapping, inplace=True)

df = df.dropna()

def search_nutrients(food_name: str) :
    results = df[df['description'].str.contains(food_name, case=False)]

    nutrients = results.to_dict(orient='records')

    foods= []

    for nutrient in nutrients:
        description = nutrient.pop('description')
        if not nutrient: continue
        if not nutrient['calories']: continue
        if not nutrient['carbohydrates']: continue
        if not nutrient['protein']: continue

        food = {
            'description': description,
            'NutritionFacts': nutrient
        }
        foods.append(food)
    return foods
