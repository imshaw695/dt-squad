import pandas as pd

with open('survey_results_public.csv') as file:
    df = pd.read_csv(file)